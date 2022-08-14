import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { getHours, getMinutes, getSeconds } from "../libraries/utils/date-utils";

import styles from "./timer.module.css";

export function Timer({ initialDuration, onFinish = () => { } }) {
    const startTime = useRef(Date.now());
    const [endTime, setEndTime] = useState(startTime.current + initialDuration);
    const [timeLeft, setTimeLeft] = useState(initialDuration);
    const [playing, setPlaying] = useState(true);

    // @ts-ignore initialised on initialisation
    const timerInterval: MutableRefObject<NodeJS.Timer> = useRef(null);

    const resetVars = useCallback(() => {
        startTime.current = Date.now();
        setEndTime(startTime.current + initialDuration);
        // clearInterval(timerInterval.current);
        setPlaying(false);
    }, [])

    // Init vars
    useEffect(() => {
        resetVars();
    }, [])

    // Use ending time to calculate time left
    useEffect(() => {
        if (!playing) {
            // Beautify timer
            setTimeLeft(Math.round((endTime - Date.now()) / 1000) * 1000);
            return;
        }
        timerInterval.current = setInterval(() => {
            setTimeLeft(Math.max(endTime - Date.now(), 0));
        }, 250);

        return () => clearInterval(timerInterval.current);

    }, [endTime]);

    useEffect(() => {
        console.log(timeLeft)
        if (timeLeft === 0) {
            clearInterval(timerInterval.current);
            onFinish();
            setPlaying(false);
        }
    }, [timeLeft]);

    const pausedStartTime = useRef(Date.now());
    useEffect(() => {
        if (!playing) {
            clearInterval(timerInterval.current);
            setTimeLeft(endTime - Date.now());
            pausedStartTime.current = Date.now();

        } else {
            setEndTime((endTime: number) => endTime + Date.now() - pausedStartTime.current)
        }

    }, [playing]);


    return (
        <div className={styles.timer}>
            <div className={styles.timerText}>
                <form className={styles.timerForm} action="">
                    <input className={styles.timerInput} type="text" name="" id="" value={pad_digit(getHours(timeLeft))} readOnly={true} />
                    :
                    <input className={styles.timerInput} type="text" name="" id="" value={pad_digit(getMinutes(timeLeft))} readOnly={true} />
                    :
                    <input className={styles.timerInput} type="text" name="" id="" value={pad_digit(getSeconds(timeLeft))} readOnly={true} />
                </form>
            </div>
            {/* <hr /> */}
            <div className={styles.timerButtonLayout}>
                {playing && <>
                    <button className={styles.timerButton} onClick={() => setPlaying(false)}>Pause</button>
                    <button className={styles.timerButton} onClick={resetVars}>Reset</button>
                </>
                }
                {!playing && <>
                    <button className={styles.timerButton} onClick={() => setPlaying(true)}>Play</button>
                    <button className={styles.timerButton} onClick={resetVars}>Reset</button>
                </>}
            </div>
        </div >
    );
}

function pad_digit(n: number): string {
    if (n <= 0) return "00";
    if (n < 10) {
        return `0${n}`;
    }
    else {
        return `${n}`;
    }

}