const fs = require('fs');
const readline = require('readline');
const cp = require('child_process');

// Prepare regex based on version
function versionToRegex(version) {
    const pattern = '^[ \\t]*#*[ \\t]*v?[ \\t]*' + version.replaceAll('.', '\\.');
    return new RegExp(pattern, 'gm');
}

// If changelog already has information about target version changes, clean it up
function cleanupChangelogIfAlreadyHasTargetVersion(changelogContents, targetVersion) {
    // Define the regex pattern to match
    const regex = versionToRegex(targetVersion);

    // Split by the regex
    const changelogParts = changelogContents.split(regex);
    //console.log(changelogParts);
    if (changelogParts.length > 0) {
        // Is split successful, we need only first part
        changelogContents = changelogParts[0];
    }

    return changelogContents.trimEnd();
}

// Normalize changelog format to be markdown compatible
function normalizeChangelog(changelogContents) {
    // Normalize whitespaces around stars
    changelogContents = changelogContents.replaceAll(/^\s*\*\s*/gm, '* ');

    // Add absent stars
    changelogContents = changelogContents.replaceAll(/^[ \t]*(\w)/gm, '* $1');

    // Normalize headers
    changelogContents = changelogContents.replaceAll(/^[ \t]*#*[ \t]*v?[ \t]*(\d+)/gm, '## v$1');

    // Replace more than two linebreaks with one
    changelogContents = changelogContents.replaceAll(/[\n\r(?:\r\n)\v]{2,}/gm, "\n");

    // Adding line breaks around headers
    changelogContents = changelogContents.replaceAll(/^(##.*)$/gm, "\n$1\n");

    return changelogContents;
}

// Normalizes output given by the git log
function normalizeGitLog(gitLogContents) {
    return gitLogContents.replaceAll(/^[\t ]*\*[\t ]*\*[\t ]*/gm, "* ");
}

function getGitLogSinceLastTag() {
    const lastVersionCommand = "git describe --abbrev=0 --tags";
    const lastVersion = cp.execSync(lastVersionCommand);
    const command = "git log --no-merges " + lastVersion.toString().trim() + "..HEAD --pretty=format:'* %s (%h by %an)' | grep -i -v -E 'documentation|refactoring'";
    return cp.spawnSync('sh', [command]);
}

function appendChangeLog(changelogContents, targetVersion) {
    const gitLog = getGitLogSinceLastTag();
    changelogContents = changelogContents + "\n\n## v" + targetVersion + "\n\n";
    if (gitLog.length) {
        changelogContents = changelogContents + normalizeGitLog(gitLog) + "\n";
    }
    return changelogContents;
}

function validateVersion(version) {
    return /^\d+\.\d+\.\d+$/.test(version);
}

const changelogPath = process.argv[2];
const targetVersion = process.argv[3];
if (!changelogPath || !targetVersion) {
    console.error('Usage: node changelog.js CHANGELOG_PATH TARGET_VERSION');
    process.exit(1);
}

if (!validateVersion(targetVersion)) {
    console.error('Target version ' + targetVersion + ' does not seem to be correct version.');
    process.exit(1);
}

if (!fs.existsSync(changelogPath)) {
    console.error('Changelog file ' + changelogPath + ' not found.');
    process.exit(1);
}

let changelogContents = fs.readFileSync(changelogPath).toString();
changelogContents = cleanupChangelogIfAlreadyHasTargetVersion(changelogContents, targetVersion);
changelogContents = normalizeChangelog(changelogContents);
changelogContents = appendChangeLog(changelogContents, targetVersion);

fs.writeFileSync(changelogPath, changelogContents);
console.log('Changelog updated');

