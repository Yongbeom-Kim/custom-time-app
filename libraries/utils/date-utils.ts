/**
 * Subtract duration2 from duration1
 * If result is negative, return 0
 * @param duration1 
 * @param duration2 
 */

import { add, intervalToDuration, milliseconds, sub } from "date-fns";

export function subDuration(duration1: Duration, duration2: Duration): Duration {
    // console.log(`Duration 1: ${seconds(duration1)} Duration 2: ${seconds(duration2)}`)
    const current = Date.now();
    let then;
    // If negative, return 0
    if (seconds(duration1) <= seconds(duration2)) {
        then = current;
    } else {
        then = sub(add(current, duration1), duration2);
    }

    return intervalToDuration({ start: current, end: then, });
}

/**
 * Add duration2 to duration1
 * @param duration1 
 * @param duration2 
 */
export function addDuration(duration1: Duration, duration2: Duration): Duration {
    const current = Date.now();

    return intervalToDuration({ start: current, end: add(add(current, duration1), duration2), });
}

export function seconds(duration: Duration): number {
    return Math.floor(milliseconds(duration) / 1000);

}