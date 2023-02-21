import { PLayer } from "../Player";
import { Item } from "./Item";

export default class AreaItem extends Item {
    protected _name: string = 'Area Item';
    protected _desc: string[] = [
        'Augments area of attacks by 10%',
        'Base area up by 10%',
        'Base area up by 10%',
        'Base area up by 10%',
        'Base area up by 10%'
    ];
    protected _icon: string = 'cat_nip';

    protected _maxLevel = 5;

    Activate(player: PLayer) {
        super.Activate(player);

        player.IncreaseAreaMod(0.1);
    }

    Upgrade(): void {
        super.Upgrade();
        this._player.IncreaseAreaMod(0.1);
    }
}