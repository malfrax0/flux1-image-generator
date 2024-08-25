import { configDotenv } from "dotenv";

configDotenv();

const EnvVariable = {
    "API_PORT": 3000,
}

const env = {
    API_PORT: process.env.API_PORT || EnvVariable.API_PORT
};

export default env; 