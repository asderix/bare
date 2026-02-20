export const sanitize = (str) => {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

export const di = (str) => {
    const detail = {
        serviceName: str,
        serviceObj: null
    };

    document.dispatchEvent(new CustomEvent('app-di', {
        bubbles: true,
        composed: true,
        detail: detail
    }));

    return detail.serviceObj;
}

export const createProxy = (target) => {
    const listeners = [];

    const proxy = new Proxy(target, {
        set(obj, prop, value) {
            const result = Reflect.set(obj, prop, value);
            listeners.forEach(fn => fn(prop, value));
            return result;
        }
    });

    proxy.subscribe = (fn) => listeners.push(fn);

    return proxy; 
};
