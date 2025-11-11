export function throttle(fn: Function, wait: number) {
  let timer: NodeJS.Timeout | null;

  const result = function (this: any, ...args) {
    if (timer) return;

    if (wait <= 0) {
      fn.apply(this, args);
    } else {
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

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
) {
  const throttled = throttle(fn, wait);

  const result = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    throttled.cancel();
    throttled.apply(this, args);
  };

  result.cancel = () => {
    throttled.cancel();
  };

  return result as T & { cancel: () => void };
}

export function isSameValue(a: string | number, b: string | number) {
  return a === 0 ? a === b : a == b;
}

export function getDataKey(item, dataKey: string | string[]): string | number {
  return (
    !Array.isArray(dataKey)
      ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.')
      : dataKey
  ).reduce((o, k) => (o || {})[k], item);
}
