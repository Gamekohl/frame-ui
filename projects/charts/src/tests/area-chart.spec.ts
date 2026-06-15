import { TestBed } from '@angular/core/testing';

import { AreaChartHost } from './chart-test-hosts';

describe('FrChart area chart', () => {
  it('renders series paths and legend items', () => {
    const fixture = TestBed.createComponent(AreaChartHost);
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector('frame-chart') as HTMLElement;
    const paths = fixture.nativeElement.querySelectorAll('.frame-chart__line');
    const legend = fixture.nativeElement.querySelector('.frame-chart__legend') as HTMLElement;

    expect(host.getAttribute('data-type')).toBe('area');
    expect(paths.length).toBe(2);
    expect(legend.textContent).toContain('Desktop');
    expect(legend.textContent).toContain('Mobile');
  });
});
