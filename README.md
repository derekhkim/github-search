# Github Search

# Pre-requisites

This project uses several tools to help streamline the development process,
`yarn` being the most important for dependency management

1. First make sure
   [homebrew](https://dev.to/berry_clione/install-homebrew-on-macos-mojave-4m3m)
   is installed, then run `brew install yarn`
1. Once yarn is installed we need to make sure it can retrieve the workday
   specific dependencies from artifactory by cloning
   [generate-npmrc](https://ghe.megaleo.com/design/generate-npmrc) into the
   parent directory of your boilerplate repo and following the steps in the
   readme.

# Quick Start

The quickest way to get started is as follows:

Clone the repository then navigate to the project folder

```
yarn
yarn build
yarn start
```

# Testing

In order to run unit tests:

```
yarn test
```
