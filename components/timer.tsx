import { MutableRefObject, useEffect, useRef, useState } from "react";
import { seconds, subDuration } from "../libraries/utils/date-utils";

import styles from "./timer.module.css";

export function Timer({ initialDuration, onFinish = () => { } }) {
    const [timeLeft, setTimeLeft] = useState(initialDuration);
    const [playing, setPlaying] = useState(true);

    // @ts-ignore initialised on initialisation
    const timerInterval: MutableRefObject<NodeJS.Timer> = useRef(null);

    useEffect(() => {
        timerInterval.current = setInterval(() => {
            if (playing) {
                setTimeLeft((timeLeft: Duration) => subDuration(timeLeft, { seconds: 1 }));
            }
        }, 1000);

        return () => { clearInterval(timerInterval.current) }
    }, [playing])

    useEffect(() => {
        if (seconds(timeLeft) === 0) {
            clearInterval(timerInterval.current);
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
                {playing && <>
                    <button className={styles.timerButton} onClick={() => setPlaying(false)}>Pause</button>
                    <button className={styles.timerButton}>Reset</button>
                </>
                }
                {!playing && <>
                    <button className={styles.timerButton} onClick={() => setPlaying(true)}>Play</button>
                    <button className={styles.timerButton}>Reset</button>
                </>}
            </div>
        </div >
    );
}

function pad_digit(n: number): string {
    if (n < 10) {
        return "0" + n.toString();
    }
    else {
        return n.toString();
    }

}