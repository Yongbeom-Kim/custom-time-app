import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { add, Duration, format, formatDuration } from 'date-fns';

export const getStaticPaths: GetStaticPaths = async () => {

    return {
        paths: [],
        fallback: "blocking",
    }
};

export const getStaticProps: GetStaticProps = async (context) => {
    const time = context.params.time.split("-");
    const timeProps = { hours: 0, minutes: 0, seconds: 0 };
    console.log(time);

    for (let i = 0; i < time.length; i++) {
        switch (time[i + 1]) {
            case ("hours"):
                timeProps.hours = parseInt(time[i]);
                break;

            case ("minutes"):
                timeProps.minutes = parseInt(time[i]);
                break;

            case ("seconds"):
                timeProps.seconds = parseInt(time[i]);
                break;
        }
    }

    return {
        props: { time: timeProps }
    }
};

const TimerPage: NextPage = (props) => {
    console.log("PROPS", props);
    console.log(Date.now());
    console.log(format(Date.now(), "dd-mm-yyyy hh:mm:ss"))
    console.log(format(add(Date.now(), props.time), "dd-mm-yyyy hh:mm:ss"))
    console.log(formatDuration(props.time));
    
    const [timeLeft, setTimeLeft] = useState(props.time);


    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((timeLeft: { seconds: number; minutes: number; hours: number; }) => {
                if (timeLeft.seconds > 0) {
                    return { ...timeLeft, ...{ seconds: timeLeft.seconds - 1 } };
                }
                if (timeLeft.minutes > 0) {
                    return { ...timeLeft, ...{ minutes: timeLeft.minutes - 1, seconds: 59 } };
                }
                if (timeLeft.hours > 0) {
                    return { ...timeLeft, ...{ hours: timeLeft.hours - 1, minutes: 59, seconds: 59 } };
                }
                clearInterval(interval)
                return timeLeft;
            });
        }, 1000);

        return () => { clearInterval(interval) }
    }, [])

    return <h1>Time Left: {JSON.stringify(timeLeft)} </h1>;
}

export default TimerPage;