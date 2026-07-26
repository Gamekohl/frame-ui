import { Injectable, signal } from '@angular/core';

import {
  INITIAL_AUDIT_EVENTS,
  type AuditEvent,
  type NewAuditEvent,
} from '../audit-log/audit-log-template.data';

@Injectable({ providedIn: 'root' })
export class CommerceAdminAuditStore {
  private readonly eventState = signal<AuditEvent[]>([...INITIAL_AUDIT_EVENTS]);

  readonly events = this.eventState.asReadonly();

  record(event: NewAuditEvent): AuditEvent {
    const recordedEvent: AuditEvent = {
      ...event,
      id: Math.max(0, ...this.eventState().map((entry) => entry.id)) + 1,
      occurredAt: event.occurredAt ?? new Date().toISOString(),
      displayTime: event.displayTime ?? 'Just now',
    };

    this.eventState.update((events) => [recordedEvent, ...events]);

    return recordedEvent;
  }
}
