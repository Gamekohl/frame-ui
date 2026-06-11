import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FrButton, FrButtonIcon, FrButtonLabel } from '@frame-ui-ng/components';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerArrowRight,
  tablerBarrierBlock,
  tablerCheck,
  tablerHeartHandshake,
  tablerLayersIntersect,
  tablerPalette,
  tablerRocket,
  tablerTools,
  tablerTopologyComplex,
  tablerUsersGroup,
  tablerX,
} from '@ng-icons/tabler-icons';

interface IntroPillar {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

interface IntroStatus {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

@Component({
  selector: 'app-overview',
  imports: [FrButton, FrButtonIcon, FrButtonLabel, NgIcon, RouterLink],
  templateUrl: './overview.html',
  viewProviders: [
    provideIcons({
      tablerArrowRight,
      tablerHeartHandshake,
      tablerLayersIntersect,
      tablerPalette,
      tablerRocket,
      tablerTopologyComplex,
      tablerTools,
      tablerBarrierBlock,
      tablerUsersGroup,
      tablerCheck,
      tablerX,
    }),
  ],
})
export class Overview {
  protected readonly pillars: IntroPillar[] = [
    {
      title: 'Angular component library',
      description:
        'A dedicated UI component library for Angular teams, designed to support real product interfaces instead of isolated visual demos.',
      icon: 'tablerLayersIntersect',
    },
    {
      title: 'Composable primitives',
      description:
        'The API favors small, focused building blocks that compose into real Angular product interfaces.',
      icon: 'tablerTopologyComplex',
    },
    {
      title: 'Built for modern Angular',
      description:
        'The foundation targets current Angular practices and is aligned with Angular 21+ era tooling, patterns, and ergonomics.',
      icon: 'tablerRocket',
    },
    {
      title: 'CSS variables first',
      description:
        'Design tokens and custom properties are the primary styling contract, making theming and scoped overrides straightforward.',
      icon: 'tablerPalette',
    },
    {
      title: 'Highly customizable',
      description:
        'Consumers can adapt visual language and local component behavior through overrides without reworking the whole library.',
      icon: 'tablerTools',
    },
    {
      title: 'Angular CDK integration',
      description:
        'Where interaction complexity matters, the library builds on Angular CDK for accessibility, overlays, keyboard support, and structure.',
      icon: 'tablerTopologyComplex',
    },
  ];

  protected readonly whatItIs = [
    'An Angular component library for building product UI from composable primitives and reusable patterns.',
    'A token-first styling foundation that makes theming and scoped component overrides practical.',
    'A growing component set designed around modern Angular and Angular CDK-powered interaction behavior.',
  ];

  protected readonly whatItIsNot = [
    'Not an all-in-one CSS framework. It is meant to complement tools like Tailwind CSS or Bootstrap rather than replace them.',
    'Not a complete FrameUI out of the box. Teams still bring their own brand, content, and product-specific guidance.',
  ];

  protected readonly status: IntroStatus[] = [
    {
      icon: 'tablerBarrierBlock',
      title: 'Work in progress',
      description:
        'The library is already useful, but it is still actively evolving. APIs, polish, and documentation will continue to improve.',
    },
    {
      icon: 'tablerUsersGroup',
      title: 'Help appreciated',
      description:
        'Feedback, bug reports, accessibility review, implementation suggestions, and contributions are all welcome.',
    },
  ];
}
