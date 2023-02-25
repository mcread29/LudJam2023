export class SaveData {
    musicVolume: number = 0.4;
    sfxVolume: number = 0.4;
    coinCount: number = 0;
    SuccTier: number = 0; //
    WickedTier: number = 0; //
    CandleTier: number = 0; //
    CatNipTier: number = 0; //
    StarTier: number = 0; //
}

export default class PlayerData {
    public static Instance: PlayerData;

    private get localStorageKey(): string {
        return this._gameId + "_SaveData";
    }

    private _gameId: string;
    private _saveData: SaveData;
    public get saveData(): SaveData {
        return this._saveData;
    }

    constructor(gameId: string) {
        this._gameId = gameId;
        this.load();
        PlayerData.Instance = this;
    }

    load() {
        let base64String = localStorage.getItem(this.localStorageKey);
        if (base64String != '' && base64String != null)
        {
            let jsonText = window.atob(base64String);
            this._saveData = new SaveData();
            let saveData = <SaveData>(JSON.parse(jsonText));
            for (let key in saveData) (<any>this._saveData)[ key ] = (<any>saveData)[ key ];
        }
        else
        {
            this._saveData = new SaveData();
        }
    }

    save() {
        let jsonString = JSON.stringify(this._saveData);
        let base64String = window.btoa(jsonString);
        localStorage.setItem(this.localStorageKey, base64String);
    }

    reset() {
        localStorage.removeItem(this.localStorageKey);
        this._saveData = new SaveData();
    }
}