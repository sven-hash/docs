# Nym Documentation

Documentation for the Nym privacy platform v0.11.0. Docs can be viewed at https://nymtech.net/docs.

## Contributing

Contributions to our documentation are very welcome. Please shoot us a pull request against the `develop` branch if you can see a way that they can be improved.

## Building

This site is built with [Docsaurus](https://docusaurus.io/), which is managed via `npm`. 

Requirements:

* `NodeJS` 
* `npm` 

Clone the docs from Github, then `cd docs`, then `npm i --save` to install dependencies. 

To develop the docs locally, run:

```console
npm run start
```

Docs are served from `http://localhost:3000/docs/0.11.0/overview/index`

To generate static content into `/build/` run:

```console
npm run build
```
