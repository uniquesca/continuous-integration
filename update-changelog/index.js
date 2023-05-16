import core from "@actions/core";
import fs from "fs";
import { updateChangelog, getChangelog } from "../src/changelog.js";

const changelogPath = core.getInput('changelog_path');
const targetVersion = core.getInput('target_version');
const raw = core.getInput('raw');
if (!changelogPath || !targetVersion) {
    console.error('Usage: node changelog.js CHANGELOG_PATH TARGET_VERSION RAW');
    process.exit(1);
}

if (raw) {
    const changelog = getChangelog();
    fs.writeFileSync(changelogPath, changelog);
} else {
    updateChangelog(changelogPath, targetVersion, raw);
}
