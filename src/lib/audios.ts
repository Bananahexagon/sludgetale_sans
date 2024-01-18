const AudioLibGen = (Audios: Map<string, { ctx: AudioBuffer, data: HTMLAudioElement, time: number }>) => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const play = (name: string, delay: number = 0, gain: number = 1) => {
        const audio = Audios.get(name)!;
        if (delay <= audio.time) {
            const gainNode = ctx.createGain();
            const source = ctx.createBufferSource();
            source.buffer = audio.ctx;
            gainNode.gain.setValueAtTime(gain, ctx.currentTime);
            source.connect(gainNode)
            gainNode.connect(ctx.destination);
            source.start(0);
            audio.time = 0;
        }
    }
    const tick = () => {
        Audios.forEach((audio) => {
            audio.time++;
        })
    }
    const play_html = (name: string, time: number = -1, loop: boolean = false) => {
        const tag = Audios.get(name)!.data;
        if (time != -1) tag.currentTime = 0;
        tag.play();
        tag.loop = loop;
    }
    const pause_html = (name: string, loop: boolean = false) => {
        const tag = Audios.get(name)!.data;
        tag.pause();

    }
    return { play, tick, play_html, pause_html }

}

type aLibT = ReturnType<typeof AudioLibGen>

export {
    AudioLibGen,
    aLibT
}