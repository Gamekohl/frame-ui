import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsTextareaPreviewComponent, TextareaPreviewConfig } from './previews/textarea-preview';

const importsCode = `import { FrFieldModule } from '@frame-ui/components/field';
import { FrTextareaModule } from '@frame-ui/components/textarea';`;
const formImportsCode = `import { FormControl, ReactiveFormsModule } from '@angular/forms';
${importsCode}`;
const stylingImportsCode = `${importsCode}
import { FrInputModule } from '@frame-ui/components/input';`;

const heroConfig: TextareaPreviewConfig = {
  items: [
    {
      id: 'hero-summary',
      label: 'Release summary',
      description: 'Use textarea inputs when the content should stay multi-line and editable in place.',
      badge: 'Draft',
      initialValue:
        'Northwind now supports shared rollout planning, reusable release notes, and guided setup for workspace theming.',
      icon: 'tablerFileDescription',
    },
  ],
};

const basicConfig: TextareaPreviewConfig = {
  items: [
    {
      id: 'basic-notes',
      label: 'Team notes',
      description: 'Capture longer internal context without forcing the content into a single-line input.',
      initialValue: 'Share the migration checklist with support before the staged rollout begins.',
      icon: 'tablerNotebook',
    },
  ],
};

const invalidConfig: TextareaPreviewConfig = {
  items: [
    {
      id: 'invalid-message',
      label: 'Announcement message',
      description: 'Delete the value to see the reactive invalid state update from Angular forms.',
      error: 'A message is required before sending the announcement.',
      initialValue: 'The release is scheduled for Tuesday at 10:00 CET.',
      placeholder: 'Write the message your users will see',
      reactiveInvalidDemo: true,
      icon: 'tablerMessage2',
    },
  ],
};

const stateConfig: TextareaPreviewConfig = {
  items: [
    {
      id: 'readonly-brief',
      label: 'Readonly launch brief',
      description: 'Readonly textareas preserve scrollable content while preventing edits in this context.',
      initialValue:
        'FrameUI release brief: finalize the theming guide, confirm token coverage, and publish the migration notes.',
      readonly: true,
      icon: 'tablerFileDescription',
    },
    {
      id: 'disabled-notifications',
      label: 'Disabled incident response note',
      description: 'Disable the textarea when the content is managed somewhere else or blocked by policy.',
      initialValue: 'This field is locked until the compliance review is complete.',
      disabled: true,
      icon: 'tablerLock',
    },
  ],
};

const inspectorConfig: TextareaPreviewConfig = {
  items: [
    {
      id: 'inspector-textarea',
      label: 'Workspace welcome message',
      description: 'Inspect the field wrapper, label, badge, textarea surface, helper text, and error messaging.',
      error: 'A welcome message is required.',
      initialValue: 'Welcome to Northwind. Start by reviewing the release checklist and selecting your rollout surface.',
      badge: 'Live',
      reactiveInvalidDemo: true,
      icon: 'tablerStars',
      tokenPrefix: 'textarea',
    },
  ],
};

const customStylingConfig: TextareaPreviewConfig = {
  style: `--frame-textarea-root-min-height: 8rem;
--frame-textarea-root-radius: 1rem;
--frame-textarea-root-border: color-mix(in srgb, var(--frame-primary) 24%, var(--frame-border));
--frame-textarea-root-focus-border: color-mix(in srgb, var(--frame-primary) 60%, var(--frame-border));
--frame-textarea-root-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-primary) 18%, transparent);
--frame-textarea-root-padding-block: 0.875rem;
--frame-textarea-root-resize: none;
--frame-field-description-color: color-mix(in srgb, var(--frame-primary) 28%, var(--frame-muted-foreground));`,
  items: [
    {
      id: 'custom-textarea',
      label: 'Internal release memo',
      description: 'This preview applies local height, radius, focus-ring, padding, and helper-text overrides.',
      initialValue:
        'Coordinate docs publishing, notify support, and confirm the design tokens are synced before launch.',
      badge: 'Team',
      icon: 'tablerBell',
    },
  ],
};

