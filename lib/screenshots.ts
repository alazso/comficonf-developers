import type { StaticImageData } from 'next/image';
import editor from '@/public/images/editor.png';

export interface ScreenshotEntry {
  image: StaticImageData;
  alt: string;
  caption: string;
}

/** Screenshots of the web app at 1600 by 900 pixels. */
export const screenshots = {
  editor: {
    image: editor,
    alt: 'The editor generated from the ComfiConfDemo schema: modified settings marked in brass, a slider, a toggle, the material picker open, and the unsaved changes bar.',
    caption:
      'The editor ComfiConf generates from the ComfiConfDemo schema. There is no plugin-specific web code.',
  },
} satisfies Record<string, ScreenshotEntry>;

export type ScreenshotId = keyof typeof screenshots;
