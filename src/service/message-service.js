import { i18nParse } from "@I18n";

export function showToast(message, type) {
    window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: i18nParse(message), type: type }
    }));
}