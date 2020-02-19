import Json from './Input';

//pass a json or read the default imported;
// using a different input for the test.
export function Convert(input) {
  let newDatesFormatArray = []; // Will contain our new converted output.
  let isOpen = false; // Check if the store is still open at the end of the day - Between days.
  let updatePrevious = false; // serves to update previous day with the "closing" entry.
  let currentDayOfWeek = new Date()
    .toLocaleDateString('en-US', {weekday: 'long'})
    .toLowerCase(); // fetch current day as a string. compare it later with json input day.
  let openTimeValue = {}; // Used in the open/close entries.
  let closeTimeValue = {}; // We need this value outside the days loop in case the store is still open over then ext day
  /**
   *  Days loop
   * key: days of the week
   * array: entries for each day
   */
  for (const [day, array] of Object.entries(input || Json)) {
    let openTimeArray = []; // Array will contain the output of open/close entries if close on the same day
    let length = array.length; // represent how many entries we have each day
    if (length === 0) {
      newDatesFormatArray.push({
        date: day,
        isToday: currentDayOfWeek === day,
        time: 'closed',
        isClosed: true,
      }); // if we don't have any entries for the day. the store is "Closed".
      continue;
    }
    updatePrevious = isOpen; //  Check if store is still open in the beginning of each day;

    /**
     * Each day open/close entries loop
     * index: index
     * obj: entry of the day open/close
     */
    for (const [index, obj] of array.entries()) {
      isOpen = obj.type === 'open';
      if (updatePrevious && !isOpen) {
        // if true and the next value od "isOpen" is "close"
        updatePrevious = false;
        closeTimeValue = sec2time(obj.value);
        // update the previous with the closing time.
        newDatesFormatArray[newDatesFormatArray.length - 1].time = [
          {open: openTimeValue, close: closeTimeValue},
        ];
        openTimeArray.length = 0;
        continue;
      }

      if (isOpen) {
        openTimeValue = sec2time(obj.value);
      } else {
        closeTimeValue = sec2time(obj.value);
        openTimeArray.push({open: openTimeValue, close: closeTimeValue});
      }
    }
    // final object contains outputs for each day.
    newDatesFormatArray.push({
      date: day,
      isClosed: false,
      isToday: currentDayOfWeek === day,
      time: openTimeArray,
    });
  }
  return newDatesFormatArray;
}

/**
 * Convert seconds to hours and 12-h format.
 * @param timeInSeconds
 * @returns {object}
 */
function sec2time(timeInSeconds) {
  let time = parseFloat(timeInSeconds);
  let hour = Math.floor(time / 60 / 60);
  let convention = hour >= 12 ? 'PM' : 'AM';
  hour = hour > 12 ? hour - 12 : hour;
  hour = hour < 1 ? 12 : hour; // midnight case
  return {hour, convention};
}
