import { PowerUp } from "../attacks/Attack";
import { PLayer } from "../Player";

export abstract class Item implements PowerUp {
    protected _level = 0;
    get level(): number { return this._level; }

    protected abstract _maxLevel: number;
    get maxLevel(): number { return this._maxLevel; }

    protected abstract _name: string;
    get name(): string { return this._name; }

    protected abstract _desc: string[];
    get desc(): string { return this._desc[ this._level ]; }

    protected abstract _icon: string;
    get icon(): string { return this._icon; }

    private _active: boolean = false;
    get active(): boolean { return this._active; }

    protected _player: PLayer;

    Activate(player: PLayer): void {
        this._active = true;
        this._player = player;

        player.items.push(this);
    }
    Upgrade(): void {
        this._level++;
    }

}