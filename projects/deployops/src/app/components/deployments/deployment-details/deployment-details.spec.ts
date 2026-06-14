import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  tablerChevronDown,
  tablerExclamationCircle,
  tablerLayersIntersect,
  tablerRocket,
  tablerSearch,
  tablerX,
} from '@ng-icons/tabler-icons';
import { provideIcons } from '@ng-icons/core';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { vi } from 'vitest';

import { ApiService, Deployment, DeploymentDetails } from '../../../services/api.service';
import { DeploymentDetailsComponent } from './deployment-details';

const deployment: Deployment = {
  id: 'dep-2001',
  deployment: 'Checkout Refactor',
  version: '1.4.0',
  service: 'checkout-api',
  environment: 'Production',
  status: 'running',
  strategy: 'Canary',
  progress: 62,
  startedAt: 'May 20, 2024 10:42 AM',
  duration: '14m',
  initiatedBy: {
    name: 'Alex Morgan',
    avatarUrl: 'https://i.pravatar.cc/300?u=alex.morgan@acme.io',
  },
};

const details: DeploymentDetails = {
  ...deployment,
  deploymentId: deployment.id,
  currentPhase: '3 of 5',
  description: 'Canary deployment for checkout orchestration changes.',
  health: {
    errorRate: '0.04%',
    latencyP95: '128ms',
    instances: '8 / 12',
  },
  checks: [
    { label: 'Preflight', status: 'passed' },
    { label: 'Smoke tests', status: 'running' },
    { label: 'Error budget', status: 'healthy' },
  ],
};

describe('DeploymentDetails', () => {
  let component: DeploymentDetailsComponent;
  let fixture: ComponentFixture<DeploymentDetailsComponent>;
  let deploymentDetailsSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    deploymentDetailsSpy = vi.fn(() => of(details));

    await TestBed.configureTestingModule({
      imports: [DeploymentDetailsComponent],
      providers: [
        provideIcons({
          tablerChevronDown,
          tablerExclamationCircle,
          tablerLayersIntersect,
          tablerRocket,
          tablerSearch,
          tablerX,
        }),
        {
          provide: ApiService,
          useValue: {
            deploymentDetails: deploymentDetailsSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeploymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('deployment', deployment);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should render deployment details', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(component).toBeTruthy();
    expect(compiled.textContent).toContain('Details');
    expect(compiled.textContent).toContain('Checkout Refactor');
    expect(compiled.textContent).toContain('Deployment checks');
    expect(compiled.textContent).toContain('Smoke tests');
    expect(deploymentDetailsSpy).toHaveBeenCalledWith('dep-2001');
  });
});
