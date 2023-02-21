import { PLayer } from "../Player";
import { Item } from "./Item";

export default class Catnip extends Item {
    protected _name: string = 'Catnip';
    protected _desc: string[] = [
        'Raises inflicted damage by 10%',
        'Base damage up by 10%',
        'Base damage up by 10%',
        'Base damage up by 10%',
        'Base damage up by 10%'
    ];
    protected _icon: string = 'cat_nip';

    protected _maxLevel = 5;

    Activate(player: PLayer) {
        super.Activate(player);

        player.IncreaseDamageMod(0.1);
    }

    Upgrade(): void {
        super.Upgrade();
        this._player.IncreaseDamageMod(0.1);
    }
}