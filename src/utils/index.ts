export function mergeOptions(opts: DTROptions) :DTROptions {
    // 错误上报
    let res_errorTypes: Array<ErrorType> = [];
    if(opts && (opts.errorTypes)) {
        res_errorTypes = opts.errorTypes;
    } else {
        res_errorTypes = ["jserror", "promise"];
    }
    
    // 性能监控
    let res_perfTypes: Array<PerfType> = [];
    if(opts && (opts.perfTypes)) {
        res_perfTypes = opts.perfTypes;
    } else {
        res_perfTypes = ["fp", "fcp", "fmp"];
    }

    // 埋点监控
    let res_trackTypes: Array<TrackType> = [];
    if(opts && (opts.trackTypes)) {
        res_trackTypes = opts.trackTypes;
    } else {
        res_trackTypes = ["ajax", "fetch", "xpath"];
    }

    return {
        errorTypes: res_errorTypes,
        perfTypes: res_perfTypes,
        trackTypes: res_trackTypes

    };
}


let lastEvent: Event;
['click','pointerdown', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach(event => {
    document.addEventListener(event, (event) => {
        lastEvent = event;
    }, {
        capture: true,//capture 控制监听器是在捕获阶段执行还是在冒泡阶段执行 
        passive: true //passive 的意思是顺从的，表示它不会对事件的默认行为说 no
    });
});
export function getLastEvent () : any{
    return lastEvent;
};

const getSelector = function (path: Array<any>) {
    return path.reverse().filter(function (element: any) {
        return element !== window && element !== document;
    }).map(function (element) {
        var selector;
        if (element.id) {
            selector = `#${element.id}`;
        } else if (element.className && typeof element.className === 'string') {
            selector = '.' + element.className.split(' ').filter(function (item: any) { return !!item }).join('.');
        } else {
            selector = element.nodeName;
        }
        return selector;
    }).join(' ');
}

export function getSelectors (pathsOrTarget: Array<any> | any) {
    if (Array.isArray(pathsOrTarget)) {
        return getSelector(pathsOrTarget);
    } else {
        // 对脚本加载错误的时候的判断
        var paths = [];
        var element = pathsOrTarget;
        while (element) {
            paths.push(element);
            element = element.parentNode;
        }
        return getSelector(paths);
    }
}

export function getLines(stack: string) {
    if (!stack) {
        return '';
    }
    return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, '')).join('^');
}