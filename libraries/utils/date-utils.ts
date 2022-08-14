export function getHours (ms: number) {
    return Math.floor(ms/3600000);
}
export function getMinutes (ms: number) {
    return Math.floor(ms%3600000/60000);
}
export function getSeconds (ms: number) {
    return Math.floor(ms%60000/1000);
}
export function getMilliSeconds (ms: number) {
    return ms%1000;
}