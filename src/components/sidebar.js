import { i18nParse, isInit } from "@I18n"

let sidebar = null;
let resizer = null;

export function initSidebar() {
  sidebar = document.getElementById('sidebar');
  resizer = document.getElementById('resizer');
  let isResizing = false;
  resizer.addEventListener('mousedown', (e) => {
    if (sidebar.getAttribute('data-state') !== 'expanded') return;
    isResizing = true;
    document.body.style.cursor = 'col-resize';
    sidebar.style.transition = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    let newWidth = e.clientX;
    if (newWidth > 150 && newWidth < 600) {
      document.documentElement.style.setProperty('--sidebar-w', `${newWidth}px`);
    }
  });

  document.addEventListener('mouseup', () => {
    isResizing = false;
    document.body.style.cursor = 'default';
    sidebar.style.transition = '';
  });
}

export class SidebarItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const label = i18nParse(this.textContent);
    const icon = this.getAttribute('icon') || '🏠';
    const title = i18nParse(this.getAttribute('title') || '');
    const action = this.getAttribute('action') || '';
    const route = this.getAttribute('route') || '';

    this.innerHTML = `
        <div class="nav-item" title="${title}"><i>${icon}</i> <span>${label}</span></div>
    `;
    this.querySelector('div').onclick = (e) => {
      if (action) {
        this.dispatchEvent(new CustomEvent('app-action', {
          bubbles: true,
          composed: true,
          detail: {
            action: action,
            params: {
              label,
              route,
              ...this.dataset
            },
            source: this
          }
        }));
        this.dispatchEvent(new CustomEvent('app-action-menu-item-selected', {
          bubbles: true,
          composed: true,
          detail: {
            action: 'menu-item-selected',
            source: this.querySelector('div')
          }
        }));
      }
    };
  }
}

export class SidebarItems extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const items = this.hasAttribute('data-src') ? this.loadMenuSrc(this.getAttribute('data-src')) : this.loadMenuData(this.getAttribute('data-items') || "[]");
    if (isInit) {
      this.render(items);
    }

    document.addEventListener('app-i18n-ready', () => this.render(items));
    document.addEventListener('app-action-menu-item-selected', (e) => {
      const { source } = e.detail;
      document.querySelectorAll('.nav-item').forEach(item =>
        item.toggleAttribute('activated', item === source)
      );
    });
  }

  render(items = []) {
    const renderedItems = items.map(item =>
      `<app-sidebar-item icon="${item.icon}" title="${item.title}" action="${item.action}" route="${item.route}">${item.label}</app-sidebar-item>`
    ).join('');
    this.innerHTML = `${renderedItems}`;
  }

  loadMenuSrc(src) {
    // Not implemented yet.
    return [];
  }

  loadMenuData(jsonStr) {
    return JSON.parse(jsonStr);
  }
}

customElements.define('app-sidebar-item', SidebarItem);
customElements.define('app-sidebar', SidebarItems);