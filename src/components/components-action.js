import { sanitize } from "@Utils"
import { updateStaticTranslations } from "@I18n"

document.addEventListener('app-action', (e) => {
  const { action, params } = e.detail;
  if (action == "menu-show-components-live") {
    window.appRouter.navigate('/components-live/abcd123');
  }
});

export class AppComponentsLive extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const pathId = this.getAttribute('id'); // Demo to get a variable from the path (set via Router).
    // Demo to get a data from the querySTring (set via Router).
    // Use JSON.parse(this.getAttribute('query-params')) to get a Map for access.
    const queryString = this.getAttribute('query-params');

    this.innerHTML = `<div class="contenthead"><h3>Demo of Component Orechestration - PathId: ${sanitize(pathId)} // QueryString: ${sanitize(queryString)}</h3></div>
    <div>
      <app-editable-table data-src="/api/data.json">Loading ...</app-editable-table>
    </div>
    <div style="margin-top: 20px;">
      <app-btn id="show-child-data" title="i18n:[show_child_data_title]" action="" data-i18n-d="i18n:[show_child_data]">Show Data From Child (Table)</app-btn>
    </div>
    <div style="margin-top: 25px;" id="show-child-data-area"></div>
    <div style="margin-top: 25px;" data-i18n="Complex i18n example: i18n:[exp_user_change]: i18n:[2026-02-03,d], i18n:[exp_user_was] i18n:[2026-02-03,p] i18n:[exp_user_costs]: i18n:[1000.05,c]."></div>`;

    this.querySelector('#show-child-data').onclick = (e) => {
      const dataFromChild = this.querySelector('app-editable-table').dataForMother; // Direct access via property. An other (capsulated) pattern is "per attribute down - per event above".
      this.querySelector('#show-child-data-area').textContent = JSON.stringify(dataFromChild, null, 2); // Quick and durty just for show the mechanism.
    };

    updateStaticTranslations(); // Call this just in case you added static i18n-attributes per innerHTML to the DOM like: <div data-i18n="..."/>. Not needed for app-btn for example.
  }
}

customElements.define('app-components-live', AppComponentsLive);
