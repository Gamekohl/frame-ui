import { DialogRef } from '@angular/cdk/dialog';

export abstract class FrModalRef<Component = unknown, Result = unknown> extends DialogRef<
  Result,
  Component
> {}
