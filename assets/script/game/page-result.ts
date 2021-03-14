import { _decorator, Component, Node, sys, view, log, Vec3, ProgressBar } from "cc";
import { Constants } from "../data/constants";
import { UpdateValueLabel } from "./update-value-label";
import { Revive } from "./revive";
const { ccclass, property } = _decorator;

/**
 * 信息显示界面
 * scoreLabel 分数展示
 * levelLabel 关数展示
 * availableTimeLabel 剩余时间展示
 */
@ccclass("PageResult")
export class PageResult extends Component {

    @property({ type: UpdateValueLabel })
    scoreLabel: UpdateValueLabel = null;
    
    @property({ type: UpdateValueLabel })
    scoreLabel_title: UpdateValueLabel = null;
    
    @property({ type: UpdateValueLabel })
    levelLabel: UpdateValueLabel = null;

    @property({ type: UpdateValueLabel })
    levelLabel_title: UpdateValueLabel = null;

    @property(Node)
    progressBarLayout: Node = null;
    // @property({ type: UpdateValueLabel })
    // availableTimeLabel: UpdateValueLabel = null;

    @property({ type: ProgressBar })
    availableTimeProgressBar: ProgressBar = null;

    @property({ type: UpdateValueLabel })
    availableTimeLabel_title: UpdateValueLabel = null;

    targetScore: number = 0;
    targetLevel: number = 0;
    availableTime: number = 0;

    @property(Node)
    nodeTips1: Node = null;

    @property(Node)
    leftBtnTips: Node = null;

    @property(Node)
    rightBtnTips: Node = null;

    @property(Node)
    result: Node = null;

    init() {
        let windowSize=view.getVisibleSize();
        log("width="+windowSize.width+",height="+windowSize.height);

        this.targetScore = 0;
        this.targetLevel = 0;
        this.availableTime = 0;

        // let adjust = (windowSize.height - 1707)/2;

        // log("scoreLabel().y="+this.scoreLabel.node.getPosition().y);
        // log("availableTimeLabel().y="+this.availableTimeLabel.node.getPosition().y);

        // this.scoreLabel.node.setPosition(new Vec3(this.scoreLabel.node.getPosition().x,
        //                                         0 - windowSize.height/2 + 200,
        //                                         this.scoreLabel.node.getPosition().z));

        this.adjustLable(this.progressBarLayout,0 - windowSize.height/2 + 160);
        this.adjustLable(this.availableTimeLabel_title.node,0 - windowSize.height/2 + 190);

        this.adjustLable(this.levelLabel.node,0 - windowSize.height/2 + 260);
        this.adjustLable(this.levelLabel_title.node,0 - windowSize.height/2 + 260);

        this.adjustLable(this.scoreLabel.node,0 - windowSize.height/2 + 260);
        this.adjustLable(this.scoreLabel_title.node,0 - windowSize.height/2 + 260);

        this.scoreLabel.playUpdateValue(this.targetScore, this.targetScore, 0);
        // this.levelLabel.playUpdateValue(this.targetLevel, this.targetLevel, 0);        
        // this.availableTimeLabel.playUpdateValue(this.availableTime, this.availableTime, 0);

        this.scoreLabel.isPlaying = false;
        this.leftBtnTips.active = false;
        this.rightBtnTips.active = false;

        // this.result.active = true;
    }

    adjustLable(node : Node,adjust : number) {
        node.setPosition(new Vec3(node.getPosition().x,
        adjust,
        node.getPosition().z));
    }

    onEnable() {
        Constants.game.node.on(Constants.GAME_EVENT.HIDETIPS, this.hideTips, this);
        Constants.game.node.on(Constants.GAME_EVENT.SHOWTIPS, this.showTips, this);
        Constants.game.node.on(Constants.GAME_EVENT.ADDSCORE, this.addScore, this);
        Constants.game.node.on(Constants.GAME_EVENT.START_LEVEL, this.levelUp, this);
        Constants.game.node.on(Constants.GAME_EVENT.AVAILABLE_TIME, this.showAvailTime, this);
        Constants.game.node.on(Constants.GAME_EVENT.DYING, this.gameDie, this);

        // this.showTips(true);
        this.showResult(false);
        this.init();
    }

    start(){
        const reviveComp = this.result.getComponent(Revive);
        reviveComp.pageResult = this;
    }

    onDisable() {
        Constants.game.node.off(Constants.GAME_EVENT.HIDETIPS, this.hideTips, this);
        Constants.game.node.off(Constants.GAME_EVENT.SHOWTIPS, this.showTips, this);
        Constants.game.node.off(Constants.GAME_EVENT.ADDSCORE, this.addScore, this);
        Constants.game.node.off(Constants.GAME_EVENT.AVAILABLE_TIME, this.showAvailTime, this);
        Constants.game.node.off(Constants.GAME_EVENT.START_LEVEL, this.levelUp, this);
    }

    addScore(score: number) {
        this.targetScore = score;
        let curProgress = Number(this.scoreLabel.string);
        this.scoreLabel.playUpdateValue(curProgress, this.targetScore, (this.targetScore - curProgress) / 20);
    }

    levelUp(level: number,levelName: string) {
        this.targetLevel = level;
        let curProgress = Number(this.levelLabel.string);
        // this.levelLabel.playUpdateValue(curProgress, this.targetLevel, (this.targetLevel - curProgress) / 20);
        this.levelLabel.string = levelName;
    }

    showAvailTime(availTime: number) {
        this.availableTime = availTime;
        // let curProgress = Number(this.availableTimeLabel.string);
        // this.availableTimeLabel.playUpdateValue(curProgress, this.availableTime, (this.availableTime - curProgress) / 200);

        // log("availTime/300 ==>" + availTime/300);
        this.availableTimeProgressBar.progress = availTime/300;

        //保存最高纪录
        if(availTime<=0){
            let scoreHistory = sys.localStorage.getItem( 'scoreHistory');
            if (!scoreHistory || Number(scoreHistory) < this.targetScore){
                sys.localStorage.setItem( 'scoreHistory', this.targetScore);
            }

            let scoreLevel = sys.localStorage.getItem( 'scoreLevel');
            if (!scoreLevel || Number(scoreLevel) < this.targetLevel){
                sys.localStorage.setItem( 'scoreLevel', this.targetLevel);
            }
            
            this.result.active = true;
            Constants.game.gameDie();
        }
    }

    gameDie(cd){
        this.showTips(false);
        this.showResult(true);
    }

    showTips(show: boolean){
        this.nodeTips1.active = show;
        this.leftBtnTips.active = show;
        this.rightBtnTips.active = show;
    }

    hideTips(){
        this.showTips(false);
    }

    showResult(isShow: boolean){
        this.result.active = isShow;
    }
}
