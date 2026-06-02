import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FrAvatarModule } from '@frame-ui/components/avatar';
import { FrBadgeModule } from '@frame-ui/components/badge';
import { FrButtonModule } from '@frame-ui/components/button';
import { FrCardModule } from '@frame-ui/components/card';
import { FrCheckboxModule } from '@frame-ui/components/checkbox';
import { FrComboboxModule } from '@frame-ui/components/combobox';
import { FrDropdownMenuModule } from '@frame-ui/components/dropdown-menu';
import { FrFieldModule } from '@frame-ui/components/field';
import { FrHoverCardModule } from '@frame-ui/components/hover-card';
import { FrPopoverModule } from '@frame-ui/components/popover';
import { FrProgressModule } from '@frame-ui/components/progress';
import { FrRadioGroupModule } from '@frame-ui/components/radio-group';
import { FrSelectModule } from '@frame-ui/components/select';
import { FrSidebarModule } from '@frame-ui/components/sidebar';
import { FrSliderModule } from '@frame-ui/components/slider';
import { FrSwitchModule } from '@frame-ui/components/switch';
import { FrTooltipModule } from '@frame-ui/components/tooltip';
import { FrSeparator } from '@frame-ui/components/separator';
import { ThemeService } from '@frame-ui/foundation';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerArrowRight,
  tablerBell,
  tablerCheck,
  tablerChevronDown,
  tablerCircleCheck,
  tablerDots,
  tablerFolder,
  tablerHome,
  tablerPalette,
  tablerPin,
  tablerPlus,
  tablerSearch,
  tablerSettings,
  tablerSparkles,
  tablerUser,
  tablerUsers,
  tablerX,
} from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-showcase',
  imports: [
    ReactiveFormsModule,
    FrSidebarModule,
    FrButtonModule,
    FrCardModule,
    FrBadgeModule,
    FrAvatarModule,
    FrCheckboxModule,
    FrProgressModule,
    FrSwitchModule,
    FrDropdownMenuModule,
    FrSelectModule,
    FrComboboxModule,
    FrHoverCardModule,
    FrPopoverModule,
    FrRadioGroupModule,
    FrFieldModule,
    FrSliderModule,
    FrTooltipModule,
    NgIcon,
    FrSeparator,
    NgOptimizedImage,
  ],
  templateUrl: './showcase.html',
  styleUrl: './showcase.css',
  viewProviders: [
    provideIcons({
      tablerArrowRight,
      tablerBell,
      tablerCheck,
      tablerCircleCheck,
      tablerDots,
      tablerFolder,
      tablerHome,
      tablerPalette,
      tablerPlus,
      tablerSearch,
      tablerSettings,
      tablerSparkles,
      tablerUsers,
      tablerUser,
      tablerPin,
      tablerChevronDown,
      tablerX,
    }),
  ],
})
export class Showcase {
  readonly themeService = inject(ThemeService);

  protected readonly navItems = [
    { label: 'Dashboard', href: '#', icon: 'tablerHome', active: true, badge: null, action: false },
    { label: 'Search', href: '#', icon: 'tablerSearch', active: false, badge: null, action: false },
    {
      label: 'Projects',
      href: '#',
      icon: 'tablerFolder',
      active: false,
      badge: '12',
      action: true,
    },
    { label: 'Members', href: '#', icon: 'tablerUsers', active: false, badge: null, action: false },
    { label: 'Alerts', href: '#', icon: 'tablerBell', active: false, badge: '3', action: true },
  ];

  readonly notificationsControl = new FormControl(true, { nonNullable: true });
  readonly frameworkControl = new FormControl<string | null>('angular');
}
