# TimeApp

TimeApp is a simple and elegant timer application built with HTML, CSS, and JavaScript.

The purpose of this timer os to assist facilitators and their aids keep control of time during group activities with minimum human intervention and fidgeting.

The app has been deployed as a Progressive Web App for a universal lightweight distribution.

It works best if added to your home screen on Android. Most browsers support this action. Works perfectly on Ecosia as of May 2023.

## Features

- Set a timer with a custom duration.
- Double click to reset the timer.
- Visual indicators show when half the time has passed, and when there are five minutes and one minute remaining.
- Audio indicators play when visual indicators are shown, and when the timer ends.

## How to Use

1. Click on the minutes or seconds to set the duration for the timer.
2. Click on the timer to start or stop the timer.
3. Double click on the timer to reset the timer.

## Installation

You can simply clone this repository and open the `index.html` file in a web browser:

```
git clone https://github.com/leroidubuffet/timeApp.git
cd timeapp
open index.html
```

The code uses [wakeLock](https://w3c.github.io/screen-wake-lock/) to keep your device from going to standby while the timer is running. Note that not all browsers support this API.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

License
MIT
