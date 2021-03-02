import { _decorator, Component, Node, log } from "cc";
import { Constants } from "../data/constants";
const { ccclass, property } = _decorator;

@ccclass("PageStart")
export class PageStart extends Component {

    gameStart(){

        log('PageStart', 'gameStart');

        Constants.game.node.emit(Constants.GAME_EVENT.RESTART);
        // Constants.game.audioManager.playClip();
    }
}
