import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api/api.service';
import { OrderConfirmation } from '../api/models';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-cart-page',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage {
  private api = inject(ApiService);
  protected cart = inject(CartStore);

  protected submitting = signal(false);
  protected confirmation = signal<OrderConfirmation | null>(null);
  protected error = signal('');

  protected submit(): void {
    this.submitting.set(true);
    this.error.set('');
    const items = this.cart.lines().map((l) => ({ menuItemId: l.item.id, qty: l.qty }));
    this.api.submitOrder({ items }).subscribe({
      next: (confirmation) => {
        this.confirmation.set(confirmation);
        this.cart.clear();
        this.submitting.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.detail ?? 'Order could not be submitted.');
        this.submitting.set(false);
      },
    });
  }
}
