import Game from "../Game";
import { PowerUp } from "../player/attacks/Attack";
import { PowerUpDisplay } from "./LevelUpScene";
import BaseScene from "./Scene";

export default class ChooseStartAttackScene extends BaseScene {
    public static SceneName = 'ChooseStartAttackScene';

    attacks: PowerUp[];

    init(data: { attacks: PowerUp[]; }) {
        this.attacks = data.attacks;
    }

    create(): void {
        const bg = this.add.nineslice(280, 100, 400, 115 + 105 * this.attacks.length, 'panel_bg', [ 5, 5, 5, 5 ]);

        let space = 0;
        for (const attack of this.attacks)
        {
            new PowerUpDisplay(this, 300, 200 + space, attack, this.close, this);
            space += 105;
        }

        this.add.rexBBCodeText(480, 150, 'Choose Start', {
            fontFamily: 'Comic Sans MS',
            color: '#ffffff',
            fontSize: '50px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5);
    }

    close() {
        Game.Instance.manager.ChooseStartClosed();
    }
}