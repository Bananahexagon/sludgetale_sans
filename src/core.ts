type CoreT = {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    Images: { [keys: string]: HTMLImageElement, },
    Audios: { [keys: string]: HTMLAudioElement, },
    loadAssets: Function,
    inputKeys: {
        up: boolean, down: boolean, left: boolean, right: boolean, z: boolean, x: boolean, c: boolean,
    },
    init: Function
}

type configT = {
    display_quality: number;
}

export const Core: CoreT = ((): CoreT => {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d")!;
    let Images: { [keys: string]: HTMLImageElement, } = {};
    let Audios: { [keys: string]: HTMLAudioElement, } = {};
    let inputKeys = {
        up: false, down: false, left: false, right: false, z: false, x: false, c: false,
    }
    const loadAssets = async () => {
        type AssetData = {
            type: "image" | "audio",
            src: string,
            name: string,
        }
        const index: AssetData[] = (await import("./assets.json")).default as unknown as AssetData[];
        let promises: Promise<void>[] = [];
        console.log(index)
        index.forEach((e: AssetData) => promises.push(new Promise((resolve) => {
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
    const init = async (config: configT) => {
        canvas.height = 480 * config.display_quality;
        canvas.width = 640 * config.display_quality;
        window.addEventListener("keydown", e => {
            console.log(e)
            switch (e.key) {
                case "ArrowUp":
                    inputKeys.up = true;
                    break;
                case "ArrowDown":
                    inputKeys.down = true;
                    break;
                case "ArrowLeft":
                    inputKeys.left = true;
                    break;
                case "ArrowRight":
                    inputKeys.right = true;
                    break;
                case "z":
                case "Z":
                    inputKeys.z = true;
                    break;
                case "x":
                case "X":
                    inputKeys.x = true;
                    break;
                case "c":
                case "C":
                    inputKeys.c = true;
            }
        });

        window.addEventListener("keyup", e => {
            switch (e.key) {
                case "ArrowUp":
                    inputKeys.up = false;
                    break;
                case "ArrowDown":
                    inputKeys.down = false;
                    break;
                case "ArrowLeft":
                    inputKeys.left = false;
                    break;
                case "ArrowRight":
                    inputKeys.right = false;
                    break;
                case "z":
                case "Z":
                    inputKeys.z = false;
                    break;
                case "x":
                case "X":
                    inputKeys.x = false;
                    break;
                case "c":
                case "C":
                    inputKeys.c = false;
            }
        });
        await loadAssets();
    }
    return {
        canvas,
        ctx,
        Images,
        Audios,
        loadAssets,
        inputKeys,
        init,
    }
})();