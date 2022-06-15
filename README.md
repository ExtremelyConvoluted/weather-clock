# WeatherClock

Based off Simone Tellini's Raspberry Pi Weather Clock, GitHub [here](https://github.com/wiz78/WeatherClock)

A simple clock with weather info and the latest UK headlines from the Guardian, meant to be used on a Raspberry Pi with its 7" display, in a full-screen Chromium instance.

# Clock setup

You'll need an API key for https://openweathermap.org and https://bonobo.capi.gutools.co.uk/register/developer (Guardian) in order to get the required information. Once you have it, edit the top of **js/clock-dist.js** and save it as **js/clock.js**

# Chromium Setup

Follow the instructions at https://raspberrypi.stackexchange.com/questions/69204/open-chromium-full-screen-on-start-up to setup your Pi to start Chromium on boot, pointing it to the website (hosted either on the Pi itself, or another machine)
