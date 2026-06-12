import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { App } from './app';
import { DeployopsApiService, DeployopsDashboardData, ReleaseDetails } from './deployops-api.service';

const dashboardData: DeployopsDashboardData = {
  summary: {
    activeDeployments: 8,
    changeFailureRate: 3.8,
    healthyServices: 24,
    leadTimeMinutes: 42,
  },
  releases: [
    {
      environment: 'Production',
      id: 'rel-1001',
      release: 'Checkout Refactor',
      progress: 92,
      service: 'checkout-api',
      status: 'healthy',
      updatedAt: '4 min ago',
      version: '1.4.0',
      team: [
        'https://i.pravatar.cc/300?u=alex.morgan@deployops.dev',
        'https://i.pravatar.cc/300?u=mira.klein@deployops.dev',
      ],
    },
    {
      environment: 'Production',
      id: 'rel-1003',
      release: 'Search Service',
      progress: 34,
      service: 'search-svc',
      status: 'blocked',
      updatedAt: '23 min ago',
      version: '2.0.1',
      team: [
        'https://i.pravatar.cc/300?u=rhea.sommer@deployops.dev',
        'https://i.pravatar.cc/300?u=nora.hart@deployops.dev',
      ],
    },
  ],
  incidents: [
    {
      id: 'inc-442',
      openedAt: '27 min ago',
      service: 'Customer Hub',
      severity: 'high',
      title: 'Profile cache miss spike',
    },
  ],
  team: [
    {
      id: 'member-1',
      email: 'alex.morgan@deployops.dev',
      avatarUrl: 'https://i.pravatar.cc/300?u=alex.morgan@deployops.dev',
    },
  ],
};

const dashboardDataWithLegacyRelease = {
  ...dashboardData,
  releases: [
    {
      environment: 'Production',
      id: 'rel-legacy',
      progress: 0,
      release: 'Legacy Release',
      service: 'legacy-svc',
      status: 'in-queue',
      updatedAt: '1m ago',
      version: '0.1.0',
    },
  ],
} as DeployopsDashboardData;

const releaseDetails: ReleaseDetails = {
  id: 'rel-1001',
  releaseId: 'rel-1001',
  release: 'Checkout Refactor',
  version: '1.4.0',
  service: 'checkout-api',
  environment: 'Production',
  status: 'in-queue',
  releaseType: 'Standard',
  createdBy: {
    name: 'Taylor Kim',
    avatarUrl: 'https://i.pravatar.cc/300?u=taylor.kim@deployops.dev',
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

describe('DeployOps dashboard', () => {
  let releaseDetailsSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    releaseDetailsSpy = vi.fn(() => of(releaseDetails));

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: DeployopsApiService,
          useValue: {
            dashboard: () => of(dashboardData),
            releaseDetails: releaseDetailsSpy,
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the dashboard app', () => {
    const fixture = TestBed.createComponent(App);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render summary cards and release table data from the api service', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('DeployOps');
    expect(compiled.textContent).toContain('Release Queue');
    expect(compiled.textContent).toContain('Checkout Refactor');
    expect(compiled.textContent).toContain('checkout-api');
    expect(compiled.textContent).toContain('Search Service');
    expect(compiled.textContent).toContain('Blocked');
    expect(releaseDetailsSpy).not.toHaveBeenCalled();
  });

  it('should render the screenshot table columns', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Release');
    expect(compiled.textContent).toContain('Service');
    expect(compiled.textContent).toContain('Environment');
    expect(compiled.textContent).toContain('Progress');
    expect(compiled.textContent).toContain('Team');
    expect(compiled.textContent).toContain('Updated');
  });

  it('should tolerate legacy release rows without team data', async () => {
    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: DeployopsApiService,
          useValue: {
            dashboard: () => of(dashboardDataWithLegacyRelease),
            releaseDetails: () => of(releaseDetails),
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);

    expect(() => fixture.detectChanges()).not.toThrow();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Legacy Release');
  });

  it('should load release details into the review sidebar', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    expect(releaseDetailsSpy).not.toHaveBeenCalled();

    (fixture.componentInstance as unknown as { openReleaseDetails: (release: typeof dashboardData.releases[number]) => void })
      .openReleaseDetails(dashboardData.releases[0]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Review');
    expect(compiled.textContent).toContain('Taylor Kim');
    expect(compiled.textContent).toContain('Change summary');
    expect(compiled.textContent).toContain('Jordan Lee');
    expect(releaseDetailsSpy).toHaveBeenCalledWith('rel-1001');
  });
});
