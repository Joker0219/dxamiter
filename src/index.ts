import { mergeOptions } from "./utils/index";
import { handleErrors } from './handlers/errors/index';
import { handlePrefs } from "./handlers/performances/index";
import { handleTrackers } from "./handlers/trackers/index";
import {baseTrack} from './sdk/track.js'


console.log("Welcome to dxamiter!, U can visit http://www.baidu.com to learn more about this ")

const handlers: DTRHandlers = {
    errorTypes: handleErrors(),
    perfTypes: handlePrefs(),
    trackTypes: handleTrackers(),
}

export default (opts: DTROptions, handler: (obj: DTRData)=> void ): void => {
    // 对 opts 的类型进行判断；
    opts = mergeOptions(opts);

    // 如果没有显式的监控回调函数，使用自己的。
    if(!handler) {
        handler = inlineHandler;
    }

    // 函数挂载
    // 不适合treeShaking ，暂时不考虑的可以。
    Object.entries(opts).forEach(([key, value]) => {
        value.forEach((item: string | number) => {
            handlers[key][item](handler)
        });
    })
    // if(opts.errorTypes) {
    //     opts.errorTypes.forEach(key => handleErrors()[key]())
    // }
    // if(opts.perfTypes) {
    //     opts.perfTypes.forEach(key => handlePrefs()[key]())
    // }
    // if(opts.trackTypes) {
    //     opts.trackTypes.forEach(key => handleTrackers()[key]())
    // }



}


function inlineHandler(obj: DTRData) {
    baseTrack.track(obj)
}

// export function monitor() :void {
    
// }