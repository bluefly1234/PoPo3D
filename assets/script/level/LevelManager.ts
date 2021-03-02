import { _decorator, Component, Node, loader, Prefab, Vec3, macro } from "cc";

const { ccclass, property } = _decorator;

@ccclass("LevelManager")
export class LevelManager extends Component {

    // public levelInfos: ILevelInfo[] = [{ level: 1 , torusList:[{location:new Vec3(0,0,0),color:1}], rewardTime:20},


    //                                    { level: 2 , torusList:[{location:new Vec3(0,0,0),color:1}], rewardTime:40}];

    public start() {
        // CustomEventListener.on(Constants.EventName.GAME_START, this._gameStart, this);
        // CustomEventListener.on(Constants.EventName.GAME_OVER, this._gameOver, this);


    }

    public reset(points: Node[]){
    }

    private _gameStart(){
    }

    private _gameOver(){
    }
}

interface IActorInfo {
    location: Vec3,
    color: number,
}

interface ILevelInfo {    
    levelName: string,
    torusList : IActorInfo[],
    // goalList : IActorInfo[],
    // starList : IActorInfo[],
    // fishList : IActorInfo[],
    rewardTime: number,
    // rewardScore: number,
    // rewardScorePreSecond: number,
    // bgRes: number,
    // bgBGM: number,
}

interface IPlayerDataInfo {
    highLevel: number,
    highScore: number,
}
