# COVID-19-UI

This project depends on [covid-19-api](https://github.com/NLPforCOVID-19/covid-19-api).

## Requirements

- [Node.js](https://nodejs.org/en/)

## Setup

To install all the dependencies, use `npm`.

```
$ npm install
```

## Develop

To launch a development server, run the following command.

```
$ env API_URL=<API_URL> npm run dev
```

where `API_URL` is the root end-point of [the API server](https://github.com/NLPforCOVID-19/covid-19-api).
By default, this command will serve the website from `localhost:3000` in a development mode.

### Build

Run the following command.

```
$ env API_URL=<API_URL> BASE_PATH=. npm run build
```

This command builds a website to serve with a Node.js server.

### Export

To serve the website with a normal (static file) web server, export the built files by the following command.

```
$ npm run export
```

This command creates files under the `out` directory.

### Environment Variables

To build or develop the website, set the following variables.

- Develop
  - API_URL
- Build
  - API_URL
  - BASE_URL (Optional; This variable is needed when the website is served from other than a domain's root.)
  - GA_TRACKING_ID

#### BASE_URL

To serve the website from a sub directory, `http://example.com/covid-19/`, set `BASE_URL` as `/covid-19`.

## Branching Strategy

- Feature branches are first merged into "staging" (or release, development) branch.
- Then the staging branch is merged into "master" branch, which is for production release.
