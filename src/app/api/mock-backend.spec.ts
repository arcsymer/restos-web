import { TestBed } from '@angular/core/testing';
import { MockBackend } from './mock-backend';
import { ProblemDetail, ReservationDto } from './models';

const REQUEST = {
  tableId: 8,
  guestName: 'Anna Kowalska',
  phone: '+48 600 100 200',
  partySize: 6,
  date: '2026-08-15',
  slot: '13:00',
};

describe('MockBackend', () => {
  let mock: MockBackend;

  beforeEach(() => {
    mock = TestBed.inject(MockBackend);
  });

  it('serves the full menu', () => {
    const menu = mock.menu();
    expect(menu.length).toBe(5);
    expect(menu.flatMap((c) => c.items).length).toBe(25);
  });

  it('filters availability by seats and taken tables', () => {
    expect(mock.availability('2026-08-15', '13:00', 6).map((t) => t.name)).toEqual([
      'T8',
      'T9',
      'T10',
    ]);
    mock.createReservation(REQUEST);
    expect(mock.availability('2026-08-15', '13:00', 6).map((t) => t.name)).toEqual(['T9', 'T10']);
  });

  it('rejects double-booking with a 409 problem detail', () => {
    mock.createReservation(REQUEST);
    const second = mock.createReservation({ ...REQUEST, guestName: 'Jan' }) as ProblemDetail;
    expect(second.status).toBe(409);
    expect(second.detail).toContain('already booked');
  });

  it('rejects parties larger than the table', () => {
    const result = mock.createReservation({ ...REQUEST, tableId: 1, partySize: 6 }) as ProblemDetail;
    expect(result.status).toBe(409);
    expect(result.detail).toContain('does not fit');
  });

  it('creates an ACTIVE reservation otherwise', () => {
    const reservation = mock.createReservation(REQUEST) as ReservationDto;
    expect(reservation.status).toBe('ACTIVE');
    expect(reservation.tableName).toBe('T8');
  });

  it('prices orders from the menu', () => {
    const confirmation = mock.submitOrder({
      items: [
        { menuItemId: 6, qty: 2 }, // 2 × 22.00
        { menuItemId: 21, qty: 1 }, // 5.00
      ],
    });
    expect(confirmation.totalPln).toBe(49.0);
    expect(confirmation.orderId).toMatch(/^BMN-\d{4}$/);
  });
});
