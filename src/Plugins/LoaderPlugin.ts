import FontFaceObserver from 'fontfaceobserver';

export default class LoaderPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('webfont', this.webFontFileCallback);
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
}

export class WebFontFile extends Phaser.Loader.File {
    load() {
        var _this = this;
        var font = new FontFaceObserver(this.url);
        font.load(null, 10000).then(() => {
            _this.loader.nextFile(_this, true);
        }, () => {
            _this.loader.nextFile(_this, true);
        });
    }

    onProcess() {
        this.onProcessComplete();
    }
}