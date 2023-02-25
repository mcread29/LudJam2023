import FontFaceObserver from 'fontfaceobserver';
import { GifReader } from 'omggif';

export default class LoaderPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);

        // pluginManager.registerFileType('webfont', this.webFontFileCallback);
        pluginManager.registerFileType('gif', this.gifFileCallback);
    }

    private webFontFileCallback(key: string, url: string, overwrite: boolean = false): Phaser.Loader.LoaderPlugin {
        let loader: Phaser.Loader.LoaderPlugin = <Phaser.Loader.LoaderPlugin><unknown>this;
        let file = new WebFontFile(loader, {
            type: 'webfont',
            key: key,
            url: url
        });
        loader.addFile(file);
        return loader;
    }

    private gifFileCallback(key: string, url: string) {
        let loader: Phaser.Loader.LoaderPlugin = <Phaser.Loader.LoaderPlugin><unknown>this;
        let file = new GifFile(loader, {
            type: 'gif',
            key: key,
            url: url
        });
        loader.addFile(file);
        return loader;
    }
}

export class WebFontFile extends Phaser.Loader.File {
    load() {
        var _this = this;
        var font = new FontFaceObserver(this.url);
        font.load(null, 10000).then(() => {
            _this.loader.nextFile(_this, true);
        }, () => {
            _this.loader.nextFile(_this, true);
        }).catch((error: any) => {
        });
    }

    onProcess() {
        this.onProcessComplete();
    }
}

export class GifFile extends Phaser.Loader.File {
    load(): void {
        this.asyncLoad().then(() => {
            this.loader.nextFile(this, true);
        });
    }

    async asyncLoad(): Promise<boolean> {
        const response = await fetch(this.url as string);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const intArray = new Uint8Array(arrayBuffer);

        const reader = new GifReader(intArray as Buffer);

        const info = reader.frameInfo(0);

        const gif = new Array(reader.numFrames()).fill(0).map((_, k) => {
            const image = new ImageData(info.width, info.height);

            reader.decodeAndBlitFrameRGBA(k, image.data as any);

            return image;
        });

        let ancillaryCanvas = this.loader.scene.textures.createCanvas(this.key, gif[ 0 ].width * gif.length, gif[ 0 ].height);
        let ancillaryContext = ancillaryCanvas.context;
        for (let i = 0; i < gif.length; i++)
        {
            let thisFramesImageData = ancillaryContext.createImageData(gif[ i ].width, gif[ i ].height);
            thisFramesImageData.data.set(gif[ i ].data);
            ancillaryContext.putImageData(thisFramesImageData, gif[ i ].width * i, 0);
            ancillaryCanvas.add(i, 0, gif[ i ].width * i, 0, gif[ i ].width, gif[ i ].height);
        }
        ancillaryCanvas.refresh();

        this.loader.scene.anims.create({
            key: `${this.key}_gif`,
            frames: this.loader.scene.anims.generateFrameNumbers(this.key, { start: 1, end: gif.length - 1 }),
            frameRate: info.delay,
            repeat: -1
        });

        return true;
    }
}