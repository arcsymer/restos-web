import { MenuCategory, TableDto } from './models';

// Same Bar Mleczny Nowa dataset used across the RestOS portfolio.
export const MOCK_MENU: MenuCategory[] = [
  {
    code: 'soups',
    nameEn: 'Soups',
    items: [
      { id: 1, namePl: 'Żurek z jajkiem', nameEn: 'Sour rye soup with egg', pricePln: 14.5, description: 'Traditional fermented rye soup with white sausage, halved boiled egg and marjoram.', allergens: ['gluten', 'eggs', 'celery'] },
      { id: 2, namePl: 'Rosół z makaronem', nameEn: 'Chicken broth with noodles', pricePln: 12.0, description: 'Clear chicken broth simmered for four hours, served with thin egg noodles.', allergens: ['gluten', 'eggs', 'celery'] },
      { id: 3, namePl: 'Barszcz czerwony z uszkami', nameEn: 'Beetroot soup with dumplings', pricePln: 15.0, description: 'Beetroot sour soup with small mushroom-filled dumplings.', allergens: ['gluten', 'celery'] },
      { id: 4, namePl: 'Zupa pomidorowa z ryżem', nameEn: 'Tomato soup with rice', pricePln: 12.5, description: 'Creamy tomato soup on broth base, served with rice.', allergens: ['milk', 'celery'] },
      { id: 5, namePl: 'Ogórkowa', nameEn: 'Dill pickle soup', pricePln: 12.5, description: 'Sour cucumber soup with potatoes and dill, finished with cream.', allergens: ['milk', 'celery'] },
    ],
  },
  {
    code: 'mains',
    nameEn: 'Mains',
    items: [
      { id: 6, namePl: 'Pierogi ruskie (8 szt.)', nameEn: 'Potato & cheese dumplings (8 pcs)', pricePln: 22.0, description: 'Hand-made dumplings with potato and twaróg filling, topped with fried onion.', allergens: ['gluten', 'milk'] },
      { id: 7, namePl: 'Pierogi z mięsem (8 szt.)', nameEn: 'Meat dumplings (8 pcs)', pricePln: 24.0, description: 'Dumplings filled with slow-cooked pork and beef, served with skwarki.', allergens: ['gluten', 'eggs'] },
      { id: 8, namePl: 'Kotlet schabowy', nameEn: 'Breaded pork cutlet', pricePln: 28.0, description: 'Classic breaded pork loin cutlet fried in lard, with potatoes and mizeria.', allergens: ['gluten', 'eggs'] },
      { id: 9, namePl: 'Kotlet mielony', nameEn: 'Minced meat cutlet', pricePln: 23.0, description: 'Pan-fried minced pork patty with buckwheat and beet salad.', allergens: ['gluten', 'eggs'] },
      { id: 10, namePl: 'Gołąbki w sosie pomidorowym', nameEn: 'Cabbage rolls in tomato sauce', pricePln: 24.5, description: 'Cabbage leaves stuffed with rice and pork, baked in tomato sauce.', allergens: ['celery'] },
      { id: 11, namePl: 'Bigos', nameEn: "Hunter's stew", pricePln: 21.0, description: 'Sauerkraut stewed with three kinds of meat, prunes and forest mushrooms.', allergens: ['sulphites'] },
      { id: 12, namePl: 'Placki ziemniaczane ze śmietaną', nameEn: 'Potato pancakes with sour cream', pricePln: 19.0, description: 'Crispy grated-potato pancakes, served with sour cream or goulash (+6 PLN).', allergens: ['gluten', 'eggs', 'milk'] },
      { id: 13, namePl: 'Naleśniki z serem (3 szt.)', nameEn: 'Crepes with sweet cheese (3 pcs)', pricePln: 18.0, description: 'Thin crepes with sweet twaróg filling, drizzled with vanilla sauce.', allergens: ['gluten', 'eggs', 'milk'] },
      { id: 14, namePl: 'Kopytka z masłem', nameEn: 'Potato dumplings with butter', pricePln: 16.0, description: 'Soft potato dumplings tossed in browned butter with breadcrumbs.', allergens: ['gluten', 'eggs', 'milk'] },
      { id: 15, namePl: 'Ryba smażona z ziemniakami', nameEn: 'Fried fish with potatoes', pricePln: 26.0, description: 'Breaded pollock fillet with dill potatoes and surówka.', allergens: ['fish', 'gluten'] },
      { id: 16, namePl: 'Leniwe z cynamonem', nameEn: 'Sweet cheese dumplings with cinnamon', pricePln: 17.0, description: 'Lazy dumplings from twaróg, with cinnamon sugar and melted butter.', allergens: ['gluten', 'eggs', 'milk'] },
    ],
  },
  {
    code: 'sides',
    nameEn: 'Sides',
    items: [
      { id: 17, namePl: 'Ziemniaki z koperkiem', nameEn: 'Dill potatoes', pricePln: 7.0, description: 'Boiled potatoes with butter and fresh dill.', allergens: ['milk'] },
      { id: 18, namePl: 'Mizeria', nameEn: 'Cucumber salad in cream', pricePln: 6.5, description: 'Thin-sliced cucumbers in sour cream with dill.', allergens: ['milk'] },
      { id: 19, namePl: 'Surówka z marchewki', nameEn: 'Carrot slaw', pricePln: 6.0, description: 'Grated carrot and apple slaw with lemon.', allergens: [] },
      { id: 20, namePl: 'Buraczki zasmażane', nameEn: 'Sautéed beets', pricePln: 6.5, description: 'Warm grated beetroot with a light roux.', allergens: ['gluten'] },
    ],
  },
  {
    code: 'drinks',
    nameEn: 'Drinks',
    items: [
      { id: 21, namePl: 'Kompot z owoców', nameEn: 'Fruit compote', pricePln: 5.0, description: 'House drink of stewed seasonal fruit, served chilled.', allergens: [] },
      { id: 22, namePl: 'Herbata', nameEn: 'Tea', pricePln: 4.5, description: 'Black tea with lemon on request.', allergens: [] },
      { id: 23, namePl: 'Kawa zbożowa z mlekiem', nameEn: 'Grain coffee with milk', pricePln: 5.5, description: 'Traditional roasted-grain coffee with hot milk.', allergens: ['gluten', 'milk'] },
    ],
  },
  {
    code: 'desserts',
    nameEn: 'Desserts',
    items: [
      { id: 24, namePl: 'Kisiel', nameEn: 'Fruit kissel', pricePln: 6.0, description: 'Thick strawberry kissel served warm or cold.', allergens: [] },
      { id: 25, namePl: 'Budyń waniliowy', nameEn: 'Vanilla pudding', pricePln: 6.0, description: 'Vanilla milk pudding with raspberry syrup.', allergens: ['milk'] },
    ],
  },
];

export const MOCK_TABLES: TableDto[] = [
  { id: 1, name: 'T1', seats: 2 },
  { id: 2, name: 'T2', seats: 2 },
  { id: 3, name: 'T3', seats: 2 },
  { id: 4, name: 'T4', seats: 4 },
  { id: 5, name: 'T5', seats: 4 },
  { id: 6, name: 'T6', seats: 4 },
  { id: 7, name: 'T7', seats: 4 },
  { id: 8, name: 'T8', seats: 6 },
  { id: 9, name: 'T9', seats: 6 },
  { id: 10, name: 'T10', seats: 8 },
];
