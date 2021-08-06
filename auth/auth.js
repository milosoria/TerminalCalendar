import fs from 'fs';
import readline from 'readline';
import {google} from 'googleapis';

// Scope needed for event insertion
const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

/**
 * Create an OAuth2 client with the given credentials
 * @param {Object} credentials The authorization client credentials.
 */
function authorize(credentials) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client);
        oAuth2Client.setCredentials(JSON.parse(token));
    });
    return oAuth2Client;
}

/**
 * Get and store new token after prompting for user authorization
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
function getAccessToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error("Error retrieving access token", err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log("Token stored to", TOKEN_PATH);
            });
        });
        return oAuth2Client;
    });
}

/*

    Functions to export

*/

/**
 * Creates event with the given info
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {event Object} Event object with info needed
 */
function insertEvent(event, auth) {
    calendar.events.insert(
        {
            auth: auth,
            calendarId: "primary",
            resource: event,
        },
        function (err, event) {
            if (err) {
                console.log(
                    "There was an error contacting the Calendar service: " + err
                );
                return;
            }
            console.log("Event created: %s", event.htmlLink);
        }
    );
}


/**
 * Load client secrets from a local file.
 */
function readCredentials() {
    let oAuth2Client;
    fs.readFile("credentials.json", (err, content) => {
        if (err) return console.log("Error loading client secret file:", err);
        // Authorize a client with credentials, then call the Google Calendar API.
        oAuth2Client = authorize(JSON.parse(content));
    });
    return oAuth2Client;
}

export {
    readCredentials,
    insertEvent,
}
