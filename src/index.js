import {
    readCredentials,
    insertEvent
} from "../auth/auth.js";

import {inquirerPrompt} from "./inquire.js";

const eventObject = inquirerPrompt();

const oAuth2Client = readCredentials();

insertEvent(eventObject,oAuth2Client);
