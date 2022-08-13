import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { formatDuration } from 'date-fns/fp';
import { milliseconds } from 'date-fns';
import { useAudio, useTimer } from '../../libraries/hooks';
import { seconds, subDuration } from '../../libraries/utils/date-utils';

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
            case ("hour"):
                timerDuration.hours = parseInt(rawDuration[i]);
                break;

            case ("minutes"):
            case ("minute"):
                timerDuration.minutes = parseInt(rawDuration[i]);
                break;

            case ("seconds"):
            case ("second"):
                timerDuration.seconds = parseInt(rawDuration[i]);
                break;
        }
    }

    return {
        props: { timer: timerDuration }
    }
};

const TimerPage: NextPage = (props) => {
    // const [timeLeft, setTimeLeft] = useState(props.timer);
    const [alarm, playAlarm] = useAudio("/alarm-sfx/rooster-crowing.wav");
    const [timeLeft] = useTimer(props.timer);

    useEffect(() => {
        if (seconds(timeLeft) === 0) {
            playAlarm();
        }
    }, [timeLeft]);

    return (<>
        <h1>Time Left: {formatDuration(timeLeft)} </h1>
    </>);
}

export default TimerPage;