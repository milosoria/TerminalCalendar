// Requires
var gapi = require("gapi");
const secrets = require("secrets.json");
// Set client info and api token with gapi
function authorize(){
	gapi.setAPiKey(secrets.api_key)
	gapi.auth.authorize(
		{
		client_id: secrets.client_id, 
		scope: secrets.scopes	
	}, (authResult) => {
		if (authResult && !authResult.error) {
			console.log("Auth was successful!✍️");
		} else {
			console.log("Auth was not successful⁉️");
		}
	})
}
const eventTags = {
	casual: 1440,
	important: 4320,
	must: 7200
};
const eventRegex = {
	date: /^(\d{1,2})-(\d{1,2})-(\d{4})$/,
	hour: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
};
// require event name, date, hour, use one of these tags [casual, important, must] -> [notify email: 1 day before, 3 day before, 1 week before]
// Example command line: 'Meeting' 19-2-2021 16:40 must
const start = new Date(...process.argv[1].split('-'));
const end = new Date;
let args = {
	date: [, process.argv[2]],

};

const eventCreator = (args) => {
	var event = {
		summary: args.name,
		location: "",
		description: "",
		start: {
			dateTime: args.date[0], //"2015-05-28T09:00:00-07:00",
			timeZone: "America/Santiago",
		},
		end: {
			dateTime: args.date[1], //"2015-05-28T17:00:00-07:00",
			timeZone: "America/Santiago",
		},
		recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
		attendees: [],
		reminders: {
			useDefault: false,
			overrides: [
				{ method: "email", minutes: eventTags[args.importance] },
				{ method: "popup", minutes: 60 },
			],
		},
	};
};

var request = gapi.client.calendar.events.insert({
	calendarId: "primary",
	resource: event,
});

request.execute(function (event) {
	appendPre("Event created: " + event.htmlLink);
});
async function CreateEvent() {
	const response = await fetch(url, {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	});
}
