const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];
const TOKEN_PATH = "token.json";

/**
* Get and store new token after prompting for user authorization */
function getAccessToken(oAuth2Client,callback) {
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
            if (err)
            return console.error("Error retrieving access token", err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log("Token stored to", TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
* Create an OAuth2 client with the given credentials
* @param {Object} credentials The authorization client credentials.
* @param {function} callback function
*/
function authorize(credentials, event,callback) {
    const { client_secret, client_id, redirect_uris } =
    credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        // this.oAuth2Client is defined here
        callback(event,oAuth2Client);
    });
}

/**
* Load client secrets from a local file.
*/
function readCredentials(event,callback) {
    fs.readFile("credentials.json", (err, content) => {
        if (err)
        return console.log("Error loading client secret file:", err);
        // Authorize a client with credentials, then call the Google Calendar API.
        authorize(JSON.parse(content),event,callback);
    });
}

/**
* Creates event with the given info
*/
function insertEvent(event,auth) {
    const calendar = google.calendar({
        version: "v3",
        auth: auth,
    });

    calendar.events.insert(
        {
            auth: auth,
            calendarId: "primary",
            requestBody: event,
        },
        (err, event) => {
            if (err) {
                console.log(
                    "There was an error contacting the Calendar service: " +
                        err
                );
                return;
            }
            console.log("Event created: %s", event);
        }
    );
}


module.exports = {
    readCredentials,
    insertEvent
}
