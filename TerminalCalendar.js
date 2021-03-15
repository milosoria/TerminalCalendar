// print process.argv
// require event name, date, hour, use one of these tags [casual, important, must] -> [notify email: 1 day before, 3 day before, 1 week before]
// Example command line: 'Meeting' 19-2-2021 16:40 must
process.argv.forEach((val, index, array) => {
	console.log(index + ": " + val);
});
const eventTags = {
    casual : 1440,
    important : 4320,
    must : 7200 
}
const eventRegex = {
	date: /^(\d{1,2})-(\d{1,2})-(\d{4})$/,
	hour: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
};
var event = {
	summary: "Google I/O 2015",
	location: "800 Howard St., San Francisco, CA 94103",
	description: "A chance to hear more about Google's developer products.",
	start: {
		dateTime: "2015-05-28T09:00:00-07:00",
		timeZone: "America/Los_Angeles",
	},
	end: {
		dateTime: "2015-05-28T17:00:00-07:00",
		timeZone: "America/Los_Angeles",
	},
	recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
	attendees: [],
	reminders: {
		useDefault: false,
		overrides: [
			{ method: "email", minutes: 24 * 60 },
			{ method: "popup", minutes: 60 },
		],
	},
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
