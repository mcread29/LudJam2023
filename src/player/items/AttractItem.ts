import { PLayer } from "../Player";
import { Item } from "./Item";

export default class AttractItem extends Item {
    protected _name: string = 'Attract Item';
    protected _desc: string[] = [
        'Character picks up items from further away',
        'Pickup range increased by 33%',
        'Pickup range increased by 25%',
        'Pickup range increased by 20%',
        'Pickup range increased by 33%'
    ];
    protected _icon: string = 'cat_nip';

    protected _maxLevel = 5;

    Activate(player: PLayer) {
        super.Activate(player);

        player.IncreaseSpeedMod(0.1);
        player.IncreaseAttractMod(1.5);
    }

    Upgrade(): void {
        super.Upgrade();
        if (this._level === 2)
        {
            this._player.IncreaseAttractMod(1.33);
        }
        if (this._level === 3)
        {
            this._player.IncreaseAttractMod(1.25);
        }
        if (this._level === 4)
        {
            this._player.IncreaseAttractMod(1.2);
        }
        if (this._level === 5)
        {
            this._player.IncreaseAttractMod(1.33);
        }
    }
}