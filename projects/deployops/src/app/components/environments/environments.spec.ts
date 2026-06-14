import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import {
  tablerBell,
  tablerCalendar,
  tablerChevronDown,
  tablerExternalLink,
  tablerFilter,
  tablerRefresh,
  tablerSearch,
  tablerServer,
  tablerShieldCheck,
  tablerX,
} from '@ng-icons/tabler-icons';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ApiService, EnvironmentDetails, EnvironmentsData } from '../../services/api.service';
import { Environments } from './environments';

const environmentsData: EnvironmentsData = {
  summary: {
    activeReleases: 3,
    protectedEnvironments: 1,
    promotionReady: 1,
    totalEnvironments: 2,
    statusCounts: {
      degraded: 1,
      healthy: 1,
      locked: 0,
      warming: 0,
    },
  },
  environments: [
    {
      id: 'env-staging',
      name: 'Staging',
      slug: 'staging',
      activeRelease: 'Checkout Refactor 1.4.0',
      capacityHeadroom: 58,
      dataFreshness: 'Masked production snapshot 1h ago',
      description: 'Production-like environment for release candidates.',
      drift: '0 changes',
      nextWindow: 'Today 4:30 PM',
      owner: {
        avatarUrl: 'https://i.pravatar.cc/300?u=jordan.lee@deployops.dev',
        name: 'Jordan Lee',
        team: 'SRE Team',
      },
      protected: true,
      readiness: {
        passed: 5,
        total: 6,
      },
      regionCount: 2,
      serviceCount: 24,
      stage: 'Staging',
      status: 'healthy',
    },
    {
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
    },
  ],
};

const environmentDetails: EnvironmentDetails = {
  id: 'env-prod',
  environmentId: 'env-prod',
  name: 'Production',
  slug: 'prod',
  status: 'degraded',
  purpose: 'Live customer traffic with protected deployment windows.',
  owner: {
    avatarUrl: 'https://i.pravatar.cc/300?u=alex.morgan@deployops.dev',
    name: 'Alex Morgan',
    team: 'Production Operations',
  },
  controls: {
    approvalsRequired: 'SRE plus service owner',
    dataPolicy: 'Live customer data',
    deployPolicy: 'Protected promotion with canary rollout',
    freezeWindow: 'Friday 2:00 PM - Monday 10:00 AM',
  },
  regions: [
    { name: 'us-east-1', status: 'healthy', capacity: '47%', latencyP95: '184ms' },
    { name: 'us-west-2', status: 'degraded', capacity: '39%', latencyP95: '244ms' },
  ],
  readiness: [
    {
      label: 'Incident guard',
      status: 'blocked',
      description: 'Search Service incident is still active.',
    },
    {
      label: 'Canary capacity',
      status: 'passed',
      description: 'Enough headroom for canary traffic.',
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

describe('Environments', () => {
  let getEnvironmentsSpy: ReturnType<typeof vi.fn>;
  let environmentDetailsSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    getEnvironmentsSpy = vi.fn(() => of(environmentsData));
    environmentDetailsSpy = vi.fn(() => of(environmentDetails));

    await TestBed.configureTestingModule({
      imports: [Environments],
      providers: [
        provideIcons({
          tablerBell,
          tablerCalendar,
          tablerChevronDown,
          tablerExternalLink,
          tablerFilter,
          tablerRefresh,
          tablerSearch,
          tablerServer,
          tablerShieldCheck,
          tablerX,
        }),
        {
          provide: ApiService,
          useValue: {
            environmentDetails: environmentDetailsSpy,
            getEnvironments: getEnvironmentsSpy,
          },
        },
      ],
    }).compileComponents();
  });

  it('should render the environment control plane and selected details', () => {
    const fixture = TestBed.createComponent(Environments);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Environments');
    expect(compiled.textContent).toContain('Promotion runway');
    expect(compiled.textContent).toContain('Upcoming windows');
    expect(compiled.textContent).toContain('Protected lanes');
    expect(compiled.textContent).toContain('Capacity posture');
    expect(compiled.textContent).toContain('Production');
    expect(compiled.textContent).toContain('Readiness gates');
    expect(compiled.textContent).toContain('Incident guard');
    expect(getEnvironmentsSpy).toHaveBeenCalled();
    expect(environmentDetailsSpy).toHaveBeenCalledWith('env-prod');
  });
});
