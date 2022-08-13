import { useEffect } from "react";
import { useTimer } from "../libraries/hooks";
import { seconds } from "../libraries/utils/date-utils";

import styles from "./timer.module.css";

export function Timer({ initialDuration, onFinish }) {
    const [timeLeft] = useTimer(initialDuration);

    useEffect(() => {
        if (seconds(timeLeft) === 0) {
            onFinish();
        }
    }, [timeLeft]);

    return (
        <div className={styles.timer}>
            <div className={styles.timerText}>
                {pad_digit(timeLeft.hours)}:{pad_digit(timeLeft.minutes)}:{pad_digit(timeLeft.seconds)}
            </div>
            {/* <hr /> */}
            <div className={styles.timerButtonLayout}>
                <button className={styles.timerButton}>Pause</button>
                <button className={styles.timerButton}>Stop</button>
            </div>
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