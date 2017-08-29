# Progressive Web Apps (PWA)

A hybrid of native apps (from an app store) and web pages/content.

- App shell
- Web Manifest
- Service workers

## App shell

When designing the App shell ask;

1. What needs to be on screen immediately?
2. What other UI components are key to our app?
3. What supporting resources are needed for the app shell? Eg: Imgs, JS, CSS, Fonts, etc.

## Service workers

https://developers.google.com/web/fundamentals/getting-started/primers/service-workers

* Allows access to PWA online, offline and on intermittent, slow connections.
* Should be considered a progressive enhancement, added only if supported by the browser.
* Provide the ability to intercept requests made from our PWA and handle them within the service worker.

**NOTE: Service worker functionality is only available on pages that are accessed via HTTPS**

When using service workers;

1. Tell the browser to register the JavaScript file as the service worker.
2. Create a JavaScript file containing the service worker.