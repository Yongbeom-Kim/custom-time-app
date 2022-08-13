import { useEffect } from "react";
import { useTimer } from "../libraries/hooks";
import { seconds } from "../libraries/utils/date-utils";

export function Timer({ initialDuration, onFinish }) {
    const [timeLeft] = useTimer(initialDuration);
    
    useEffect(() => {
        if (seconds(timeLeft) === 0) {
            onFinish();
        }
    }, [timeLeft]);

    return (
        <div>
            {pad_digit(timeLeft.hours)}:{pad_digit(timeLeft.minutes)}:{pad_digit(timeLeft.seconds)}
        </div>
    )
}

function pad_digit(n: number): string {
    if (n < 10) {
        return "0" + n.toString();
    }
    else {
        return n.toString();
    }

}