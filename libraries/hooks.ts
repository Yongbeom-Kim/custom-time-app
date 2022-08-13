import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { formatDuration } from 'date-fns/fp';
import { milliseconds } from 'date-fns';
import { seconds, subDuration } from './utils/date-utils';

export function useAudio(audio_url: string): [HTMLAudioElement, () => void, () => void] {
    let audio: MutableRefObject<HTMLAudioElement> = useRef(null);
    const [playing, setPlaying] = useState(false);


    useEffect(() => {
        audio.current = new Audio(audio_url);
        const stopPlaying = () => setPlaying(false);
        audio.current.addEventListener("ended", stopPlaying);

        return () => {
            audio.current.removeEventListener("ended", stopPlaying);
        }
    }, []);

    useEffect(() => {
        if (playing) {
            audio.current.play();
        } else {
            audio.current.pause();
        }
    }, [playing]
    )

    return [audio.current, () => setPlaying(true), () => setPlaying(false)];
}

export function useTimer(duration: Duration): [Duration, Dispatch<SetStateAction<Duration>>] {
    const [timeLeft, setTimeLeft] = useState(duration);
    let timerInterval: MutableRefObject<NodeJS.Timer> = useRef(null);

    useEffect(() => {
        timerInterval.current = setInterval(() => {
            setTimeLeft((timeLeft: Duration) => subDuration(timeLeft, { seconds: 1 }));
        }, 1000);

        return () => { clearInterval(timerInterval.current) }
    }, [])

    useEffect(() => {
        if (Math.floor(seconds(timeLeft)) === 0) {
            clearInterval(timerInterval.current);
        }
    }, [timeLeft]);

    return [timeLeft, setTimeLeft];
}