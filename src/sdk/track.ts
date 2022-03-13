import { AsyncTaskQueue } from "./async-task-queue";
// import { stringify } from 'query-string';
import { v4 as uuid } from 'uuid';

// interface --> 
// seqId: number
// id: string
// timestamp: number
// 

/** */
export class BaseTrack extends AsyncTaskQueue {
    seq = 0;
    // 实现这个 抽象函数。
    consumeTaskQueue(data: any) {
        let img;
        console.log('sending... img...', data)
        img = new Image(0,0);
        img.src = 'http://localhost:3001/1.gif?data='+ JSON.stringify(data);
        img.onload = img.onerror = function(){
            img = null;
        };
        // return axios.post('http://lubai.com', {data})
    }

    // 为什么？ 主要就是还是要分层。
    track(data: DTRData) {
        if(data) {
            console.log("Tracking...", data)
            this.addTask({
                id: uuid(),
                seqId: this.seq++,  // 稳定用户交互的序列。这个时候需要确定的。
                timestamp: Date.now(),
                ...data,
            })
        }
    }
}

export const baseTrack = new BaseTrack();