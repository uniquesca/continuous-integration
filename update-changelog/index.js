import core from "@actions/core";
import fs from "fs";
import { updateChangelog, generateChangelog } from "../src/changelog.js";
import { getLastTag, getTag } from "../src/git.js";

const changelogPath = core.getInput('changelog_path');
const targetVersion = core.getInput('target_version');
const mode = core.getInput('mode');
const offset = core.getInput('offset');
if (!changelogPath || !targetVersion) {
    console.error('Usage: node changelog.js CHANGELOG_PATH TARGET_VERSION ["normal"|"raw"] [OFFSET]');
    process.exit(1);
}

if (!mode) {
    mode = 'normal';
}

let startTag, endTag;
if (!offset) {
    offset = 0;
    startTag = getLastTag();
    endTag = 'HEAD';
}
else {
    startTag = getTag(Number(offset) + 1);
    endTag = getTag(offset)
}

if (mode == 'raw') {
    console.log('Generating raw changelog...')
    const changelog = generateChangelog(startTag, endTag);
    fs.writeFileSync(changelogPath, changelog);
} else {
    console.log('Updating changelog in normal (non-raw) mode...')
    updateChangelog(changelogPath, targetVersion, startTag, endTag);
}
