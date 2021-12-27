// prefer default export if available
const preferDefault = m => (m && m.default) || m

exports.components = {
  "component---src-pages-404-js": () => import("./../../../src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-pages-components-js": () => import("./../../../src/pages/components.js" /* webpackChunkName: "component---src-pages-components-js" */),
  "component---src-pages-using-typescript-tsx": () => import("./../../../src/pages/using-typescript.tsx" /* webpackChunkName: "component---src-pages-using-typescript-tsx" */),
  "component---src-templates-about-page-js": () => import("./../../../src/templates/AboutPage.js" /* webpackChunkName: "component---src-templates-about-page-js" */),
  "component---src-templates-event-post-js": () => import("./../../../src/templates/EventPost.js" /* webpackChunkName: "component---src-templates-event-post-js" */),
  "component---src-templates-events-page-js": () => import("./../../../src/templates/EventsPage.js" /* webpackChunkName: "component---src-templates-events-page-js" */),
  "component---src-templates-home-page-js": () => import("./../../../src/templates/HomePage.js" /* webpackChunkName: "component---src-templates-home-page-js" */)
}

