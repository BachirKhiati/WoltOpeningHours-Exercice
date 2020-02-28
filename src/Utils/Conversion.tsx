import Json from './Input.json';
import { dayOfWeekAsString } from './Constants';

interface EachDayObjectType {
    type: string;
    value: string;
}

// each entry time
interface EachDayHourType {
    hour: number;
    convention: string;
}

// each day open-close time
export interface EachDayEntryType {
    open: EachDayHourType;
    close: EachDayHourType;
}

export interface NewDatesObjectType {
    date: string;
    isToday: boolean;
    time: Array<EachDayEntryType> | string;
    isClosed: boolean;
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
    let convention = hour >= 12 ? 'PM' : 'AM';
    hour = hour > 12 ? hour - 12 : hour;
    hour = hour < 1 ? 12 : hour; // midnight case
    return { hour, convention };
}

// pass a json or read the default imported;
// using a different input for the test.
export function Convert(input?: object) {
    let newDatesFormatArray: Array<NewDatesObjectType> = []; // Will contain our new converted output.
    let isOpen = false; // Check if the store is still open at the end of the day - Between days.
    let updatePrevious = false; // serves to update previous day with the "closing" entry.

    // Quick Fix:  Work only in debug mode- part of Chrome V8 engine
    // get current day of the week directly
    // let currentDayOfWeek = new Date()
    //   .toLocaleDateString('en-US', {weekday: 'long'})
    //   .toLowerCase(); //
    // fetch current day as a string. compare it later with json input day.
    let currentDayOfWeek = dayOfWeekAsString(new Date().getDay());
    let openTimeValue: EachDayHourType; // Used in the open/close entries.
    let closeTimeValue: EachDayHourType; // We need this value outside the days loop in case the store is still open over then ext day
    /**
     *  Days loop
     * key: days of the week
     * array: entries for each day
     */
    Object.entries(input || Json).forEach(([day, array]) => {
        let openTimeArray: Array<EachDayEntryType> = []; // Array will contain the output of open/close entries if store closes on the same day
        let { length } = array; // represent how many entries we have each day
        if (length === 0) {
            newDatesFormatArray.push({
                date: day,
                isToday: currentDayOfWeek === day,
                time: 'closed',
                isClosed: true
            }); // if we don't have any entries for the day. the store is "Closed".
            return;
        }
        updatePrevious = isOpen; //  Check if store is still open in the beginning of each day;

        /**
         * Each day open/close entries loop
         * index: index
         * obj: entry of the day open/close
         */
        array.forEach((obj: EachDayObjectType) => {
            isOpen = obj.type === 'open';
            if (updatePrevious && !isOpen) {
                // if true and the next value od "isOpen" is "close"
                updatePrevious = false;
                closeTimeValue = sec2time(obj.value);
                // update the previous with the closing time.
                newDatesFormatArray[newDatesFormatArray.length - 1].time = [
                    { open: openTimeValue, close: closeTimeValue }
                ];
                openTimeArray.length = 0;
                return;
            }

            if (isOpen) {
                openTimeValue = sec2time(obj.value);
            } else {
                closeTimeValue = sec2time(obj.value);
                openTimeArray.push({
                    open: openTimeValue,
                    close: closeTimeValue
                });
            }
        });
        // final object contains outputs for each day.
        newDatesFormatArray.push({
            date: day,
            isClosed: false,
            isToday: currentDayOfWeek === day,
            time: openTimeArray
        });
    });
    return newDatesFormatArray;
}
