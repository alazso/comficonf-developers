/** Site identity and every external address the site links to. */
export const site = {
  name: 'ComfiConf',
  label: 'developers',
  title: 'ComfiConf for developers',
  description:
    "Make your Paper plugin's settings editable in ComfiConf: the Java API, schemas, providers, persistence and tests.",
  origin: 'https://developers.comficonf.com',
} as const;

export const appUrl = 'https://app.comficonf.com';
export const docsUrl = 'https://docs.comficonf.com';
export const developersUrl = 'https://developers.comficonf.com';

export const gitConfig = {
  user: 'alazso',
  repo: 'comficonf-developers',
  branch: 'main',
};

export type ReleaseLinkKey =
  | 'modrinth'
  | 'hangar'
  | 'apiRepository'
  | 'githubRelease'
  | 'mavenCentral'
  | 'javadoc';

/**
 * Release locations that do not exist yet. A `null` entry renders as plain text and is skipped by the link check
 * (`scripts/check-links.mjs`); set the URL once the page is published.
 */
export const releaseLinks: Record<ReleaseLinkKey, string | null> = {
  /** Modrinth project page of the bridge, slug `comficonf`: https://modrinth.com/plugin/comficonf */
  modrinth: null,
  /** Hangar project page of the bridge. */
  hangar: null,
  /** Public repository with the developer API, the demo plugin and the developer guide. */
  apiRepository: null,
  /** GitHub release of the public API repository with the API JAR, the demo plugin JAR and SHA256SUMS. */
  githubRelease: null,
  /** The artifact on Maven Central: https://central.sonatype.com/artifact/com.comficonf/comficonf-api */
  mavenCentral: null,
  /** Javadoc of the published artifact: https://javadoc.io/doc/com.comficonf/comficonf-api */
  javadoc: null,
};

/** Routes of the generated files. */
export const ogImageRoute = '/og';
export const markdownRoute = '/llms.mdx';
