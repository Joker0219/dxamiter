export function handleTrackers(): TrackHandlers {
    return {
        ajax: function(callback: () => void) {
            callback();
        },
        fetch: function(callback: () => void) {
            callback();
        },
        xpath: function(callback: () => void) {
            callback();
        }
    }
}