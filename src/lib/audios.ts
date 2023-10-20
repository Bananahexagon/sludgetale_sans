import { configT, aLibT } from "./types";
import { sin360, cos360, Dict } from "./utils";

export const AudioLibGen = (Audios:Dict<HTMLAudioElement>): aLibT => {
    const play = (name: string) => {
        Audios[name].play();
    }
    return {play};
}
