import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FrButton } from '@frame-ui-ng/components';
import { FrModalModule, FR_MODAL_DATA } from '@frame-ui-ng/components/modal';
import { FrTabsModule } from '@frame-ui-ng/components/tabs';

import { DocsCodeBlockComponent } from '../../pages/docs/shared/components/docs-code-block/docs-code-block';

export type DocsAppearanceExportModalData = {
  readonly cssCode: string;
  readonly tsCode: string;
};

@Component({
  selector: 'app-docs-appearance-export-modal',
  imports: [FrButton, FrModalModule, FrTabsModule, DocsCodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div frModalPanel size="lg" scrollable stickyFooter>
      <div frModalHeader>
        <h2 frModalTitle>Export</h2>
        <p frModalDescription>CSS variables and provider config for the current preview settings.</p>
      </div>

      <div frModalBody>
        <div frTabs defaultValue="css" class="grid gap-3">
          <div frTabsList variant="line">
            <button frTabsTrigger value="css">CSS</button>
            <button frTabsTrigger value="ts">TS</button>
          </div>

          <div frTabsContent value="css">
            <docs-code-block
              title="styles.css"
              language="css"
              [code]="data.cssCode"
              rounded
            />
          </div>

          <div frTabsContent value="ts">
            <docs-code-block
              title="app.config.ts"
              language="ts"
              [code]="data.tsCode"
              rounded
            />
          </div>
        </div>
      </div>

      <div frModalFooter>
        <button frButton type="button" frModalClose>Done</button>
      </div>
    </div>
  `,
})
export class DocsAppearanceExportModalComponent {
  readonly data = inject<DocsAppearanceExportModalData>(FR_MODAL_DATA);
}
