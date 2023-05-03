import core from "@actions/core";
import { updateChangelog } from "../src/changelog.js";

const changelogPath = core.getInput('changelog_path');
const targetVersion = core.getInput('target_version');
if (!changelogPath || !targetVersion) {
    console.error('Usage: node changelog.js CHANGELOG_PATH TARGET_VERSION');
    process.exit(1);
}

updateChangelog(changelogPath, targetVersion);
