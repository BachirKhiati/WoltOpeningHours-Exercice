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
    day: string;
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

function checkArrayEmpty(day: string, entries: Array<InputEachDayEntriesType>) {
    if ((day && !Array.isArray(entries)) || !entries.length) {
        return true;
    }
    return false;
}

function setStoreClosed(day: string, isToday: boolean) {
    return {
        day,
        isToday,
        time: [],
        isClosed: true
    };
}

function setStoreData(
    day: string,
    isToday: boolean,
    entries: Array<EachDayEntryType>,
    isClosed: boolean
) {
    return {
        day,
        isToday,
        time: entries,
        isClosed
    };
}
function dayLoop(entries: Array<InputEachDayEntriesType>) {
    let openTime = initTime();
    let closeTime = initTime();
    let eachDayTimeEntries: Array<EachDayEntryType> = [];
    entries.forEach(obj => {
        if ('type' in obj && 'value' in obj) {
            // specific check in case of empty value or invalid...
            const isOpen = obj.type === 'open';
            const isClose = obj.type === 'close';
            if (isOpen) {
                openTime = sec2time(obj.value);
            } else if (isClose) {
                closeTime = sec2time(obj.value);
                eachDayTimeEntries.push({
                    open: openTime,
                    close: closeTime
                });
            }
        }
    });

    return eachDayTimeEntries;
}

function orderJson(json: Array<[string, Array<InputEachDayEntriesType>]>) {
    const lastIndexJson = json.length - 1;
    json.forEach(([, entries], indexDay) => {
        if (!Array.isArray(entries) || !entries.length) {
            return;
        }
        const lastIndexEntries = entries.length - 1;
        entries.forEach((entry, i) => {
            if (lastIndexEntries === i && entry.type === 'open') {
                if (lastIndexJson === indexDay) {
                    const last = json[0][1][0];
                    json[0][1].shift();
                    json[lastIndexJson][1].push(last);
                } else {
                    const last = json[indexDay + 1][1][0];
                    json[indexDay + 1][1].shift();
                    json[indexDay][1].push(last);
                }
            }
        });
    });
    return json;
}

export function Convert(
    input: InputJsonType,
    currentDayArg?: number
): Array<NewDatesObjectType> {
    let json: Array<[string, Array<InputEachDayEntriesType>]> = Object.entries(
        input
    );
    let currentDayOfWeek = dayOfWeekAsString(
        currentDayArg || new Date().getDay()
    );
    // refactor Json
    json = orderJson(json);
    const res: Array<NewDatesObjectType> = json.map(([day, entries]) => {
        const isToday = currentDayOfWeek === day;
        if (!checkArrayEmpty(day, entries)) {
            return setStoreData(day, isToday, dayLoop(entries), false);
        }
        return setStoreClosed(day, isToday);
    });
    return res;
}
