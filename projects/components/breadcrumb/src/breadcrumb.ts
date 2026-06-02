import { Component, Directive, input } from '@angular/core';

@Directive({
  selector: 'nav[frBreadcrumb], [frBreadcrumb]',
  host: {
    class: 'frame-breadcrumb',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class FrBreadcrumb {
  readonly ariaLabel = input('breadcrumb', { alias: 'aria-label' });
}

@Directive({
  selector: 'ol[frBreadcrumbList], ul[frBreadcrumbList], [frBreadcrumbList]',
  host: {
    class: 'frame-breadcrumb__list',
  },
})
export class FrBreadcrumbList {}

@Directive({
  selector: 'li[frBreadcrumbItem], [frBreadcrumbItem]',
  host: {
    class: 'frame-breadcrumb__item',
  },
})
export class FrBreadcrumbItem {}

@Directive({
  selector: 'a[frBreadcrumbLink], [frBreadcrumbLink]',
  host: {
    class: 'frame-breadcrumb__link',
  },
})
export class FrBreadcrumbLink {}

@Directive({
  selector: '[frBreadcrumbPage]',
  host: {
    class: 'frame-breadcrumb__page',
    'aria-current': 'page',
  },
})
export class FrBreadcrumbPage {}

@Directive({
  selector: '[frBreadcrumbSeparator]',
  host: {
    class: 'frame-breadcrumb__separator',
    'aria-hidden': 'true',
    'role': 'presentation',
  },
})
export class FrBreadcrumbSeparator {}

@Component({
  selector: '[frBreadcrumbEllipsis], frame-breadcrumb-ellipsis',
  host: {
    class: 'frame-breadcrumb__ellipsis',
    'role': 'presentation',
  },
  template: `
    <span aria-hidden="true">...</span>
    <span class="frame-breadcrumb__sr-only">{{ label() }}</span>
  `,
})
export class FrBreadcrumbEllipsis {
  readonly label = input('More pages');
}
