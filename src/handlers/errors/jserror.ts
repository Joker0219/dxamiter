import { getLastEvent, getSelectors, getLines } from "../../utils/index";

export function injectError(callback: (obj: DTRErrorData) => void) {
    window.addEventListener('error', function (event: ErrorEvent & Event & any) {
        let lastEvent = getLastEvent();
        let target = (event.target as HTMLScriptElement & HTMLLinkElement & EventTarget);
        if (target && (target?.src || target?.href)) {
            // 资源加载的错误，必须要捕获阶段，否则捕获不到。
            callback({
                kind: 'stability',
                type: 'error',
                errorType: 'resourceError',
                filename: (target as HTMLScriptElement).src || target.href,
                tagName: target.tagName,
                timeStamp: event.timeStamp,
                selector: getSelectors(event.path as any || target),
                message: ""
            })
        } else {
            callback({
                kind: 'stability',//稳定性指标
                type: 'error',//error
                errorType: 'jsError',//jsError
                message: event.message,//报错信息
                filename: event.filename,//报错链接
                position: (event.lineno || 0) + ":" + (event.colno || 0),//行列号
                stack: getLines(event.error.stack),//错误堆栈
                selector: lastEvent ? getSelectors(lastEvent.path as any || lastEvent.target) : ''//CSS选择器
            })
        }
    }, true);// true代表在捕获阶段调用,false代表在冒泡阶段捕获,使用true或false都可以

}