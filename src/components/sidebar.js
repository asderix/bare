let sidebar = null;
let sidebarTitle = null;
let resizer = null;

document.addEventListener('app-info-route-change', (e) => {
  const { title } = e.detail;
  sidebarTitle.textContent = title;
});

export function initSidebar() {
  sidebar = document.getElementById('sidebar');
  sidebarTitle = document.getElementById('sidebar-title');
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
    const label = this.textContent;
    const icon = this.getAttribute('icon') || '🏠';
    const title = this.getAttribute('title') || '';
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
      }
    };
  }
}

export class SidebarItems extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.hasAttribute('data-src')) {
      this.render(this.loadMenuSrc(this.getAttribute('data-src')));
      return;
    }

    if (this.hasAttribute('data-items')) {
      this.render(this.loadMenuData(this.getAttribute('data-items')));
      return;
    }

    this.render();
  }

  render(items = []) {
    const renderedItems = items.map(item =>
      `<app-sidebar-item icon="${item.icon}" title="${item.title}" action="${item.action}" route="${item.route}">${item.label}</app-sidebar-item>`
    ).join('');
    this.innerHTML = `${renderedItems}`;
  }

  loadMenuSrc(src) {
    return [];
  }

  loadMenuData(jsonStr) {
    return JSON.parse(jsonStr);
  }
}

customElements.define('app-sidebar-item', SidebarItem);
customElements.define('app-sidebar', SidebarItems);