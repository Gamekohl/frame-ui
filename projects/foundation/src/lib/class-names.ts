export type ClassDictionary = Readonly<Record<string, boolean | null | undefined>>;
export type ClassValue =
  | ClassDictionary
  | ClassValue[]
  | false
  | null
  | string
  | undefined;

export type SlotClasses<TSlot extends string> = Readonly<Record<TSlot, string>>;
export type SlotClassOverrides<TSlot extends string> = Partial<Record<TSlot, ClassValue>>;

export function cx(...values: readonly ClassValue[]): string {
  const classNames: string[] = [];

  for (const value of values) {
    if (!value) {
      continue;
    }

    if (typeof value === 'string') {
      classNames.push(value);
      continue;
    }

    if (Array.isArray(value)) {
      const nested = cx(...value);

      if (nested) {
        classNames.push(nested);
      }

      continue;
    }

    for (const [className, enabled] of Object.entries(value)) {
      if (enabled) {
        classNames.push(className);
      }
    }
  }

  return classNames.join(' ');
}

export function withClassOverrides<TSlot extends string>(
  slots: SlotClasses<TSlot>,
  overrides?: SlotClassOverrides<TSlot>,
): Record<TSlot, string> {
  const mergedSlots = {} as Record<TSlot, string>;

  for (const slot of Object.keys(slots) as TSlot[]) {
    mergedSlots[slot] = cx(slots[slot], overrides?.[slot]);
  }

  return mergedSlots;
}
