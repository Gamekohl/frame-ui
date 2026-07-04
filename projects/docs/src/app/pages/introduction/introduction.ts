import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FrButton,
  FrButtonIcon,
  FrButtonLabel,
  FrCornerHandles,
} from '@frame-ui-ng/components';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerArrowRight,
  tablerChartAreaLine,
  tablerInfoCircle,
} from '@ng-icons/tabler-icons';

@Component({
  host: {
    class: 'overflow-x-hidden relative',
  },
  selector: 'app-introduction',
  imports: [FrButton, FrButtonIcon, FrButtonLabel, NgIcon, RouterLink, FrCornerHandles],
  templateUrl: './introduction.html',
  styleUrl: './introduction.css',
  viewProviders: [
    provideIcons({
      tablerArrowRight,
      tablerChartAreaLine,
      tablerInfoCircle,
    }),
  ],
})
export class IntroductionComponent {}
