export type DocsCodeLanguage =
  | 'html'
  | 'ts'
  | 'tsx'
  | 'js'
  | 'jsx'
  | 'css'
  | 'scss'
  | 'bash'
  | 'json'
  | 'md'
  | 'text';

export type DocsCodeTheme = {
  light: string;
  dark?: string;
};

export type DocsCodeBlock = {
  code: string;
  language: DocsCodeLanguage;
  title?: string;
  showLineNumbers?: boolean;
  allowCopy?: boolean;
};

export type HighlightCodeOptions = {
  code: string;
  language: DocsCodeLanguage;
  theme?: DocsCodeTheme;
};

export type CopyState = 'idle' | 'copied' | 'failed';
