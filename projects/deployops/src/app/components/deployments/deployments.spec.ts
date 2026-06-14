import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import {
  tablerCalendar,
  tablerChevronDown,
  tablerCircleCheck,
  tablerDots,
  tablerExclamationCircle,
  tablerExternalLink,
  tablerLayersIntersect,
  tablerPackages,
  tablerRefresh,
  tablerRocket,
  tablerSearch,
  tablerX,
} from '@ng-icons/tabler-icons';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ApiService, DeploymentDetails, DeploymentsData } from '../../services/api.service';
import { Deployments } from './deployments';

const deploymentsData: DeploymentsData = {
  summary: {
    activeDeployments: 5,
    successRate: 96.4,
    avgDurationMinutes: 18,
    rollbackRate: 1.8,
    statusCounts: {
      all: 2,
      running: 1,
      succeeded: 1,
      failed: 0,
      rolledBack: 0,
      queued: 0,
    },
  },
  deployments: [
    {
      id: 'dep-2001',
      deployment: 'Checkout Refactor',
      duration: '12m',
      environment: 'Production',
      initiatedBy: {
        avatarUrl: 'https://i.pravatar.cc/300?u=alex.morgan@deployops.dev',
        name: 'Alex Morgan',
      },
      progress: 62,
      service: 'checkout-api',
      startedAt: '10:42 AM',
      status: 'running',
      strategy: 'Canary',
      version: '1.4.0',
    },
    {
      id: 'dep-2002',
      deployment: 'Pricing Engine',
      duration: '14m',
      environment: 'Production',
      initiatedBy: {
        avatarUrl: 'https://i.pravatar.cc/300?u=mira.klein@deployops.dev',
        name: 'Mira Klein',
      },
      progress: 100,
      service: 'pricing-svc',
      startedAt: '10:28 AM',
      status: 'succeeded',
      strategy: 'Rolling',
      version: '2.1.3',
    },
  ],
  deploymentPagination: {
    first: 1,
    prev: null,
    next: null,
    last: 1,
    pages: 1,
    items: 2,
  },
};

const deploymentDetails: DeploymentDetails = {
  id: 'dep-2001',
  deploymentId: 'dep-2001',
  deployment: 'Checkout Refactor',
  currentPhase: '3 of 5',
  description: 'Canary deployment for checkout orchestration changes.',
  environment: 'Production',
  health: {
    errorRate: '0.04%',
    instances: '18/30',
    latencyP95: '182ms',
  },
  initiatedBy: {
    avatarUrl: 'https://i.pravatar.cc/300?u=alex.morgan@deployops.dev',
    name: 'Alex Morgan',
  },
  service: 'checkout-api',
  startedAt: 'May 20, 2024 10:42 AM',
  status: 'running',
  strategy: 'Canary',
  version: '1.4.0',
  checks: [
    { label: 'Preflight', status: 'passed' },
    { label: 'Smoke tests', status: 'running' },
    { label: 'Error budget', status: 'healthy' },
  ],
};

describe('Deployments', () => {
  let getDeploymentsSpy: ReturnType<typeof vi.fn>;
  let deploymentDetailsSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    getDeploymentsSpy = vi.fn(() => of(deploymentsData));
    deploymentDetailsSpy = vi.fn(() => of(deploymentDetails));

    await TestBed.configureTestingModule({
      imports: [Deployments],
      providers: [
        provideIcons({
          tablerCalendar,
          tablerChevronDown,
          tablerCircleCheck,
          tablerDots,
          tablerExclamationCircle,
          tablerExternalLink,
          tablerLayersIntersect,
          tablerPackages,
          tablerRefresh,
          tablerRocket,
          tablerSearch,
          tablerX,
        }),
        {
          provide: ApiService,
          useValue: {
            deploymentDetails: deploymentDetailsSpy,
            getDeployments: getDeploymentsSpy,
          },
        },
      ],
    }).compileComponents();
  });

  it('should render deployment metrics, table rows, and selected details', () => {
    const fixture = TestBed.createComponent(Deployments);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Deployments');
    expect(compiled.textContent).toContain('Active deployments');
    expect(compiled.textContent).toContain('Checkout Refactor');
    expect(compiled.textContent).toContain('checkout-api');
    expect(compiled.textContent).toContain('Details');
    expect(compiled.textContent).toContain('Rollout health');
    expect(compiled.textContent).toContain('Smoke tests');
    expect(getDeploymentsSpy).toHaveBeenCalledWith(1, 10);
    expect(deploymentDetailsSpy).toHaveBeenCalledWith('dep-2001');
  });
});
