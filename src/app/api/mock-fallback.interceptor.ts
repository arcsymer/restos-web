import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { MockBackend } from './mock-backend';
import { ModeService } from './mode.service';
import { CreateReservationRequest, OrderRequest, ProblemDetail } from './models';

/**
 * Serves API requests from the in-browser MockBackend when mock mode is on,
 * and falls back to it automatically when the live restos-core API can't be
 * reached (status 0 network error) — flipping the visible mode chip to 'mock'.
 * The mock-only /orders endpoint always goes to the mock backend.
 */
export const mockFallbackInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('/api/v1/')) {
    return next(req);
  }
  const mock = inject(MockBackend);
  const mode = inject(ModeService);

  if (mode.mode() === 'mock' || req.url.endsWith('/api/v1/orders')) {
    return respondFromMock(mock, req);
  }
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 0) {
        mode.set('mock');
        return respondFromMock(mock, req);
      }
      return throwError(() => err);
    }),
  );
};

function respondFromMock(
  mock: MockBackend,
  req: HttpRequest<unknown>,
): Observable<HttpResponse<unknown>> {
  // urlWithParams (not url) — Angular keeps query params out of req.url
  const url = new URL(req.urlWithParams, 'http://mock.local');
  const path = url.pathname;

  if (req.method === 'GET' && path.endsWith('/api/v1/menu')) {
    return of(new HttpResponse({ status: 200, body: mock.menu() }));
  }
  if (req.method === 'GET' && path.endsWith('/api/v1/tables')) {
    return of(new HttpResponse({ status: 200, body: mock.tables() }));
  }
  if (req.method === 'GET' && path.endsWith('/api/v1/availability')) {
    const body = mock.availability(
      url.searchParams.get('date') ?? '',
      url.searchParams.get('slot') ?? '',
      Number(url.searchParams.get('partySize') ?? '1'),
    );
    return of(new HttpResponse({ status: 200, body }));
  }
  if (req.method === 'POST' && path.endsWith('/api/v1/reservations')) {
    const result = mock.createReservation(req.body as CreateReservationRequest);
    if ('status' in result && typeof result.status === 'number' && 'detail' in result) {
      return problem(result as ProblemDetail);
    }
    return of(new HttpResponse({ status: 201, body: result }));
  }
  if (req.method === 'POST' && path.endsWith('/api/v1/orders')) {
    return of(new HttpResponse({ status: 201, body: mock.submitOrder(req.body as OrderRequest) }));
  }
  return problem({ status: 404, detail: `no mock for ${req.method} ${path}` });
}

function problem(detail: ProblemDetail): Observable<never> {
  return throwError(
    () =>
      new HttpErrorResponse({
        status: detail.status,
        error: detail,
      }),
  );
}
