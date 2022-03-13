export default function (callback: any) {
    if(document.readyState === "complete") {
        // document.readyState 一共有三个值，分别是： complete, interactive 和 loading
        callback()
    } else {
        window.addEventListener('load', callback)
    }
}