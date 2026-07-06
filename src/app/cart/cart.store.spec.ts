import { TestBed } from '@angular/core/testing';
import { MenuItem } from '../api/models';
import { CartStore } from './cart.store';

const PIEROGI: MenuItem = {
  id: 6,
  namePl: 'Pierogi ruskie (8 szt.)',
  nameEn: 'Potato & cheese dumplings (8 pcs)',
  pricePln: 22.0,
  description: '',
  allergens: ['gluten', 'milk'],
};

const KOMPOT: MenuItem = {
  id: 21,
  namePl: 'Kompot z owoców',
  nameEn: 'Fruit compote',
  pricePln: 5.0,
  description: '',
  allergens: [],
};

describe('CartStore', () => {
  let store: CartStore;

  beforeEach(() => {
    store = TestBed.inject(CartStore);
  });

  it('adds items and increments quantity for repeats', () => {
    store.add(PIEROGI);
    store.add(PIEROGI);
    store.add(KOMPOT);
    expect(store.count()).toBe(3);
    expect(store.lines().length).toBe(2);
    expect(store.lines()[0].qty).toBe(2);
  });

  it('computes the total in grosz-exact math', () => {
    store.add(PIEROGI);
    store.add(PIEROGI);
    store.add(KOMPOT);
    expect(store.totalPln()).toBe(49.0);
  });

  it('setQty(0) removes the line', () => {
    store.add(PIEROGI);
    store.setQty(PIEROGI.id, 0);
    expect(store.lines().length).toBe(0);
    expect(store.totalPln()).toBe(0);
  });

  it('clear empties the cart', () => {
    store.add(PIEROGI);
    store.clear();
    expect(store.count()).toBe(0);
  });
});
