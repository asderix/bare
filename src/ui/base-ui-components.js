import { i18nParse, isInit } from "@I18n"

export class Btn extends HTMLElement {
    constructor() {
        super();
        this._isLoading = false;
    }

    set loading(value) {
        this._isLoading = !!value;
        this.render();
    }

    connectedCallback() {
        if (isInit) {
            this.render();
        }

        document.addEventListener('app-i18n-ready', () => this.render());
    }

    render() {
        const label = this.getAttribute('data-i18n-d') || this.textContent;
        const title = this.getAttribute('title') || '';
        const variant = this.getAttribute('variant') || 'default';
        const isDisabled = this._isLoading || this.hasAttribute('disabled');

        if (variant == "icon") {
            this.innerHTML = `
            <button class="btn-icon" title="${i18nParse(title)}" ${isDisabled ? 'disabled' : ''}>
                ${this._isLoading ? '<span class="spinner"></span>' : ''}
                <span class="label">${i18nParse(label)}</span>
            </button>
        `;

        } else {
            this.innerHTML = `
            <button class="btn-default ${variant !== 'default' ? 'like-' + variant : ''}" title="${i18nParse(title)}" ${isDisabled ? 'disabled' : ''}>
                ${this._isLoading ? '<span class="spinner"></span>' : ''}
                <span class="label">${i18nParse(label)}</span>
            </button>
        `;
        }

        if (!this._isLoading) {
            this.querySelector('button').onclick = (e) => {
                const action = this.getAttribute('action');
                if (action) {
                    this.dispatchEvent(new CustomEvent('app-action', {
                        bubbles: true,
                        composed: true,
                        detail: {
                            action: action,
                            params: { ...this.dataset },
                            source: this
                        }
                    }));
                }
            };
        }
    }
}

customElements.define('app-btn', Btn);