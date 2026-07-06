import { Injectable } from '@angular/core';
import {
  CreateReservationRequest,
  MenuCategory,
  OrderConfirmation,
  OrderRequest,
  ProblemDetail,
  ReservationDto,
  TableDto,
} from './models';
import { MOCK_MENU, MOCK_TABLES } from './mock-data';

/**
 * Deterministic in-browser stand-in for restos-core: same DTO shapes, same
 * conflict semantics (409 on double-booking, 409 when the party doesn't fit).
 * State lives in memory for the tab's lifetime.
 */
@Injectable({ providedIn: 'root' })
export class MockBackend {
  private reservations: ReservationDto[] = [];
  private nextId = 1;
  private orderSeq = 1;

  menu(): MenuCategory[] {
    return MOCK_MENU;
  }

  tables(): TableDto[] {
    return MOCK_TABLES;
  }

  availability(date: string, slot: string, partySize: number): TableDto[] {
    const taken = new Set(
      this.reservations
        .filter((r) => r.date === date && r.slot === slot && r.status === 'ACTIVE')
        .map((r) => r.tableId),
    );
    return MOCK_TABLES.filter((t) => t.seats >= partySize && !taken.has(t.id));
  }

  createReservation(req: CreateReservationRequest): ReservationDto | ProblemDetail {
    const table = MOCK_TABLES.find((t) => t.id === req.tableId);
    if (!table) {
      return { status: 404, detail: `table ${req.tableId} does not exist` };
    }
    if (req.partySize > table.seats) {
      return {
        status: 409,
        detail: `party of ${req.partySize} does not fit table ${table.name} (${table.seats} seats)`,
      };
    }
    const clash = this.reservations.some(
      (r) =>
        r.tableId === req.tableId &&
        r.date === req.date &&
        r.slot === req.slot &&
        r.status === 'ACTIVE',
    );
    if (clash) {
      return {
        status: 409,
        detail: `table ${table.name} is already booked on ${req.date} at ${req.slot}`,
      };
    }
    const reservation: ReservationDto = {
      id: this.nextId++,
      tableId: table.id,
      tableName: table.name,
      guestName: req.guestName,
      partySize: req.partySize,
      date: req.date,
      slot: req.slot,
      status: 'ACTIVE',
    };
    this.reservations.push(reservation);
    return reservation;
  }

  submitOrder(req: OrderRequest): OrderConfirmation {
    const prices = new Map(MOCK_MENU.flatMap((c) => c.items).map((i) => [i.id, i.pricePln]));
    const total = req.items.reduce((sum, l) => sum + (prices.get(l.menuItemId) ?? 0) * l.qty, 0);
    return {
      orderId: `BMN-${String(this.orderSeq++).padStart(4, '0')}`,
      totalPln: Math.round(total * 100) / 100,
      etaMinutes: 25,
    };
  }
}
