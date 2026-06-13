import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import {
  tablerCircleCheck,
  tablerLayersIntersect,
  tablerPackages,
  tablerSend,
  tablerX,
} from '@ng-icons/tabler-icons';
import { of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';

import { ApiService, Release, ReleaseDetails } from '../../../services/api.service';
import { ReleaseDetailsComponent } from './release-details';

const release: Release = {
  environment: 'Production',
  id: 'rel-1001',
  progress: 45,
  release: 'Checkout Refactor',
  service: 'checkout-api',
  status: 'deploying',
  team: [],
  updatedAt: '2m ago',
  version: '1.4.0',
};

const details: ReleaseDetails = {
  ...release,
  releaseId: release.id,
  releaseType: 'Standard',
  createdBy: {
    avatarUrl: 'https://i.pravatar.cc/300?u=taylor.kim@deployops.dev',
    name: 'Taylor Kim',
  },
  createdAt: 'May 20, 2024 10:30 AM',
  description: 'Refactor checkout orchestration.',
  changeSummary: {
    commits: 12,
    filesChanged: 38,
    qualityGate: 'Passed',
    testResults: 'Passed',
  },
  approvals: [
    {
      avatarUrl: 'https://i.pravatar.cc/300?u=jordan.lee@deployops.dev',
      name: 'Jordan Lee',
      status: 'approved',
      team: 'SRE Team',
    },
  ],
};

describe('ReleaseDetailsComponent', () => {
  const releaseDetailsSpy = vi.fn(() => of(details));

  async function createComponent(): Promise<ComponentFixture<ReleaseDetailsComponent>> {
    releaseDetailsSpy.mockClear();

    await TestBed.configureTestingModule({
      imports: [ReleaseDetailsComponent],
      providers: [
        {
          provide: ApiService,
          useValue: {
            releaseDetails: releaseDetailsSpy,
          },
        },
        provideIcons({
          tablerCircleCheck,
          tablerLayersIntersect,
          tablerPackages,
          tablerSend,
          tablerX,
        }),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ReleaseDetailsComponent);
    fixture.componentRef.setInput('release', release);
    fixture.detectChanges();

    return fixture;
  }

  it('should render release details', async () => {
    const fixture = await createComponent();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Details');
    expect(compiled.textContent).toContain('Checkout Refactor');
    expect(compiled.textContent).toContain('Taylor Kim');
    expect(compiled.textContent).toContain('Change summary');
    expect(compiled.textContent).toContain('Jordan Lee');
    expect(releaseDetailsSpy).toHaveBeenCalledWith('rel-1001');
  });
});
