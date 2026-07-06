import { Injectable, signal } from '@angular/core';

export type BackendMode = 'live' | 'mock';

/**
 * Which backend the app is talking to. Mock is forced via ?mock=1 or the
 * header toggle; otherwise the interceptor flips to mock automatically when
 * the live API is unreachable.
 */
@Injectable({ providedIn: 'root' })
export class ModeService {
  readonly mode = signal<BackendMode>(this.initial());

  private initial(): BackendMode {
    if (typeof window === 'undefined') {
      return 'mock';
    }
    if (new URLSearchParams(window.location.search).get('mock') === '1') {
      return 'mock';
    }
    return (localStorage.getItem('restos-mode') as BackendMode) ?? 'live';
  }

  set(mode: BackendMode): void {
    this.mode.set(mode);
    localStorage.setItem('restos-mode', mode);
  }

  toggle(): void {
    this.set(this.mode() === 'live' ? 'mock' : 'live');
  }
}
