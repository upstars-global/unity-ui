## [1.1.1](https://github.com/upstars-global/unity-ui/compare/v1.1.0...v1.1.1) (2026-03-06)

### 🐛 Bug Fixes

* test semantic release
 ([b4881be](https://github.com/upstars-global/unity-ui/commit/b4881be3a06ed76744508fdbbd187703fa1601fc))



### 🔧 Maintenance

* add changelog template and update release configuration for versioning
 ([5171548](https://github.com/upstars-global/unity-ui/commit/5171548006ab49349a5041c09ceb40615dcbd1ca))


* add changelog template and update release configuration for versioning
 ([4105858](https://github.com/upstars-global/unity-ui/commit/4105858ffa7c90117dcef8dfc64430689bc6fb96))


* Add GitHub Actions workflow for package publishing ([#7](https://github.com/upstars-global/unity-ui/issues/7))
 ([20f2ee1](https://github.com/upstars-global/unity-ui/commit/20f2ee1141603c67229d12cd55eab5fbe06c4568))



    * Add GitHub Actions workflow for package publishing

    - Set up `.github/workflows/publish-github-packages.yml` for publishing to GitHub Packages.

    - Introduced empty root entry (`index.ts`) for modular imports.

    - Added basic test coverage in `index.test.ts` to verify root entry behavior.

    - Updated dependencies in `yarn.lock`.

    - Introduced themes `king` and `alpa` with respective Tailwind CSS imports.

    * Configure build system and prepare package for publishing

    - Added `vite-plugin-dts` for TypeScript declarations.

    - Updated Vite config to support multiple entry points and library builds.

    - Updated `package.json` with metadata, export map, and prepublish script.

    - Renamed package to `@upstars/ui-kit` and bumped version to `0.1.0`.

    - Updated README with usage, development, and release instructions.

    * Update Chromatic CI workflow to include `public-package` branch

    * Support per-component entry points and exports

    - Updated Vite config to dynamically collect and define component-level entry points from `src/components`.

    - Extended `package.json` export map to include `./components/*` for individual component exports.

    - Updated README with information on `<ComponentName>` publishing structure.

    * Migrate package and workflows to `@upstars-global`, enable `semantic-release`, and streamline publishing

    * Remove `public-package` branch from release workflow triggers
* **release:** 1.1.1 [skip ci]
 ([2834b51](https://github.com/upstars-global/unity-ui/commit/2834b51e72ef4a98d80257297a6f5a83f5bf1d4c))


* remove redundant @octokit/auth-app installation step in release workflow and update dependencies
 ([2a8c175](https://github.com/upstars-global/unity-ui/commit/2a8c175af97735a4dba43f5438ee50829e523717))


* rename package to `@upstars-global/unity-ui` and update references
 ([b6a2374](https://github.com/upstars-global/unity-ui/commit/b6a237443510f52356a5956ec7bda59ac0d7a342))

## [1.1.1](https://github.com/upstars-global/unity-ui/compare/v1.1.0...v1.1.1) (2026-03-06)

### 🐛 Bug Fixes

* test semantic release
 ([b4881be](https://github.com/upstars-global/unity-ui/commit/b4881be3a06ed76744508fdbbd187703fa1601fc))



### 🔧 Maintenance

* add changelog template and update release configuration for versioning
 ([5171548](https://github.com/upstars-global/unity-ui/commit/5171548006ab49349a5041c09ceb40615dcbd1ca))


* add changelog template and update release configuration for versioning
 ([4105858](https://github.com/upstars-global/unity-ui/commit/4105858ffa7c90117dcef8dfc64430689bc6fb96))


* Add GitHub Actions workflow for package publishing ([#7](https://github.com/upstars-global/unity-ui/issues/7))
 ([20f2ee1](https://github.com/upstars-global/unity-ui/commit/20f2ee1141603c67229d12cd55eab5fbe06c4568))



    * Add GitHub Actions workflow for package publishing

    - Set up `.github/workflows/publish-github-packages.yml` for publishing to GitHub Packages.

    - Introduced empty root entry (`index.ts`) for modular imports.

    - Added basic test coverage in `index.test.ts` to verify root entry behavior.

    - Updated dependencies in `yarn.lock`.

    - Introduced themes `king` and `alpa` with respective Tailwind CSS imports.

    * Configure build system and prepare package for publishing

    - Added `vite-plugin-dts` for TypeScript declarations.

    - Updated Vite config to support multiple entry points and library builds.

    - Updated `package.json` with metadata, export map, and prepublish script.

    - Renamed package to `@upstars/ui-kit` and bumped version to `0.1.0`.

    - Updated README with usage, development, and release instructions.

    * Update Chromatic CI workflow to include `public-package` branch

    * Support per-component entry points and exports

    - Updated Vite config to dynamically collect and define component-level entry points from `src/components`.

    - Extended `package.json` export map to include `./components/*` for individual component exports.

    - Updated README with information on `<ComponentName>` publishing structure.

    * Migrate package and workflows to `@upstars-global`, enable `semantic-release`, and streamline publishing

    * Remove `public-package` branch from release workflow triggers
* remove redundant @octokit/auth-app installation step in release workflow and update dependencies
 ([2a8c175](https://github.com/upstars-global/unity-ui/commit/2a8c175af97735a4dba43f5438ee50829e523717))
