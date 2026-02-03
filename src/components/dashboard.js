document.addEventListener('app-action', (e) => {
  const { action, params } = e.detail;
  if (action == "menu-show-dashboard") {
    window.appRouter.navigate('/dashboard');
  }
});

export class AppDashboard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="contenthead"><h3>Dashboard - Welcome!</h3></div>
    <div style="margin-top:15px;">
    <p>This is a demo single-page application. A native SPA scaffold based on web standards.</p>
    <p>&nbsp;</p>
    <p>As bare-bones as it gets: framework-free, zero dependencies, lightweight, 100% native, only vanilla JS. Nothing else matters.</p>
    <p>&nbsp;</p>
    <p>It's a showcase to demonstrate that you probably don't need a framework at all in 90% of SPA use cases. Before hundreds of kilobytes of
    frameworks and other libraries have been downloaded, the browser has already executed your code.</p>
    <p>&nbsp;</p>
    <p>Do you need components, data binding, a router, and dependency injection? No problem. You can have everything natively.
    Need a sanitizer? The browser can already do that, so you don't need a large external library.</p>
    <p>&nbsp;</p>
    <p>Are there any limits? Sure. But you have to ask yourself whether some syntactic sugar is worth subjecting yourself to a framework. You learn the framework, not JavaScript.</p>
    <p>&nbsp;</p>
    <p>This demo SPA is far from showing all the possibilities. And since you are free, you can implement different patterns. This SPA shows only a small selection of possibilities.</p>
    <p>&nbsp;</p>
    <p>Don't want a hash router (#)? No problem. You can, of course, write one without a hash with little effort.
    Don't want to do dependency injection with the event system but via a service repository? No problem.</p>
    <p>&nbsp;</p>
    <p style="font-weigth:bold;">This SPA has one main goal: to make you think about whether you really still need a framework for an SPA in the future.</p>
    <p>&nbsp;</p>
    <p>The native solution is static and direct. It doesn't need to manage dependencies, administer dangerous npm packages, or start a build process. You write it—it runs. Try it.</p>
    </div>`;
  }
}

customElements.define('app-dashboard', AppDashboard);
