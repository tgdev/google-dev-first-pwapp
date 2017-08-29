# Progressive Web Apps (PWA)

A hybrid of native apps (from an app store) and web pages/content.

- App shell
- Service workers
- Web Manifest

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

## Manifest.json file

The web app manifest is a simple JSON file that gives the developer;

1. The ability to control how your app appears to the user in the areas that they would expect to see apps (for example the mobile home screen)
2. Direct what the user can launch and more importantly how they can launch it.

Using a manifest.json file you PWA can;

* Have a rich presence on the user's Android home screen
* Be launched in full-screen mode on Android with no URL bar
* Control the screen orientation for optimal viewing
* Define a "splash screen" launch experience and theme color for the site
* Track whether you're launched from the home screen or URL bar
