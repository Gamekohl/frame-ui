import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ChartExamplesComponent } from '../chart-examples.component';

@Component({
  selector: 'docs-composed-chart-page',
  imports: [ChartExamplesComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<docs-chart-examples category="composed" />`,
})
export class ComposedChartPageComponent {}
