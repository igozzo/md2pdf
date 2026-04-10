# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-04-10

### Added
- **Themes**: Added `google` theme styling, mimicking classic Google Material UI design elements.
- **Themes**: Added `microsoft-365` theme styling, mirroring standard Microsoft Fluent UI guidelines.
- **Testing**: Added comprehensive `jest` testing suite under `tests/` covering converter, parser, and security checks.
- **Examples**: Generated `examples/` directory containing sample markdown files (`basic-features.md`, `advanced-rendering.md`, `code-and-syntax.md`) with built-in configurations to display supported formats.
- **License**: Set MIT License for the project.

### Changed
- **Dependencies**: Bumped `puppeteer` to `^24.0.0` and `@typescript-eslint` packages to `^8.0.0` directly addressing 11 severe `npm audit` findings containing DoS and path traversal vulnerabilities via out of date inner dependencies (`tar-fs`, `minimatch`, `ws`).
- **Engine**: Node engine specification upgraded to `>=18.0.0` to accommodate updated dependency lifecycles natively.

### Fixed
- Fixed outstanding `npm audit` vulnerability flags.

## [1.0.0] - 2026-04-10 (Initial Release)

### Added
- Core CLI and Markdown API components.
- Initial 10 pre-configured themes.
- Support for complex markdown processing via `markdown-it`, `mermaid`, and `katex`.
