import {CiEnvironment} from "./CiEnvironment.js";

export class CiEnvVariableMapper {
    variables = {};
    environment = new CiEnvironment({});

    constructor(variables, environment) {
        this.variables = variables;
        this.environment = environment;
    }

    map() {
        const result = {};
        for (const key in this.variables) {
            core.info("Processing variable: " + key);
            if (this.environment.token_mappings.hasOwnProperty(key)) {
                result[this.environment.token_mappings[key]] = this.variables[key];
                core.info("Mapping found: " + this.environment.token_mappings[key]);
            } else {
                result[key] = this.variables[key];
                core.info("Mapping not found.");
            }
        }
        return result;
    }
}
