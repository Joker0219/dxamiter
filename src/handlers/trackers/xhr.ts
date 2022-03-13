export function injectXhr(callback: (obj: DTRTrackData) => void) {
    let XMLHttpRequest = window.XMLHttpRequest;
    let oldOpen:XMLHttpRequest["open"] = XMLHttpRequest.prototype.open;
    let oldSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function(method: string, url: string | URL): void {
        this['logData'] = { method, url };
        // missing async is for using tyopescript
        return oldOpen.call(this, method, url, true);
    }

    XMLHttpRequest.prototype.send = function(body?: Document | XMLHttpRequestBodyInit | null): void {
        if(this['logData']) {
            // means the method send has already tracked.
            let startTime = Date.now();
            let handler = (type: string) => (event: Event) => {
                let duration = Date.now() - startTime;
                let status = this.status; // 200, 500...
                let statusText = this.statusText // Ok,server-error
                callback({
                    kind: "stability",
                    type: 'xhr',
                    eventType: event.type, // load - error - abort
                    pathname: this['logData'].url,
                    status: `${status}-${statusText}`,
                    duration, // 持续事件
                    response: this.response ? JSON.stringify(this.response): '',
                    params: body || '',
                })
            }

            this.addEventListener('load', handler('load'), false);
            this.addEventListener('error', handler('error'), false);
            this.addEventListener('abort', handler('abort'), false);            
        }

        return oldSend.call(this, body)
    }
}