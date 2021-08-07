// TODO: what is the problem with this shittttttt
// Requires
const { readCredentials, insertEvent } = require("../auth/auth.js");
const { parseAnswers, isValidDate, isLeap } = require("./validation.js");

const inquirer = require("inquirer");

// VARIABLES DECLARATION
// valid years range
const VALIDYEARS = [new Date().getFullYear(), 9999];
let YEAR, MONTH;
let answers;

/**
 * Inquires for input in order to create an event object
 * @return {event Object} Event object with input entered by user
 */
// Create the questions
const questions = [
    {
        type: "input",
        name: "name",
        message: "Enter the name of the event",
        validate(name) {
            return /^[A-Za-z0-9 _.,;:!"'/$]*/.test(name);
        },
    },
    {
        type: "input",
        name: "description",
        message: "Enter the description of the event",
        validate(description) {
            return /^[A-Za-z0-9 _.,;:!"'/$]*/.test(description);
        },
    },
    {
        type: "input",
        name: "month",
        message: "Enter the month of the event (number)",
        validate(month) {
            let pass = true;
            let isNan = true;
            try {
                isNan = isNaN(parseInt(month));
            } catch (TypeError) {
                isNan = false;
            }
            if (isNan || month < 1 || month > 12) {
                pass = false;
            }
            if (pass) {
                MONTH = month;
                return true;
            }
            return "Please enter a valid month";
        },
    },
    {
        type: "input",
        name: "year",
        message: "Enter the year of the event (number)",
        validate(year) {
            let pass = true;
            let isNan = true;
            try {
                isNan = isNaN(parseInt(year));
            } catch (TypeError) {
                isNan = false;
            }
            if (isNan || year < VALIDYEARS[0] || year > VALIDYEARS[1]) {
                pass = false;
            }
            if (pass) {
                YEAR = year;
                return true;
            }
            return "Please enter a valid year";
        },
    },
    {
        type: "input",
        name: "day",
        message: "Enter the day of the event (number)",
        validate(day) {
            let isNan = true;
            try {
                isNan = parseInt(day);
            } catch (TypeError) {
                isNan = false;
            }
            const pass = isValidDate(day, MONTH, YEAR) && isNan;

            if (pass) {
                return true;
            }

            return "Please enter a valid day";
        },
    },
    {
        type: "input",
        name: "reminder",
        message: "Days before the event to get a reminder",
        default: "0",
        validate(days) {
            return /^[0-9]/.test(days);
        },
    },
    {
        type: "input",
        name: "startHour",
        message: "Enter the start hour of the event",
        default: "12:00",
        validate(hour) {
            return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(hour);
        },
    },
    {
        type: "input",
        name: "endHour",
        message: "Enter the end hour of the event",
        default: "17:00",
        validate(hour) {
            return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(hour);
        },
    },
];
// TODO: fix this!!
inquirer.prompt(questions).then((answers) => {
    console.log("\n 🧞 Creating Event For Google Calendar ...");
    answers = parseAnswers(answers);
});

const eventObject = {
    calendarId: "primary",
    requestBody: {
        summary: answers.name,
        location: "",
        description: answers.description,
        start: {
            dateTime: new Date(
                answers.year,
                answers.month,
                answers.day,
                answers.shour,
                answers.sminutes
            ), //"2015-05-28T09:00:00-07:00",
            timeZone: "America/Santiago",
        },
        end: {
            dateTime: answers.date[1],
            timeZone: "America/Santiago",
        },
        recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
        attendees: [],
        reminders: {
            useDefault: false,
            overrides: [
                { method: "email", minutes: answers.reminder * 24 * 60 },
                { method: "popup", minutes: 60 },
            ],
        },
    },
};

const oAuth2Client = readCredentials();
insertEvent(eventObject, oAuth2Client);
