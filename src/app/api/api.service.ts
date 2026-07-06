import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateReservationRequest,
  MenuCategory,
  OrderConfirmation,
  OrderRequest,
  ReservationDto,
  TableDto,
} from './models';

export const API_BASE = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  getMenu(): Observable<MenuCategory[]> {
    return this.http.get<MenuCategory[]>(`${API_BASE}/api/v1/menu`);
  }

  getAvailability(date: string, slot: string, partySize: number): Observable<TableDto[]> {
    const params = new HttpParams()
      .set('date', date)
      .set('slot', slot)
      .set('partySize', partySize);
    return this.http.get<TableDto[]>(`${API_BASE}/api/v1/availability`, { params });
  }

  createReservation(req: CreateReservationRequest): Observable<ReservationDto> {
    return this.http.post<ReservationDto>(`${API_BASE}/api/v1/reservations`, req);
  }

  submitOrder(req: OrderRequest): Observable<OrderConfirmation> {
    return this.http.post<OrderConfirmation>(`${API_BASE}/api/v1/orders`, req);
  }
}
