import { cx, withClassOverrides } from './class-names';

describe('class names', () => {
  it('joins nested class values', () => {
    expect(cx('root', ['size-md', { active: true, disabled: false }], null)).toBe(
      'root size-md active',
    );
  });

  it('applies slot overrides', () => {
    const slots = withClassOverrides(
      {
        content: 'text-sm',
        root: 'inline-flex items-center',
      },
      {
        root: ['justify-center', { rounded: true }],
      },
    );

    expect(slots.root).toBe('inline-flex items-center justify-center rounded');
    expect(slots.content).toBe('text-sm');
  });
});
