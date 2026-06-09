import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerChevronDown, tablerFlask, tablerX } from '@ng-icons/tabler-icons';
import { firstValueFrom } from 'rxjs';
import {
  FrAccordion,
  FrAccordionContent, FrAccordionIcon, FrAccordionItem, FrAccordionTrigger, FrAlert, FrAlertDescription, FrAlertIcon,
  FrAlertTitle, FrButton, FrButtonLabel, FrField, FrFieldContent, FrFieldDescription, FrFieldLabel, FrTextarea } from '@frame-ui-ng/components';
import { AiComposerSnippet } from '../../../../types';

import { DocsCodeBlockComponent } from '../shared/components/docs-code-block/docs-code-block';

@Component({
  selector: 'app-ai-composer',
  imports: [
    FormsModule,
    FrButton,
    FrButtonLabel,
    DocsCodeBlockComponent,
    FrTextarea,
    FrField,
    FrFieldLabel,
    FrFieldContent,
    FrFieldDescription,
    FrAlert,
    NgIcon,
    FrAlertTitle,
    FrAlertDescription,
    FrAlertIcon,
    ReactiveFormsModule,
    FrAccordion,
    FrAccordionItem,
    FrAccordionTrigger,
    FrAccordionIcon,
    FrAccordionContent,
  ],
  templateUrl: './ai-composer.html',
  styleUrl: './ai-composer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ tablerX, tablerFlask, tablerChevronDown })],
})
export class AiComposer {
  private readonly http = inject(HttpClient);

  readonly promptExamples = [
    {
      title: 'Campaign setup form',
      prompt:
        'Create a campaign setup form with name, owner email, type select, notes textarea, approval checkbox, and submit button.',
    },
    {
      title: 'Profile settings panel',
      prompt:
        'Create a profile settings panel with avatar summary, status badge, name and email inputs, role select, and save/cancel buttons.',
    },
    {
      title: 'Support ticket workspace',
      prompt:
        'Create a support ticket view with alert, metadata badges, assignee avatars, priority select, note textarea, accordion, and actions.',
    },
  ];

  readonly prompt = new FormControl(
    'Create a signup form with email, password, country select, newsletter checkbox, and submit button.',
    {
      validators: [],
      nonNullable: true,
    },
  );
  readonly result = signal<AiComposerSnippet | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    //this.result.set(createFallbackAiComposerSnippet(this.prompt()));
  }

  useExample(prompt: string): void {
    this.prompt.patchValue(prompt);
    this.error.set(null);
  }

  async generate(): Promise<void> {
    const prompt = this.prompt.value.trim();

    if (!prompt) {
      this.error.set('Describe the UI you want to generate first.');
      return;
    }

    /*if (prompt.length > 150) {
      this.error.set('Currently only prompts allowed with less than 150 characters.');
      return;
    }*/

    this.loading.set(true);
    this.error.set(null);

    try {
      const result = await firstValueFrom(
        this.http.post<AiComposerSnippet>('/api/ai-compose', { prompt }),
      );

      this.result.set(result);
    } catch (e) {
      const error = e as HttpErrorResponse;
      const message =
        error?.error?.message ?? 'The snippet could not be generated. Please try again.';

      this.error.set(message);
    } finally {
      this.loading.set(false);
    }
  }
}
