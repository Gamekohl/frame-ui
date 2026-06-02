import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocsHeaderComponent } from './shared/docs-header/docs-header.component';
import { SeoService } from './shared/seo/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DocsHeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly platform = inject(PLATFORM_ID);
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.init();

    if (!isPlatformBrowser(this.platform))
      return;

    const theme = localStorage.getItem('theme');

    if (theme && theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }
}
