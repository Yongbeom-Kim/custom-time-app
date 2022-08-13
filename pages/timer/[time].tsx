import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { formatDuration } from 'date-fns/fp';
import { milliseconds } from 'date-fns';
import { useAudioHook } from '../../libraries/hooks';
import { subDuration } from '../../libraries/utils/date-utils';

export const getStaticPaths: GetStaticPaths = async () => {

    return {
        paths: [],
        fallback: "blocking",
    }
};

export const getStaticProps: GetStaticProps = async (context) => {
    const rawDuration = context.params.time.split("-");
    const timerDuration: Duration = { hours: 0, minutes: 0, seconds: 0 };

    for (let i = 0; i < rawDuration.length; i++) {
        switch (rawDuration[i + 1]) {
            case ("hours"):
                timerDuration.hours = parseInt(rawDuration[i]);
                break;

            case ("minutes"):
                timerDuration.minutes = parseInt(rawDuration[i]);
                break;

            case ("seconds"):
                timerDuration.seconds = parseInt(rawDuration[i]);
                break;
        }
    }

    return {
        props: { timer: timerDuration }
    }
};

const TimerPage: NextPage = (props) => {
    const [timeLeft, setTimeLeft] = useState(props.timer);
    const [alarm, playAlarm] = useAudioHook("/alarm-sfx/rooster-crowing.wav");
    let timerInterval: MutableRefObject<NodeJS.Timer> = useRef(null);

    useEffect(() => {
        timerInterval.current = setInterval(() => {
            setTimeLeft((timeLeft: Duration) => subDuration(timeLeft, { seconds: 1 }));
        }, 1000);

        return () => { clearInterval(timerInterval.current) }
    }, [])

    useEffect(() => {
        if (Math.floor(milliseconds(timeLeft)/1000) === 0) {
            clearInterval(timerInterval.current);
            playAlarm();
        }
    }, [timeLeft]);

    return (<>
        <h1>Time Left: {formatDuration(timeLeft)} </h1>
    </>);
}

export default TimerPage;