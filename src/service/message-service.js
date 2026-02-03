export function showToast(message, type) {
    window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: message, type: type }
    }));
}