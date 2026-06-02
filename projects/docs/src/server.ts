import 'dotenv/config';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { OpenAI } from 'openai';
import type { Tool } from 'openai/resources/responses/responses';
import { AiComposerSnippet } from './types';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();
const openaiModel = process.env['OPENAI_MODEL'];
const openaiVectorStoreId = process.env['OPENAI_VECTOR_STORE_ID'];
const aiComposerContextMode = process.env['AI_COMPOSER_CONTEXT_MODE'] ?? 'local-mcp';
const aiComposerMcpServerUrl =
  normalizeMcpServerUrl(process.env['AI_COMPOSER_MCP_SERVER_URL'] ?? 'http://localhost:7331/mcp');
const systemPromptPath = join(process.cwd(), 'scripts', 'ai-composer', 'system-prompt.md');

app.use(express.json({ limit: '10mb' }));

/*app.post('/api/ai-compose', async (req, res) => {
  const body = req.body as Partial<{ prompt: string }>;
  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required.' });
  }

  if (prompt.length > 1000) {
    return res
      .status(400)
      .json({ message: 'Currently only prompts allowed with less than 1000 characters.' });
  }

  if (isUnsafeAiComposerPrompt(prompt)) {
    return res.status(500).json({ message: 'Snippet couldn\'t be generated.' });
  }

  if (!openaiModel) {
    return res.status(400).json({ message: 'OpenAI model is required.' });
  }

  try {
    const openai = new OpenAI();
    const systemPrompt = await loadSystemPrompt();
    const context = await loadAiComposerContext(prompt);
    const tools = buildOpenAiTools();
    const response = await openai.responses.create({
      model: openaiModel,
      input: [
        {
          role: 'system',
          content: buildSystemPromptWithContext(systemPrompt, context),
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      tools,
      text: {
        format: {
          type: 'json_schema',
          name: 'ai_composer_snippet',
          strict: true,
          schema: {
            type: 'object',
            additionalProperties: false,
            required: [
              'imports',
              'importStatements',
              'typescript',
              'template',
              'styles',
              'notes',
              'matchedComponents',
            ],
            properties: {
              imports: { type: 'array', items: { type: 'string' } },
              importStatements: { type: 'array', items: { type: 'string' } },
              typescript: { type: 'string' },
              template: { type: 'string' },
              styles: { type: 'string' },
              notes: { type: 'array', items: { type: 'string' } },
              matchedComponents: { type: 'array', items: { type: 'string' } },
            },
          },
        },
      },
    });
    const snippet = JSON.parse(response.output_text) as AiComposerSnippet;

    return res.json({
      ...snippet,
      notes: []
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown OpenAI error';

    return res.status(500).json({
      notes: [`OpenAI request failed: ${message}`],
    });
  }
});*/

function isUnsafeAiComposerPrompt(prompt: string): boolean {
  const normalized = prompt.toLowerCase();
  const unsafePatterns = [
    /\bxss\b/,
    /cross[-\s]?site scripting/,
    /script injection/,
    /javascript:/,
    /<script\b/,
    /innerhtml/,
    /bypass.*sanit/,
    /sanitization bypass/,
    /steal (cookie|token|password|credential|session)/,
    /exfiltrat/,
    /keylogger/,
    /phishing/,
    /malware/,
    /ransomware/,
    /csrf/,
    /sql injection/,
    /remote code execution/,
  ];

  return unsafePatterns.some((pattern) => pattern.test(normalized));
}

async function loadSystemPrompt(): Promise<string> {
  return await readFile(systemPromptPath, 'utf8');
}

async function loadAiComposerContext(prompt: string): Promise<unknown | null> {
  if (aiComposerContextMode === 'none' || aiComposerContextMode === 'openai-mcp') {
    return null;
  }

  const response = await fetch(aiComposerMcpServerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'build_context_for_prompt',
        arguments: {
          prompt,
          limit: 8,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(
      `AI Composer MCP context request failed with HTTP ${response.status}. Start it with "npm run ai:mcp".`,
    );
  }

  const message = await response.json() as {
    result?: { content?: Array<{ text?: string }> };
    error?: { message?: string };
  };

  if (message.error) {
    throw new Error(message.error.message ?? 'AI Composer MCP returned an error.');
  }

  const text = message.result?.content?.find((item) => typeof item.text === 'string')?.text;

  if (!text) {
    throw new Error('AI Composer MCP returned no context.');
  }

  return JSON.parse(text);
}

function buildOpenAiTools(): Tool[] {
  const tools: Tool[] = [];

  if (openaiVectorStoreId) {
    tools.push({
      type: 'file_search',
      vector_store_ids: [openaiVectorStoreId],
      max_num_results: 8,
    });
  }

  if (aiComposerContextMode === 'openai-mcp') {
    tools.push({
      type: 'mcp',
      server_label: 'design_system_angular',
      server_description:
        'FrameUI Angular component knowledge, usage recipes, and generated-code validation.',
      server_url: aiComposerMcpServerUrl,
      require_approval: 'never',
      allowed_tools: ['build_context_for_prompt', 'validate_generated_code'],
    });
  }

  return tools;
}

function buildSystemPromptWithContext(systemPrompt: string, context: unknown | null): string {
  const instructions = [
    systemPrompt,
    'Before generating code, use the available FrameUI context to choose documented imports, selectors, inputs, and recipes.',
  ];

  if (aiComposerContextMode === 'openai-mcp') {
    instructions.push(
      'Use the design_system_angular MCP server before generating code. Prefer build_context_for_prompt for component context and validate_generated_code before final output.',
    );
  }

  if (context) {
    instructions.push(
      'The following context was retrieved from the AI Composer MCP server. Treat it as the source of truth for component imports, selectors, examples, and recipes.',
      JSON.stringify(context, null, 2),
    );
  }

  return instructions.join('\n\n');
}

function normalizeMcpServerUrl(value: string): string {
  const url = new URL(value);

  if (url.pathname === '/' || url.pathname === '') {
    url.pathname = '/mcp';
  }

  return url.toString();
}

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
