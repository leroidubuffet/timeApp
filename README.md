# TimeApp

TimeApp is a simple and elegant timer application built with HTML, CSS, and JavaScript.

The purpose of this timer is to assist facilitators and their aids keep control of time during group activities with minimum human intervention and fidgeting.

The app has been deployed as a Progressive Web App for a universal lightweight distribution. A Progressive Web App (PWA) is a type of application software delivered through the web, built using common web technologies including HTML, CSS and JavaScript. It is intended to work on any platform that uses a standards-compliant browser, including both desktop and mobile devices.

PWAs have the unique ability to offer a high-quality user experience that is comparable to, and sometimes even better than, native apps. They are reliable, fast, and engaging.

It works best if added to your home screen on Android. Most browsers support this action. Works perfectly on Ecosia as of May 2023.

## Features

- Set a timer with a custom duration
- Double click to reset the timer
- Visual indicators show when half the time has passed, and when there are five minutes and one minute remaining
- Audio indicators play when the timer ends

## How to Use

1. Double click on the minutes or seconds to set the duration for the timer. Drag and click on the number to set the appropriate time.
2. Click on the timer to start or stop the timer
3. Double click on the : separator to reset the timer

## Installation

You can simply clone this repository and open the `index.html` file in a web browser:

```
git clone https://github.com/leroidubuffet/timeApp.git
cd timeapp
python -m http.server 8000
```
Kill the process with:

```
pkill -f "python -m http.server 8000"
```

The code uses [wakeLock](https://w3c.github.io/screen-wake-lock/) to keep your device from going to standby while the timer is running. Note that not all browsers support this API.

For updated information on PWA and browser compatibility visit [caniuse.com](https://caniuse.com/?search=PWA). 

## Project Structure

This project follows a standard structure for a Progressive Web App (PWA).

```
|-sw
| |-service-worker.js
|-index.html
|README.md
|public
| |-icon-192.png
| |-sounds
| | |-ping.wav
| |-manifest.json
| |-icon-512.png
|src
| |-styles
| | |-styles.css
| |-scripts
| | |-app.js
```
Here's an overview of the purpose of each file and directory:
- `sw`: This directory contains the service worker file described in the next point.
- `service-worker.js`: This is the service worker file. It's responsible for handling network requests, caching, and all other service worker events. It's the backbone of making this project work offline and provide a smooth user experience.

- `index.html`: This is the main HTML file for the project. It's the first file that gets loaded when a user visits the app.

- `public`: This directory contains all the static files that the app needs to function. These files are directly accessible by the user's browser.

- `icon-192.png` and `icon-512.png`: These are the icons for the app, used in various places like the home screen, task switcher, splash screen, etc. They are referenced in the manifest file.

- `sounds`: This directory contains sound files that the app uses. In this case, it includes ping.wav.

- `manifest.json`: This is the web app manifest file. It provides information about the application (such as name, author, icon, and description) in a JSON text file. The manifest is necessary for the PWA to be installable and run in full-screen.

- `src`: This directory contains the source files for the project. This is where you'll do most of your coding.

- `styles`: This directory contains the CSS files for the project. The styles.css file holds the styles used across the project.

- `scripts`: This directory contains the JavaScript files for the project. The app.js file contains the main JavaScript code that runs the app.

Please note that the service worker file and the manifest file are essential to making this project a PWA. The service worker enables features like offline support and content caching, and the manifest file provides the information needed to install the app on the home screen and run it in full-screen.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Thanks
To [Daniela Rogoza](http://danielarogoza.com/) for her UX and UI design support.


License
[MIT](https://opensource.org/license/mit/)
