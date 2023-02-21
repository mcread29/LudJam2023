import { PLayer } from "../Player";
import { Item } from "./Item";

export default class HealthItem extends Item {
    protected _name: string = 'Health Item';
    protected _desc: string[] = [
        'Augment max health by 20%',
        'Max health increases by 20%',
        'Max health increases by 20%',
        'Max health increases by 20%',
        'Max health increases by 20%'
    ];
    protected _icon: string = 'cat_nip';

    protected _maxLevel = 5;

    Activate(player: PLayer) {
        super.Activate(player);

        player.IncreaseHealthMod(1.2);
    }

    Upgrade(): void {
        super.Upgrade();
        this._player.IncreaseDamageMod(1.2);
    }
}