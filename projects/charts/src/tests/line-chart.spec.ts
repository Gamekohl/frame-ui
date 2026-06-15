import { TestBed } from '@angular/core/testing';

import { LineChartNarrowDomainHost } from './chart-test-hosts';

describe('FrChart line chart', () => {
  it('zooms the y domain around narrow value ranges', () => {
    const fixture = TestBed.createComponent(LineChartNarrowDomainHost);
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector('frame-chart') as HTMLElement;
    const yAxis = fixture.nativeElement.querySelector('.frame-chart__axis--y') as SVGElement;
    const line = fixture.nativeElement.querySelector('.frame-chart__line') as SVGPathElement;

    expect(host.getAttribute('data-type')).toBe('line');
    expect(yAxis.textContent).not.toContain('0.00%');
    expect(yAxis.textContent).toContain('99.');
    expect(line.getAttribute('d')).toBeTruthy();
  });
});

