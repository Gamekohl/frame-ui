import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { tablerCalendar, tablerChevronDown, tablerExternalLink, tablerServer, tablerX } from '@ng-icons/tabler-icons';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ApiService, DeployEnvironment, EnvironmentDetails } from '../../../services/api.service';
import { EnvironmentDetailsComponent } from './environment-details';

const environment: DeployEnvironment = {
  id: 'env-prod',
  name: 'Production',
  slug: 'prod',
  activeRelease: 'Checkout Refactor 1.4.0',
  capacityHeadroom: 42,
  dataFreshness: 'Live customer data',
  description: 'Customer-facing production environment.',
  drift: '1 emergency override',
  nextWindow: 'Tomorrow 10:00 AM',
  owner: {
    avatarUrl: 'https://i.pravatar.cc/300?u=alex.morgan@deployops.dev',
    name: 'Alex Morgan',
    team: 'Production Operations',
  },
  protected: true,
  readiness: {
    passed: 4,
    total: 6,
  },
  regionCount: 3,
  serviceCount: 24,
  stage: 'Production',
  status: 'degraded',
};

const details: EnvironmentDetails = {
  id: 'env-prod',
  environmentId: 'env-prod',
  name: 'Production',
  slug: 'prod',
  status: 'degraded',
  purpose: 'Live customer traffic with protected deployment windows.',
  owner: environment.owner,
  controls: {
    approvalsRequired: 'SRE plus service owner',
    dataPolicy: 'Live customer data',
    deployPolicy: 'Protected promotion with canary rollout',
    freezeWindow: 'Friday 2:00 PM - Monday 10:00 AM',
  },
  regions: [
    { name: 'us-east-1', status: 'healthy', capacity: '47%', latencyP95: '184ms' },
  ],
  readiness: [
    {
      label: 'Incident guard',
      status: 'blocked',
      description: 'Search Service incident is still active.',
    },
  ],
  releaseChannels: [
    { name: 'Canary', version: 'Checkout Refactor 1.4.0', state: 'running' },
  ],
  accessGroups: ['SRE Team', 'Incident Command'],
  recentActivity: [
    { title: 'Canary paused at 35%', actor: 'Automation', time: '21m ago' },
  ],
};

describe('EnvironmentDetailsComponent', () => {
  let component: EnvironmentDetailsComponent;
  let fixture: ComponentFixture<EnvironmentDetailsComponent>;
  let environmentDetailsSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    environmentDetailsSpy = vi.fn(() => of(details));

    await TestBed.configureTestingModule({
      imports: [EnvironmentDetailsComponent],
      providers: [
        provideIcons({
          tablerCalendar,
          tablerChevronDown,
          tablerExternalLink,
          tablerServer,
          tablerX,
        }),
        {
          provide: ApiService,
          useValue: {
            environmentDetails: environmentDetailsSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EnvironmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('environment', environment);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should render fetched environment details', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(component).toBeTruthy();
    expect(compiled.textContent).toContain('Environment');
    expect(compiled.textContent).toContain('Production');
    expect(compiled.textContent).toContain('Controls');
    expect(compiled.textContent).toContain('Incident guard');
    expect(environmentDetailsSpy).toHaveBeenCalledWith('env-prod');
  });
});
