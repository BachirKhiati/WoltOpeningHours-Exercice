import { dayOfWeekAsString } from './Constants';
import { InputEachDayEntriesType, InputJsonType } from './Input';

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

export interface InputEachDayType {
    day: string;
    entriesArray: Array<InputObjectType>;
}

/**
 * Convert seconds to hours and 12-h format.
 * @returns {object}
 * @param seconds
 */

function sec2time(seconds: number): EachDayHourType {
    let time: number = seconds >= 86399 ? 0 : seconds; // limit check - count 11.59:59 as midnight next day ;
    let hour = Math.floor(time / 60 / 60);
    let period = hour >= 12 ? 'PM' : 'AM';
    hour = hour > 12 ? hour - 12 : hour;
    hour = hour < 1 ? 12 : hour; // midnight case
    return { hour, period };
}

function initTime(): EachDayHourType {
    return { hour: 12, period: 'AM' };
}

function initEachDayEntry(): EachDayEntryType {
    return {
        open: initTime(),
        close: initTime()
    };
}

// pass a json or read the default imported;
// using a different input for the test.
export function Convert(
    input: InputJsonType,
    currentDayArg: number
): Array<NewDatesObjectType> {
    const json: Array<[
        string,
        Array<InputEachDayEntriesType>
    ]> = Object.entries(input);
    // final output
    let result: Array<NewDatesObjectType> = [];

    // initials
    let potentialNextDay: EachDayEntryType = initEachDayEntry();

    // case store still from Sunday to Monday
    let wasStillOpenTillMonday = false;
    let mondayPotentialEntry: EachDayEntryType = initEachDayEntry();
    const weekLastIndex = json.length - 1;

    let currentDayOfWeek = dayOfWeekAsString(
        currentDayArg || new Date().getDay()
    );

    // used when iterating between days
    let isStillOpen = false;

    // iterate days
    json.forEach(
        (
            [day, entriesArray]: [string, Array<InputEachDayEntriesType>],
            dayIndex: number
        ) => {
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
            entriesArray.forEach((obj, entryIndex) => {
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
                        result[result.length - 1].isClosed = false;
                        result[result.length - 1].time.push(potentialNextDay);
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
                result.push(dayEntry);
            }
        }
    );
    return result;
}
