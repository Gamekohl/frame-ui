import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrAlertModule, FrAlertVariant } from '@frame-ui-ng/components/alert';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerCheck,
  tablerExclamationCircle,
  tablerInfoCircle,
  tablerX
} from '@ng-icons/tabler-icons';

export type AlertPreviewItem = {
  title: string;
  description?: string;
  meta?: string;
  icon?: string;
  variant?: FrAlertVariant;
  className?: string;
};

export type AlertPreviewConfig = {
  className?: string;
  style?: string;
  items: AlertPreviewItem[];
};

@Component({
  selector: 'docs-alert-preview',
  imports: [FrAlertModule, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="config().className ?? 'grid w-full max-w-2xl gap-4'"
      [style]="config().style ?? null"
    >
      @for (item of config().items; track item.title) {
        <section
          frAlert
          [variant]="item.variant ?? 'default'"
          [class]="item.className ?? ''"
          [attr.data-token-target]="'container'"
        >
          @if (item.icon) {
            <ng-icon frAlertIcon [attr.data-token-target]="'icon'" [name]="item.icon" />
          }

          <h3 frAlertTitle [attr.data-token-target]="'title'">{{ item.title }}</h3>

          @if (item.description) {
            <p frAlertDescription [attr.data-token-target]="'description'">
              {{ item.description }}
            </p>
          }

          @if (item.meta) {
            <p class="mt-3 text-sm text-muted-foreground">
              {{ item.meta }}
            </p>
          }
        </section>
      }
    </div>
  `,
  viewProviders: [
    provideIcons({ tablerInfoCircle, tablerCheck, tablerExclamationCircle, tablerX }),
  ],
})
export class DocsAlertPreviewComponent {
  readonly config = input.required<AlertPreviewConfig>();
}

