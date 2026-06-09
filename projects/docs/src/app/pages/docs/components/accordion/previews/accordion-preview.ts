import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrAccordionModule } from '@frame-ui-ng/components/accordion';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerChevronDown } from '@ng-icons/tabler-icons';

export type AccordionPreviewItem = {
  value: string;
  trigger: string;
  content: string;
  disabled?: boolean;
};

export type AccordionPreviewConfig = {
  type: 'single' | 'multiple';
  collapsible?: boolean;
  defaultValue: string | string[];
  border?: boolean;
  className?: string;
  style?: string;
  itemClassName?: string;
  dir?: 'ltr' | 'rtl';
  items: AccordionPreviewItem[];
};

@Component({
  selector: 'docs-accordion-preview',
  imports: [
    NgIconComponent,
    FrAccordionModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      frAccordion
      [attr.dir]="config().dir ?? null"
      [type]="config().type"
      [collapsible]="config().collapsible ?? false"
      [defaultValue]="config().defaultValue"
      [border]="config().border ?? false"
      [class]="config().className ?? 'docs-accordion-preview'"
      [style]="config().style ?? null"
    >
      @for (item of config().items; track item.value) {
        <section
          frAccordionItem
          [value]="item.value"
          [disabled]="item.disabled ?? false"
          [attr.data-token-target]="'item-border'"
          [class]="config().itemClassName ?? ''"
        >
          <button frAccordionTrigger type="button" [attr.data-token-target]="'trigger'">
            <span [attr.data-token-target]="'trigger-label'">{{ item.trigger }}</span>

            <ng-icon
              frAccordionIcon
              name="tablerChevronDown"
              size="18"
              [attr.data-token-target]="'icon'"
            />
          </button>

          <div frAccordionContent [attr.data-token-target]="'content'">
            {{ item.content }}
          </div>
        </section>
      }
    </div>
  `,
  viewProviders: [provideIcons({ tablerChevronDown })],
})
export class DocsAccordionPreviewComponent {
  readonly config = input.required<AccordionPreviewConfig>();
}

