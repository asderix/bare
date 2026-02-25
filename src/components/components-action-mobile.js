import { sanitize, createProxy } from "@Utils"
import { updateStaticTranslations } from "@I18n"

document.addEventListener('app-action', (e) => {
  const { action, params } = e.detail;
  if (action == "menu-show-components-live") {
    window.appRouter.navigate('/components-live/abcd123');
  }
});

export class AppComponentsLiveMobile extends HTMLElement {
  constructor() {
    super();
    this.demoTextObj = { text: "" };
    this.proxyDemoTextObj = createProxy(this.demoTextObj);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Demo to get a variable from the path (set via Router).
    const pathId = this.getAttribute('id');

    // Demo to get a data from the queryString (set via Router).
    // Use JSON.parse(this.getAttribute('query-params')) to get a Map for access.
    // This is just a demo for a mobile version integration. In the real world of
    // course make the mobile version even more mobile friendly.
    const queryString = this.getAttribute('query-params');

    this.innerHTML = `<div class="contenthead"><h3>Demo of Mobile Component Orechestration - PathId: ${sanitize(pathId)} // QueryString: ${sanitize(queryString)}</h3></div>
    <div>
      <app-editable-table-mobile data-src="/api/data.json">Loading ...</app-editable-table-mobile>
    </div>
    <div style="margin-top: 20px;">
      <app-btn id="show-child-data" title="i18n:[show_child_data_title]" action="" data-i18n-d="i18n:[show_child_data]">Show Data From Child (Table)</app-btn>
    </div>
    <div style="margin-top: 25px;" id="show-child-data-area"></div>
    <div style="margin-top: 25px;" data-i18n="Complex i18n example: i18n:[exp_user_change]: i18n:[2026-02-03,d], i18n:[exp_user_was] i18n:[2026-02-03,p] i18n:[exp_user_costs]: i18n:[1000.05,c]."></div>
    <div style="margin-top: 25px; class="as-flex like-row-center">
      <input type="text" id="proxy-example-input" class="edit-input" placeholder="..." data-i18n-placeholder="i18n:[proxy_example_input]">&nbsp;
      <span id="proxy-example-output"></span>
    </div>`;

    this.querySelector('#show-child-data').onclick = (e) => {
      const dataFromChild = this.querySelector('app-editable-table').dataForMother; // Direct access via property. An other (capsulated) pattern is "per attribute down - per event above".
      this.querySelector('#show-child-data-area').textContent = JSON.stringify(dataFromChild, null, 2); // Quick and durty just for show the mechanism.
    };

    // Proxy/Oberserver example:
    // Just modify the proxy here:
    this.querySelector('#proxy-example-input').oninput = (e) => {
      this.proxyDemoTextObj.text = e.target.value;
    };

    // Add a subscription function to the proxy object to catch the change:
    this.proxyDemoTextObj.subscribe((prop, value) => {
      if (prop == "text") {
        this.querySelector('#proxy-example-output').innerText = value;
      }
    })

    /**
     * Hint:
     * In many cases, you don't need real-time updates while the user is typing.
     * If you have a defined event, such as clicking a button, you can easily
     * read the form values with a two-line (or one-line) code and don't need
     * a proxy, etc.:
     * 
     * const form = document.querySelector('#form-id'); // Your form element.
     * const data = Object.fromEntries(new FormData(form).entries()); // or include here for one-liner: document.querySelector('#form-id')
     * console.log(data); // { name: "John Doe", email: "john@example.com", ... } -> You get an object with all values.
     * 
     * Make sure your form elements has a unique name attribute.
     */

    updateStaticTranslations(); // Call this just in case you added static i18n-attributes per innerHTML to the DOM like: <div data-i18n="..."/>. Not needed for app-btn for example.
  }
}

customElements.define('app-components-live-mobile', AppComponentsLiveMobile);
