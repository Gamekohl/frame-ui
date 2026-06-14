import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import {
  tablerChevronDown,
  tablerExternalLink,
  tablerLayersIntersect,
  tablerSearch,
  tablerServer,
  tablerX,
} from '@ng-icons/tabler-icons';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ApiService, Service, ServiceDetails } from '../../../services/api.service';
import { ServiceDetailsComponent } from './service-details';

const service: Service = {
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
};

const details: ServiceDetails = {
  ...service,
  id: 'svc-checkout-api',
  serviceId: 'svc-checkout-api',
  description: 'Coordinates cart validation, tax calculation, and the payment handoff.',
  region: 'us-east-1',
  repository: 'deployops/checkout-api',
  health: {
    errorRate: '0.04%',
    latencyP95: '182ms',
    saturation: '61%',
    uptime: '99.98%',
  },
  slo: {
    availability: '99.98%',
    errorBudgetRemaining: '82%',
    target: '99.95%',
  },
  dependencies: [
    { name: 'pricing-svc', status: 'healthy' },
    { name: 'inventory-sync', status: 'degraded' },
  ],
  alerts: [],
};

describe('ServiceDetailsComponent', () => {
  let component: ServiceDetailsComponent;
  let fixture: ComponentFixture<ServiceDetailsComponent>;
  let serviceDetailsSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    serviceDetailsSpy = vi.fn(() => of(details));

    await TestBed.configureTestingModule({
      imports: [ServiceDetailsComponent],
      providers: [
        provideIcons({
          tablerChevronDown,
          tablerExternalLink,
          tablerLayersIntersect,
          tablerSearch,
          tablerServer,
          tablerX,
        }),
        {
          provide: ApiService,
          useValue: {
            serviceDetails: serviceDetailsSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('service', service);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should render fetched service details', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(component).toBeTruthy();
    expect(compiled.textContent).toContain('Service details');
    expect(compiled.textContent).toContain('Checkout API');
    expect(compiled.textContent).toContain('Service health');
    expect(compiled.textContent).toContain('pricing-svc');
    expect(serviceDetailsSpy).toHaveBeenCalledWith('svc-checkout-api');
  });
});
