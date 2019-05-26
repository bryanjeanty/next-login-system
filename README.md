# Sound Search
![ss_screenshot](./static/images/sound_search_IMG_V01.png)
[Sound Search](https://sound-search.herokuapp.com/) is an application that allows users to find the lyrics to their track(s) of interest.

### Disclaimer

Original project by Brad Traversy found [here](https://www.youtube.com/watch?v=NDEt0KdDbhk).

## Table of Contents
1. [Getting Started](#getting-started)
2. [Technology](#technology)
3. [Installation](#installation)
4. [Features](#features)
5. [Contributing](#contributing)
6. [Author](#author)
7. [License](#license)

## Getting Started

Initial software environment conditions

* Package Manager - [NPM](https://nodejs.org/en/)
* Code Editor - [VS Code](https://code.visualstudio.com/), [Atom](https://atom.io/), [Sublime Text](https://www.sublimetext.com/), etc.
* Operating System - MAC OS, Windows or any Linux Distro
* Modern Browser - [Google Chrome](https://www.google.com/chrome/) or [Firefox](https://www.mozilla.org/en-US/firefox/new/)

## Technology

**_MongoDB_**: NoSQL database used to store user, coin and session data <br>
**_Express_**: Node based server-side microframework used to whip up quick server and create REST API <br>
**_React_**: Client-side framework used to compartmentalize and control various aspects of UI <br>
**_Redux_**: Global client state management <br>
**_Next_**: Server-side render react. Unify react and express <br>
**_Bootstrap_**: CSS framework used to add quick components and UI responsiveness

View the [package.json](https://github.com/bryanjeanty/kryptodash/blob/master/package.json) to see additional technology used.

## Installation

* Initialize node project

```bash
npm init -y
```

* Install main tech stack

```bash
npm install next@8.1.0 react@16.8.6 react-dom@16.8.6 express@4.16.4 mongoose@5.5.4 bootstrap@4.3.1
```

* Go to [MusixMatch](https://developer.musixmatch.com/) API main site and register for an API Key

* Go to [BING Image Search](https://azure.microsoft.com/en-us/services/cognitive-services/bing-image-search-api/) API main site and register for an API Key

## Features

* Authentication
* Sessions
* Music Track Lyrics and Metadata
* Music Track Album Images
* Searching

## Contributing

Pull requests are welcome. Please read [CONTRIBUTING.md](https://github.com/bryanjeanty/sound-search/blob/master/CONTRIBUTING.md) for more details.

## Author

* **Bryan Jeanty**

## License

[MIT](https://github.com/bryanjeanty/sound-search/blob/master/LICENSE.md)
