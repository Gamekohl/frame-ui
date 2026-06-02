import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

import { AVATAR_ROOT } from './avatar.tokens';

@Directive({
  selector: 'img[frAvatarImage]',
  standalone: true,
  host: {
    class: 'frame-avatar__image',
    '(error)': 'handleError()',
    '(load)': 'handleLoad()',
  },
})
export class FrAvatarImage implements AfterViewInit {
  private readonly host = inject<ElementRef<HTMLImageElement>>(ElementRef);
  private readonly root = inject(AVATAR_ROOT);

  ngAfterViewInit(): void {
    const image = this.host.nativeElement;

    if (!image.getAttribute('src')) {
      this.root.setStatus('error');
      return;
    }

    if (image.complete) {
      this.root.setStatus(image.naturalWidth > 0 ? 'loaded' : 'error');
    }
  }

  protected handleLoad(): void {
    this.root.setStatus('loaded');
  }

  protected handleError(): void {
    this.root.setStatus('error');
  }
}
