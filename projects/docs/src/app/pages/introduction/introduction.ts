import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FrButton,
  FrButtonIcon,
  FrButtonLabel,
} from '@frame-ui-ng/components';
import { ThemeService } from '@frame-ui-ng/foundation';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerArrowRight,
  tablerCheck,
  tablerChevronDown,
  tablerChevronRight,
  tablerCircleCheck,
  tablerDots,
  tablerPalette,
  tablerSettings,
  tablerSparkles,
  tablerUserPlus,
} from '@ng-icons/tabler-icons';
import { Showcase } from './showcase/showcase';

@Component({
  host: {
    class: 'overflow-x-hidden relative',
  },
  selector: 'app-introduction',
  imports: [FrButton, FrButtonIcon, FrButtonLabel, NgIcon, RouterLink, Showcase, NgOptimizedImage],
  templateUrl: './introduction.html',
  viewProviders: [
    provideIcons({
      tablerArrowRight,
      tablerCheck,
      tablerChevronDown,
      tablerChevronRight,
      tablerCircleCheck,
      tablerDots,
      tablerPalette,
      tablerSettings,
      tablerSparkles,
      tablerUserPlus,
    }),
  ],
})
export class IntroductionComponent {
  readonly themeService = inject(ThemeService);
}
