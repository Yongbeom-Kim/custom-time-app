// const { subDuration } = require("../libraries/utils/date-utils");

import { addDuration, subDuration } from "../libraries/utils/date-utils"

test("Subtract Durations", () => {
    expect(subDuration(
        {hours: 1, minutes: 1, seconds: 1},
        {hours: 0, minutes: 0, seconds: 1}
    )).toMatchObject({hours: 1, minutes: 1, seconds: 0});

    
    expect(subDuration(
        {hours: 1, minutes: 1, seconds: 1},
        {hours: 0, minutes: 1, seconds: 0}
    )).toMatchObject({hours: 1, minutes: 0, seconds: 1});

    
    expect(addDuration(
        {hours: 1, minutes: 1, seconds: 1},
        {hours: 1, minutes: 0, seconds: 0}
    )).toMatchObject({hours: 2, minutes: 1, seconds: 1});
})

test("Subtract to make negative duration", () => {
    expect(subDuration(
        {hours: 0, minutes: 0, seconds: 1},
        {hours: 0, minutes: 0, seconds: 1}
    )).toMatchObject({hours: 0, minutes: 0, seconds: 0});

    
    expect(subDuration(
        {hours: 0, minutes: 0, seconds: 0},
        {hours: 0, minutes: 0, seconds: 1}
    )).toMatchObject({hours: 0, minutes: 0, seconds: 0});
})

test("Add Durations", () => {
    expect(addDuration(
        {hours: 1, minutes: 1, seconds: 1},
        {hours: 0, minutes: 0, seconds: 1}
    )).toMatchObject({hours: 1, minutes: 1, seconds: 2});

    
    expect(addDuration(
        {hours: 1, minutes: 1, seconds: 1},
        {hours: 0, minutes: 1, seconds: 0}
    )).toMatchObject({hours: 1, minutes: 2, seconds: 1});

    
    expect(addDuration(
        {hours: 1, minutes: 1, seconds: 1},
        {hours: 1, minutes: 0, seconds: 0}
    )).toMatchObject({hours: 2, minutes: 1, seconds: 1});
})