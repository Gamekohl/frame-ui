import { Injectable, signal } from '@angular/core';

type StoreAuditEvent = {
  id: number;
  actor: string;
  initials: string;
  action: string;
  target: string;
  area: string;
  outcome: string;
  occurredAt: string;
  displayTime: string;
  summary: string;
  source: string;
  ipAddress: string;
  changes: readonly {
    label: string;
    before: string;
    after: string;
  }[];
};

type NewStoreAuditEvent = Omit<StoreAuditEvent, 'id' | 'occurredAt' | 'displayTime'> & {
  occurredAt?: string;
  displayTime?: string;
};

@Injectable({ providedIn: 'root' })
export class CommerceAdminAuditStore {
  private readonly eventState = signal<StoreAuditEvent[]>([]);

  readonly events = this.eventState.asReadonly();

  record(event: NewStoreAuditEvent): StoreAuditEvent {
    const recordedEvent: StoreAuditEvent = {
      ...event,
      id: Math.max(0, ...this.eventState().map((entry) => entry.id)) + 1,
      occurredAt: event.occurredAt ?? new Date().toISOString(),
      displayTime: event.displayTime ?? 'Just now',
    };

    this.eventState.update((events) => [recordedEvent, ...events]);

    return recordedEvent;
  }
}
