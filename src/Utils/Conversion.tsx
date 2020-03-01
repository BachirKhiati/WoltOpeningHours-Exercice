import { dayOfWeekAsString } from './Constants';
import { JsonType } from './Input';

interface EachDayEntriesType {
    type: string;
    value: string;
}

// each entry time
interface EachDayHourType {
    hour: number;
    period: string;
}

// each day open-close time
export interface EachDayEntryType {
    open: EachDayHourType;
    close: EachDayHourType;
}

export interface NewDatesObjectType {
    date: string;
    isToday: boolean;
    time: Array<EachDayEntryType>;
    isClosed: boolean;
}

export interface InputObjectType {
    open: string;
    close: string;
}

export interface InputArrayType {
    day: string;
    entriesArray: Array<InputObjectType>;
}

export interface InputJsonType {
    day: string;
    entriesArray: Array<InputObjectType>;
}

/**
 * Convert seconds to hours and 12-h format.
 * @returns {object}
 * @param Seconds
 */

function sec2time(Seconds: string): EachDayHourType {
    let parsedValue = parseFloat(Seconds);
    let time: number = parsedValue >= 86399 ? 0 : parsedValue; // limit check - count 11.59:59 as midnight next day ;
    let hour = Math.floor(time / 60 / 60);
    let period = hour >= 12 ? 'PM' : 'AM';
    hour = hour > 12 ? hour - 12 : hour;
    hour = hour < 1 ? 12 : hour; // midnight case
    return { hour, period };
}

function initTime(): EachDayHourType {
    return { hour: 12, period: 'AM' };
}

function initDateEntry(): NewDatesObjectType {
    return {
        date: '',
        isToday: false,
        time: [],
        isClosed: false
    };
}

function initEachDayEntry(): EachDayEntryType {
    return {
        open: initTime(),
        close: initTime()
    };
}

// pass a json or read the default imported;
// using a different input for the test.
export function Convert(input: JsonType): Array<NewDatesObjectType> {
    const json = Object.entries(input);
    // final output
    let result: Array<NewDatesObjectType> = [];

    // initials
    let tempResult: NewDatesObjectType = initDateEntry();
    let potentialNextDay: EachDayEntryType = initEachDayEntry();

    // case store still from Sunday to Monday
    let wasStillOpenTillMonday = false;
    let mondayPotentialEntry: EachDayEntryType = initEachDayEntry();
    const weekLastIndex = json.length - 1;

    let currentDayOfWeek = dayOfWeekAsString(new Date().getDay());

    // used when iterating between days
    let isStillOpen = false;

    // iterate days
    json.forEach(([day, entriesArray]: any, dayIndex: number) => {
        // check in case array is invalid or empty
        if (!Array.isArray(entriesArray) || !entriesArray.length) {
            day &&
                result.push({
                    date: day,
                    isToday: currentDayOfWeek === day,
                    time: [],
                    isClosed: true
                });
            return;
        }

        const lastEntryIndex = entriesArray.length - 1;
        let eachDayTimeEntries: Array<EachDayEntryType> = [];
        let openTime = initTime();
        let closeTime = initTime();

        // iterate entries of each day
        entriesArray.forEach((obj: EachDayEntriesType, entryIndex: number) => {
            if ('type' in obj && 'value' in obj) {
                // specific check in case of empty value or invalid...
                const isOpen = obj.type === 'open';
                const isClose = obj.type === 'close';

                // Monday Check
                if (dayIndex === 0 && entryIndex === 0 && isClose) {
                    wasStillOpenTillMonday = true;
                    mondayPotentialEntry.close = sec2time(obj.value);
                    return;
                }
                // push previous day saved data + the missing close from the next day.
                if (isStillOpen && entryIndex === 0 && isClose) {
                    potentialNextDay.close = sec2time(obj.value);
                    if (typeof tempResult.time !== 'string') {
                        result[result.length - 1].isClosed = false;
                        result[result.length - 1].time.push(potentialNextDay);
                    }
                    return;
                }

                if (isOpen) {
                    openTime = sec2time(obj.value);
                } else if (isClose) {
                    closeTime = sec2time(obj.value);
                    eachDayTimeEntries.push({
                        open: openTime,
                        close: closeTime
                    });
                }

                if (isOpen && entryIndex === lastEntryIndex) {
                    isStillOpen = true;
                    potentialNextDay = {
                        open: openTime,
                        close: initTime()
                    };
                } else if (isClose && entryIndex === lastEntryIndex) {
                    isStillOpen = false;
                }
            }
        });

        const checkEntries = eachDayTimeEntries.length > 0;
        const dayEntry = {
            date: day,
            isToday: currentDayOfWeek === day,
            time: eachDayTimeEntries,
            isClosed: !checkEntries
        };

        // normal entry- close same day
        if (!isStillOpen) {
            result.push(dayEntry);
        } else if (wasStillOpenTillMonday && weekLastIndex === dayIndex) {
            // Still open till Monday
            potentialNextDay.close = mondayPotentialEntry.close;
            dayEntry.time.push(potentialNextDay);
            dayEntry.isClosed = false;
            result.push(dayEntry);
        } else if (weekLastIndex !== dayIndex) {
            // Other day when  still open
            result.push(dayEntry);
            // tempResult = dayEntry;
        }
    });
    return result;
}
