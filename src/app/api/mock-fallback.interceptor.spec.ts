import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { mockFallbackInterceptor } from './mock-fallback.interceptor';
import { ModeService } from './mode.service';
import { TableDto } from './models';

describe('mockFallbackInterceptor', () => {
  let api: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([mockFallbackInterceptor]))],
    });
    TestBed.inject(ModeService).set('mock');
    api = TestBed.inject(ApiService);
  });

  it('serves the menu from the mock backend in mock mode', async () => {
    const menu = await firstValueFrom(api.getMenu());
    expect(menu.length).toBe(5);
  });

  it('passes query params (partySize) through to the availability filter', async () => {
    // regression: params live on req.urlWithParams, not req.url — a party of 12
    // exceeds every table (max 8 seats), so nothing is available
    const tooBig = await firstValueFrom(api.getAvailability('2026-08-15', '13:00', 12));
    expect(tooBig).toEqual([]);

    const fits = await firstValueFrom(api.getAvailability('2026-08-15', '13:00', 2));
    expect(fits.map((t: TableDto) => t.name)).toContain('T1');
  });

  it('maps a mock 409 to an HttpErrorResponse with the problem detail', async () => {
    const req = {
      tableId: 1, // seats 2
      guestName: 'Anna',
      phone: '+48 600 100 200',
      partySize: 6, // too big for table 1
      date: '2026-08-15',
      slot: '13:00',
    };
    await expectAsync(firstValueFrom(api.createReservation(req))).toBeRejectedWith(
      jasmine.objectContaining({ status: 409 }),
    );
  });
});
