import {
  accordionBasicCode,
  accordionMultipleCode,
  accordionDisabledCode,
} from './accordion.snippets';
import { DocsAccordionPreviewComponent } from './previews/accordion-preview';

export const accordionExamples = [
  {
    id: 'basic',
    title: 'Basic',
    description: 'A simple accordion with one item open by default.',
    preview: {
      component: DocsAccordionPreviewComponent,
      inputs: {
        config: {
          type: 'single',
          collapsible: true,
          defaultValue: 'item-1',
          items: [
            {
              value: 'item-1',
              trigger: 'How do I reset my password?',
              content:
                'Click on "Forgot Password", enter your email, and we will send you a reset link.',
            },
          ],
        },
      },
    },
    code: [
      {
        language: 'html',
        code: accordionBasicCode,
      },
    ],
  },
  {
    id: 'multiple',
    title: 'Multiple',
    description: 'Allows multiple accordion items to stay open.',
    preview: {
      component: DocsAccordionPreviewComponent,
      inputs: {
        config: {
          type: 'multiple',
          defaultValue: ['notifications'],
          items: [
            {
              value: 'notifications',
              trigger: 'Notification Settings',
              content: 'Manage how you receive product and account notifications.',
            },
          ],
        },
      },
    },
    code: [
      {
        language: 'html',
        code: accordionMultipleCode,
      },
    ],
  },
  {
    id: 'disabled',
    title: 'Disabled',
    description: 'Prevents a specific item from being opened.',
    preview: {
      component: DocsAccordionPreviewComponent,
      inputs: {
        config: {
          type: 'single',
          collapsible: true,
          items: [
            {
              value: 'premium',
              trigger: 'Premium feature information',
              content: 'This item is disabled.',
              disabled: true,
            },
          ],
        },
      },
    },
    code: [
      {
        language: 'html',
        code: accordionDisabledCode,
      },
    ],
  },
] as const;

