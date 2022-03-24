import { injectBlankScreen } from "./blankScreen";
import { injectError } from "./jserror";
import { injectPromise } from "./promise";
export function handleErrors(): ErrorHandlers {
    return {
        jserror: injectError,
        promise: injectPromise,
        blankScreen: injectBlankScreen
    }
}
