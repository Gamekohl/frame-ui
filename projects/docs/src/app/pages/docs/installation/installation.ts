import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FrButton } from '@frame-ui/components';

import { DocsCodeBlockComponent } from '../shared/components/docs-code-block/docs-code-block';
import { DocsTocComponent } from '../shared/components/docs-toc/docs-toc';
import { DocsTocItem } from '../shared/components/docs-toc/docs-toc.types';

@Component({
  selector: 'app-installation',
  imports: [DocsCodeBlockComponent, DocsTocComponent, RouterLink, FrButton],
  templateUrl: './installation.html',
  styleUrl: './installation.scss',
})
export class Installation {
  protected readonly toc: DocsTocItem[] = [
    { id: 'packages', title: 'Install packages' },
    { id: 'styles', title: 'Add styles' },
    { id: 'imports', title: 'Import primitives' },
    { id: 'forms-and-icons', title: 'Forms and icons' },
    { id: 'what-next', title: 'What next' },
  ];

  protected readonly installCode = `npm install @frame-ui/components @frame-ui/foundation`;

  protected readonly stylesCode = `/* styles.css */
@import '@frame-ui/foundation/styles.css';
@import '@frame-ui/components/styles.css';`;

  readonly codeImportSnippet = `import { FrSidebarModule } from '@frame-ui/components/sidebar';`;

  readonly codePrimitiveImportSnippet = `import { FrSidebar, FrSidebarContent, FrSidebarHeader } from '@frame-ui/components/sidebar';`;
}
