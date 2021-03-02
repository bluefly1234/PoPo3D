/**
 * Copyright (c) 2019 Xiamen Yaji Software Co.Ltd. All rights reserved.
 * Created by daisy on 2019/06/25.
 */
import { _decorator, Vec3 } from "cc";
import { Game } from "../game/game";

enum SHOT_EVENT {
    LEFT = 'left',
    RIGHT = 'right',
}

enum PHY_GROUP {
    GroupDefault =  1 << 0,
    GroupGoal =  1 << 1,
    GroupTorus =  1 << 2,
    GroupInGoal =  1 << 3
}

enum GAME_STATE {
    /**
     * @zh 游戏准备中
     */
    READY = 1,
    /**
     * @zh 游戏中
     */
    PLAYING = 2,
    /**
     * @zh 游戏暂停
     */
    PAUSE = 3,
    /**
     * @zh 游戏结束
     */
    OVER = 4,
}

enum GAME_EVENT {
    /**
     * @zh 重新开始
     */
    RESTART = 'restart',
    /**
     * @zh 复活
     */
    REVIVE = 'revive',
    /**
     * @zh 增加分数
     */
    ADDSCORE = 'add-score',
    /**
     * @zh 死亡中
     */
    DYING = 'dying',
    /**
     * @zh 隐藏提示板
     */
    HIDETIPS = 'hide-tips',
    /**
     * @zh 显示提示板
     */
    SHOWTIPS = 'show-tips',
    /**
     * @zh 开始新关卡
     */
    START_LEVEL = 'start-level',
    /**
     * @zh 剩余时间
     */
    AVAILABLE_TIME = 'available-time',
}

export class Constants {

    // game
    static SHOT_EVENT = SHOT_EVENT; // 射击枚举

    static PHY_GROUP = PHY_GROUP; // 物理分组枚举

    static game: Game;

    // torus
    static TORUS_SCORE = 1;

    // popo
    static POPO_INIT_POS = new Vec3(0, 60, 0); // 跳板初始位置

    static MAX_SCORE = 0; // 历史最高
    
    // camera
    static CAMERA_INIT_POS = new Vec3(0, 15, 22); // 相机初始位置
    static CAMERA_INIT_ROT = new Vec3(-11, 0, 0); // 相机初始旋转
    static CAMERA_MOVE_X_FRAMES = 20; // 相机横向偏移比例
    static CAMERA_MOVE_Y_FRAMES = 15; // 相机纵向偏移比例
    static CAMERA_MOVE_Y_FRAMES_SPRING = 23; // 弹簧跳板纵向偏移比例
    static CAMERA_MOVE_MINI_ERR = 0.02; // 相机位置最小误差
    static CAMERA_OFFSET_Y = 10;
    static CAMERA_OFFSET_Y_SPRINT = 15;
    static BOARD_BUMP_FRAMES = 10;
    static BOARD_BUMP_STEP = [-0.15, -0.1, -0.07, -0.02, -0.003, 0.003, 0.02, 0.07, 0.1, 0.15];

    // game
    static GAME_STATE = GAME_STATE; // 游戏状态枚举
    static GAME_EVENT = GAME_EVENT; // 游戏事件枚举

}
