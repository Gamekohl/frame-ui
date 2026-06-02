import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DEFAULT_IMAGE_PATH, getSeoForPath, normalizePath, SITE_NAME, SITE_URL } from './seo-data';

type JsonLdNode = Record<string, unknown>;

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private initialized = false;

  init(): void {
    if (this.initialized) {
      return;
    }

    this.initialized = true;
    this.updateFromUrl(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.updateFromUrl(event.urlAfterRedirects));
  }

  private updateFromUrl(url: string): void {
    const seo = getSeoForPath(url);
    const canonicalUrl = this.absoluteUrl(seo.path);
    const imageUrl = this.absoluteUrl(seo.imagePath ?? DEFAULT_IMAGE_PATH);
    const robots = seo.robots ?? 'index, follow';

    this.title.setTitle(seo.title);
    this.updateNameTag('description', seo.description);
    this.updateNameTag('robots', robots);
    this.updateNameTag('twitter:card', 'summary_large_image');
    this.updateNameTag('twitter:title', seo.title);
    this.updateNameTag('twitter:description', seo.description);
    this.updateNameTag('twitter:image', imageUrl);
    this.updatePropertyTag('og:description', seo.description);
    this.updatePropertyTag('og:image', imageUrl);
    this.updatePropertyTag('og:site_name', SITE_NAME);
    this.updatePropertyTag('og:title', seo.title);
    this.updatePropertyTag('og:type', 'website');
    this.updatePropertyTag('og:url', canonicalUrl);
    this.updateCanonical(canonicalUrl);
    this.updateStructuredData(seo.title, seo.description, seo.path, canonicalUrl, imageUrl);
  }

  private absoluteUrl(path: string): string {
    return new URL(path, SITE_URL).toString();
  }

  private updateNameTag(name: string, content: string): void {
    this.meta.updateTag({ name, content }, `name='${name}'`);
  }

  private updatePropertyTag(property: string, content: string): void {
    this.meta.updateTag({ property, content }, `property='${property}'`);
  }

  private updateCanonical(url: string): void {
    let canonical = this.document.head.querySelector<HTMLLinkElement>("link[rel='canonical']");

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', url);
  }

  private updateStructuredData(
    title: string,
    description: string,
    path: string,
    canonicalUrl: string,
    imageUrl: string,
  ): void {
    let script = this.document.head.querySelector<HTMLScriptElement>('#frame-ui-json-ld');

    if (!script) {
      script = this.document.createElement('script');
      script.setAttribute('id', 'frame-ui-json-ld');
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        this.organizationJsonLd(),
        this.websiteJsonLd(),
        this.imageJsonLd(imageUrl),
        this.webPageJsonLd(title, description, canonicalUrl, imageUrl),
        this.breadcrumbJsonLd(path),
      ],
    });
  }

  private organizationJsonLd(): JsonLdNode {
    return {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: this.absoluteUrl(DEFAULT_IMAGE_PATH),
    };
  }

  private websiteJsonLd(): JsonLdNode {
    return {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en',
    };
  }

  private imageJsonLd(imageUrl: string): JsonLdNode {
    return {
      '@type': 'ImageObject',
      '@id': imageUrl,
      url: imageUrl,
      contentUrl: imageUrl,
      caption: SITE_NAME,
    };
  }

  private webPageJsonLd(
    title: string,
    description: string,
    canonicalUrl: string,
    imageUrl: string,
  ): JsonLdNode {
    return {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      primaryImageOfPage: { '@id': imageUrl },
      inLanguage: 'en',
    };
  }

  private breadcrumbJsonLd(path: string): JsonLdNode {
    return {
      '@type': 'BreadcrumbList',
      itemListElement: this.breadcrumbItems(path).map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  }

  private breadcrumbItems(path: string): Array<{ name: string; url: string }> {
    const normalizedPath = normalizePath(path);

    if (normalizedPath === '/') {
      return [{ name: SITE_NAME, url: `${SITE_URL}/` }];
    }

    const segments = normalizedPath.split('/').filter(Boolean);
    const items = [{ name: SITE_NAME, url: `${SITE_URL}/` }];
    let currentPath = '';

    for (const segment of segments) {
      currentPath += `/${segment}`;
      items.push({
        name: this.segmentLabel(segment),
        url: this.absoluteUrl(currentPath),
      });
    }

    return items;
  }

  private segmentLabel(segment: string): string {
    if (segment === 'docs') {
      return 'Docs';
    }

    if (segment === 'mcp') {
      return 'MCP';
    }

    return segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
