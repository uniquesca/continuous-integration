import core from "@actions/core";
import fs from "fs";
import process from "process";
import {CiEnvironment} from "../src/classes/CiEnvironment.js";
import {CiEnvVariableMapper} from "../src/classes/CiEnvVariableMapper.js";

const variables = core.getInput('env_variables');
let variablesParsed = JSON.parse(variables);
if (!variablesParsed) {
    variablesParsed = {};
}

const env = CiEnvironment.fromEnvironmentFile();
const configStub = env.env_file_stub;
const config = env.env_file;
if (config == '') {
    throw new Error('Environment file is not defined!');
}

core.info(variablesParsed);
const envMapper = new CiEnvVariableMapper(variablesParsed, env);
variablesParsed = envMapper.map();

if (configStub !== '') {
    fs.copyFileSync(configStub, config);
}

let configContent = fs.readFileSync(config, 'utf8');

core.info(variablesParsed);
for (const key of Object.keys(variablesParsed)) {
    let value = variablesParsed[key];
    // Process was simplified, no need for the below part
    const patternRegex = '[\${ ]*[' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w\.-_][\$} ]*';
    const regex = new RegExp(patternRegex, 'g');
    configContent = configContent.replaceAll(regex, value);
    core.info(configContent);
}

fs.writeFileSync(config, configContent);

