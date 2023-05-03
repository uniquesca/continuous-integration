# Uniques CI Changelog

## v1.0.0

* New: created `deploy`, `publish-npm` and `qa-checks` reusable workflows;
* New: created `mysql-import`, `mysql-export` and `update-changelog` reusable actions;

## v1.1.0

* Fix: fixed changelog sorting (e1f4ecb by George Shestayev)
* Automatic commit for the new release: #941b056ab342cd3b20123a78116b72153fcd929f (d0c0115 by GitHub Actions)
* Fix: fixed `prepare-release` CI pipeline call (941b056 by George Shestayev)
* Fix: fixed `prepare-release` CI pipeline call (f7392ba by George Shestayev)
* Fix: fixed `prepare-release` CI pipeline call (80e80e0 by George Shestayev)
* BREAKING: QA checks now uses only explicitly specified secrets (807df62 by George Shestayev)
* Fix: fixed `prepare-release` CI pipeline call (807df62 by George Shestayev)
* Documentation: minor improvement in changelog format, updated readme (87a0358 by George Shestayev)
* Created `prepare-release` reusable GHA workflow (#3) (771606f by Ihor Ziubrovskyi)
* Co-authored-by: Ihor Ziubrovskyi <ihor@uniques.ca> (771606f by Ihor Ziubrovskyi)
* Fix: renamed workflow for preparing release in the CI repo to prevent conflict with the reusable workflow (fd7a837 by George Shestayev)
* Fix: fixed caching dependencies in `publish-npm` packages for the packages without lock file (217ab26 by George Shestayev)
* New: added sorting resulting changelog (54ec89c by George Shestayev)
* Fix: fixed caching Composer dependencies for the libraries which don't have lock file (4691894 by George Shestayev)
* Update: added integration with the `prepare-release` pipeline (4691894 by George Shestayev)
* Update: deploy workflow will remove unindexed files now (9da66ed by George Shestayev)
