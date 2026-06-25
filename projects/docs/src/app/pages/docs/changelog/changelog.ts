import { Component } from '@angular/core';
import {
  FrBadge,
  FrBadgeVariant,
  FrCard,
  FrCardContent,
  FrCardHeader,
  FrCardTitle,
} from '@frame-ui-ng/components';

import { DocsCodeBlockComponent } from '../shared/components/docs-code-block/docs-code-block';
import { DocsCodeLanguage } from '../shared/components/docs-code-block/docs-code-block.types';
import changelog010 from './entries/0.1.0-beta.0.json';
import changelog020 from './entries/0.2.0-beta.0.json';
import changelog030 from './entries/0.3.0-beta.0.json';
import changelog040 from './entries/0.4.0-beta.0.json';
import changelog041 from './entries/0.4.1-beta.0.json';
import changelog042 from './entries/0.4.2-beta.0.json';
import changelog050 from './entries/0.5.0-beta.0.json';

type ChangelogSection = {
  readonly title: string;
  readonly items: readonly string[];
};

type ChangelogChangeKind = 'Added' | 'Changed' | 'Breaking' | 'Fixed';

type ChangelogCodeExample = {
  readonly title: string;
  readonly language: DocsCodeLanguage;
  readonly code: string;
};

type ChangelogComparison = {
  readonly title?: string;
  readonly beforeTitle: string;
  readonly afterTitle: string;
  readonly before: ChangelogCodeExample;
  readonly after: ChangelogCodeExample;
};

type ChangelogHighlight = {
  readonly title: string;
  readonly kind?: ChangelogChangeKind;
  readonly description: string;
  readonly items?: readonly string[];
  readonly code?: ChangelogCodeExample;
  readonly comparison?: ChangelogComparison;
};

type ChangelogEntry = {
  readonly version: string;
  readonly label: string;
  readonly status: 'Released' | 'Next';
  readonly highlights?: readonly ChangelogHighlight[];
  readonly sections: readonly ChangelogSection[];
};

@Component({
  selector: 'app-changelog',
  imports: [DocsCodeBlockComponent, FrBadge, FrCard, FrCardContent, FrCardHeader, FrCardTitle],
  templateUrl: './changelog.html',
})
export class Changelog {
  protected readonly entries: readonly ChangelogEntry[] = [
    changelog050 as ChangelogEntry,
    changelog042 as ChangelogEntry,
    changelog041 as ChangelogEntry,
    changelog040 as ChangelogEntry,
    changelog030 as ChangelogEntry,
    changelog020 as ChangelogEntry,
    changelog010 as ChangelogEntry,
  ];

  protected badgeVariant(kind: string): FrBadgeVariant {
    switch (kind) {
      case 'Added':
        return 'success';
      case 'Breaking':
        return 'destructive';
      case 'Changed':
        return 'secondary';
      default:
        return 'outline';
    }
  }
}
