import { Component, LOCALE_ID, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ModeService } from './api/mode.service';
import { CartStore } from './cart/cart.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly mode = inject(ModeService);
  protected readonly cart = inject(CartStore);
  // 'en-US' in the source build, 'pl' in the localized build; drives the
  // language switcher (each locale is a separate static build, e.g. /pl/)
  protected readonly locale = inject(LOCALE_ID);

  constructor() {
    const router = inject(Router);
    // move focus to the content region on navigation so screen-reader and
    // keyboard users land on the new page, not the header
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        document.getElementById('main-content')?.focus();
      }
    });
  }
}
