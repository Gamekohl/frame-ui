import { DialogRef } from '@angular/cdk/dialog';

/** Reference handle for an opened modal. */
export abstract class FrModalRef<Component = unknown, Result = unknown> extends DialogRef<
  Result,
  Component
> {}
