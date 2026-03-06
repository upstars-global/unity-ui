# @upstars-global/unity-ui

UI Kit package for Vue 3 applications.

## Development

```bash
yarn install
yarn test
yarn build
```


## Consume in app

```ts
import { defineAsyncComponent } from "vue";
import "@upstars-global/unity-ui/themes/alpa";

const UiComponent = defineAsyncComponent(() => import("@upstars-global/unity-ui/components/<ComponentName>"));
```

`<ComponentName>` публикуется из `src/components/<ComponentName>/index.ts`.

## Release

1. Merge changes to `main` with Conventional Commits (`feat:`, `fix:`, `chore:` ...).
2. Workflow `.github/workflows/release.yml` runs `semantic-release` and automatically:
   - calculates next semver version,
   - updates `CHANGELOG.md` and `package.json`,
   - publishes package to GitHub Packages (`upstars-global`).
3. In consumer (`front-ss`) update dependency, for example:

```bash
yarn workspace @front/ss add @upstars-global/unity-ui@^X.Y.Z
```
