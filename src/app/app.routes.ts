import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'menu' },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu-page').then((m) => m.MenuPage),
    title: 'Menu — Bar Mleczny Nowa',
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart-page').then((m) => m.CartPage),
    title: 'Cart — Bar Mleczny Nowa',
  },
  {
    path: 'reserve',
    loadComponent: () => import('./reserve/reserve-page').then((m) => m.ReservePage),
    title: 'Reserve a table — Bar Mleczny Nowa',
  },
];
