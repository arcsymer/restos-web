import { Injectable, computed, signal } from '@angular/core';
import { MenuItem } from '../api/models';

export interface CartLine {
  item: MenuItem;
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly linesSignal = signal<CartLine[]>([]);

  readonly lines = this.linesSignal.asReadonly();
  readonly count = computed(() => this.linesSignal().reduce((n, l) => n + l.qty, 0));
  readonly totalPln = computed(() =>
    Math.round(this.linesSignal().reduce((sum, l) => sum + l.item.pricePln * l.qty, 0) * 100) /
    100,
  );

  add(item: MenuItem): void {
    this.linesSignal.update((lines) => {
      const existing = lines.find((l) => l.item.id === item.id);
      if (existing) {
        return lines.map((l) => (l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...lines, { item, qty: 1 }];
    });
  }

  setQty(itemId: number, qty: number): void {
    this.linesSignal.update((lines) =>
      qty <= 0
        ? lines.filter((l) => l.item.id !== itemId)
        : lines.map((l) => (l.item.id === itemId ? { ...l, qty } : l)),
    );
  }

  clear(): void {
    this.linesSignal.set([]);
  }
}
