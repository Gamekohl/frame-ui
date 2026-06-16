import { Component } from '@angular/core';
import {
  FrCard,
  FrCardContent,
  FrCardHeader,
  FrCardTitle,
} from '@frame-ui-ng/components';

import changelog010 from './entries/0.1.0-beta.0.json';
import changelog020 from './entries/0.2.0-beta.0.json';
import changelog030 from './entries/0.3.0-beta.0.json';
import changelog040 from './entries/0.4.0-beta.0.json';

type ChangelogSection = {
  readonly title: string;
  readonly items: readonly string[];
};

type ChangelogEntry = {
  readonly version: string;
  readonly label: string;
  readonly status: 'Released' | 'Next';
  readonly sections: readonly ChangelogSection[];
};

@Component({
  selector: 'app-changelog',
  imports: [FrCard, FrCardContent, FrCardHeader, FrCardTitle],
  templateUrl: './changelog.html',
})
export class Changelog {
  protected readonly entries: readonly ChangelogEntry[] = [
    changelog040 as ChangelogEntry,
    changelog030 as ChangelogEntry,
    changelog020 as ChangelogEntry,
    changelog010 as ChangelogEntry,
  ];
}
