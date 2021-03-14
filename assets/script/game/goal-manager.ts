import { _decorator, Component, Node, Prefab, instantiate, Vec3, ParticleSystem, log, RigidBodyComponent,ColliderComponent, ICollisionEvent, ITriggerEvent } from "cc";
import { Torus } from "./Torus";
import { Constants } from "../data/constants";
import { utils } from "../utils/utils";
import { levelParser,levelData,ActorInfo } from "../level/levelParser";

const { ccclass, property } = _decorator;

@ccclass("GoalManager")
export class GoalManager extends Component {    

    @property(Prefab)
    goalPrefab: Prefab = null;

    // @property({ type: ColliderComponent, tooltip: '投中碰撞组件' })
    // colliderComponent_goalPrefab: ColliderComponent = null;

    // @property({ type: ColliderComponent, tooltip: '投中碰撞组件' })
    // colliderComponent_goal01: ColliderComponent = null;

    // @property({ type: ColliderComponent, tooltip: '投中碰撞组件' })
    // colliderComponent_goal02: ColliderComponent = null;

    start () {        
        // this.colliderComponent_goal01.setGroup(Constants.PHY_GROUP.GroupGoal);
        // this.colliderComponent_goal02.setGroup(Constants.PHY_GROUP.GroupGoal);

        // this.colliderComponent_goalPrefab.setGroup(Constants.PHY_GROUP.GroupGoal);
    }

    startPlay (_levelData: levelData) {
        this.initGoals(_levelData);
    }    

    // 目标杆初始化
    initGoals(_levelData: levelData) {
        this.node.removeAllChildren();

        let length = _levelData.goalList.length;
        for(let i = 0;i<length;i++){
            const node = instantiate(this.goalPrefab) as Node;  
            this.node.addChild(node);
            node.setPosition(new Vec3(_levelData.goalList[i].x,_levelData.goalList[i].y,_levelData.goalList[i].z));
            node.getComponent(ColliderComponent).setGroup(Constants.PHY_GROUP.GroupGoal);      
        }
    }

    onDestroy() {
    }

    reset(){
    }
}