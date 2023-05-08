export function convertDateToSQL(date: Date) {
    var pad = function(num: number) { return ('00'+num).slice(-2) };
    // date = new Date();
    return date.getUTCFullYear()         + '-' +
            pad(date.getUTCMonth() + 1)  + '-' +
            pad(date.getUTCDate())       + ' ' +
            pad(date.getUTCHours())      + ':' +
            pad(date.getUTCMinutes())    + ':' +
            pad(date.getUTCSeconds());
}