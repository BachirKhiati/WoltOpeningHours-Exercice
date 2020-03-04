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

function checkArrayEmpty(
    day: string,
    enteries: Array<InputEachDayEntriesType>
) {
    if ((day && !Array.isArray(enteries)) || !enteries.length) {
        return true;
    }
    return false;
}

function setStoreClosed(
    day: string,
    isToday: boolean,
    result: Array<NewDatesObjectType>
) {
    result.push({
        day,
        isToday,
        time: [],
        isClosed: true
    });
    return result;
}
function dayLoop(
    day: string,
    enteries: Array<InputEachDayEntriesType>,
    isToday: boolean,
    result: Array<NewDatesObjectType>
) {
    let openTime = initTime();
    let closeTime = initTime();
    let eachDayTimeEntries: Array<EachDayEntryType> = [];
    enteries.forEach(obj => {
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
    result.push({
        day,
        isToday,
        time: eachDayTimeEntries,
        isClosed: false
    });

    return result;
}

function orderJson(json: Array<[string, Array<InputEachDayEntriesType>]>) {
    const lastIndexJson = json.length - 1;
    json.forEach(([, enteries], indexDay) => {
        if (!Array.isArray(enteries) || !enteries.length) {
            return;
        }
        const lastIndexEnteries = enteries.length - 1;
        enteries.forEach((entry, i) => {
            if (lastIndexEnteries === i && entry.type === 'open') {
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
    currentDayArg: number
): Array<NewDatesObjectType> {
    let res: Array<NewDatesObjectType> = [];
    let json: Array<[string, Array<InputEachDayEntriesType>]> = Object.entries(
        input
    );
    let currentDayOfWeek = dayOfWeekAsString(
        currentDayArg || new Date().getDay()
    );
    // refactor Json
    json = orderJson(json);
    json.forEach(([day, enteries]) => {
        const isToday = currentDayOfWeek === day;
        if (!checkArrayEmpty(day, enteries)) {
            res = dayLoop(day, enteries, isToday, res);
        } else {
            res = setStoreClosed(day, isToday, res);
        }
    });
    console.log('res');
    console.log(res);
    return res;
}
