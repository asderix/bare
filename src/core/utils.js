export const sanitize = (str) => {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};

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
