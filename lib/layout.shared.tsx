import type { DocsLayoutProps } from 'fumadocs-ui/layouts/notebook';
import { SiteMark } from '@/components/brand';
import { NavButton } from '@/components/nav-button';
import { ThemeSwitch } from '@/components/theme-switch';
import { docsUrl, site } from './shared';

export function layoutOptions(): Omit<DocsLayoutProps, 'tree' | 'children'> {
  return {
    nav: {
      mode: 'top',
      title: <SiteMark label={site.label} tone="chrome" />,
      url: '/',
    },
    links: [
      {
        type: 'custom',
        children: <NavButton href={docsUrl}>User docs</NavButton>,
      },
    ],
    slots: { themeSwitch: ThemeSwitch },
    sidebar: { collapsible: false },
  };
}
