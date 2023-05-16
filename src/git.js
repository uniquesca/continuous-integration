import cp from "child_process";

export function getLastTag() {
    const lastTagCommand = "git describe --abbrev=0 --tags";
    return cp.execSync(lastTagCommand).toString().trim();
}

export function getTag(offset) {
    const getTagCommand = "git tag --sort=-creatordate | head -" + offset + " | tail -1";
    const result = cp.spawnSync('sh', ['-c', getTagCommand]);
    return result.stdout.toString().trim();
}