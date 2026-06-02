import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./docs').then((m) => m.DocsComponent),
    children: [
      {
        path: 'overview',
        loadComponent: () => import('./overview/overview').then((m) => m.Overview),
      },
      {
        path: 'installation',
        loadComponent: () => import('./installation/installation').then((m) => m.Installation),
      },
      {
        path: 'theming',
        loadComponent: () => import('./theming/theming').then((m) => m.Theming),
      },
      {
        path: 'components',
        loadComponent: () => import('./all-components/all-components').then((m) => m.AllComponents),
      },
      {
        path: 'theme-tokens',
        loadComponent: () => import('./theme-tokens/theme-tokens').then((m) => m.ThemeTokens),
      },
      {
        path: 'mcp',
        loadComponent: () => import('./mcp/mcp').then((m) => m.McpPage),
      },
      {
        path: 'roadmap',
        loadComponent: () => import('./roadmap/roadmap').then((m) => m.Roadmap),
      },
      /*{
        path: 'ai-composer',
        loadComponent: () => import('./ai-composer/ai-composer').then((m) => m.AiComposer),
      },*/
      {
        path: 'components/accordion',
        loadComponent: () =>
          import('./components/accordion/accordion.page').then((m) => m.AccordionPageComponent),
      },
      {
        path: 'components/alert',
        loadComponent: () => import('./components/alert/alert.page').then((m) => m.AlertPageComponent),
      },
      {
        path: 'components/avatar',
        loadComponent: () => import('./components/avatar/avatar.page').then((m) => m.AvatarPageComponent),
      },
      {
        path: 'components/badge',
        loadComponent: () => import('./components/badge/badge.page').then((m) => m.BadgePageComponent),
      },
      {
        path: 'components/button',
        loadComponent: () => import('./components/button/button.page').then((m) => m.ButtonPageComponent),
      },
      {
        path: 'components/button-group',
        loadComponent: () =>
          import('./components/button-group/button-group.page').then((m) => m.ButtonGroupPageComponent),
      },
      {
        path: 'components/breadcrumb',
        loadComponent: () =>
          import('./components/breadcrumb/breadcrumb.page').then((m) => m.BreadcrumbPageComponent),
      },
      {
        path: 'components/calendar',
        loadComponent: () =>
          import('./components/calendar/calendar.page').then((m) => m.CalendarPageComponent),
      },
      {
        path: 'components/card',
        loadComponent: () => import('./components/card/card.page').then((m) => m.CardPageComponent),
      },
      {
        path: 'components/carousel',
        loadComponent: () =>
          import('./components/carousel/carousel.page').then((m) => m.CarouselPageComponent),
      },
      {
        path: 'components/checkbox',
        loadComponent: () => import('./components/checkbox/checkbox.page').then((m) => m.CheckboxPageComponent),
      },
      {
        path: 'components/collapsible',
        loadComponent: () =>
          import('./components/collapsible/collapsible.page').then(
            (m) => m.CollapsiblePageComponent,
          ),
      },
      {
        path: 'components/command',
        loadComponent: () =>
          import('./components/command/command.page').then((m) => m.CommandPageComponent),
      },
      {
        path: 'components/combobox',
        loadComponent: () => import('./components/combobox/combobox.page').then((m) => m.ComboboxPageComponent),
      },
      {
        path: 'components/context-menu',
        loadComponent: () =>
          import('./components/context-menu/context-menu.page').then(
            (m) => m.ContextMenuPageComponent,
          ),
      },
      {
        path: 'components/date-picker',
        loadComponent: () =>
          import('./components/date-picker/date-picker.page').then(
            (m) => m.DatePickerPageComponent,
          ),
      },
      {
        path: 'components/dropdown-menu',
        loadComponent: () =>
          import('./components/dropdown-menu/dropdown-menu.page').then((m) => m.DropdownMenuPageComponent),
      },
      {
        path: 'components/empty',
        loadComponent: () => import('./components/empty/empty.page').then((m) => m.EmptyPageComponent),
      },
      {
        path: 'components/hover-card',
        loadComponent: () => import('./components/hover-card/hover-card.page').then((m) => m.HoverCardPageComponent),
      },
      {
        path: 'components/field',
        loadComponent: () => import('./components/field/field.page').then((m) => m.FieldPageComponent),
      },
      {
        path: 'components/input',
        loadComponent: () => import('./components/input/input.page').then((m) => m.InputPageComponent),
      },
      {
        path: 'components/input-otp',
        loadComponent: () =>
          import('./components/input-otp/input-otp.page').then((m) => m.InputOtpPageComponent),
      },
      {
        path: 'components/item',
        loadComponent: () => import('./components/item/item.page').then((m) => m.ItemPageComponent),
      },
      {
        path: 'components/menubar',
        loadComponent: () =>
          import('./components/menubar/menubar.page').then((m) => m.MenubarPageComponent),
      },
      {
        path: 'components/navigation-menu',
        loadComponent: () =>
          import('./components/navigation-menu/navigation-menu.page').then(
            (m) => m.NavigationMenuPageComponent,
          ),
      },
      {
        path: 'components/pagination',
        loadComponent: () =>
          import('./components/pagination/pagination.page').then(
            (m) => m.PaginationPageComponent,
          ),
      },
      {
        path: 'components/popover',
        loadComponent: () =>
          import('./components/popover/popover.page').then((m) => m.PopoverPageComponent),
      },
      {
        path: 'components/progress',
        loadComponent: () =>
          import('./components/progress/progress.page').then((m) => m.ProgressPageComponent),
      },
      {
        path: 'components/radio-group',
        loadComponent: () =>
          import('./components/radio-group/radio-group.page').then((m) => m.RadioGroupPageComponent),
      },
      {
        path: 'components/resizable',
        loadComponent: () =>
          import('./components/resizable/resizable.page').then((m) => m.ResizablePageComponent),
      },
      {
        path: 'components/separator',
        loadComponent: () =>
          import('./components/separator/separator.page').then((m) => m.SeparatorPageComponent),
      },
      {
        path: 'components/sheet',
        loadComponent: () => import('./components/sheet/sheet.page').then((m) => m.SheetPageComponent),
      },
      {
        path: 'components/sidebar',
        loadComponent: () => import('./components/sidebar/sidebar.page').then((m) => m.SidebarPageComponent),
      },
      {
        path: 'components/skeleton',
        loadComponent: () =>
          import('./components/skeleton/skeleton.page').then((m) => m.SkeletonPageComponent),
      },
      {
        path: 'components/spinner',
        loadComponent: () =>
          import('./components/spinner/spinner.page').then((m) => m.SpinnerPageComponent),
      },
      {
        path: 'components/slider',
        loadComponent: () => import('./components/slider/slider.page').then((m) => m.SliderPageComponent),
      },
      {
        path: 'components/modal',
        loadComponent: () => import('./components/modal/modal.page').then((m) => m.ModalPageComponent),
      },
      {
        path: 'components/select',
        loadComponent: () => import('./components/select/select.page').then((m) => m.SelectPageComponent),
      },
      {
        path: 'components/switch',
        loadComponent: () => import('./components/switch/switch.page').then((m) => m.SwitchPageComponent),
      },
      {
        path: 'components/table',
        loadComponent: () => import('./components/table/table.page').then((m) => m.TablePageComponent),
      },
      {
        path: 'components/tabs',
        loadComponent: () => import('./components/tabs/tabs.page').then((m) => m.TabsPageComponent),
      },
      {
        path: 'components/textarea',
        loadComponent: () =>
          import('./components/textarea/textarea.page').then((m) => m.TextareaPageComponent),
      },
      {
        path: 'components/toggle',
        loadComponent: () => import('./components/toggle/toggle.page').then((m) => m.TogglePageComponent),
      },
      {
        path: 'components/tooltip',
        loadComponent: () =>
          import('./components/tooltip/tooltip.page').then((m) => m.TooltipPageComponent),
      },
      {
        path: 'components/toast',
        loadComponent: () => import('./components/toast/toast.page').then((m) => m.ToastPageComponent),
      },
      {
        path: 'components/virtual-scroll',
        loadComponent: () =>
          import('./components/virtual-scroll/virtual-scroll.page').then(
            (m) => m.VirtualScrollPageComponent,
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./overview/overview').then((m) => m.Overview),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'overview',
  },
] satisfies Routes;
