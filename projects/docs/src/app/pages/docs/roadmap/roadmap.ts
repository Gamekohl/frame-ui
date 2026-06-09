import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  FrBadge,
  FrCard,
  FrCardContent,
  FrCardHeader,
  FrCardTitle,
} from '@frame-ui-ng/components';
import { provideIcons } from '@ng-icons/core';
import {
  tablerArrowRight,
  tablerBolt,
  tablerCheck,
  tablerCircleDashed,
  tablerHammer,
  tablerLayersIntersect,
  tablerPalette,
  tablerRocket,
  tablerSparkles,
  tablerTools,
} from '@ng-icons/tabler-icons';

type RoadmapStatus = 'In progress' | 'Planned' | 'Exploring' | 'Indeterminate';

type RoadmapItem = {
  readonly title: string;
  readonly description: string;
  readonly status: RoadmapStatus;
};

type RoadmapGroup = {
  readonly title: string;
  readonly description: string;
  readonly status: RoadmapStatus;
  readonly items: readonly RoadmapItem[];
};

@Component({
  selector: 'app-roadmap',
  imports: [
    NgClass,
    FrBadge,
    FrCard,
    FrCardContent,
    FrCardHeader,
    FrCardTitle,
  ],
  templateUrl: './roadmap.html',
  viewProviders: [
    provideIcons({
      tablerArrowRight,
      tablerBolt,
      tablerCheck,
      tablerCircleDashed,
      tablerHammer,
      tablerLayersIntersect,
      tablerPalette,
      tablerRocket,
      tablerSparkles,
      tablerTools,
    }),
  ],
})
export class Roadmap {
  protected readonly groups: readonly RoadmapGroup[] = [
    {
      title: 'In Progress',
      description: 'Work that is actively being shaped, implemented, or refined.',
      status: 'In progress',
      items: [
        {
          title: 'Charts',
          description:
            'Adding a versatile Charts component to the library',
          status: 'In progress'
        }
      ],
    },
    {
      title: 'Planned',
      description: 'Items that are part of the current direction but not finished yet.',
      status: 'Planned',
      items: [
        {
          title: 'Select Component Advanced Features',
          description:
            'Support for Lazy/Async Loading, Search',
          status: 'Planned'
        },
        {
          title: 'Extend Accessibility',
          description:
            'A focused review of keyboard behavior, labels, roles, focus states, and screen reader output.',
          status: 'Planned'
        },
        {
          title: 'MCP Integration',
          description:
            'A structured way for AI tools to read component APIs, examples, and usage rules.',
          status: 'Planned'
        },
      ],
    },
    {
      title: 'Future',
      description: 'Ideas that need more validation before they become committed work.',
      status: 'Exploring',
      items: [
        {
          title: 'Contributing',
          description:
            'If you\'d like to contribute, hit me up on the official Discord.',
          status: 'Exploring'
        }
      ],
    },
  ];
}
