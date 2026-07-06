import { DecimalPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { MenuCategory, MenuItem } from '../api/models';
import { CartStore } from '../cart/cart.store';

@Component({
  selector: 'app-menu-page',
  imports: [DecimalPipe],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.css',
})
export class MenuPage implements OnInit {
  private api = inject(ApiService);
  protected cart = inject(CartStore);

  protected categories = signal<MenuCategory[] | null>(null);
  protected error = signal('');
  protected announcement = signal('');

  ngOnInit(): void {
    this.api.getMenu().subscribe({
      next: (menu) => this.categories.set(menu),
      error: () => this.error.set('Could not load the menu.'),
    });
  }

  protected add(item: MenuItem): void {
    this.cart.add(item);
    this.announcement.set(`${item.nameEn} added to cart`);
  }
}
