document.addEventListener('app-action', (e) => {
  const { action, params } = e.detail;
  if (action == "menu-show-sourcecode") {
    window.appRouter.navigate('/sourcecode');
  }
});

export class AppSourcecode extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="contenthead"><h3>Sourcecode & License</h3></div>
    <div style="margin-top:15px;">
    <p>You can find the source code on GitHub: <a href="https://github.com/asderix/Bare" target=_blank>https://github.com/asderix/Bare</a></p>
    <p>&nbsp;</p>
    <p>BARE is published under the Apache 2 license and is therefore freely available.</p>`;
  }
}

customElements.define('app-sourcecode', AppSourcecode);
