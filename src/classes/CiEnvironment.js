import fs from "fs";
import {CiJob} from "./CiJob.js";


export class CiEnvironment {
    env_file = '';
    env_file_stub = '';
    token_mappings = {};


    // Array of CiJob classes
    job_matrix = [
        new CiJob({
            os: "ubuntu-latest",
            php: {
                version: "8.1",
                extensions: "xdebug"
            }
        })
    ];

    constructor(input) {
        const copy = {...input};

        if (copy.job_matrix) {
            copy.job_matrix = copy.job_matrix.map(jobInfo = new CiJob(jobInfo));
        }

        Object.assign < CiEnvironment, any > (this, copy);
    }

    fromEnvironmentFile() {
        let input = {};
        if (fs.fileExistsSync('_ci_environment.json')) {
            const envString = fs.readFileSync('_ci_environment.json');
            input = JSON.parse(envString);
        }

        return new CiEnvironment(input);
    }
};