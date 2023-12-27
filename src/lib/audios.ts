import { configT, aLibT } from "./types";
import { sin360, cos360, Dict } from "./utils";

export const AudioLibGen = (Audios: Dict<{ ctx: AudioBuffer, data: HTMLAudioElement, time: number }>): aLibT => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const play = (name: string, delay: number = 0, gain:number=1) => {
        if (delay <= Audios[name].time) {
            const gainNode = ctx.createGain();
            const source = ctx.createBufferSource();
            source.buffer = Audios[name].ctx;
            gainNode.gain.setValueAtTime(gain, ctx.currentTime);
            source.connect(gainNode)
            gainNode.connect(ctx.destination);
            source.start(0);
            Audios[name].time = 0;
        }
    }
    const tick = () => {
        for (const n in Audios) {
            Audios[n].time++;
        }
    }
    return { play, tick }

}
