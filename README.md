# @upstars/ui-kit

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
import "@upstars/ui-kit/themes/alpa";

const UiComponent = defineAsyncComponent(() => import("@upstars/ui-kit/components/<ComponentName>"));
```

## Release

1. Bump version in `package.json` (semver).
2. Commit and push changes to `main`.
3. Create and push tag `vX.Y.Z` (must match `package.json` version).
4. GitHub Actions workflow `.github/workflows/publish-github-packages.yml` publishes package to GitHub Packages.
5. In consumer (`front-ss`) update dependency, for example:

```bash
yarn workspace @front/ss add @upstars/ui-kit@^X.Y.Z
```
