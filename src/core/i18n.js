import { showToast } from "@Service/message-service.js"

export let userLang = "en";
export let isInit = false;
let dic = {};

document.addEventListener('app-i18n-change', (e) => {
    const { lang } = e.detail;
    localStorage.setItem('userLang', lang);

    if (!isInit) {
        userLang = lang;
        initI18n(userLang);
    } else if (lang !== userLang) {
        userLang = lang;
        initI18n(userLang);
    }
});

document.addEventListener('app-action', (e) => {
    const { action, params } = e.detail;

    if (action == "app-i18n-change-lang") {
        document.dispatchEvent(new CustomEvent('app-i18n-change', {
            bubbles: true,
            composed: true,
            detail: {
                lang: params.lang,
            }
        }));
    }
});

export async function initI18n(lang = "en") {
    try {
        const response = await fetch(`/i18n/${lang}.json`);

        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

        const data = await response.json();

        dic = data;
        userLang = lang;
        isInit = true;

        updateStaticTranslations();
        document.dispatchEvent(new CustomEvent('app-i18n-ready'));

    } catch (error) {
        isInit = false;
        console.error(error); // Fallback.
        showToast("Error while loading the language package!", "error");
    }
}

export function updateStaticTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = i18nParse(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.setAttribute('placeholder', i18nParse(key));
    });
}

export function i18n(key, type = "text", options = {}) {
    if (!dic && type === "text") return key;

    switch (type) {
        case "text":
            return dic[key] || key;

        case "date":
            return new Intl.DateTimeFormat(userLang).format(new Date(key));

        case "time":
            return new Intl.DateTimeFormat(userLang, {
                hour: '2-digit', minute: '2-digit'
            }).format(new Date(key));

        case "currency":
            return new Intl.NumberFormat(userLang, {
                style: 'currency',
                currency: options.currency || 'EUR'
            }).format(key);

        case "periode":
            return formatRelativeTime(key, userLang);

        default:
            return dic[key] || key;
    }
}

function formatRelativeTime(dateInput, lang) {
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
    const diffInSeconds = Math.floor((new Date(dateInput) - new Date()) / 1000);

    const units = [
        { unit: 'year', seconds: 31536000 },
        { unit: 'month', seconds: 2592000 },
        { unit: 'day', seconds: 86400 },
        { unit: 'hour', seconds: 3600 },
        { unit: 'minute', seconds: 60 },
        { unit: 'second', seconds: 1 }
    ];

    for (const { unit, seconds } of units) {
        if (Math.abs(diffInSeconds) >= seconds || unit === 'second') {
            const value = Math.round(diffInSeconds / seconds);
            return rtf.format(value, unit);
        }
    }
}

export function i18nParse(str) {
    if (!str || typeof str !== 'string') return str;

    // RegEx Explanation:
    // i18n:\[      -> Search for "i18n:["
    // ([^,\]]+)    -> Group 1: All until the comma or end (that's the key)
    // (?:,([^\]]+))? -> Group 2 (optional): A comma following the key to the end (that's the type)
    // \]           -> End.
    const regex = /i18n:\[([^,\]]+)(?:,([^\]]+))?\]/g;

    return str.replaceAll(regex, (match, key, typeCode) => {
        const typeMapping = {
            't': 'text',
            'd': 'date',
            'tm': 'time',
            'p': 'periode',
            'c': 'currency'
        };

        const type = typeMapping[typeCode?.trim()] || 'text';

        return i18n(key.trim(), type);
    });
}