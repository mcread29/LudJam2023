import Game from "../Game";

export enum ScaleBy {
    WIDTH, HEIGHT
}

export enum OrientationType {
    PORTRAIT, LANDSCAPE
}

export class ScaleManager extends Phaser.Events.EventEmitter {
    private _game: Game;
    private _orientation: OrientationType;
    private _scaleBy: ScaleBy;

    private _lastResizeSize: Phaser.Math.Vector2;

    private _defaultColor: number = 0xe4d7ce;
    private _overColor: number = 0x736586;
    private _selectedColor: number = 0x00ff00;

    constructor(game: Game, orientation: OrientationType, scaleBy: ScaleBy) {
        super();

        this._game = game;
        this._orientation = orientation;
        this._scaleBy = scaleBy;

        this._game.scale.on(Phaser.Scale.Events.RESIZE, this.onPhaserResize, this);
        this._game.scale.on(Phaser.Scale.Events.LEAVE_FULLSCREEN, this.onPhaserResize, this);
        this._game.scale.on(Phaser.Scale.Events.ENTER_FULLSCREEN, this.onPhaserResize, this);
        this._game.scale.on(Phaser.Scale.Events.ORIENTATION_CHANGE, this.onPhaserResize, this);
        this._game.events.on(Phaser.Scenes.Events.CREATE, this.onPhaserSceneCreate, this);
        this.onPhaserResize();
    }

    public update() {
        if (this._lastResizeSize != null &&
            (this._lastResizeSize.x != window.innerWidth || this._lastResizeSize.y != window.innerHeight)) {
            this.onPhaserResize();
        }
    }

    private onPhaserResize() {
        let parentSize = new Phaser.Math.Vector2(window.innerWidth, window.innerHeight);
        if (this._lastResizeSize == null
            || parentSize.x != this._lastResizeSize.x
            || parentSize.y != this._lastResizeSize.y) {
            this._lastResizeSize = parentSize.clone();
            this.resize();
        }
    }

    // Scale to base resolution, taking orientation of the device into account.
    private resize() {
        var desiredWidth: number = this._game.DefaultWidth;
        var desiredHeight: number = this._game.DefaultHeight;

        var currentWidth: number = window.innerWidth;
        var currentHeight: number = window.innerHeight;

        // if (this._game.device.os.desktop) {
        //     currentWidth = this._game.DefaultWidth // window.devicePixelRatio;
        //     currentHeight = this._game.DefaultHeight // window.devicePixelRatio;
        // }

        var widthRatio: number = currentWidth / desiredWidth;
        var heightRatio: number = currentHeight / desiredHeight;

        let width: number;
        let height: number;
        let ratio: number;
        let minRatio: number;

        if (this._orientation == OrientationType.LANDSCAPE && this._scaleBy === ScaleBy.HEIGHT) {
            minRatio = desiredWidth / desiredHeight;
            ratio = heightRatio < minRatio ? minRatio : heightRatio;
            width = currentWidth / ratio;
            height = desiredHeight;
        }
        else {
            minRatio = desiredHeight / desiredWidth;
            ratio = widthRatio < minRatio ? minRatio : widthRatio;
            width = desiredWidth;
            height = currentHeight / ratio;
        }

        this._game.scale.setGameSize(width, height);
        this._game.scale.setZoom(ratio);

        let zoomedWidth = width * ratio;
        let zoomedHeight = height * ratio;

        if (this._game.scale.isFullscreen) {
            this._game.canvas.style.marginLeft = (window.outerWidth - window.innerWidth) + "px";
            this._game.canvas.style.top = (window.outerHeight - window.innerHeight) + "px";
        }
        else {
            this._game.canvas.style.marginLeft = (window.innerWidth - zoomedWidth) / 2 + "px";
            this._game.canvas.style.top = (window.innerHeight - zoomedHeight) / 2 + "px";
        }

        window.scrollTo(window.scrollX, 0); //fixes content getting stuck under address bar. noticed on Safari in iOS when exiting fullscreen

        this.updateRotationDisplay();
    }

    private onPhaserSceneCreate(scene: Phaser.Scene) {
        this.updateRotationDisplay();
    }

    private updateRotationDisplay() {
        if (this._game.scale.width < this._game.scale.height && !this._game.scene.isActive('RotateDevice')) {
            this._game.scene.start('RotateDevice');
        }
    }
}