import { _decorator, Component, Node, log } from "cc";
import { Constants } from "../data/constants";
const { ccclass, property } = _decorator;

@ccclass("GameUI")
export class GameUI extends Component {

    // @property(Node)
    // pageStart: Node = null;
    // @property(Node)
    // pageResult: Node = null;

    shotTimes = 0;
    isShowTips = true;

    start(){
        this.shotTimes = 0;
        this.isShowTips = true;
    }

    shotLeft(){
        Constants.game.audioManager.playShot();
        Constants.game.node.emit(Constants.SHOT_EVENT.LEFT);
        
        this.hideTips();
    }

    shotRight(){
        Constants.game.audioManager.playShot();
        Constants.game.node.emit(Constants.SHOT_EVENT.RIGHT);

        this.hideTips();
    }

    hideTips() {
        if(this.isShowTips) {
            if(this.shotTimes<3) {
                this.shotTimes++;
            } else {
                Constants.game.node.emit(Constants.GAME_EVENT.HIDETIPS);
                this.isShowTips = false;
            }
        }  
    }
}
