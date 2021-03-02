/**
 * Copyright (c) 2019 Xiamen Yaji Software Co.Ltd. All rights reserved.
 * Created by daisy on 2019/06/25.
 */
import { _decorator, Component, Node, Vec3 } from "cc";
import { Constants } from "../data/constants";
const { ccclass, property } = _decorator;

const _tempPos = new Vec3();

@ccclass("CameraCtrl")
export class CameraCtrl extends Component {
    @property(Node)
    planeNode: Node = null;

    _originPos = new Vec3();

    start () {
        this._originPos.set(Constants.CAMERA_INIT_POS);
        this.setPosition(this._originPos);
        this.node.eulerAngles = Constants.CAMERA_INIT_ROT;
    }

    setOriginPosX(val: number){
        this._originPos.x = val;
    }

    setOriginPosY(val: number) {
        this._originPos.y = val;
    }

    update() {
    }

    // 相机的默认位置
    reset() {
        this._originPos.set(Constants.CAMERA_INIT_POS);
        this.setPosition(this._originPos);
    }

    // 相机更新的同时更新背景板
    setPosition(position: Vec3) {
        this.node.setPosition(position);
        const y = position.y - 27;
        this.planeNode.setPosition(position.x, y, -100);
    }
}
