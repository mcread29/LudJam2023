import { PLayer } from "../Player";
import { Item } from "./Item";

export default class SpeedItem extends Item {
    protected _name: string = 'Speed Item';
    protected _desc: string[] = [
        'Character moves 10% faster',
        'Movement speed increases by 10%',
        'Movement speed increases by 10%',
        'Movement speed increases by 10%',
        'Movement speed increases by 10%'
    ];
    protected _icon: string = 'cat_nip';

    protected _maxLevel = 5;

    Activate(player: PLayer) {
        super.Activate(player);

        player.IncreaseSpeedMod(0.1);
    }

    Upgrade(): void {
        super.Upgrade();
        this._player.IncreaseSpeedMod(0.1);
    }
}