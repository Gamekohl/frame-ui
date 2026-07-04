import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ChartExamplesComponent } from '../chart-examples.component';

@Component({
  selector: 'docs-bar-chart-page',
  imports: [ChartExamplesComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<docs-chart-examples category="bar" />`,
})
export class BarChartPageComponent {}
