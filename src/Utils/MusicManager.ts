import Game from '../Game'

export class MusicManager {
    private _game: Game;
    private _currentMusic: Phaser.Sound.BaseSound
    private _currentKey: string
    private _volume: number;

    constructor(game: Game, volume: number) {
        this._game = game;
        this._volume = volume;
    }

    public play(key: string) {
        if (key == this._currentKey) return;
        if (this._currentMusic) this._currentMusic.destroy();
        this._currentMusic = this._game.sound.add(key, {
            volume: this._volume,
            loop: true
        });
        this._currentMusic.play();
        this._currentKey = key;
    }

    public playWithIntro(introKey: string, loopKey: string) {
        if (introKey == this._currentKey || loopKey == this._currentKey) return;
        this.stop();
        this._currentMusic = this._game.sound.add(introKey, { volume: this._volume, loop: false });
        this._currentMusic.on(Phaser.Sound.Events.COMPLETE, () => {
            this._currentMusic = this._game.sound.add(loopKey, { volume: this._volume, loop: true });
            this._currentMusic.play();
            this._currentKey = loopKey;
        }, this);
        this._currentMusic.play();
        this._currentKey = introKey;
    }

    public stop() {
        if (this._currentMusic) {
            this._currentMusic.removeAllListeners(Phaser.Sound.Events.COMPLETE);
            this._currentMusic.destroy();
        }
        this._currentKey = '';
    }

    public pause() {
        this._currentMusic.pause();
    }

    public resume() {
        this._currentMusic.resume();
    }
}