const core = require('@actions/core');

try {
    const env = CiEnvironment.fromEnvironmentFile();
    core.setOutput("matrix", JSON.stringify(env.job_matrix));
} catch (error) {
    core.setFailed(error.message);
}
