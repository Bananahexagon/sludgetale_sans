import { Dict } from "./utils";
import { Assets } from "./types";
import json from "../assets.json";

export const loadAssets = async (audioContext: AudioContext): Promise<Assets> => {
    type AssetData = {
        type: "image" | "audio" | "font",
        src: string,
        name: string,
    }
    const Images: Dict<HTMLImageElement> = {};
    const Audios: Dict<{ ctx: AudioBuffer, data: HTMLAudioElement, time: number }> = {};
    const Fonts: Dict<FontFace> = {};
    const index: AssetData[] = json as unknown as AssetData[];
    const promises: Promise<void>[] = [];
    index.forEach((e: AssetData) => promises.push(new Promise((resolve) => {
        switch (e.type) {
            case "image": {
                const image = new Image();
                image.src = e.src;
                image.onload = () => {
                    Images[e.name] = image;
                    resolve();
                }
            } break;
            case "audio": {
                const audio = new Audio(e.src);
                audio.autoplay = false;
                audio.muted = true;
                audio.addEventListener("loadeddata", () => {
                    audio.muted = false;
                    (async () => {
                        const response = await fetch(e.src);
                        const audioData = await response.arrayBuffer();
                        Audios[e.name] = { ctx: await audioContext.decodeAudioData(audioData), data: audio, time: Infinity };
                        audio.onload = () => resolve();
                    })().then(resolve);
                })

            } break;
            case "font": {
                (async () => {
                    const response = await fetch(e.src);
                    const cssFontFace = await response.text();
                    const matchUrls = await cssFontFace.match(/url\(.+?\)/g);
                    if (!matchUrls) throw new Error("フォントが見つかりませんでした");
                    const promises_sub: Promise<void>[] = [];
                    matchUrls.forEach((f) => {
                        promises_sub.push(
                            (async () => {
                                const font = new FontFace(e.name, f);
                                await font.load();
                                Fonts[e.name] = font;
                                await document.fonts.add(font);
                            })()
                        )
                    });
                    Promise.all(promises_sub)
                })().then(resolve)
            } break;
        }
    })));
    await Promise.all(promises);
    return { Images,  Audios, Fonts };
};