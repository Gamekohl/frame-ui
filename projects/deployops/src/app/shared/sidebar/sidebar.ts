import { Component, input, output } from '@angular/core';
import { FrIconButton } from '@frame-ui-ng/components';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerX } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-sidebar',
  imports: [FrIconButton, NgIcon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  viewProviders: [provideIcons({ tablerX })],
})
export class Sidebar {
  title = input.required<string>();

  close = output<void>();
}
