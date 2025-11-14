export function throttle(fn, wait) {
    let timer;
    const result = function (...args) {
        if (timer)
            return;
        if (wait <= 0) {
            fn.apply(this, args);
        }
        else {
            timer = setTimeout(() => {
                timer = null;
                fn.apply(this, args);
            }, wait);
        }
    };
    result['cancel'] = function () {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    };
    return result;
}
export function debounce(fn, wait) {
    const throttled = throttle(fn, wait);
    const result = function (...args) {
        throttled.cancel();
        throttled.apply(this, args);
    };
    result.cancel = () => {
        throttled.cancel();
    };
    return result;
}
export function isSameValue(a, b) {
    return a === 0 ? a === b : a == b;
}
export function getDataKey(item, dataKey) {
    return (!Array.isArray(dataKey)
        ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.')
        : dataKey).reduce((o, k) => (o || {})[k], item);
}
