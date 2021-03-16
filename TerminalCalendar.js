// Requires
const { google } = require("googleapis");
const calendar = google.calendar('v3');
// require event name, date, hour, use one of these tags [casual, important, must] -> [notify email: 1 day before, 3 day before, 1 week before]
// Example command line: $1 'Meeting' $2 19-2-2021 $3 16:40 $4 16:50 $5 must
const eventTags = {
	casual: 1440,
	important: 4320,
	must: 7200,
};
let [day,
month,
year] = process.argv[3].split("-"); // DATE
let [shour, sminutes] = process.argv[4].split(":"); // START HOUR
let [ehour, eminutes] = process.argv[5].split(":"); // END HOUR
let args = {
	date: [
		new Date(year, month, day, shour, sminutes),
		new Date(year, month, day, ehour, eminutes),
	], 
	importance: process.argv[6]
};
console.log()
// Main auth flow
async function main(args) {
	const auth = new google.auth.GoogleAuth({
	keyFile: 'ambient-sum-307718-c8c2114ef0eb.json',
	scopes: ["https://www.googleapis.com/auth/calendar"],
	});
	const authClient = await auth.getClient();
	// Acquire an auth client, and bind it to all future calls
	google.options({ auth: authClient });
	const res = await calendar.events.insert({
		calendarId: "primary",
		requestBody: {
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
			attendees: ["camilo.soria@uc.cl"],
			reminders: {
				useDefault: false,
				overrides: [
					{ method: "email", minutes: eventTags[args.importance] },
					{ method: "popup", minutes: 60 },
				],
			},
		},
	})
	return res;
}
// Function call
try{
	main(args).catch((reason)=>{
		console.log(reason)
	});
} catch (e){
	console.log(`Error 😡 found: ${e}`)
}