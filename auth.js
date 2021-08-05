// TODO: must fix, change use flow
const token = require("./token.json");
const credentials = require("./credentials.json");

//Get access token func, in case the api_key expires or it's not available
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/calendar.events"],
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
            fs.writeFile("token.json", JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log("Token stored to", "token.json");
            });
            callback(oAuth2Client);
        });
    });
}
// Get o2auth func
function auth() {
    const oAuth2Client = new google.auth.OAuth2(
        credentials.client_id,
        credentials.client_secret,
        credentials.redirect_uris[0]
    );
    oAuth2Client.setCredentials(token);
    oAuth2Client.forceRefreshOnFailure = true;
    return oAuth2Client;
}
// Main flow func: calendar event insertion
async function main(auth, event) {
    const calendar = google.calendar({ version: "v3", auth });
    await calendar.events.insert(event);
}
// Function call
try {
    const Oauth = auth();
    //getAccessToken(Oauth); //if yo need to get the acces token uncomment this line and comment the next one
    main(Oauth, event).catch((reason) =>
        console.log(`😡 Google Calendar Api had something to say:${reason}`)
    );
} catch (e) {
    console.log(`Error 😡 found: ${e}`);
}
