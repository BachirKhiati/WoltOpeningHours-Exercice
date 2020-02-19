/**
* Converts a day number to a string.
*
* @param {Number} dayIndex
* @return {String} Returns day as string
*/
export function dayOfWeekAsString(dayIndex) {
    return ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][dayIndex];
  }