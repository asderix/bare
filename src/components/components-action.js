import { sanitize } from "@Utils"

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
    const componentId = this.getAttribute('id'); // Demo to get a variable from the path (set via Router).
    this.innerHTML = `<div class="contenthead"><h3>Demo of Component Orechestration - Id: ${sanitize(componentId)}</h3></div>
    <div>
      <app-editable-table data-src="/api/data.json">Loading ...</app-editable-table>
    </div>
    <div style="margin-top: 20px;">
      <app-btn id="show-child-data" title="Show Data from Child" action="">Show Data From Child (Table)</app-btn>
    </div>
    <div style="margin-top: 25px;" id="show-child-data-area"></div>`;

    this.querySelector('#show-child-data').onclick = (e) => {
      const dataFromChild = this.querySelector('app-editable-table').dataForMother; // Direct access via property. An other (capsulated) pattern is "per attribute down - per event above".
      this.querySelector('#show-child-data-area').textContent = JSON.stringify(dataFromChild, null, 2); // Quick and durty just for show the mechanism.
    };
  }
}

customElements.define('app-components-live', AppComponentsLive);
