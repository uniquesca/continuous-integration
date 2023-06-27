import core from "@actions/core";
import fs from "fs";
import process from "process";
import {CiEnvironment} from "../src/classes/CiEnvironment.js";
import {CiEnvVariableMapper} from "../src/classes/CiEnvVariableMapper.js";

// Retrieving environment from the file
const env = CiEnvironment.fromEnvironmentFile();

// Checking config file path - firstly from intput, then - from environment file
let config = core.getInput('env_config');
if (!config || config == '') {
    config = env.env_file;
}
if (!config || config == '') {
    throw new Error('Environment file path is not defined!');
}

// Copying stub file if exists - firstly from intput, then - from environment file
let configStub = core.getInput('env_config_stub');
if (!configStub || configStub == '') {
    configStub = env.env_file_stub;
}
if (configStub !== '' && fs.existsSync(configStub)) {
    fs.copyFileSync(configStub, config);
}

// Preparing replacements
const variables = core.getInput('env_variables');
console.log(variables);
let variablesParsed = JSON.parse(variables);
if (!variablesParsed) {
    variablesParsed = {};
}
console.log(JSON.stringify(variablesParsed));
const envMapper = new CiEnvVariableMapper(variablesParsed, env);
variablesParsed = envMapper.map();

let configContent = fs.readFileSync(config, 'utf8');

console.log(JSON.stringify(variablesParsed));
for (const key of Object.keys(variablesParsed)) {
    let value = variablesParsed[key];
    // Process was simplified, no need for the below part
    const patternRegex = '[\${ ]*[' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w\.-_][\$} ]*';
    const regex = new RegExp(patternRegex, 'g');
    configContent = configContent.replaceAll(regex, value);
    core.info(configContent);
}

fs.writeFileSync(config, configContent);

