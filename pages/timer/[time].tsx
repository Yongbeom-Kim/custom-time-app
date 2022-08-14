import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useEffect } from 'react';
import { useAudio } from '../../libraries/hooks';
import { Timer } from '../../components/timer';
import ms from 'ms';

export const getStaticPaths: GetStaticPaths = async () => {

    return {
        paths: [],
        fallback: "blocking",
    }
};

export const getStaticProps: GetStaticProps = async (context) => {
    const rawDuration = context.params.time.split("-");
    // const timerDuration: Duration = { hours: 0, minutes: 0, seconds: 0 };
    let timerDuration: number = 0;

    for (let i = 0; i < rawDuration.length; i+= 2) {
        console.log(`${rawDuration[i]} ${rawDuration[i + 1]}`);
        timerDuration += ms(`${rawDuration[i]} ${rawDuration[i + 1]}`);
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