document.addEventListener('app-action', (e) => {
  const { action, params } = e.detail;
  if (action == "menu-show-restrictions") {
    window.appRouter.navigate('/restrictions');
  }
});

export class AppRestrictions extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="contenthead"><h3>Restrictions & Further informations</h3></div>
    <div style="margin-top:15px;">
    <p>Are there any restrictions or important things to consider when creating a SPA without a framework? Certainly. Here we highlight a few aspects that need to be taken into account.</p>
    <p>&nbsp;</p>
    <p><span style="font-weight: bold;">Internationalization (i18n):</span><br/>Modern frameworks offer built-in mechanisms for this. There are two approaches: 1) Implementation in the build process, as Angular does, for example. You then have a “clean” version, but also one application per language where you have the routing. 2) Implementation at runtime. The first option performs better at runtime. However, option 2 is perfectly adequate for most applications. And for option 2, you don't need a framework or external library: A central I18nService loads a JSON file (e.g., de.json). Advantage: Easy to implement.
  BARE implements the 2nd option.
  Important/useful: Use the native browser features (Intl API). This is a powerful tool, native directly in the browser: Intl.DateTimeFormat gives you the locally formatted date. Intl.NumberFormat gives you a locally formatted currency ($10.00 vs. €10.00). Intl.RelativeTimeFormat automatically gives you a relative time, e.g., “5 minutes ago” or “yesterday.” Native, high performance. Finally, Intl.ListFormat. This is a powerful tool, directly in the browser. It correctly compiles lists (“Äpfel, Birnen und Orangen” vs. “apples, pears and oranges”). Comma, comma + “und” (DE) or "and" (EN) at the end, directly from a list.</p>
    <p>&nbsp;</p>
    <p><span style="font-weight: bold;">Cache-Management (Cache Busting):</span><br/>
    Without a build step (such as Webpack/Vite or Angular, etc.), the hash file names (main.a1b2c3.js) are missing. This can result in the files being cached on the server/proxy and/or browser, and the latest version not (yet) being used in the user's browser. It is important to ensure that the cache control headers are set correctly on the server. You could version the folders or files and maintain them accordingly in the import map. This is somewhat time-consuming and prone to errors.
  The best solution here would probably be a service worker. This runs independently of the website in the background, enables offline functionality through caching, improves performance, and supports push notifications. This allows you to control when files need to be reloaded. This limits the cache to a maximum of 24, as browsers reload service workers after 24 regardless of cache settings. Then it's just up to your web server cache settings. BARE implements a small service worker for that.</p>
    <p>&nbsp;</p>
    <p><span style="font-weight: bold;">Sanitizer - Ensure consistency:</span><br/>
    The browser sanitizer is powerful, but it must be used. Frameworks ensure that relevant values pass through a sanitizer. Without a framework, it is the developer's responsibility to use it completely. One way to minimize the risk is to never use innerHTML directly for user data in web components. Consistently use .textContent or .innerText. These APIs are inherently secure (XSS-proof). innerHTML is powerful and practical. If you don't want to do without it, or if you want to prevent a developer from accidentally using innerHTML in an uncontrolled manner, the Trusted Types API is probably just the thing. Set the CSP via http header: Content-Security-Policy: require-trusted-types-for ‘script’; From now on, only compliant strings are possible for innerHTML. You can pack your sanitizer into the policy and register the policy. Advantage: No developer can accidentally bypass it. Disadvantage: Browser support. While Chrome (Chrome based) and Safari support it, it is currently only supported by Firefox in a pre-release version.</p>
    <p>&nbsp;</p>
    <p><span style="font-weight: bold;">Spoiled for choice:</span><br/>
  Frameworks sometimes give you strict structures and permissible patterns. The disadvantage: you learn the framework and study countless documents and instructions. After every major release, you have to learn something new and often adapt your code slightly. On the other hand, you don't have to make many decisions about how to do things. With the bare approach, you use web standards. These have shorter change cycles and offer you greater flexibility overall. You can use almost any pattern and often have different implementation options available. Being spoiled for choice can also be a disadvantage.
  Tip: Orient yourself towards common patterns and create concrete implementation examples. Briefly document the approach for each aspect on a maximum of one page. This gives you the advantage of concise, uniform guidelines; the rest is web standard, which every developer should know. And if not, there is plenty of documentation available.
  An overview of regular patterns can be found here: <a href="https://www.patterns.dev/" target=_blank>https://www.patterns.dev/</a></p>
    <p>&nbsp;</p>
    <p><span style="font-weight: bold;">Legacy browsers:</span><br/>
  Many frameworks also support older browsers using polyfills if necessary. By “older,” we mean 5-7 years old. From a security perspective, such browsers should no longer be used. The language elements and browser API used in BARE are now supported by over 95% of browsers worldwide.
 This problem therefore does not really arise for public SPAs. For internal applications at companies that are stuck in a legacy trap: decide whether you want to use a framework for this or whether you want to specifically implement only the missing component(s).</p>`;
  }
}

customElements.define('app-restrictions', AppRestrictions);
