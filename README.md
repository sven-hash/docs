# Nym Documentation

Documentation for the Nym privacy platform v0.11.0. Docs can be viewed at https://nymtech.net/docs/0.11.0/overview/index

## Contributing

Contributions to our documentation are very welcome. Please shoot us a pull request against the `develop` branch if you can see a way that they can be improved.

The directory structure produced by Docusaurus (see below) can be confusing; please check the list below to make sure you are making edits in the correct place. 

* To contribute to the `next (in progress)` version, edit files in `docs/`
* To contribute to previous versions, edit files in `versioned_docs/<VERSION>/`
* To contribute to an *existing* translation, edit files in `i18n/<LANGUAGE>/docusaurus-plugin-content-docs/<VERSION>/` 
* To contribute tranlsations in a *new* language, please get in touch via max@nymtech.net or via our [Keybase](https://keybase.io/team/nymtech.friends) channel. When developing for another locale, run `npm run build` and serve the build files locally via nginx for ease. 

> All of the raw diagram files are located in `static/drawio_files/`. VSCode has a nice [plugin](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) for editing [draw.io](https://app.diagrams.net/) files directly in your editor, or you can edit in the browser. 

## Building

This site is built with [Docusaurus](https://docusaurus.io/), which is managed via `npm`. 

Requirements:

* `NodeJS` 
* `npm` 

Clone the docs from Github, `cd docs`, then `npm i --save` to install dependencies. 

To develop the docs locally, run:

```console
npm run start
```

Docs are served from `http://localhost:3000/docs/0.11.0/overview/index`

To generate static content into `/build/` run:

```console
npm run build
```
