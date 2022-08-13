import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useEffect } from 'react';
import { formatDuration } from 'date-fns/fp';
import { useAudio, useTimer } from '../../libraries/hooks';
import { seconds } from '../../libraries/utils/date-utils';
import { Timer } from '../../components/timer';

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
        props: { timerDuration: timerDuration }
    }
};

const TimerPage: NextPage = (props) => {
    const [alarm, playAlarm] = useAudio("/alarm-sfx/rooster-crowing.wav");
    console.log(props);
    return (<>
        <h1>Time Left:</h1>
        <Timer initialDuration={props.timerDuration} onFinish={() => playAlarm()} />
    </>);
}

export default TimerPage;