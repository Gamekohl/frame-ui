import { ComponentDoc } from '../models/component-doc.model';
import { DocsTocItem } from '../components/docs-toc/docs-toc.types';

export function createComponentDocToc(doc: ComponentDoc): DocsTocItem[] {
  const toc: DocsTocItem[] = [];

  /*if (doc.installation) {
    toc.push({
      id: 'installation',
      title: 'Installation',
    });
  }*/

  if (doc.usage?.length) {
    toc.push({
      id: 'usage',
      title: 'Usage',
    });
  }

  /*if (doc.composition) {
    toc.push({
      id: 'composition',
      title: 'Composition',
    });
  }*/

  if (doc.examples?.length) {
    toc.push({
      id: 'examples',
      title: 'Examples',
      children: doc.examples.map((example) => ({
        id: `example-${example.id}`,
        title: example.title,
        level: 2,
      })),
    });
  }

  if (doc.styling) {
    toc.push({
      id: 'styling',
      title: 'Custom Styling',
    });
  }

  if (doc.tokenInspector) {
    toc.push({
      id: 'token-inspector',
      title: 'Token Inspector',
    });
  }

  if (doc?.tokensTitle || doc.tokens?.length) {
    toc.push({
      id: 'tokens',
      title: doc.tokensTitle ?? 'Tokens',
    });
  }

  return toc;
}
