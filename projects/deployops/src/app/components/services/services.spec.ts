import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import {
  tablerCircleCheck,
  tablerDots,
  tablerExclamationCircle,
  tablerExternalLink,
  tablerBell,
  tablerFilter,
  tablerHeartbeat,
  tablerLayersIntersect,
  tablerPackages,
  tablerRefresh,
  tablerSearch,
  tablerServer,
  tablerX,
} from '@ng-icons/tabler-icons';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ApiService, ServiceDetails, ServicesData } from '../../services/api.service';
import { Services } from './services';

const servicesData: ServicesData = {
  summary: {
    totalServices: 2,
    healthyServices: 1,
    degradedServices: 1,
    incidentServices: 0,
    avgLatencyP95: '139ms',
    statusCounts: {
      all: 2,
      degraded: 1,
      healthy: 1,
      incident: 0,
      maintenance: 0,
    },
  },
  services: [
    {
      id: 'svc-checkout-api',
      name: 'checkout-api',
      displayName: 'Checkout API',
      dependencies: 4,
      environment: 'Production',
      errorRate: '0.04%',
      instances: '18 / 30',
      lastDeployment: '12m ago',
      latencyP95: '182ms',
      owner: {
        avatarUrl: 'https://i.pravatar.cc/300?u=alex.morgan@deployops.dev',
        name: 'Alex Morgan',
        team: 'Checkout Platform',
      },
      runtime: 'Node.js 22',
      status: 'healthy',
      tier: 'Tier 1',
      uptime: '99.98%',
      version: '1.4.0',
    },
    {
      id: 'svc-feature-flags',
      name: 'feature-flags',
      displayName: 'Feature Flags',
      dependencies: 3,
      environment: 'Production',
      errorRate: '0.12%',
      instances: '5 / 8',
      lastDeployment: '4h ago',
      latencyP95: '211ms',
      owner: {
        avatarUrl: 'https://i.pravatar.cc/300?u=morgan.patel@deployops.dev',
        name: 'Morgan Patel',
        team: 'Platform',
      },
      runtime: 'Go 1.23',
      status: 'degraded',
      tier: 'Tier 2',
      uptime: '99.89%',
      version: '0.9.0',
    },
  ],
  servicePagination: {
    first: 1,
    prev: null,
    next: null,
    last: 1,
    pages: 1,
    items: 2,
  },
};

const serviceDetails: ServiceDetails = {
  id: 'svc-checkout-api',
  serviceId: 'svc-checkout-api',
  name: 'checkout-api',
  displayName: 'Checkout API',
  description: 'Coordinates cart validation, tax calculation, and the payment handoff.',
  environment: 'Production',
  health: {
    errorRate: '0.04%',
    latencyP95: '182ms',
    saturation: '61%',
    uptime: '99.98%',
  },
  owner: {
    avatarUrl: 'https://i.pravatar.cc/300?u=alex.morgan@deployops.dev',
    name: 'Alex Morgan',
    team: 'Checkout Platform',
  },
  region: 'us-east-1',
  repository: 'deployops/checkout-api',
  runtime: 'Node.js 22',
  slo: {
    availability: '99.98%',
    errorBudgetRemaining: '82%',
    target: '99.95%',
  },
  status: 'healthy',
  tier: 'Tier 1',
  version: '1.4.0',
  dependencies: [
    { name: 'pricing-svc', status: 'healthy' },
    { name: 'inventory-sync', status: 'degraded' },
  ],
  alerts: [],
};

describe('Services', () => {
  let getServicesSpy: ReturnType<typeof vi.fn>;
  let serviceDetailsSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    getServicesSpy = vi.fn(() => of(servicesData));
    serviceDetailsSpy = vi.fn(() => of(serviceDetails));

    await TestBed.configureTestingModule({
      imports: [Services],
      providers: [
        provideIcons({
          tablerCircleCheck,
          tablerDots,
          tablerExclamationCircle,
          tablerExternalLink,
          tablerBell,
          tablerFilter,
          tablerHeartbeat,
          tablerLayersIntersect,
          tablerPackages,
          tablerRefresh,
          tablerSearch,
          tablerServer,
          tablerX,
        }),
        {
          provide: ApiService,
          useValue: {
            getServices: getServicesSpy,
            serviceDetails: serviceDetailsSpy,
          },
        },
      ],
    }).compileComponents();
  });

  it('should render the service catalog and selected details', async () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Services');
    expect(compiled.textContent).toContain('Operational focus');
    expect(compiled.textContent).toContain('Service catalog');
    expect(compiled.textContent).toContain('Checkout API');
    expect(compiled.textContent).toContain('Checkout Platform');
    expect(getServicesSpy).toHaveBeenCalledWith(1, 10);
  });
});
