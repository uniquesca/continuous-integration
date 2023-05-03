# Uniques CI/CD tools

This repository offer various tools to automate CI/CD with minimum code.

## QA Checks - reusable workflow

Located in .github/workflows/qa-checks.yml. Runs PHPUnit, PHP Codesniffer and Psalm based on presence of configuration file in the repository. OS and PHP
version and extensions should be described in ci.json file in the root of calling repository.

Documentation: https://doc.dev-uniques.ca/ci/qa-checks

## Deploy - reusable workflow

Located in .github/workflows/deploy.yml. Logs in to a dev server using provided configuration, and in the working directory
performs update from git, optionally runs Phinx and cleans cache. Can also execute custom command post-deployment.

Documentation: https://doc.dev-uniques.ca/ci/deploy

## Publish NPM - reusable workflow

Located in .github/workflows/public-npm.yml. Publishes NPM package according to package.json settings 
and does release on github. 

Documentation: https://doc.dev-uniques.ca/ci/publish-npm

## Prepare Release - reusable workflow (to be documented)

## MySQL Import - action (to be documented)

## MySQL Export - action (to be documented)

## Update Changelog - action (to be documented)

## Reference

[GitHub reusable workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
[Uniques Coding Standard](https://github.com/uniquesca/uniques-coding-standard)
