# ComfiConf for developers

The documentation for plugin developers who integrate with [ComfiConf](https://app.comficonf.com), served at
https://developers.comficonf.com. Built with Next.js and Fumadocs, styled with Ledger, the design system of the
ComfiConf web app, in its graphite treatment (dark first, a graphite frame in both themes, 14px prose and a wide
column for code). The documentation for server owners is a sibling site, https://docs.comficonf.com.

## Local development

Requires Node.js 24 and npm.

```bash
npm ci
```

```bash
npm run dev -- -p 3102
```

The site runs at http://localhost:3102, with the overview as the home page and every page at the root
(`/quickstart`, not `/docs/quickstart`).

| Command | What it does |
| --- | --- |
| `npm run build` | Production build into `.next/standalone` |
| `npm run types:check` | Generates the MDX collections and route types, then runs `tsc` |
| `npm start` | Serves a production build |
| `node scripts/check-links.mjs <base url> [--map <origin>=<local origin>]` | Checks every link and anchor of a running site (see below) |

## Content

Pages are MDX files in `content/docs`. The sidebar order comes from `meta.json` in each folder; a folder's
`meta.json` also sets its title, and `---Reference---` in the root `meta.json` is a sidebar label. Every page needs
a `title` and a `description` in its front matter.

The developer guide of the ComfiConf API repository (`docs/DEVELOPER_GUIDE.md`) is the canonical text, and the
Javadoc of the API is normative. This site splits the guide into pages with the same facts and the same code; it
adds nothing about the bridge's protocol, the backend or the service's internals beyond what the guide says.

- **Every code block has a title**: a file name (`title="VoucherSchema.java"`), or tabs for build files
  (`tab="Gradle (Kotlin DSL)"` and `tab="Maven"` on consecutive blocks, each with its own `title`). Fumadocs adds
  the copy button.
- **Builder methods and callback rules are ruled tables**, not prose lists.
- **API names** (classes, methods, enum constants, config keys) are inline code and must exist in the API exactly
  as written.
- **No em or en dashes** anywhere, including front matter. Use commas, colons, parentheses or periods.
- `COMFICONF_ARTIFACT_VERSION` anywhere in content (text, code, component props) is replaced at build time by the
  Maven artifact version; see [Version stamping](#version-stamping).

Components available in MDX, besides Markdown:

| Component | Use |
| --- | --- |
| `<Callout tone="warning" title="...">` | Notes. Tones `info`, `success`, `warning`, `danger`, `neutral`; Fumadocs' `type` (`info`, `warn`, `warning`, `error`, `success`, `idea`) works too |
| `<FactsStrip facts={[...]} />` | Ruled cells of labelled values, as in the app |
| `<Steps>` / `<Step title="...">` | Numbered procedures |
| `<Screenshot id="editor" />` | A screenshot from `lib/screenshots.ts`, with its caption |
| `<Badge>`, `<CommandChip>`, `<Kbd>` | Status badges, commands and keys |
| `<ReleaseLink to="javadoc">javadoc.io</ReleaseLink>` | A release location from `lib/shared.ts`; plain text while its URL is unset |

`Callout`, `FactsStrip`, `Steps`, `Kbd` and `CommandChip` have the same name and API in both documentation
repositories, and `Callout`, `FactsStrip` and `Badge` match the web app's components.

## Updating the site when the guide changes

Each section of `docs/DEVELOPER_GUIDE.md` has a home here:

| Guide section | Page |
| --- | --- |
| 1. How ComfiConf works | `index.mdx` (Overview) |
| 2. Requirements | `quickstart.mdx` (facts strip), `compatibility.mdx` (table) |
| 3. Adding the dependency | `quickstart.mdx`, step 1 |
| 4. Declaring the soft dependency | `quickstart.mdx`, step 2 |
| 5. The optional hook pattern | `quickstart.mdx`, step 3 |
| 6. Registering a resource | `quickstart.mdx`, step 4; `providers/registration.mdx`; `concepts/resources.mdx` |
| 7. Writing a ConfigProvider | `providers/index.mdx` (interface); `providers/describe-and-read.mdx` (describe, read); `providers/validate.mdx` (validate); `providers/apply.mdx` (apply, ApplyContext, preserving); `persistence/section-mapper.mdx` (Text that YAML cannot store) |
| 8. Bukkit YAML with SectionMapper | `persistence/section-mapper.mdx` |
| 9. Schema reference | `schema/index.mdx` (common attributes, keys and limits, field types); `schema/scalar-fields.mdx`; `schema/groups-and-lists.mdx`; `schema/visibility.mdx`; `schema/regular-expressions.mdx` |
| 10. Values and paths | `concepts/values-and-paths.mdx` |
| 11. Validation: what the bridge checks for you | `providers/validate.mdx` |
| 12. Revisions, backups and SafeFileWriter | `persistence/safe-file-writer.mdx`; `concepts/revisions-and-conflicts.mdx` |
| 13. Threading rules and callSync | `providers/threading.mdx` |
| 14. Reporting the apply outcome truthfully | `concepts/outcomes.mdx` |
| 15. Sensitive fields | `schema/sensitive-fields.mdx` |
| 16. notifyChanged and unregistering | `providers/registration.mdx` |
| 17. Testing your integration | `testing.mdx` |
| 18. Troubleshooting | `troubleshooting.mdx` |
| 19. Checklist | `checklist.mdx` |

`concepts/schemas.mdx`, `concepts/apply-modes.mdx`, `demo-plugin.mdx`, `api-reference.mdx` and `license.mdx`
summarize facts from several sections, the Javadoc and the demo plugin.

When the guide changes:

1. Compare the guide with the version this site was last synced with:
   `git diff <last synced tag>..<new tag> -- docs/DEVELOPER_GUIDE.md` in the API repository.
2. For each changed section, find its pages in the table above and carry the change over with the same wording and
   the same code. A code block that appears on several pages (the `VoucherSchema` excerpt, the registration
   snippet) changes on all of them; search `content/docs` for a line of it.
3. A new section gets a page, or a section on an existing page; add it to the table above.
4. Check every API name you add against the Javadoc of the new version.
5. Run `npm run types:check`, `npm run build` and the link check, and note the synced tag in the commit message.

## Site constants and release links

`lib/shared.ts` holds the site origin, the app and sibling site addresses, the GitHub repository used for commit
links, and `releaseLinks`: the bridge's Modrinth and Hangar pages, the public API repository and its GitHub
release, the artifact on Maven Central, and the Javadoc at https://javadoc.io/doc/com.comficonf/comficonf-api. A
release link set to `null` renders its text without a link and is skipped by the link check. Set each URL once the
page is published; set `mavenCentral` and `javadoc` when the API reaches Maven Central, and update the
**Not on Maven Central yet** callout of the Quickstart then.

## Design

`app/global.css` holds the Ledger tokens with the web app's names and values (light in `@theme`, dark under
`.dark`), maps the Fumadocs colors onto them, and sets the graphite treatment: the header and sidebar use the
chrome palette in both themes, with focus rings in `--color-chrome-accent`, and code sits on `--color-code-surface`,
a step darker than the content surface. The additions of the documentation sites are `--color-code-surface`,
`--color-code-text`, `--color-code-border`, `--font-size-body`, `--line-height-body` and `--content-max-width`.
Syntax colors come from a Shiki CSS variables theme (`source.config.ts`) and the `--shiki-*` properties.

The stylesheet keeps Ledger's rules: no `backdrop-filter`, radii of 3, 4 and 6px, and `--shadow-lg` as the only
shadow. Check them in a production build:

```bash
grep -oh 'backdrop-filter[^;}]*\|9999px\|box-shadow:[^;}]*' .next/static/chunks/*.css | sort | uniq -c
```

The expected hits are `box-shadow: var(--shadow-lg)`, `box-shadow: none`, Tailwind's composite `box-shadow` of the
`.shadow-lg` utility (its `--tw-shadow` is the `--shadow-lg` value, and global.css sets the utility to
`var(--shadow-lg)`), and the typography plugin's `kbd` shadow, which global.css replaces with `box-shadow: none`.
Nothing else, and no `backdrop-filter` at all.

## Version stamping

- The footer of every page names the commit and the time of the build, from the `GIT_SHA` and `BUILD_DATE` build
  arguments, fixed at build time. A build without them shows `local` and the time of the build, so a stale deploy is
  visible on the page.
- `COMFICONF_ARTIFACT_VERSION` in content is replaced by the build argument of the same name. The deploy workflow
  reads `<release>` from
  https://repo1.maven.org/maven2/com/comficonf/comficonf-api/maven-metadata.xml and falls back to `0.1.0` while
  the artifact is not published.

## Checking links

With both sites running locally (this one on 3102, the user documentation on 3101):

```bash
node scripts/check-links.mjs http://localhost:3102 --map https://docs.comficonf.com=http://localhost:3101
```

The script reads the pages from `sitemap.xml`, follows every link on them, checks in-page anchors, maps the
sibling site to its local server, and requests external links such as app.comficonf.com. Unset release links
render no link, so they are not checked. Links to this repository on GitHub (the commit in the footer, the
**Open** menu) answer only once the repository exists.

## Deployment

`.github/workflows/deploy.yml` builds the Docker image and pushes it to `ghcr.io/alazso/comficonf-developers` with
the tags `latest` and `sha-<short sha>`, on every push to `main` and on demand (**Run workflow**,
`workflow_dispatch`). The image is a Next.js standalone server on `node:24.22.1-alpine`, listening on port 3000 as
the `node` user.

### On the server

Caddy runs on the host and proxies to the containers through ports published on localhost. One Compose file serves
both documentation sites, for example `/opt/comficonf-sites/compose.yaml`:

```yaml
services:
  docs:
    image: ghcr.io/alazso/comficonf-docs:latest
    restart: unless-stopped
    ports:
      - "127.0.0.1:3101:3000"

  developers:
    image: ghcr.io/alazso/comficonf-developers:latest
    restart: unless-stopped
    ports:
      - "127.0.0.1:3102:3000"
```

Docker publishes ports past `ufw`, so binding them to `127.0.0.1` is what keeps them private: only Caddy, on the
same host, reaches them.

Start or update the sites:

```bash
cd /opt/comficonf-sites && sudo docker compose pull && sudo docker compose up -d
```

Add the two site blocks to `/etc/caddy/Caddyfile`, next to `app.comficonf.com`. The global options that trust
Cloudflare's address ranges apply to them as well, and the Cloudflare origin certificate covers
`*.comficonf.com`.

```caddyfile
docs.comficonf.com {
	tls /etc/caddy/origin.pem /etc/caddy/origin.key
	header Strict-Transport-Security "max-age=31536000"
	encode zstd gzip
	reverse_proxy 127.0.0.1:3101
}

developers.comficonf.com {
	tls /etc/caddy/origin.pem /etc/caddy/origin.key
	header Strict-Transport-Security "max-age=31536000"
	encode zstd gzip
	reverse_proxy 127.0.0.1:3102
}
```

```bash
sudo systemctl reload caddy
```

In Cloudflare, the `docs` and `developers` records are proxied, like the record of `app`.

### Notes

- **GHCR packages are private by default.** The server cannot pull the image until the package is made public
  (on GitHub: the package, **Package settings**, **Change visibility**) or the host runs `docker login ghcr.io`
  with a token that has the `read:packages` scope.
- **Proxy to the published port, not to the container name.** Proxying to a container by name requires Caddy to
  share the container's Docker network, and `docker compose down` deletes that network and silently detaches
  Caddy, which then answers 502. Caddy on the host proxying to `127.0.0.1:3101` and `127.0.0.1:3102`, as above,
  avoids this.
- **Scheduled workflows.** GitHub disables scheduled workflows in a public repository after 60 days without
  repository activity. The deploy workflow has no schedule, so it is not affected. If a schedule is added later and
  the workflow shows as disabled under **Actions**, choose **Enable workflow**. If a push does not start a deploy,
  run the workflow with `workflow_dispatch`.
- **Check a deploy** by the footer: it names the commit the running image was built from.

## Fonts

The IBM Plex fonts in `lib/og/fonts` are licensed under the SIL Open Font License 1.1 (`lib/og/fonts/OFL.txt`).
