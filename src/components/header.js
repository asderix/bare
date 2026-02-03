import { showToast } from "@Service/message-service.js"

const sidebarStates = ['expanded', 'rail', 'hidden'];
const sidebarSavedState = localStorage.getItem('sidebarState') || 'expanded';
const savedTheme = localStorage.getItem('theme') || 'light';
let searchOpen = null;
let searchModal = null;
let sidebar = null;

document.addEventListener('app-action', (e) => {
    const { action, params } = e.detail;

    switch (action) {
        case 'toggle-sidebar':
            toggleSidebar();
            break;
        case 'toggle-theme':
            toggleTheme();
            break;
        case 'not-implemented-toast':
            showToast("Sorry, function not implemented in this demo!", "error")
            break;
        case 'show-user-information-dialog':
            const dialogShow = document.querySelector('.user-modal');
            dialogShow.showModal();
            break;
        case 'close-user-information-dialog':
            const dialogClose = document.querySelector('.user-modal');
            dialogClose.close();
            break;

        default:

    }
});

export function initHeader() {
    sidebar = document.getElementById('sidebar');
    sidebar.setAttribute('data-state', sidebarSavedState);
    document.documentElement.setAttribute('data-theme', savedTheme);
    searchOpen = document.getElementById('search-open');
    searchModal = document.getElementById('search-overlay');
    searchOpen.addEventListener('click', () => searchModal.showModal());
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchModal.showModal();
        }
    });
}

function toggleSidebar() {
    let current = sidebar.getAttribute('data-state');
    let next = sidebarStates[(sidebarStates.indexOf(current) + 1) % sidebarStates.length];
    sidebar.setAttribute('data-state', next);
    localStorage.setItem('sidebarState', next);
}

function toggleTheme() {
    const html = document.documentElement;
    const nextTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
}
