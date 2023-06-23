import core from "@actions/core";
import fs from "fs";
import process from "process";

const configStub = core.getInput('config_stub_file');
const config = core.getInput('config_file');
const replacements = core.getInput('environment_variables');
const environment_token_format = core.getInput('environment_token_format');
const config_file_encoding = core.getInput('config_file_encoding');

const replacementsParsed = JSON.parse(replacements);
if (!replacementsParsed) {
    replacementsParsed = {};
}

if (configStub !== '') {
    fs.copyFileSync(configStub, config);
}

let configContent = fs.readFileSync(config, config_file_encoding);

for (const key of Object.keys(replacementsParsed)) {
    let value = replacementsParsed[key];
    const patternRegex = new RegExp(environment_token_format);
    const pattern = environment_token_format.replace('$token', key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(pattern, 'g');
    configContent = configContent.replaceAll(regex, value);
}

fs.writeFileSync(config, configContent);

