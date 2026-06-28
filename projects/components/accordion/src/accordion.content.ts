import { Directive, TemplateRef, inject } from '@angular/core';

/** Content template for accordion items. */
@Directive({
  selector: 'ng-template[frameAccordionContent]',
  standalone: true,
})
export class FrAccordionContent {
  readonly templateRef = inject(TemplateRef<unknown>);
}
