import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import {
  tablerArrowDown,
  tablerArrowUp,
  tablerBell,
  tablerCalendar,
  tablerChevronDown,
  tablerCircleCheck,
  tablerDots,
  tablerEdit,
  tablerExclamationCircle,
  tablerExternalLink,
  tablerFilter,
  tablerHeartbeat,
  tablerLayersIntersect,
  tablerPackages,
  tablerRefresh,
  tablerRocket,
  tablerSearch,
  tablerSend,
  tablerTrash,
  tablerX,
} from '@ng-icons/tabler-icons';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ApiService, DeployopsDashboardData, ReleaseDetails } from '../../services/api.service';
import { FrModalService } from '@frame-ui-ng/components/modal';
import { EditReleaseModalComponent } from '../edit-release-modal/edit-release-modal';
import { ReleaseQueue } from './release-queue';

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
  releasePagination: {
    first: 1,
    prev: null,
    next: 2,
    last: 2,
    pages: 2,
    items: 18,
  },
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

describe('ReleaseQueue', () => {
  let getDashboardSpy: ReturnType<typeof vi.fn>;
  let releaseDetailsSpy: ReturnType<typeof vi.fn>;
  let modalOpenSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    getDashboardSpy = vi.fn(() => of(dashboardData));
    releaseDetailsSpy = vi.fn(() => of(releaseDetails));
    modalOpenSpy = vi.fn(() => ({ closed: of('cancel') }));

    await TestBed.configureTestingModule({
      imports: [ReleaseQueue],
      providers: [
        provideHttpClient(),
        provideIcons({
          tablerArrowDown,
          tablerArrowUp,
          tablerBell,
          tablerCalendar,
          tablerChevronDown,
          tablerCircleCheck,
          tablerDots,
          tablerEdit,
          tablerExclamationCircle,
          tablerExternalLink,
          tablerFilter,
          tablerHeartbeat,
          tablerLayersIntersect,
          tablerPackages,
          tablerRefresh,
          tablerRocket,
          tablerSearch,
          tablerSend,
          tablerTrash,
          tablerX,
        }),
        {
          provide: ApiService,
          useValue: {
            getDashboard: getDashboardSpy,
            releaseDetails: releaseDetailsSpy,
          },
        },
        {
          provide: FrModalService,
          useValue: {
            open: modalOpenSpy,
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the dashboard', () => {
    const fixture = TestBed.createComponent(ReleaseQueue);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render summary cards and release table data from the api service', () => {
    const fixture = TestBed.createComponent(ReleaseQueue);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Release queue');
    expect(compiled.textContent).toContain('Checkout Refactor');
    expect(compiled.textContent).toContain('checkout-api');
    expect(compiled.textContent).toContain('Search Service');
    expect(compiled.textContent).toContain('Blocked');
    expect(compiled.textContent).toContain('Showing 1-10 of 18 releases');
    expect(getDashboardSpy).toHaveBeenCalledWith(1, 10);
    expect(releaseDetailsSpy).toHaveBeenCalledWith('rel-1001');
  });

  it('should render the screenshot table columns', () => {
    const fixture = TestBed.createComponent(ReleaseQueue);
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
      imports: [ReleaseQueue],
      providers: [
        provideIcons({
          tablerArrowDown,
          tablerArrowUp,
          tablerBell,
          tablerCalendar,
          tablerDots,
          tablerEdit,
          tablerExclamationCircle,
          tablerExternalLink,
          tablerFilter,
          tablerHeartbeat,
          tablerLayersIntersect,
          tablerPackages,
          tablerRefresh,
          tablerRocket,
          tablerSearch,
          tablerTrash,
        }),
        {
          provide: ApiService,
          useValue: {
            getDashboard: () => of(dashboardDataWithLegacyRelease),
            releaseDetails: () => of(releaseDetails),
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ReleaseQueue);

    expect(() => fixture.detectChanges()).not.toThrow();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Legacy Release');
  });

  it('should load release details into the review sidebar', () => {
    const fixture = TestBed.createComponent(ReleaseQueue);
    fixture.detectChanges();

    expect(releaseDetailsSpy).toHaveBeenCalledWith('rel-1001');

    fixture.componentInstance.openReleaseDetails(dashboardData.releases[0]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Review');
    expect(compiled.textContent).toContain('Taylor Kim');
    expect(compiled.textContent).toContain('Change summary');
    expect(compiled.textContent).toContain('Jordan Lee');
  });

  it('should request another release page when pagination changes', () => {
    const fixture = TestBed.createComponent(ReleaseQueue);
    fixture.detectChanges();

    fixture.componentInstance.goToPage(2);
    fixture.detectChanges();

    expect(getDashboardSpy).toHaveBeenCalledWith(1, 10);
    expect(getDashboardSpy).toHaveBeenCalledWith(2, 10);
  });

  it('should open the edit release modal with release data without refreshing on save', () => {
    modalOpenSpy.mockReturnValueOnce({ closed: of('saved') });
    const fixture = TestBed.createComponent(ReleaseQueue);
    fixture.detectChanges();
    getDashboardSpy.mockClear();

    fixture.componentInstance.openEditRelease(dashboardData.releases[0]);

    expect(modalOpenSpy).toHaveBeenCalledWith(
      EditReleaseModalComponent,
      { release: dashboardData.releases[0] },
      {
        ariaLabel: 'Edit Checkout Refactor',
        width: 'min(42rem, calc(100vw - 2rem))',
      },
    );
    expect(getDashboardSpy).not.toHaveBeenCalled();
  });
});
