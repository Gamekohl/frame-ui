export const accordionUsageTs = String.raw`import {
  FrAccordionDirective,
  FrAccordionItemDirective,
  FrAccordionTriggerDirective,
  FrAccordionContentDirective,
  FrAccordionIconDirective,
} from '@your-FrameUI/accordion';`;

export const accordionUsageHtml = String.raw`<div frAccordion type="single" collapsible>
  <section frAccordionItem value="item-1">
    <button frAccordionTrigger type="button">
      <span>Is it accessible?</span>
      <ng-icon frAccordionIcon name="tablerChevronDown" size="18" />
    </button>

    <div frAccordionContent>
      Yes. It follows the expected accordion interaction pattern.
    </div>
  </section>
</div>`;

export const accordionBasicCode = String.raw`<div frAccordion type="single" collapsible [defaultValue]="'item-1'">
  <section frAccordionItem value="item-1">
    <button frAccordionTrigger type="button">
      <span>How do I reset my password?</span>
      <ng-icon frAccordionIcon name="tablerChevronDown" size="18" />
    </button>

    <div frAccordionContent>
      Click on "Forgot Password", enter your email, and we will send you a reset link.
    </div>
  </section>
</div>`;

export const accordionMultipleCode = String.raw`<div frAccordion type="multiple" [defaultValue]="['notifications']">
  <section frAccordionItem value="notifications">
    <button frAccordionTrigger type="button">
      <span>Notification Settings</span>
      <ng-icon frAccordionIcon name="tablerChevronDown" size="18" />
    </button>

    <div frAccordionContent>
      Manage how you receive product and account notifications.
    </div>
  </section>
</div>`;

export const accordionDisabledCode = String.raw`<div frAccordion type="single" collapsible>
  <section frAccordionItem value="premium" disabled>
    <button frAccordionTrigger type="button">
      <span>Premium feature information</span>
      <ng-icon frAccordionIcon name="tablerChevronDown" size="18" />
    </button>

    <div frAccordionContent>
      This item is disabled.
    </div>
  </section>
</div>`;

