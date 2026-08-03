'use client';

import { useLang } from '@/components/providers/language-provider';
import { ImageBanner } from '@/components/site/image-banner';

/** Localised wrapper around <ImageBanner> for the homepage break band. */
export function HomeBanner() {
  const { t } = useLang();

  return (
    <ImageBanner
      image="taipei-green"
      eyebrow={t.bridge.eyebrow}
      heading={t.bridge.heading}
      body={t.bridge.lead}
      imagePosition="60% center"
    />
  );
}
