import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { format, formatDuration, subSeconds, addHours } from 'date-fns/fp';
import { add, milliseconds, secondsInDay } from 'date-fns';
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

    useEffect(() => {
        const interval = setInterval(() => {
            
            console.log(timeLeft, " | ", milliseconds(timeLeft));
            if (Math.floor(milliseconds(timeLeft)/1000) === 0) {
                clearInterval(interval);
                playAlarm();
            }

            setTimeLeft((timeLeft: Duration) => subDuration(timeLeft, { seconds: 1 }));
            // setTimeLeft(subDuration(timeLeft, { seconds: 1 }));

            // });
        }, 1000);

        return () => { clearInterval(interval) }
    }, [])

    return (<>
        <h1>Time Left: {formatDuration(timeLeft)} </h1>
    </>);
}

export default TimerPage;