import SoundFadePlugin from 'phaser3-rex-plugins/plugins/soundfade-plugin';
import Game from '../Game';

export class MusicManager {
    private _game: Game;
    private _currentMusic: Phaser.Sound.BaseSound;
    private _currentKey: string;
    private _volume: number;
    public get volume(): number { return this._volume; }
    private _currentLoop: boolean;

    private _playlist: Phaser.Sound.BaseSound[];
    private _playlistIndex: number;

    constructor(game: Game, volume: number) {
        this._game = game;
        this._volume = volume;
    }

    public play(key: string, loop = true) {
        if (key == this._currentKey) return;

        if (this._playlist)
        {
            for (let sound of this._playlist)
            {
                if (sound.isPlaying) sound.stop();
                sound.removeAllListeners(Phaser.Sound.Events.COMPLETE);
                sound.destroy();
            }
            this._playlist = [];
        }

        let delay = 0;
        if (this._currentMusic)
        {
            (this._game.plugins.get('rexSoundFade') as SoundFadePlugin).fadeOut(this._currentMusic, 250);
            delay = 250;
        }
        this._currentMusic = this._game.sound.add(key, {
            volume: this._volume,
            loop: loop,
            delay: delay
        });
        this._currentMusic.play();
        this._currentKey = key;
        this._currentLoop = loop;
    }

    public PlayPlaylist(...playlist: string[]) {
        if (this._playlist) return;

        this._playlist = [];
        this._playlistIndex = 0;
        for (let name of playlist)
        {
            console.log(name);
            const sound = this._game.sound.add(name, {
                volume: this._volume
            }).on(Phaser.Sound.Events.COMPLETE, () => {
                this._playlistIndex = (this._playlistIndex + 1) % playlist.length;
                this._playlist[ this._playlistIndex ].play();
            });
            console.log(sound);
            this._playlist.push(sound);
        }
        this._playlist[ 0 ].play();
    }

    public playWithIntro(introKey: string, loopKey: string) {
        if (introKey == this._currentKey || loopKey == this._currentKey) return;
        this.stop();
        this._currentMusic = this._game.sound.add(introKey, { volume: this._volume, loop: false });
        this._currentMusic.on(Phaser.Sound.Events.COMPLETE, () => {
            this._currentMusic = this._game.sound.add(loopKey, { volume: this._volume, loop: true });
            this._currentMusic.play();
            this._currentKey = loopKey;
            this._currentLoop = true;
        }, this);
        this._currentMusic.play();
        this._currentKey = introKey;
        this._currentLoop = false;
    }

    public stop() {
        if (this._playlist)
        {
            for (let sound of this._playlist)
            {
                sound.removeAllListeners(Phaser.Sound.Events.COMPLETE);
                sound.destroy();
            }
        }
        if (this._currentMusic)
        {
            this._currentMusic.removeAllListeners(Phaser.Sound.Events.COMPLETE);
            this._currentMusic.destroy();
        }
        this._playlist = null;
        this._playlistIndex = null;
        this._currentKey = '';
    }

    public pause() {
        this._currentMusic.pause();
    }

    public resume() {
        this._currentMusic.resume();
    }

    public LowerVolume(amount: number = 0.1) {
        this.SetVolume(Math.max(0, this._volume - amount));
    }

    public RaiseVolume(amount: number = 0.1) {
        this.SetVolume(Math.min(1, this._volume + amount));
    }

    public SetVolume(volume: number) {
        this._volume = volume;
        Game.Instance.playerData.saveData.musicVolume = volume;

        if (this._currentMusic)
        {
            (this._currentMusic as any).volume = this._volume;
        }
        if (this._playlist)
        {
            for (let sound of this._playlist)
            {
                (sound as any).volume = this._volume;
            }
        }
    }
}