import Json from './Input';
// "performance" will crash without "Debug mode" activated - part of Chrome v8 engine
// let t0 = performance.now(); //


export function Convert() {
  let newDatesFormatArray = []; // Will contain our new converted output.
  let isOpen = false; // Check if the store is still open at the end of the day - Between days.
  let updatePrevious = false; // serves to update previous day with the "closing" entry.
  let currentDayOfWeek = new Date()
    .toLocaleDateString('en-US', {weekday: 'long'})
    .toLowerCase(); // fetch current day as a string. compare it later with json input day.

  /**
   * key: days of the week
   * array: entries for each day
   */
  for (const [day, array] of Object.entries(Json)) {
    let openTime = ''; // String represent the opening hours per day.
    let length = array.length; // represent how many entries we have each day
    if (length === 0) {
      newDatesFormatArray.push({
        date: day,
        isToday: currentDayOfWeek === day,
        time: 'Closed',
      }); // if we don't have any entries for the day. the store is "Closed".
      continue;
    }
    updatePrevious = isOpen; //  Check if store is still open in the beginning of each day;
    for (const [index, obj] of array.entries()) {
      isOpen = obj.type === 'open'; //
      if (updatePrevious && !isOpen) {
        updatePrevious = false;
        newDatesFormatArray[length - 1].time += sec2time(obj.value); // update the last new entry with the closing time.
        continue;
      }

      // endLoop: serves as condition for adding commas between
      // the group of |open-close| entries until we reach the last entry.
      const endLoop = length - 1 === index;

      // openTime: Final string is generated using addition assignment to link between entries.
      openTime += `${sec2time(obj.value)}${
        isOpen ? ' - ' : !endLoop ? ', ' : ''
      }`;
    }

    newDatesFormatArray.push({
      date: day,
      isToday: currentDayOfWeek === day,
      time: openTime,
    });
  }
  // let t1 = performance.now();
  // console.log(' it took ' + (t1 - t0) + ' milliseconds.');
  // console.log(newDatesFormatArray);
  return newDatesFormatArray;
}

/**
 * Convert seconds to hours and 12-h format.
 * @param timeInSeconds
 * @returns {string}
 */
function sec2time(timeInSeconds) {
  let time = parseFloat(timeInSeconds);
  let hours = Math.floor(time / 60 / 60);
  let format = hours > 12 ? 'PM' : 'AM';
  hours = hours > 12 ? hours - 12 : hours;
  return hours + ' ' + format;
}
