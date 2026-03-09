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

## Install In Dependent Projects (Local + GitLab CI)

### 1) Project `.npmrc` (commit to repository)

```ini
@upstars-global:registry=https://npm.pkg.github.com
```

### 2) Local developer setup

Create GitHub `PAT (classic)` with:
- `read:packages`
- `repo` (if package/repository is private)

If org SSO is enabled, authorize token for `upstars-global`.

Add token to user `~/.npmrc` (do not commit):

```ini
//npm.pkg.github.com/:_authToken=ghp_xxxxxxxxxxxxxxxxxxxx
always-auth=true
```

Check auth:

```bash
npm whoami --registry=https://npm.pkg.github.com --userconfig ~/.npmrc
```

Install:

```bash
yarn add @upstars-global/unity-ui
```

### 3) GitLab CI setup

In `Settings -> CI/CD -> Variables`, add:
- `GITHUB_PACKAGES_TOKEN` (masked/protected)

Before `yarn install` in CI:

```bash
printf "//npm.pkg.github.com/:_authToken=%s\nalways-auth=true\n" "$GITHUB_PACKAGES_TOKEN" > ~/.npmrc
yarn install --frozen-lockfile
rm -f ~/.npmrc
```

If build runs inside Docker/kaniko, pass token as build-arg and create temporary `~/.npmrc` in Dockerfile before `yarn install`.
