export const LOCALE = 'en-GB';

const MONTH_NUMBER_TO_SHORT_NAME = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
};

export const isSameDay = (first, second) => {
    return first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();
}

const extractTimeAndOffset = (timeWithOffsetString) => { // HH:mm:ssZZ, eg. 21:45:38+02:00, 21:45:38-02:00, 21:45:38Z
    if (timeWithOffsetString[timeWithOffsetString.length - 1] === 'Z') {
        return {
            time: timeWithOffsetString.substring(0, timeWithOffsetString.length - 1),
            offset:'Z'
        };
    }
    const timeOffsetSign = timeWithOffsetString.indexOf('-') > 0 ? '-' : '+';
    const timeOffsetIndex = timeWithOffsetString.indexOf(timeOffsetSign);
    const timeString = timeWithOffsetString.substring(0, timeOffsetIndex);
    const timeOffsetString = timeWithOffsetString.substring(timeOffsetIndex);
    return {
        time: timeString,
        offset: timeOffsetString
    };
}

/**
 * Class parses and stores parts of a date in extended ISO 8601 format with date, time and zone offset.
 * This class helps to access particular datetime parts for formatting and displaying in UI, where we want
 * to always operate on datetime in server zone.
 * Examples of handled dates:
 * - 2020-10-15T13:13:39-03:00
 * - 2020-10-15T13:13:39Z
 * - 2020-10-15T13:13:39+02:00
 */
export class DateTimeOffset {
    constructor(iso8601DateTimeOffsetString) {
        const dateAndTime = iso8601DateTimeOffsetString.split('T');
        const dateString = dateAndTime[0]; // yyyy-MM-dd
        const dateParts = dateString.split('-');
        const timeAndOffset = extractTimeAndOffset(dateAndTime[1]);
        const timeParts = timeAndOffset.time.split(':');
        this.iso8601DateTimeOffsetString = iso8601DateTimeOffsetString;
        this.year = dateParts[0];
        this.month = dateParts[1];
        this.day = dateParts[2];
        this.hours = timeParts[0];
        this.minutes = timeParts[1];
        this.seconds = timeParts[2];
        this.timeOffset = timeAndOffset.offset;
    }

    getEnGbDateTimeOffsetString() {
        return `${this.getEnGbDateString()} ${this.hours}:${this.minutes}:${this.seconds}` + this.timeOffset;
    }

    getEnGbDateString() {
        return `${this.day}/${this.month}/${this.year}`;
    }

    getIsoDateString() {
        return `${this.year}-${this.month}-${this.day}`;
    }

    getSimpleTimeString() {
        return `${this.hours}:${this.minutes}`;
    }

    get shortMonth() {
        return MONTH_NUMBER_TO_SHORT_NAME[this.month];
    }

}
