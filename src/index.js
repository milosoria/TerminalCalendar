// Requires
const { google } = require("googleapis");
const fs = require("fs");
const readline = require("readline");
const inquirer = require("inquirer");

// Validation of the day, month and year entered https://www.geeksforgeeks.org/program-check-date-valid-not/
    // valid years range
const VALIDYEARS = [new Date().getFullYear(), 9999];

// Returns true if the year is valid
function isLeap(year) {
    // Return true if year
    // is a multiple pf 4 and
    // not multiple of 100.
        // OR year is multiple of 400.
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

// Returns true if given
// year is valid or not.
    function isValidDate(d, m, y) {
        // If year, month and day
        // are not in given range
        if (y > VALIDYEARS[1] || y < VALIDYEARS[0]) return false;

        if (m < 1 || m > 12) return false;
        if (d < 1 || d > 31) return false;

        // Handle February month
        // with leap year
        if (m == 2) {
            if (isLeap(y)) return d <= 29;
            else return d <= 28;
        }

        // Months of April, June,
            // Sept and Nov must have
        // number of days less than
        // or equal to 30.
            if (m == 4 || m == 6 || m == 9 || m == 11) return d <= 30;

        return true;
    }
// vaiables to use to validate day, after year adn month are entered
let YEAR, MONTH;

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
    // TODO: require start hour and end hour
    {
        type: "input",
            name: "reminder",
            message:
        "Days before the event to get a reminder (enter the number of days or 0 to disable the reminder)",
            validate(days) {
                return /^[0-9]/.test(days);
            },
    },
];

inquirer.prompt(questions).then((answers) => {
    console.log("\n 🧞 Creating Event For Google Calendar ...");
    console.log(JSON.stringify(answers, null, "  "));
});

// Finally, args will contain the name of the event, the date, the start hour and end hour and the number of days for the email reminder
// const args = {
    //     date: [
        //         new Date(year, parseInt(month) - 1, day, shour, sminutes),
        //         new Date(year, parseInt(month) - 1, day, ehour, eminutes),
        //     ],
    //     importance: parseInt(process.argv[6]),
    //     name: process.argv[2],
    // };
// // With the args we define our event object
// const event = {
    //     calendarId: "primary",
    //     requestBody: {
        //         summary: args.name,
        //         location: "",
        //         description: "",
        //         start: {
            //             dateTime: args.date[0], //"2015-05-28T09:00:00-07:00",
            //             timeZone: "America/Santiago",
            //         },
        //         end: {
            //             dateTime: args.date[1], //"2015-05-28T17:00:00-07:00",
            //             timeZone: "America/Santiago",
            //         },
        //         recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
        //         attendees: [],
        //         reminders: {
            //             useDefault: false,
            //             overrides: [
                //                 { method: "email", minutes: args.importance * 24 * 60 },
                //                 { method: "popup", minutes: 60 },
                //             ],
            //         },
        //     },
    // };
