# Nym Documentation

Documentation for the Nym privacy platform. Docs can be viewed at https://nymtech.net/docs

## Contributing

Contributions to our documentation are very welcome. There are a few different ways to contribute: 

### Contributing to a new (upcoming) version 

Edit files in `/docs/`. 

### Cutting a new version
Please check the update commands [here](https://docusaurus.io/docs/versioning#tagging-a-new-version). The tl;dr of these instructions is: 
* make sure that `docs/` is ready to be frozen 
    * make sure that the compatibility table is updated. 
    * make sure that you have updated the build instructions on the `building nym` page. 
* run `npm run docusaurus docs:version <new_version_number>`

### Contributing to an existing (stable) version 
If you want to make a fix to a `stable` doc, make an edit in the relevant file in `/versioned_docs/<VERSION>/`. 

Make sure to change the corresponding file in `docs/` as well. 

### Contributing to an existing translation 
To contribute to an *existing* translation, edit files in `i18n/<LANGUAGE>/docusaurus-plugin-content-docs/<VERSION>/` 

### Contributing a new translation 
To contribute tranlsations in a *new* language, please get in touch via our [Keybase](https://keybase.io/team/nymtech.friends) or Discord channels. When developing for another locale, run `npm run build` and serve the build files locally via nginx for ease. 

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

Docs are served from `http://localhost:3000/docs/stable/overview/index`

To generate static content into `/build/` run:

```console
npm run build
```
