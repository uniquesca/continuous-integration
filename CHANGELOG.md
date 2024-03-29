# Uniques CI Changelog

## v1.0.0

* New: created `deploy`, `publish-npm` and `qa-checks` reusable workflows;
* New: created `mysql-import`, `mysql-export` and `update-changelog` reusable actions;

## v1.1.0

* BREAKING: QA checks now uses only explicitly specified secrets (807df62 by George Shestayev)
* Fix: fixed caching dependencies in `publish-npm` packages for the packages without lock file (217ab26 by George Shestayev)
* Fix: fixed caching Composer dependencies for the libraries which don't have lock file (4691894 by George Shestayev)
* New: added sorting resulting changelog (54ec89c by George Shestayev)
* Update: improved changelog generation to handle automated commits and github-generated "co-authored" lines (d9b5a30 by George Shestayev)
* Update: added integration with the `prepare-release` pipeline (4691894 by George Shestayev)
* Update: deploy workflow will remove unindexed files now (9da66ed by George Shestayev)
* Documentation: minor improvement in changelog format, updated readme (87a0358 by George Shestayev)

## v1.1.1

* BREAKING: renamed inputs generate-coverage-badge and coverage-badge-file into generate_coverage_badge and 
* coverage_badge_file for `qa-checks` workflow
* Fix: added missing step input importing DB (includes new `db_dump_file` input) in `qa-checks` workflow

## v1.1.2

* BREAKING: renamed input use-db into use_db for `qa-checks` workflow
* Update: updated steps naming in `qa-checks` workflow

## v1.1.3

* Update: added `db_migration_cmd` to `deploy` workflow

## v1.1.4

* New: created `publish-github-release` action (#4) (81c862d by Ihor Ziubrovskyi)
* Update: updated changelog generation to filter out "Authored-by" records

## v1.1.5

* Fix: fixed npm dependencies installation command in `publish-npm` workflow (bee5494 by George Shestayev)
* Update: added step for updating npm package version to the `publish-npm` action (bee5494 by George Shestayev)

## v1.1.6

* New: added `changelog_path` input to the `prepare-release` workflow (548e407 by George Shestayev)
* Update: added .editorconfig (f1d1af2 by George Shestayev)
* Update: changed cache keys to be exclusive for ci action (f1d1af2 by George Shestayev)
* Update: added descriptions for all inputs and secrets, updated documentation reference (548e407 by George Shestayev)
* Removed: removed `ref` input from `mysql-export` workflow (548e407 by George Shestayev)

## v1.1.7

* Fix: removing input types in the actions as types are not supported (45e1e55 by George Shestayev)
* New: introduced `raw` mode in update-changelog action allowing to just retrieve list of changes (e0c12a8 by George Shestayev)
* New: introduced `attach_dist` input in `publish-github-release` action (8ff9cf1 by George Shestayev)
* New: introduced self workflow to publish releases for the `continuous-integration` repo
* Update: `update-changelog` action won't complain if changelog file doesn't exist (e0c12a8 by George Shestayev)
* Update: `publish-github-release` will use `update-changelog` action in `raw` mode to retrieve body of the release (e0c12a8 by George Shestayev)
* Update: changed actions used in `publish-github-release` - got rid of zip action, changed release to better supported (8ff9cf1 by George Shestayev)

## v1.1.8

* Fix: fixed bug in changelog processing
* Fix: switch to proper access token for publishing releases

## v1.1.9

* New: added `build_command` and `build_path` inputs to `prepare-release` workflow
* New: added NODE_AUTH_TOKEN secret to `prepare-release` workflow
* New: `prepare-release` workflow will install npm and composer dependencies always, so the building process can use them
* Update: improved caching Composer and NPM dependencies in `prepare-release`, `publish-npm` and `qa-checks` workflows
* Update: improved triggers for self-prepare-release workflow

## v1.1.10

* Fix: fixed job name in `publish-npm` workflow (a7640a4 by George Shestayev)
* Update: added additional output for `update-changelog` action to ease up debugging (ed051c4 by George Shestayev)
* Update: added .gitattributes file (7d5307c by George Shestayev)
* Update: cleaning git before committing updates on release preparation (7d5307c by George Shestayev)
* Improved code for changelog generation on github release publication (#5) (7d5307c by George Shestayev)

## v1.1.11

* Fix: fixed `publish-github-release` to properly retrieve changelog (b858448 by George Shestayev)
* Update: improved `update-changelog` action to allow changelog retrieval between any two tags (b858448 by George Shestayev)

## v1.1.12

* Update: improving remote git reset process in `deploy` workflow to be compatible with tags and commit hashes (a78aee8 by George Shestayev)
* Update: improved git commands in `deploy` workflow to fight with divergent branches (8503b1e by George Shestayev)
* Update: turned on xdebug coverage mode in qa-checks CI (2be2d7b by George Shestayev)

## v1.1.13

* Fix: fixed PHP setup code for `qa-checks` (5eee0d8 by George Shestayev)
* New: introduced `prepare-environment` action which parses JSON object and replaces variables in application config (8e9c359 by George Shestayev)