export const TEXTAREA_DOC: ComponentDoc = {
  slug: 'textarea',
  breadcrumb: 'Components / Textarea',

  hero: {
    id: 'textarea-hero',
    title: 'Preview',
    preview: {
      component: DocsTextareaPreviewComponent,
      inputs: {
        config: heroConfig,
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add textarea',
    },
    manual: {
      steps: [
        {
          title: 'Import the textarea primitive along with the surrounding field helpers you want to compose it with.',
          code: {
            language: 'ts',
            code: importsCode,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: `import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FrFieldModule } from '@frame-ui/components/field';
import { FrTextareaModule } from '@frame-ui/components/textarea';

summaryControl = new FormControl(
  'Northwind now supports shared rollout planning and reusable release notes.',
  { nonNullable: true },
);`,
    },
    {
      language: 'html',
      code: `<div frField>
  <label frFieldLabel for="release-summary">Release summary</label>

  <div frFieldContent>
    <textarea
      frTextarea
      id="release-summary"
      rows="4"
      [formControl]="summaryControl"
    ></textarea>

    <p frFieldDescription>
      Use textarea inputs when the content should stay multi-line and editable in place.
    </p>
  </div>
</div>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the field wrapper, label, badge, textarea surface, description, or error text to inspect the tokens that shape the multi-line control and its supporting layout.',
    preview: {
      component: DocsTextareaPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: inspectorConfig,
      },
      inspectorTargets: [
        {
          id: 'field',
          label: 'Field wrapper',
          selector: '[data-token-target="textarea-field"]',
          description: 'The field wrapper distributes the spacing and invalid-state inheritance around the textarea.',
          tokens: ['--frame-field-gap', '--frame-field-content-gap', '--frame-field-error-color'],
        },
        {
          id: 'label',
          label: 'Label',
          selector: '[data-token-target="textarea-label"]',
          description: 'Labels keep the primary type scale and inherit the field error color when validation fails.',
          tokens: [
            '--frame-field-label-font-size',
            '--frame-field-label-font-weight',
            '--frame-field-label-color',
            '--frame-field-error-color',
          ],
        },
        {
          id: 'badge',
          label: 'Badge',
          selector: '[data-token-target="textarea-badge"]',
          description: 'Badges can annotate status or rollout phase without introducing a separate annotation system.',
          tokens: [
            '--frame-input-badge-height',
            '--frame-input-badge-padding-inline',
            '--frame-input-badge-radius',
            '--frame-input-badge-border',
            '--frame-input-badge-bg',
            '--frame-input-badge-color',
          ],
        },
        {
          id: 'content',
          label: 'Content stack',
          selector: '[data-token-target="textarea-content"]',
          description: 'The content stack spaces the textarea, helper text, and validation message consistently.',
          tokens: ['--frame-field-content-gap', '--frame-field-gap'],
        },
        {
          id: 'control',
          label: 'Textarea surface',
          selector: '[data-token-target="textarea-control"]',
          description: 'Textarea tokens define minimum height, padding, radius, focus ring, invalid border, and resize behavior.',
          tokens: [
            '--frame-textarea-root-min-height',
            '--frame-textarea-root-radius',
            '--frame-textarea-root-bg',
            '--frame-textarea-root-color',
            '--frame-textarea-root-border',
            '--frame-textarea-root-font-size',
            '--frame-textarea-root-padding-block',
            '--frame-textarea-root-padding-inline',
            '--frame-textarea-root-placeholder-color',
            '--frame-textarea-root-hover-border',
            '--frame-textarea-root-focus-border',
            '--frame-textarea-root-focus-shadow',
            '--frame-textarea-root-invalid-border',
            '--frame-textarea-root-invalid-shadow',
            '--frame-textarea-root-disabled-opacity',
            '--frame-textarea-root-readonly-bg',
            '--frame-textarea-root-resize',
          ],
        },
        {
          id: 'description',
          label: 'Description text',
          selector: '[data-token-target="textarea-description"]',
          description: 'Descriptions use a quieter type scale so they support the input without overpowering it.',
          tokens: ['--frame-field-description-color', '--frame-field-description-font-size'],
        },
        {
          id: 'error',
          label: 'Error text',
          selector: '[data-token-target="textarea-error"]',
          description: 'Error tokens define the validation color and supporting type scale below the textarea.',
          tokens: ['--frame-field-error-color', '--frame-field-error-font-size'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override textarea tokens on a local wrapper when a form section needs a taller writing surface, different resize behavior, or a more branded focus treatment without changing the composition.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview applies local overrides to the textarea height, radius, focus ring, padding, and helper-text tone.',
      preview: {
        component: DocsTextareaPreviewComponent,
        inputs: {
          config: customStylingConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: stylingImportsCode,
        },
        {
          language: 'html',
          code: `<div class="release-memo-textarea">
  <div frField>
    <div frInputHeader>
      <label frFieldLabel for="internal-memo">Internal release memo</label>
      <span frInputBadge>Team</span>
    </div>

    <div frFieldContent>
      <textarea frTextarea id="internal-memo" rows="5"></textarea>
      <p frFieldDescription>
        This preview applies local height, radius, focus-ring, padding, and helper-text overrides.
      </p>
    </div>
  </div>
</div>`,
        },
        {
          language: 'css',
          code: `.release-memo-textarea {
${customStylingConfig.style}
}`,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic textarea',
      description:
        'Use a textarea when the content is multi-line by nature and people should be able to review or edit it directly in the form.',
      preview: {
        component: DocsTextareaPreviewComponent,
        inputs: {
          config: basicConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `${formImportsCode}

notesControl = new FormControl(
  'Share the migration checklist with support before the staged rollout begins.',
  { nonNullable: true },
);`,
        },
        {
          language: 'html',
          code: `<div frField>
  <label frFieldLabel for="team-notes">Team notes</label>

  <div frFieldContent>
    <textarea frTextarea id="team-notes" rows="4" [formControl]="notesControl"></textarea>
    <p frFieldDescription>
      Capture longer internal context without forcing the content into a single-line input.
    </p>
  </div>
</div>`,
        },
      ],
    },
    {
      id: 'invalid',
      title: 'Invalid with reactive forms',
      description:
        'Reactive forms can drive the invalid state directly, so the textarea border and validation text stay synchronized with Angular validation.',
      preview: {
        component: DocsTextareaPreviewComponent,
        inputs: {
          config: invalidConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrFieldModule } from '@frame-ui/components/field';
import { FrTextareaModule } from '@frame-ui/components/textarea';

messageControl = new FormControl('The release is scheduled for Tuesday at 10:00 CET.', {
  nonNullable: true,
  validators: [Validators.required],
});`,
        },
        {
          language: 'html',
          code: `<div frField [invalid]="messageControl.invalid && (messageControl.touched || messageControl.dirty)">
  <label frFieldLabel for="announcement-message">Announcement message</label>

  <div frFieldContent>
    <textarea
      frTextarea
      id="announcement-message"
      rows="4"
      [formControl]="messageControl"
    ></textarea>

    <p frFieldDescription>
      Delete the value to see the reactive invalid state update from Angular forms.
    </p>

    @if (messageControl.invalid && (messageControl.touched || messageControl.dirty)) {
      <p frFieldError>A message is required before sending the announcement.</p>
    }
  </div>
</div>`,
        },
      ],
    },
    {
      id: 'states',
      title: 'Readonly and disabled',
      description:
        'Readonly and disabled textareas keep the same multi-line structure while clearly changing whether the content can be edited.',
      preview: {
        component: DocsTextareaPreviewComponent,
        inputs: {
          config: stateConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `${formImportsCode}

readonlyBriefControl = new FormControl(
  'FrameUI release brief: finalize the theming guide, confirm token coverage, and publish the migration notes.',
  { nonNullable: true },
);

disabledNoteControl = new FormControl(
  { value: 'This field is locked until the compliance review is complete.', disabled: true },
  { nonNullable: true },
);`,
        },
        {
          language: 'html',
          code: `<div frField>
  <label frFieldLabel for="readonly-brief">Readonly launch brief</label>
  <div frFieldContent>
    <textarea
      frTextarea
      id="readonly-brief"
      rows="4"
      [formControl]="readonlyBriefControl"
      [readOnly]="true"
    ></textarea>
    <p frFieldDescription>
      Readonly textareas preserve scrollable content while preventing edits in this context.
    </p>
  </div>
</div>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune textarea height, padding, resize behavior, borders, focus treatment, and invalid styling without changing the primitive structure.',
  tokens: `
  --frame-textarea-root-min-height: 5rem;
  --frame-textarea-root-radius: var(--frame-radius-md);
  --frame-textarea-root-bg: var(--frame-surface);
  --frame-textarea-root-color: var(--frame-surface-foreground);
  --frame-textarea-root-border: var(--frame-border);
  --frame-textarea-root-font-size: 0.875rem;
  --frame-textarea-root-padding-block: 0.625rem;
  --frame-textarea-root-padding-inline: 0.875rem;
  --frame-textarea-root-placeholder-color: var(--frame-muted-foreground);
  --frame-textarea-root-hover-border: color-mix(in srgb, var(--frame-border) 80%, var(--frame-foreground));
  --frame-textarea-root-focus-border: color-mix(in srgb, var(--frame-ring) 70%, var(--frame-border));
  --frame-textarea-root-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-ring) 22%, transparent);
  --frame-textarea-root-invalid-border: color-mix(in srgb, var(--frame-destructive) 65%, var(--frame-border));
  --frame-textarea-root-invalid-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-destructive) 14%, transparent);
  --frame-textarea-root-disabled-opacity: 0.55;
  --frame-textarea-root-readonly-bg: color-mix(in srgb, var(--frame-surface) 80%, var(--frame-muted));
  --frame-textarea-root-transition-duration: 150ms;
  --frame-textarea-root-resize: vertical;
  `,
};

