type CoreT = {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    Assets: {
        Images: { [keys: string]: HTMLImageElement, },
        Audios: { [keys: string]: HTMLAudioElement, },
        load: Function,
    },
    init: Function
}
const Core: CoreT = ((): CoreT => {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d")!;
    let Images: { [keys: string]: HTMLImageElement, } = {};
    let Audios: { [keys: string]: HTMLAudioElement, } = {};
    const load = async () => {
        const index = require("assets.json");
        let promises: Promise<void>[] = [];
        type AssetData = {
            type: "image" | "audio",
            src: string,
            name: string,
        }
        index.forEach((e: AssetData) => promises.push(new Promise((resolve, reject) => {
            switch (e.type) {
                case "image": {
                    let image = new Image();
                    image.src = e.src;
                    image.onload = () => {
                        Images[e.name] = image;
                        resolve();
                    }
                } break;
                case "audio": {
                    let audio = new Audio();
                    audio.src = e.src;
                    audio.onload = () => {
                        Audios[e.name] = audio;
                        resolve();
                    }
                } break;
            }
        })));
        await Promise.all(promises);
    };
    const init = () => {
        canvas.height = 480;
        canvas.width = 640;
    }
    return {
        canvas,
        ctx,
        Assets: {
            Images,
            Audios,
            load,
        },
        init,
    }
})()

module.exports = Core;