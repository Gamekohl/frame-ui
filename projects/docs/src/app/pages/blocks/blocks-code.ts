export type ComponentCodeOptions = {
  readonly frameImports: readonly string[];
  readonly iconImports?: readonly string[];
};

function buildImportBlock(options: ComponentCodeOptions): string {
  const iconImports = options.iconImports ?? [];
  const imports = [
    `import { ChangeDetectionStrategy, Component } from '@angular/core';`,
    `import { FormControl, ReactiveFormsModule } from '@angular/forms';`,
  ];

  if (iconImports.length > 0) {
    imports.push(`import { NgIcon, provideIcons } from '@ng-icons/core';`);
    imports.push(`import { ${iconImports.join(', ')} } from '@ng-icons/tabler-icons';`);
  }

  imports.push(`import {
${options.frameImports.map((entry) => `  ${entry},`).join('\n')}
} from '@frame-ui-ng/components';`);

  return imports.join('\n');
}

function buildComponentImportsArray(options: ComponentCodeOptions): string {
  const imports = [
    ...options.frameImports,
    ...((options.iconImports?.length ?? 0) > 0 ? ['NgIcon'] : []),
    'ReactiveFormsModule',
  ];

  return `[
${imports.map((entry) => `    ${entry},`).join('\n')}
  ]`;
}

function buildViewProviders(options: ComponentCodeOptions): string {
  const iconImports = options.iconImports ?? [];

  if (iconImports.length === 0) {
    return '';
  }

  return `,
  viewProviders: [
    provideIcons({
${iconImports.map((entry) => `      ${entry},`).join('\n')}
    }),
  ]`;
}

export function buildComponentCode(
  componentName: string,
  selector: string,
  template: string,
  stateCode: string,
  options: ComponentCodeOptions,
): string {
  return `${buildImportBlock(options)}

@Component({
  selector: '${selector}',
  imports: ${buildComponentImportsArray(options)},
  template: \`
${template}
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush${buildViewProviders(options)},
})
export class ${componentName} {
${stateCode}
}`;
}
