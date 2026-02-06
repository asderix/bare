export class Toaster extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="toast-container"></div>`;
        this.container = this.querySelector('.toast-container');

        window.addEventListener('show-toast', (e) => {
            this.addToast(e.detail.message, e.detail.type || 'info');
        });
    }

    addToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast like-${type}`;
        toast.textContent = message;

        this.container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            toast.addEventListener('animationend', () => toast.remove());
        }, 3000);
    }
}

customElements.define('app-toaster', Toaster);