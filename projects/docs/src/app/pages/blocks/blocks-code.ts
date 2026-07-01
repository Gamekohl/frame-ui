export type ComponentCodeModule = {
  readonly name: string;
  readonly path: string;
};

export type ComponentCodeOptions = {
  readonly frameModules: readonly ComponentCodeModule[];
  readonly iconImports?: readonly string[];
  readonly usesReactiveForms?: boolean;
};

function buildFrameModuleImports(modules: readonly ComponentCodeModule[]): string[] {
  return modules.map((module) => `import { ${module.name} } from '@frame-ui-ng/components/${module.path}';`);
}

function buildImportBlock(options: ComponentCodeOptions): string {
  const iconImports = options.iconImports ?? [];
  const coreImports = [
    'ChangeDetectionStrategy',
    'Component',
    ...(options.usesReactiveForms ? ['inject'] : []),
  ];
  const imports = [
    `import { ${coreImports.join(', ')} } from '@angular/core';`,
  ];

  if (options.usesReactiveForms) {
    imports.push(`import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';`);
  }

  if (iconImports.length > 0) {
    imports.push(`import { NgIcon, provideIcons } from '@ng-icons/core';`);
    imports.push(`import { ${iconImports.join(', ')} } from '@ng-icons/tabler-icons';`);
  }

  imports.push(...buildFrameModuleImports(options.frameModules));

  return imports.join('\n');
}

function buildComponentImportsArray(options: ComponentCodeOptions): string {
  const imports = [
    ...options.frameModules.map((module) => module.name),
    ...((options.iconImports?.length ?? 0) > 0 ? ['NgIcon'] : []),
    ...(options.usesReactiveForms ? ['ReactiveFormsModule'] : []),
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
