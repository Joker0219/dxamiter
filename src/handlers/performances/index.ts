export function handlePrefs(): PerfHandlers {
    return {
        fp: function(callback: () => void) {
            callback();
        },
        fcp: function(callback: () => void) {
            callback();
        },
        fmp: function(callback: () => void) {
            callback();
        }
    }
}