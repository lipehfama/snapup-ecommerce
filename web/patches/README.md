# Dependency security patches

The `deepmerge` override replaces the vulnerable package with
[`deepmerge-ts@8.0.2`](https://github.com/RebeccaStevens/deepmerge-ts).
The Rollup resolver is the only consumer. Its patch changes the CommonJS and ESM
imports to use the replacement library’s named `deepmerge` export. Its sole merge
operation clones the default resolver configuration before freezing it.
Bun reapplies this compatibility patch during installation through
`patchedDependencies`. No audit findings are suppressed.

Remove the override and patch together when the upstream resolver removes its
vulnerable dependency. Check for additional consumers before upgrading dependencies,
since the replacement is not a general drop-in implementation of the old API.

Run its security and compatibility regression checks with:

```bash
node scripts/check-deepmerge-security.cjs
```

The `minimatch` and `glob` overrides in `package.json` select patched major versions
until their consumers update their dependency ranges. Recheck the production PWA
build and unit tests when changing these overrides.

Rollup is pinned to `4.68.1` because the registry advertised `4.68.2` while its
package and native binary tarballs returned HTTP 404. Recheck download availability
before removing this override. TypeScript stays at `6.0.3` for compatibility with
the installed Vue type checker and TypeScript ESLint packages.
