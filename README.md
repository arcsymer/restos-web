# restos-web

Customer-facing ordering and reservations UI for the RestOS ecosystem, built with Angular 20:
standalone components, signals, typed reactive forms, EN/PL i18n and an accessibility pass. It
consumes the [restos-core](https://github.com/arcsymer/restos-core) REST API when it's running
and transparently falls back to a deterministic in-browser mock backend when it isn't — so the
full demo works from a static page with zero setup.

> 🚧 Under construction — scaffold stage.

## Quickstart

Prerequisites: **Node 22+** and **pnpm**.

```sh
git clone https://github.com/arcsymer/restos-web && cd restos-web
pnpm install
pnpm start
```

Open <http://localhost:4200>.

## Testing

```sh
pnpm test -- --watch=false --browsers=ChromeHeadless
```

## License

MIT — see [LICENSE](LICENSE). Part of the RestOS portfolio.

Built end-to-end with an agentic workflow (Claude Code), orchestrated, reviewed, and directed by me.
