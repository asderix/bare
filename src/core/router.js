import { appName } from "../bootstrap.js"
import { userLang, isInit } from "@I18n";

export class Router {
    constructor(routes, outletSelector) {
        this.routes = routes;
        this.outlet = document.querySelector(outletSelector);
        this.params = {};
        this.queryParams = {};

        window.addEventListener('hashchange', () => this.resolve());
        window.addEventListener('load', () => this.resolve());
    }

    resolve() {
        const rawHash = location.hash.replace(/^#/, '') || '/';
        const [pathOnly, queryString] = rawHash.split('?');

        this.queryParams = queryString
            ? Object.fromEntries(new URLSearchParams(queryString))
            : {};

        const newLang = this.queryParams.ul;

        if (newLang == undefined && !isInit) {
            const savedLang = localStorage.getItem('userLang') || userLang;
            document.dispatchEvent(new CustomEvent('app-i18n-change', {
                bubbles: true,
                composed: true,
                detail: { lang: savedLang }
            }));
        }

        if (newLang && newLang.toLowerCase() !== userLang) {
            console.log("lang event")
            document.dispatchEvent(new CustomEvent('app-i18n-change', {
                bubbles: true,
                composed: true,
                detail: { lang: newLang.toLowerCase() }
            }));
        }

        let matchedRoute = null;
        this.params = {};

        for (const path in this.routes) {
            // Regex für Pfad-Variablen (:id)
            const pattern = new RegExp('^' + path.replace(/:[^\s/]+/g, '([^/]+)') + '$');
            const match = pathOnly.match(pattern);

            if (match) {
                matchedRoute = this.routes[path];
                const paramNames = (path.match(/:[^\s/]+/g) || []).map(name => name.substring(1));
                paramNames.forEach((name, index) => {
                    this.params[name] = match[index + 1];
                });
                break;
            }
        }

        const route = matchedRoute || this.routes['/'] || this.routes['404'];

        if (route) {
            this.render(route);
            document.dispatchEvent(new CustomEvent('app-info-route-change', {
                bubbles: true,
                composed: true,
                detail: {
                    title: route.title,
                    params: this.params,
                    queryParams: this.queryParams,
                    source: this
                }
            }));
        }
    }

    render(route) {
        const component = document.createElement(route.component);

        for (const key in this.params) {
            component.setAttribute(key, this.params[key]);
        }

        component.setAttribute('query-params', JSON.stringify(this.queryParams));

        this.outlet.innerHTML = '';
        this.outlet.appendChild(component);

        if (route.title) document.title = `${route.title} | ${appName}`;
    }

    navigate(path) {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        location.hash = cleanPath;
        if (window.matchMedia('(max-width: 768px)').matches) {
            document.dispatchEvent(new CustomEvent('app-action', {
                bubbles: true,
                composed: true,
                detail: {
                    action: "close-menu-bar"
                }
            }));
        }
    }
}