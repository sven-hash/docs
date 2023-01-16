# Nym Documentation
Documentation for the Nym privacy platform built using the [mdBook](https://rust-lang.github.io/mdBook/) docs framework. 

Documentation can be viewed at https://nymtech.net/docs

## Contributing
Contributions to our documentation are very welcome. Please work on your contribution in either a `feature/<feature-name>` or `chore/<chore-name>` branch from `master` and target your pull request at `master`. 

Changes merged to `master` will be autodeployed to the production site. 

### Contributing a new translation
To contribute tranlsations in a new language, please get in touch via our [Keybase](https://keybase.io/team/nymtech.friends) or Discord channels (Matrix coming soon). 

## Variables
There are some variables that are shared across the entire docs site, such as the current latest software version. 

Variables are denoted in the `.md` files wrapped in `{{}}` (e.g `{{release_version}}` is the most recent release), and are located in the `book.toml` file under the `[preprocessor.variables.variables]` heading. If you are changing something like the software release version, minimum code versions in prerequisites, etc, **check in here first!**

## Building 
When working locally, it is recommended that you use `mdbook serve` to have a local version of the docs served on `localhost:3000`, with hot reloading on any changes made to files in the `src/` directory. 

You can find other commands in the [mdBook CLI tool docs](https://rust-lang.github.io/mdBook/cli/index.html). 

