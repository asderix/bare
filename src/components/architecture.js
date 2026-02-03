document.addEventListener('app-action', (e) => {
  const { action, params } = e.detail;
  if (action == "menu-show-architecture") {
    window.appRouter.navigate('/architecture');
  }
});

export class AppArchitecture extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="contenthead"><h3>Architecture!</h3></div>
    <div style="margin-top:15px;">
    <p>We use ESM modules and an import map. We only link one JavaScript file. It is called bootstrap.js. In this file, we import everything we have and start the necessary initializations.</p>
    <p>&nbsp;</p>
    <p>We also link only one CSS file in the HTML file. In this CSS, we import the other CSS files.</p>
    <p>&nbsp;</p>
    <p>Yes, we use plain vanilla CSS. No Tailwind or other intermediate solutions. With Tailwind for example, you have to learn and memorize their classes, eventually find yourself in a class soup, an need, in most cases, a preprocess step. Today's CSS now offers you all the convenience you need. Use a nested, object oriented (OOCSS) semantic class definition like: as-btn, like-default, is-disabled, show-icon etc. where it make sense. Same comfort no framework.</p>
    <p>&nbsp;</p>
    <p>The JS files are structured into Core, Ui, Service, and Components. The CSS files are all located in the same folder (style) and have the same name as the component that uses them, with the extension .css. Does this make sense? You decide. Of course, you can also save the stylesheets in the component folder and/or create a separate folder for each component.</p>
    <p>&nbsp;</p>
    <p>Under the hood, we mainly use web components, i.e., custom elements. Templates are a good thing here. However, they were not used in the demo. But especially in the example of the table, a template for the row would be useful, especially if your table has 100 or more entries. Cloning is more performant than string parsing. In addition, this SPA primarily uses the event system.</p>
    <p>&nbsp;</p>
    <p>It is important to understand that not all approaches are applied consistently. The main reason for this is that different possibilities should be demonstrated. For example, how to link an event to a button.</p>
    <p>&nbsp;</p>
    <p>The components menu explains which common challenges of an SPA are addressed and solved in this demo.</p>
    </div>`;
  }
}

customElements.define('app-architecture', AppArchitecture);
