import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FrButton,
  FrButtonIcon,
  FrButtonLabel,
} from '@frame-ui-ng/components';
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
export class IntroductionComponent {}
