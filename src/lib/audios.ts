import { configT, aLibT } from "./types";
import { sin360, cos360, Dict } from "./utils";

export const AudioLibGen = (Audios: Dict<{ ctx: AudioBuffer, data: HTMLAudioElement, time: number }>): aLibT => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const play_ctx = (name: string, delay: number = 0) => {
        if (delay <= Audios[name].time) {
            const source = audioContext.createBufferSource();
            source.buffer = Audios[name].ctx;

            source.connect(audioContext.destination);
            source.start(0);
            Audios[name].time = 0;
        }
    }
    const play = (name: string, delay: number = 0) => {
        if (delay <= Audios[name].time) {
            Audios[name].data.currentTime = 0;
            Audios[name].data.play();
            Audios[name].time = 0;
        }
    }
    const tick = () => {
        for (const n in Audios) {
            Audios[n].time++;
        }
    }
    return { play, play_ctx, tick }

}
