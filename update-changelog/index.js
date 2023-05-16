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

console.log(raw);
if (raw == 'true' || raw == '1') {
    console.log('Generating raw changelog...')
    const changelog = getChangelog();
    console.log(changelog)
    fs.writeFileSync(changelogPath, changelog);
} else {
    console.log('Updating changelog in normal (non-raw) mode...')
    updateChangelog(changelogPath, targetVersion);
}
