
/**
 * Copyright (c) 2019 Xiamen Yaji Software Co.Ltd. All rights reserved.
 * Created by daisy on 2019/06/25.
 */
import { _decorator, Component, Node, instantiate, Prefab } from "cc";
import { PopoManager } from "./popo-manager";
import { GoalManager } from "./goal-manager";
import { Constants } from "../data/constants";
import { CameraCtrl } from "./camera-ctrl";
import { UIManager } from "./ui-manager";
import { levelParser } from "../level/levelParser";
import { AudioManager } from "./audio-manager";

const { ccclass, property } = _decorator;

/**
 * @zh 游戏管理类，同时也是事件监听核心对象。
 */
@ccclass("Game")
export class Game extends Component {
    
    @property(PopoManager)
    popoManager: PopoManager = null;

    @property(GoalManager)
    goalManager: GoalManager = null;

    @property(CameraCtrl)
    cameraCtrl: CameraCtrl = null;
    @property(UIManager)
    uiManager: UIManager = null;
    @property(AudioManager)
    audioManager: AudioManager = null;

    state = Constants.GAME_STATE.READY;
    score = 0;
    level = 0;
    availableTime = 0;
    inGoal = 0;
    torus_num = 0;

    hasRevive = false;
    __preload () {
        Constants.game = this;
    }

    onLoad(){
    }

    start(){ 
        levelParser.readLevelDataJson("json/LevelData");

        this.node.on(Constants.GAME_EVENT.RESTART, this.gameStart, this);
        this.node.on(Constants.GAME_EVENT.REVIVE, this.gameRevive, this);
        
        this.node.on(Constants.SHOT_EVENT.LEFT, this.shotLeft, this);
        this.node.on(Constants.SHOT_EVENT.RIGHT, this.shotRight, this);
    }

    onDestroy() {
        this.node.off(Constants.GAME_EVENT.RESTART, this.gameStart, this);
        this.node.off(Constants.GAME_EVENT.REVIVE, this.gameRevive, this);
        
        this.node.off(Constants.SHOT_EVENT.LEFT, this.shotLeft, this);
        this.node.off(Constants.SHOT_EVENT.RIGHT, this.shotRight, this);
    }

    shotLeft(){
        if(this.state == Constants.GAME_STATE.PLAYING)
            this.popoManager.shotLeft();
    }

    shotRight(){
        if(this.state == Constants.GAME_STATE.PLAYING)
            this.popoManager.shotRight();
    }

    resetGame() {
        this.state = Constants.GAME_STATE.READY;
        // this.cameraCtrl.reset();
        this.uiManager.showDialog(true);
    }

    gameStart(){
        // this.audioManager.playSound();
        this.uiManager.showDialog(false);
        this.state = Constants.GAME_STATE.PLAYING;
        // this.hasRevive = false;
        this.score = 0;
        this.level = 0;
        this.levelStart();

        let reduceAvailableTime = function () {   
            
            if(this.availableTime>0) {
                this.availableTime--;
            }
            
            this.node.emit(Constants.GAME_EVENT.AVAILABLE_TIME, this.availableTime);
        }
        this.schedule(reduceAvailableTime, 1);   
    }

    levelStart(){
        this.inGoal = 0;

        let _levelData = levelParser.getLevelData(this.level);
        this.torus_num = _levelData.torusList.length;
        this.goalManager.startPlay(_levelData);
        this.popoManager.startPlay(_levelData);

        this.level++;
        this.node.emit(Constants.GAME_EVENT.START_LEVEL, this.level);
        this.availableTime = this.availableTime + _levelData.rewardTime;
        this.node.emit(Constants.GAME_EVENT.AVAILABLE_TIME, this.availableTime);
    }

    gameDie(){
        this.audioManager.playSound(false);
        this.state = Constants.GAME_STATE.PAUSE;

        // if (!this.hasRevive) {
        //     this.node.emit(Constants.GAME_EVENT.DYING, ()=>{
        //         this.gameOver();
        //     });
        // } else {
        //     this.gameOver();
        // }
    }

    gameOver() {
        this.state = Constants.GAME_STATE.OVER;
        this.audioManager.playSound(false);

        this.resetGame();
    }

    gameRevive(){
        this.hasRevive = true;
        this.state = Constants.GAME_STATE.READY;
        this.scheduleOnce(() => {
            this.audioManager.playSound();
            this.state = Constants.GAME_STATE.PLAYING;
        }, 1);
    }

    addScore(score: number){
        this.score += score;
        this.inGoal++;
        this.node.emit(Constants.GAME_EVENT.ADDSCORE, this.score);

        if(this.inGoal >= this.torus_num){
            this.levelStart();
        }
    }
}
