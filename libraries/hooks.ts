import { MutableRefObject, useEffect, useRef, useState } from "react";

export function useAudioHook(audio_url: string): [HTMLAudioElement, () => void, () => void] {
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
        }}, [playing]
    )

    return [audio.current, () => setPlaying(true), () => setPlaying(false)];
}