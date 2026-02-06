document.addEventListener('app-action', (e) => {
  const { action, params } = e.detail;
  if (action == "menu-show-components") {
    window.appRouter.navigate('/components');
  }
});

export class AppComponents extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="contenthead"><h3>Components!</h3></div>
    <div style="margin-top:15px;">
    <p>There are basic UI components: a button in various forms, a table, and a toaster component. It should be noted that the table is located under “ui” as a generic component, but is in fact a specific implementation and not a generic one. Decide for yourself when a true generic component is worthwhile and when it is easier to implement 2-3 specific ones. You can then also save them under “components,” which would be more intuitive. It is located under “ui” for demonstration purposes. Then we have core components: header and sidebar. Then the technical or topic components: one per menu entry.</p>
    <p>&nbsp;</p>
    <p>The scaffolding addresses the following typical SPA challenges and implements appropriate solutions. Most of these can be found implemented under “Components in Action”:</p>
    <p>&nbsp;</p>
    <p>Router, components (encapsulation and reuse), parent-child stuff: parent passes data to child, child passes data (or events, etc.) to parent. Services (singleton), dependency injection, Rest API calls, and sanitizer. Then the challenge of rendering as little as possible. Example table: If one row is changed, the entire table should not be re-rendered. Firstly, this is slow and secondly, it has unpleasant side effects. Furthermore keeping the state of a component. This means the following: The user switches components, e.g., from "Components in action" to "Dashboard" and then clicks back to "Components in action".
 Technically, the component is recreated (new JavaScript object). However, you may want to restore the data that has been entered but not yet saved, or a selection, etc., so that it appears to the user as if it had existed. To do this, we store the status in a service that remains in place. The component accesses the data from the service, which determines when data needs to be reloaded.</p>
    <p>&nbsp;</p>
    <p>Furthermore, BARE implements HTML dialogs and uses the integrated modal function for these.</p>
    `;
  }
}

customElements.define('app-components', AppComponents);
