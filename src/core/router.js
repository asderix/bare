import { appName } from "../bootstrap.js"

export class Router {
    constructor(routes, outletSelector) {
        this.routes = routes;
        this.outlet = document.querySelector(outletSelector);
        this.params = {};

        window.addEventListener('hashchange', () => this.resolve());
        window.addEventListener('load', () => this.resolve());
    }

    resolve() {
        const hash = location.hash.replace(/^#/, '') || '/';
        let matchedRoute = null;
        this.params = {};

        for (const path in this.routes) {
            // Found no easier way to handle variable in path than with regex, therefor I use regex here.
            // Example: /documents/:id converts to ^/documents/([^/]+)$
            const pattern = new RegExp('^' + path.replace(/:[^\s/]+/g, '([^/]+)') + '$');
            const match = hash.match(pattern);

            if (match) {
                matchedRoute = this.routes[path];
                
                const paramNames = (path.match(/:[^\s/]+/g) || []).map(name => name.substring(1));
                
                paramNames.forEach((name, index) => {
                    this.params[name] = match[index + 1];
                });
                break;
            }
        }

        const route = matchedRoute || this.routes['/'];

        if (route) {
            this.render(route);
            document.dispatchEvent(new CustomEvent('app-info-route-change', {
                bubbles: true,
                composed: true,
                detail: {
                    title: route.title,
                    params: this.params,
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
        
        this.outlet.innerHTML = '';
        this.outlet.appendChild(component);
        
        if (route.title) document.title = `${route.title} | ${appName}`;
    }

    navigate(path) {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        location.hash = cleanPath;
    }
}