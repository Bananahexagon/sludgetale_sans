import json from "../assets.json";

export const loadAssets = async (audioContext: AudioContext,draw: (i:number,m: number)=>void): Promise<Assets> => {
    type AssetData = {
        type: "image" | "audio" | "font",
        src: string,
        name: string,
    }
    const Images: Map<string, HTMLImageElement> = new Map();
    const Audios: Map<string, { ctx: AudioBuffer, data: HTMLAudioElement, time: number }> = new Map();
    const Fonts: Map<string, FontFace> = new Map();
    const index: AssetData[] = json as unknown as AssetData[];
    const promises: Promise<void>[] = [];
    let finished =0;
    draw(0,index.length)
    index.forEach((e: AssetData) => Images.has(e.name)||Audios.has(e.name)||Fonts.has(e.name) ? 0 : promises.push(new Promise((resolve) => {
        const finish = () => {finished+=1;draw(finished,index.length);resolve()}
        switch (e.type) {
            case "image": {
                if (Images.has(e.name)) throw new Error()
                const image = new Image();
                image.src = e.src;
                image.onload = () => {
                    Images.set(e.name, image);
                    finish();
                }
            } break;
            case "audio": {
                if (Audios.has(e.name)) throw new Error()
                const audio = new Audio(e.src);
                audio.autoplay = false;
                audio.muted = true;
                audio.addEventListener("loadeddata", () => {
                    audio.muted = false;
                    (async () => {
                        const response = await fetch(e.src);
                        const audioData = await response.arrayBuffer();
                        Audios.set(e.name, { ctx: await audioContext.decodeAudioData(audioData), data: audio, time: Infinity });
                        audio.onload = () => resolve();
                    })().then(finish);
                })

            } break;
            case "font": {
                if (Fonts.has(e.name)) throw new Error();
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
                                Fonts.set(e.name, font);
                                await document.fonts.add(font);
                            })()
                        )
                    });
                    Promise.all(promises_sub)
                })().then(finish)
            } break;
        }
    })));
    await Promise.all(promises);
    return { Images, Audios, Fonts };
};

type Assets = {
    Images: Map<string, HTMLImageElement>,
    Audios: Map<string, { ctx: AudioBuffer, data: HTMLAudioElement, time: number }>,
    Fonts: Map<string, FontFace>,
}