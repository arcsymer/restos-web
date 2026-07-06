// DTO shapes mirror restos-core's /api/v1 controllers.

export interface MenuItem {
  id: number;
  namePl: string;
  nameEn: string;
  pricePln: number;
  description: string;
  allergens: string[];
}

export interface MenuCategory {
  code: string;
  nameEn: string;
  items: MenuItem[];
}

export interface TableDto {
  id: number;
  name: string;
  seats: number;
}

export interface CreateReservationRequest {
  tableId: number;
  guestName: string;
  phone: string;
  partySize: number;
  date: string; // ISO yyyy-MM-dd
  slot: string; // HH:00 | HH:30, 08:00–18:30
}

export interface ReservationDto {
  id: number;
  tableId: number;
  tableName: string;
  guestName: string;
  partySize: number;
  date: string;
  slot: string;
  status: 'ACTIVE' | 'CANCELLED';
}

/** RFC 7807 body produced by restos-core (and by the mock backend). */
export interface ProblemDetail {
  status: number;
  title?: string;
  detail: string;
  errors?: string[];
}

export interface OrderRequest {
  items: { menuItemId: number; qty: number }[];
}

export interface OrderConfirmation {
  orderId: string;
  totalPln: number;
  etaMinutes: number;
}

export const SLOTS: string[] = (() => {
  const slots: string[] = [];
  for (let h = 8; h <= 18; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    if (h < 19) slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  return slots.slice(0, slots.length - 1); // last slot 18:30
})();
