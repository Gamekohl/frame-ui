import { Component } from '@angular/core';
import { FrBadge } from '@frame-ui/components';

type McpBenefit = {
  readonly title: string;
  readonly description: string;
};

@Component({
  selector: 'app-mcp-page',
  imports: [FrBadge],
  templateUrl: './mcp.html',
})
export class McpPage {
  protected readonly benefits: McpBenefit[] = [
    {
      title: 'Shared component knowledge',
      description:
        'The MCP server can expose component specs, selectors, import paths, examples, recipes, and validation rules from the documentation.',
    },
    {
      title: 'Better AI-generated code',
      description:
        'AI tools can ask for the exact FrameUI context they need before generating Angular code, instead of guessing component APIs.',
    },
    {
      title: 'Reusable integration point',
      description:
        'The same knowledge source can support the docs AI Composer, local agents, external coding tools, and future automation workflows.',
    },
  ];

  protected readonly capabilities = [
    'Search available components and their documented usage.',
    'Return selectors, inputs, outputs, imports, and examples for matched components.',
    'Provide composition recipes for forms, dashboards, menus, modals, and other real UI patterns.',
    'Validate generated code against known FrameUI and Angular mistakes.',
  ];
}
