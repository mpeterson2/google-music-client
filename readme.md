# Google Music Client

Google Music Client is a desktop app for OSX and Windows. It loads Google Music and gives you access to media controls and saves where you left off.

## Installing
  Download the or .dmg .exe from the [releases](https://github.com/mpeterson2/google-music-client/releases) page. Run it and it will install like any other OSX or Windows application.

## Development
I use OSX for development, and while it should be possible to develop on Windows as well, this guide will be OSX specific.

### Installing Dependencies

 - Install [node](nodejs.org)
 - Run `npm install`

### Running
To quickly run the app, run `npm run start`

### Building
To create a runnable application:

**Prereqs**

 - Be sure [Xcode](https://developer.apple.com/xcode/) is installed
 - Run  `brew install wine makensis` to install [wine](https://www.winehq.org/) and [makensis](http://nsis.sourceforge.net/)

**After prereqs**

Run `npm run build`

### Packaging
To build the app and create an installer:

**Prereqs**

Follow the Prereqs for [Building](#building)

**After prereqs**

Run `npm run pack`