export const accordionUsageTs = String.raw`import { FrAccordionModule } from '@frame-ui-ng/components/accordion';`;

export const accordionUsageHtml = String.raw`<frame-accordion type="single" collapsible>
  <frame-accordion-item value="item-1">
    <button frameAccordionTrigger type="button">
      <span>Is it accessible?</span>
      <ng-icon frameAccordionIcon name="tablerChevronDown" size="18"></ng-icon>
    </button>

    <ng-template frameAccordionContent>
      Yes. It follows the expected accordion interaction pattern.
    </ng-template>
  </frame-accordion-item>
</frame-accordion>`;

export const accordionBasicCode = String.raw`<frame-accordion type="single" collapsible [defaultValue]="'item-1'">
  <frame-accordion-item value="item-1">
    <button frameAccordionTrigger type="button">
      <span>How do I reset my password?</span>
      <ng-icon frameAccordionIcon name="tablerChevronDown" size="18"></ng-icon>
    </button>

    <ng-template frameAccordionContent>
      Click on "Forgot Password", enter your email, and we will send you a reset link.
    </ng-template>
  </frame-accordion-item>
</frame-accordion>`;

export const accordionMultipleCode = String.raw`<frame-accordion type="multiple" [defaultValue]="['notifications']">
  <frame-accordion-item value="notifications">
    <button frameAccordionTrigger type="button">
      <span>Notification Settings</span>
      <ng-icon frameAccordionIcon name="tablerChevronDown" size="18"></ng-icon>
    </button>

    <ng-template frameAccordionContent>
      Manage how you receive product and account notifications.
    </ng-template>
  </frame-accordion-item>
</frame-accordion>`;

export const accordionDisabledCode = String.raw`<frame-accordion type="single" collapsible>
  <frame-accordion-item value="premium" disabled>
    <button frameAccordionTrigger type="button">
      <span>Premium feature information</span>
      <ng-icon frameAccordionIcon name="tablerChevronDown" size="18"></ng-icon>
    </button>

    <ng-template frameAccordionContent>
      This item is disabled.
    </ng-template>
  </frame-accordion-item>
</frame-accordion>`;
