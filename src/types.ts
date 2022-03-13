

declare type ErrorType = "jserror" | "promise" | "blankScreen" ;
declare type ErrorHandlers = {
    [e in ErrorType]: Function
}

declare type PerfType = "fp" | "fcp" | "fmp" ;
declare type PerfHandlers = {
    [e in PerfType]: Function
}

declare type TrackType = "ajax" | "fetch" | "xpath" ;
declare type TrackHandlers = {
    [e in TrackType]: Function
}


declare type DTRTypes = "errorTypes" | "perfTypes" | "trackTypes" ;
// 声明传入参数
declare interface DTROptions {
    errorTypes: Array<ErrorType>;
    perfTypes: Array<PerfType>;
    trackTypes: Array<TrackType>;
}
declare interface DTRHandlers {
    errorTypes: ErrorHandlers,
    perfTypes?: PerfHandlers,
    trackTypes?: TrackHandlers
}



// 返回数据类型

// declare type DTRData = DTRErrorData

declare interface DTRErrorData {
    type: string,
    kind: string,
    errorType: string,
    filename: string,
    message: string,
    selector: string,
    stack?: string,
    timeStamp?: number,
    tagName?: string,
    position?: string,
}

declare interface DTRPerfData {
    type: string,
    kind: string,
    errorType: string,
    filename: string,
    message: string,
    selector: string,
    stack?: string,
    timeStamp?: number,
    tagName?: string,
    position?: string,
}

declare interface DTRTrackData {
    
}

// declare interface 