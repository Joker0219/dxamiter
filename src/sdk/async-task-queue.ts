import _ from 'lodash-es';

// interface RequiredData {
//     timestamp: number;

// }

// 存储层的数据
class TaskQueueStorableHelper {
    // protected store: any = null;
    // private STORAGE_KEY = "lubai_store";
    store: any = null;
    STORAGE_KEY = "luyi_store";

    static instance: TaskQueueStorableHelper | null = null;
    static getInstance() {
        if(!this.instance) {
            this.instance = new TaskQueueStorableHelper();
        }
        return this.instance;
    }


    constructor() {
        const localStorageValue = localStorage.getItem(this.STORAGE_KEY);
        if(localStorageValue) {
            this.store = JSON.parse(localStorageValue);

        }
    }

    get queueData() {
        return this.store?.queueData || [];
    }

    set queueData(queueData) {
        this.store = {
            ... this.store,
            queueData: queueData.sort((a:any,b:any) => Number(a.timestamp) - Number(b.timestamp))
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.store));
    }
}

export class AsyncTaskQueue {
    get storableService() {
        return TaskQueueStorableHelper.getInstance();
    }

    // 提供给异步队列使用的。
    get queueData() {
        return this.storableService.queueData;
    }
    set queueData(value) {
        this.storableService.queueData = value;
        if(value.length) {
            // todo run
            this.debounceRun();
        }
    }

    debounceRun = _.debounce(this.run.bind(this), 1000)
    // protected adstratc consumeTaskQueue();
    consumeTaskQueue(data: any):any {
        console.error("You should realize this function all by Urself. ")
    }
    // private
    run() {
        // 实际要上报的内容
        // 如果要严谨一些，通过每一个 task ID 来重新给队列赋值。
        const currentDataList = this.queueData;
        if(currentDataList.length) {
            // 当前这批数据上报完成后，需要从 queueData 中剔除。
            this.consumeTaskQueue(currentDataList) //.catch(_ as any => _);// 这里可以重试。
            this.queueData = [];
        }
    }

    // 如何去往数组里推内容
    addTask(data: any) {
        this.queueData = this.queueData.concat(data);
    }
}

/** 开发人员调用 addTask -> set QueueData -> debounceRun -> 1000ms 后 run -> 清空数组 */