/**
 * Determines if a year is a leap year
 * @param {year int} year
 */
function isLeap(year) {
    // Return true if year
    // is a multiple pf 4 and
    // not multiple of 100.
    // OR year is multiple of 400.
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

/**
 * Validates wether a date is valid
 * @param {d int} day
 * @param {m int} month
 * @param {y int} year
 */
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

/**
 * Inquires for input in order to create an event object
 * @param {answers Object} answers obtained via inquirer prompt
 */
function parseAnswers(answers) {
    const startTime = answers.startHour.split(":");
    const endTime = answers.endHour.split(":");

    return {
        description: answers.description,
        name: answers.name,
        year: answers.year,
        month: answers.month,
        shour: startTime[0],
        ehour: endTime[0],
        sminutes: startTime[1],
        eminutes: endTime[1],
    };
}

module.exports = {
    parseAnswers,
    isValidDate,
    isLeap
}

