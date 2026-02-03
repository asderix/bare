import "@BaseUiComponents";
import "@EditableTable";
import "@Header";
import "@Sidebar";
import "@Toaster";
import "@Router";
import "@Dashboard";
import "@Architecture";
import "@Components";
import "@ComponentsLive";
import "@Sourcecode";
import "@Restrictions";
import "@Utils";
import "@Service/data-service.js";
import "@Service/message-service.js";

import { Router } from "@Router";
import { initHeader } from "@Header";
import { initSidebar } from "@Sidebar";

export const appName = "BARE";

const routes = {
    '/': { component: 'app-dashboard', title: 'Dashboard' },
    '/dashboard': { component: 'app-dashboard', title: 'Dashboard' },
    '/architecture': { component: 'app-architecture', title: 'Architecture' },
    '/components': { component: 'app-components', title: 'Components' },
    '/components-live/:id': { component: 'app-components-live', title: 'Components in Action' },
    '/sourcecode': { component: 'app-sourcecode', title: 'Sourcecode & License' },
    '/restrictions': { component: 'app-restrictions', title: 'Restrictions' }
};

const router = new Router(routes, 'app-content');

window.appRouter = router;

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initSidebar();
});
