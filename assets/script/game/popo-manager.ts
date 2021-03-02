import { _decorator, Component, Node, Prefab, instantiate, Vec3, ParticleSystem, log, RigidBodyComponent,ColliderComponent, ICollisionEvent, ITriggerEvent } from "cc";
import { Torus } from "./Torus";
import { Constants } from "../data/constants";
import { utils } from "../utils/utils";
import { levelParser,levelData,ActorInfo } from "../level/levelParser";

const { ccclass, property } = _decorator;

const _tempPos = new Vec3();
const _diamondPos = new Vec3();

const _leftShotPos = new Vec3(-30, -60, 0);
const _rightShotPos = new Vec3(30, -60, 0);

const INIT_CREATETORUS_DELAYTIME = 0.01;

@ccclass("PopoManager")
export class PopoManager extends Component {

    @property(Prefab)
    torusPrefab: Prefab = null;

    _torusList: Torus[] = []; // 环列表

    mIndex: number = 0;

    @property({ type: ParticleSystem, tooltip: '气泡粒子系统' })
    leftPoPoParticleSystem: ParticleSystem = null;

    @property({ type: ParticleSystem, tooltip: '气泡粒子系统' })
    rightPoPoParticleSystem: ParticleSystem = null;

    start () {
    }

    startPlay (_levelData: levelData){       
        this.reset(); 
        this.initTorus(_levelData);
    }    

    onDestroy() {
    }

    shotLeft(){

        let torus;
        this.leftPoPoParticleSystem.play();

        for (let i = 0; i < this._torusList.length; i++) {
            torus = this._torusList[i];
            torus.shot(_leftShotPos);
        }
    }

    shotRight(){

        let torus;
        this.rightPoPoParticleSystem.play();

        for (let i = 0; i < this._torusList.length; i++) {
            torus = this._torusList[i];
            torus.shot(_rightShotPos);
        }
    }

    // 每次开始游戏重置
    reset(){
        for (let i = 0; i < this._torusList.length; i++) {
            const torus = this._torusList.shift();            
            torus.destroy();
        }
        this.node.removeAllChildren();
    }

    // 泡泡环初始化
    initTorus(_levelData: levelData) {
        
        let length = _levelData.torusList.length;
        this.mIndex = 0;
        let createTorus = function () {            
            const node = instantiate(this.torusPrefab) as Node;
            this.node.addChild(node);
            const torus = node.getComponent('Torus') as Torus;
            this._torusList.push(torus);

            torus.inits(_levelData.torusList[this.mIndex],this.mIndex);
            
            this.mIndex ++;

            // 等于 Constants.INIT_TORUS_NUM 的时候停止计时器回调
            if (length <= this.mIndex) {

                this.unschedule(createTorus);
            }
        }
        this.schedule(createTorus, INIT_CREATETORUS_DELAYTIME);   
    }
}