/**
 * Copyright (c) 2019 Xiamen Yaji Software Co.Ltd. All rights reserved.
 * Created by daisy on 2019/06/25.
 */
import { _decorator, Component, Node, Vec3, Prefab, ITriggerEvent, MeshRenderer,
    ColliderComponent, log, RigidBodyComponent, Material } from "cc";
import { Constants } from "../data/constants";
import { Game } from "./game";
import { utils } from '../utils/utils';
import { levelParser , ActorInfo} from '../level/levelParser';
const { ccclass, property } = _decorator;

const _initPos = new Vec3(20,-25,0);

const NORMAL_FORCESCALAR = 2400000; 
const INGOAL_FORCESCALAR = 400000; 

const MAX_SPEED = 800; 

/**
 * 环操作
 * 初始化
 * 碰撞检测
 */
@ccclass("Torus")
export class Torus extends Component {

    forceScalar = 0;

    isInGoal = false;

    @property(Material)
    redMaterial: Material = null;

    @property(Material)
    yellowMaterial: Material = null;

    @property(Material)
    greenMaterial: Material = null;

    onLoad() {
    }

    inits(_torusData: ActorInfo,index: number) {     
        this.initByPos(new Vec3(_torusData.x,_torusData.y,_torusData.z));
        if(_torusData.color == 0) {
            this.node.getComponent(MeshRenderer).setMaterial(this.redMaterial,0);
        } else if(_torusData.color == 1){
            this.node.getComponent(MeshRenderer).setMaterial(this.yellowMaterial,0);
        } else if(_torusData.color == 2){
            this.node.getComponent(MeshRenderer).setMaterial(this.greenMaterial,0);
        }    
        this.isInGoal = false;    
    }

    initByPos(pos: Vec3) {           
        this.forceScalar = NORMAL_FORCESCALAR;

        this.node.setPosition(pos);
        this.initTrigger(this.node.getComponentInChildren(ColliderComponent));
    }

    initTrigger (collider: ColliderComponent) {
        // const collider = torus.getComponent(ColliderComponent);
        if (collider) {
            collider.on('onTriggerEnter', this.TriggerEnter, this);
            collider.on('onTriggerStay', this.TriggerStay, this);
            collider.on('onTriggerExit', this.TriggerExit, this);            
        }
        
    }

    shot(pos: Vec3) {
        let force_dir = this.node.position.subtract(pos);

        let force_power = (this.forceScalar/(Math.sqrt(force_dir.lengthSqr())*
                                            Math.abs(pos.x - this.node.position.x)));
                                            
        let speed = new Vec3(0,0,0);
        this.node.getComponent(RigidBodyComponent).getLinearVelocity(speed);

        if(speed.lengthSqr() < MAX_SPEED){
            let force = force_dir.normalize().multiplyScalar(force_power);
            this.node.getComponent(RigidBodyComponent).applyForce(force);
            
            // log('shot', 'speed :' + speed.lengthSqr()); 
        }

        // this.node.getComponent(RigidBodyComponent).setLinearVelocity(force);
               
    }

    TriggerEnter(event: ITriggerEvent) {
        // log('PopoManager', 'TriggerEnter :' + event.otherCollider.getGroup());
        if(event.otherCollider.getGroup() == Constants.PHY_GROUP.GroupGoal){
            if(!this.isInGoal) {
                this.goal();
                this.isInGoal = true; 
            }
        }
    }

    TriggerStay(event: ITriggerEvent) {
        // log('PopoManager', 'TriggerStay :' + event.otherCollider.getGroup());
    }

    TriggerExit(event: ITriggerEvent) {
        // log('PopoManager', 'TriggerExit :' + event.otherCollider.getGroup());
        // log('PopoManager', 'TriggerExit');
    }

    goal() {
        log('PopoManager', 'goal ');
        Constants.game.audioManager.playGoal();
        Constants.game.addScore(Constants.TORUS_SCORE);
        this.forceScalar = INGOAL_FORCESCALAR;
        // this.node.getComponentInChildren(ColliderComponent).setGroup(Constants.PHY_GROUP.GroupInGoal);
    }

    update() {
    }

    reset(pos: Vec3) {
    }

    setDrop() {

    }
}
