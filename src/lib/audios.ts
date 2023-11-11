import { configT, aLibT } from "./types";
import { sin360, cos360, Dict } from "./utils";

export const AudioLibGen = (Audios: Dict<AudioBuffer>): aLibT => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const play = (name: string) => {
        const source = audioContext.createBufferSource();
        source.buffer = Audios[name];

        source.connect(audioContext.destination);
        source.start(0);
    }
    return {play, }

}
