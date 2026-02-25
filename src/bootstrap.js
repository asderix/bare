import "@BaseUiComponents";
import "@Header";
import "@Sidebar";
import "@Toaster";
import "@Router";
import "@Dashboard";
import "@Architecture";
import "@Components";
import "@Sourcecode";
import "@Restrictions";
import "@Utils";
import "@I18n";
import "@Sw";
import "@Service/data-service.js";
import "@Service/message-service.js";

import { Router } from "@Router";
import { initHeader } from "@Header";
import { initSidebar } from "@Sidebar";

export const appName = "BARE";

const isMobile = window.matchMedia("(max-width: 767px)").matches;

const routes = {
    '/': { component: 'app-dashboard', title: 'Dashboard' },
    '/dashboard': { component: 'app-dashboard', title: 'Dashboard' },
    '/architecture': { component: 'app-architecture', title: 'Architecture' },
    '/components': { component: 'app-components', title: 'Components' },
    '/components-live/:id': { component: isMobile ? 'app-components-live-mobile' : 'app-components-live', title: 'Components in Action' },
    '/sourcecode': { component: 'app-sourcecode', title: 'Sourcecode & License' },
    '/restrictions': { component: 'app-restrictions', title: 'Restrictions' }
};

const router = new Router(routes, 'app-content');

window.appRouter = router;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
    });

    navigator.serviceWorker.register('/src/sw.js');
}

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initSidebar();
});

async function dynamicImport() {
    try {
        if (isMobile) {
            await import("@EditableTableMobile");
            await import("@ComponentsLiveMobile");
        } else {
            await import("@EditableTable");
            await import("@ComponentsLive");
        }
    } catch (err) {
        console.error("Error importing dynamic modules.", err);
    }
}

dynamicImport();
