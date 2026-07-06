import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api/api.service';
import { ProblemDetail, ReservationDto, SLOTS, TableDto } from '../api/models';

const SLOT_PATTERN = /^(0[89]|1[0-8]):(00|30)$/;
const PHONE_PATTERN = /^[+0-9 ()-]{7,20}$/;

function tomorrowIso(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

@Component({
  selector: 'app-reserve-page',
  imports: [ReactiveFormsModule],
  templateUrl: './reserve-page.html',
  styleUrl: './reserve-page.css',
})
export class ReservePage {
  private api = inject(ApiService);

  protected readonly slots = SLOTS;

  protected readonly form = new FormGroup({
    date: new FormControl<string>(tomorrowIso(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    slot: new FormControl<string>('13:00', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(SLOT_PATTERN)],
    }),
    partySize: new FormControl<number>(2, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.max(12)],
    }),
    guestName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    phone: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(PHONE_PATTERN)],
    }),
  });

  protected tables = signal<TableDto[] | null>(null);
  protected selectedTableId = signal<number | null>(null);
  protected checking = signal(false);
  protected submitting = signal(false);
  protected confirmation = signal<ReservationDto | null>(null);
  protected error = signal('');

  protected checkAvailability(): void {
    const { date, slot, partySize } = this.form.getRawValue();
    if (!date || !SLOT_PATTERN.test(slot)) {
      this.form.controls.date.markAsTouched();
      this.form.controls.slot.markAsTouched();
      return;
    }
    this.checking.set(true);
    this.error.set('');
    this.tables.set(null);
    this.selectedTableId.set(null);
    this.api.getAvailability(date, slot, partySize).subscribe({
      next: (tables) => {
        this.tables.set(tables);
        this.checking.set(false);
      },
      error: () => {
        this.error.set('Availability check failed.');
        this.checking.set(false);
      },
    });
  }

  protected submit(): void {
    if (this.form.invalid || this.selectedTableId() === null) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.error.set('');
    this.api
      .createReservation({ ...this.form.getRawValue(), tableId: this.selectedTableId()! })
      .subscribe({
        next: (reservation) => {
          this.confirmation.set(reservation);
          this.submitting.set(false);
        },
        error: (err) => {
          const problem: ProblemDetail | undefined = err?.error;
          const fieldErrors = problem?.errors?.length ? ` (${problem.errors.join('; ')})` : '';
          this.error.set((problem?.detail ?? 'Reservation failed.') + fieldErrors);
          this.submitting.set(false);
          // slot may have been taken meanwhile — refresh the table list
          this.checkAvailability();
        },
      });
  }

  protected invalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && control.touched;
  }
}
