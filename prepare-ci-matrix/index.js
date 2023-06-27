import core from "@actions/core";
import {CiEnvironment} from "../src/classes/CiEnvironment.js";

try {
    const env = CiEnvironment.fromEnvironmentFile();
    core.setOutput("matrix", JSON.stringify(env.job_matrix));
} catch (error) {
    core.setFailed(error.message);
}
