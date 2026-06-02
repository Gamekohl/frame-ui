import { Type } from '@angular/core';

export type DocsCodeLanguage = 'html' | 'ts' | 'bash' | 'css';

export type DocsTokenInspectorTarget = {
  id: string;
  label: string;
  selector: string;
  description?: string;
  tokens: string[];
};

export type ComponentDoc = {
  slug: string;
  breadcrumb: string;

  hero?: DocsExample;

  installation?: DocsInstallation;
  usage?: DocsCodeBlock[];
  composition?: string;
  tokenInspector?: DocsExample;
  examples?: DocsExample[];
  styling?: DocsDocSection;
  tokensTitle?: string;
  tokensDescription?: string;
  tokens?: string;
};

export type DocsDocSection = {
  description?: string;
  preview?: DocsExample;
};

export type DocsInstallation = {
  cli?: DocsCodeBlock;
  manual?: {
    steps: DocsManualStep[];
  };
};

export type DocsManualStep = {
  title: string;
  description?: string;
  code?: DocsCodeBlock;
};

export type DocsCodeBlock = {
  language: DocsCodeLanguage;
  code: string;
};

export type DocsExample = {
  id: string;
  title: string;
  description?: string;

  preview?: {
    component: Type<unknown>;
    inputs?: Record<string, unknown>;
    containerClass?: string;
    inspectorTargets?: DocsTokenInspectorTarget[];
    inspectorLayout?: 'popover' | 'side-panel';
  };

  code?: DocsCodeBlock[];
};
