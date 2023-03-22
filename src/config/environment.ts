"use strict";

import * as dotenv from "dotenv";
import * as fs from 'fs';
import * as path from "path";

const ENVIRONMENT = process.env.NODE_ENV.trim();

switch (ENVIRONMENT) {
    case "dev":
    case "development": {
        if (fs.existsSync(path.join(process.cwd(), "/.env.development"))) {
            dotenv.config({ path: ".env.development"});
        }else{
            console.log("Unable to find .env.development File");
            process.exit(1);
        }
        break;
    }
    case "qa": {
        if (fs.existsSync(path.join(process.cwd(), "/.env.qa"))) {
            dotenv.config({ path: ".env.qa" })
        } else {
            console.log("Unable to find .env.qa file");
            process.exit(1);
        }
        break;
    }
    case "stag": 
    case "staging": {
        if (fs.existsSync(path.join(process.cwd(), "/.env.staging"))) {
            dotenv.config({ path: ".env.staging" });            
        } else {
            console.log("Unable to find .env.staging file");
            process.exit(1);
        }
        break;
    }
    case "preprod": {
        if (fs.existsSync(path.join(process.cwd(), "/.env.preprod"))) {
            dotenv.config({ path: ".env.preprod" });
        } else {
            console.log("Unable to find .env.preprod file");
            process.exit(1);
        }
        break;
    }
    case "prod": 
    case "production": {
        if (fs.existsSync(path.join(process.cwd(),"/.env.production"))) {
            dotenv.config({ path: ".env.production" });
        } else {
            console.log("Unable to find .env file");
            process.exit(1);
        }
        break;
    }
    case "default": {
        if (fs.existsSync(path.join(process.cwd(),"/.env.default"))) {
            dotenv.config({ path: ".env.default" });
        } else {
            console.log("Unable to find .env.default file");
            process.exit(1);
        }
        break;
    }
    case "local": {
        if (fs.existsSync(path.join(process.cwd(), "/.env"))) {
            dotenv.config({ path: ".env" });
        } else {
            console.log("Unable to find .env file");
            process.exit(1);
        }
        break;
    }
    default:{
        fs.existsSync(path.join(process.cwd(), "/.env")) ? dotenv.config({ path: ".env" }) : process.exit(1);
    }
    break;
}

export const SERVER = Object.freeze({
    APP_NAME: "NODE_ECOMMERCE_BACKEND",
    TEMPLATE_PATH: process.cwd() + "/src/views",
    UPLOAD_DIR: process.cwd() + "src/uploads",
    LOGIN_TOKEN_EXPIRATION_TIME: 180 * 24 * 60 * 60 * 1000,
    JWT_CRET_KEY: "seff(-=~!Sd)",
    SALT_ROUND: 10,
    ENC: "qwew1234FHR@#$%2",
    JWT_ALGO: "HS256",
    CHUNK_SIZE: 1000,
    APP_URL: process.env['APP_URL'],
    API_KEY: 1234,
    ENVIRONMENT: process.env['ENVIRONMENT'],
    IP: process.env['IP'],
    PORT: process.env['PORT'],
    IS_REDIS_ENABLE: true,
    IS_TRANSLOAD_ENABLE: true,
});