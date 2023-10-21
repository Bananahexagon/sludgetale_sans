import { configT, aLibT } from "./types";
import { sin360, cos360, Dict } from "./utils";

//TODO 欠陥が多い

export const AudioLibGen = (Audios: Dict<[HTMLAudioElement, number]>): aLibT => {
    const play = (name: string, start?: number, delay = 0) => {
        if (Audios[name][1] == 0) {
            Audios[name][0].play();
            if (start !== undefined) Audios[name][0].currentTime = start;
            Audios[name][1] = delay;
        }
    }
    const get = (name: string) => Audios[name][0];
    const tick = () => {
        for (const _ in Audios) {
            const audio = Audios[_];
            if (0 < audio[1]) {
                audio[1] -= 1;
            }
        }
    }
    return { play, get, tick };
}
