import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FrAlert,
  FrAlertDescription,
  FrAlertIcon,
  FrAlertTitle,
  FrButton,
  FrButtonIcon,
  FrButtonLabel,
} from '@frame-ui-ng/components';
import { ThemeService } from '@frame-ui-ng/foundation';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerArrowRight,
  tablerInfoCircle,
} from '@ng-icons/tabler-icons';

@Component({
  host: {
    class: 'overflow-x-hidden relative',
  },
  selector: 'app-introduction',
  imports: [
    FrAlert,
    FrAlertDescription,
    FrAlertIcon,
    FrAlertTitle,
    FrButton,
    FrButtonIcon,
    FrButtonLabel,
    NgIcon,
    RouterLink,
  ],
  templateUrl: './introduction.html',
  styleUrl: './introduction.css',
  viewProviders: [
    provideIcons({
      tablerArrowRight,
      tablerInfoCircle,
    }),
  ],
})
export class IntroductionComponent {
  readonly themeService = inject(ThemeService);
}
