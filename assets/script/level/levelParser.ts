import { _decorator, log, Node, loader, Vec3, JsonAsset} from "cc";

const { ccclass, property } = _decorator;
 
@ccclass("levelParser")
export class levelParser {
 
    //用来承接关卡信息的对象数组
    static levelDataArr:levelData[] = [];

    static getLevelData(level : number) : levelData {

        log("levelDataArr level =>" + level);
        log("levelDataArr length =>" + levelParser.levelDataArr.length);
        log("levelDataArr _torusList =>" + levelParser.levelDataArr[0].torusList.length);

        if(level >= levelParser.levelDataArr.length) {
            log("关数数组越界");
            return null;
        }

        return levelParser.levelDataArr[level];
    }
 
    static readLevelDataJson(urls:string,callback = null){
        loader.loadRes(urls,JsonAsset,(err,res)=>{

            log("loader.loadRes == >" + urls);

            if(err){
                log(err);
                return;
            }

            log("res.json == >" + res.json["version"]);
            log("res.json == >" + res.json["level"].length);
            log("res.json == >" + res.json["level"][0].levelName);
            log("res.json == >" + res.json["level"][0].torusList[0].x);

            for(let i = 0;i<res.json["level"].length;i++){
                let _levelData = new levelData();
                _levelData.levelName = res.json["level"][i].levelName;
                _levelData.rewardTime = res.json["level"][i].rewardTime;
                _levelData.rewardScore = res.json["level"][i].rewardScore;
                _levelData.rewardScorePreSecond = res.json["level"][i].rewardScorePreSecond;

                let _torusList : ActorInfo[] = [];
                for(let j = 0;j<res.json["level"][i].torusList.length;j++){
                    let _torusData = new ActorInfo();
                    _torusData.x = res.json["level"][i].torusList[j].x;
                    _torusData.y = res.json["level"][i].torusList[j].y;
                    _torusData.z = res.json["level"][i].torusList[j].z;
                    _torusData.color = res.json["level"][i].torusList[j].color;

                    _torusList.push(_torusData);
                }

                _levelData.torusList = _torusList;

                let _goalList : ActorInfo[] = [];
                for(let j = 0;j<res.json["level"][i].goalList.length;j++){
                    let _goalData = new ActorInfo();
                    _goalData.x = res.json["level"][i].goalList[j].x;
                    _goalData.y = res.json["level"][i].goalList[j].y;
                    _goalData.z = res.json["level"][i].goalList[j].z;
                    _goalData.color = res.json["level"][i].goalList[j].color;

                    _goalList.push(_goalData);
                }

                _levelData.goalList = _goalList;

                levelParser.levelDataArr.push(_levelData);
            }

            if(callback){
                callback();
            }
        });
    }
}

export class levelData  {
    levelName : string = "";
    torusList : ActorInfo[] = [];
    goalList : ActorInfo[] = [];
    // starList : IActorInfo[];
    // fishList : IActorInfo[];
    rewardTime: number = 0;
    rewardScore: number = 0;
    rewardScorePreSecond: number = 0;
    // bgRes: number;
    // bgBGM: number; 
}

export class ActorInfo {
    x: number = 0;
    y: number = 0;
    z: number = 0;
    color: number = 0;
}