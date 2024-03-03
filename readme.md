# Attlr UI Components

Attlr UI Components is a collection of reusable components for building react native applications with an option to only add the components you need to your project.

[![Lint CI](https://github.com/attlr-ui/ui-components/actions/workflows/lint.yml/badge.svg)](https://github.com/attlr-ui/ui-components/actions/workflows/lint.yml)
[![Node.js Package](https://github.com/attlr-ui/ui-components/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/attlr-ui/ui-components/actions/workflows/npm-publish.yml)
[![Publish Pre-Release](https://github.com/attlr-ui/ui-components/actions/workflows/npm-publish%20beta.yml/badge.svg)](https://github.com/attlr-ui/ui-components/actions/workflows/npm-publish%20beta.yml)
[![Dependency review](https://github.com/attlr-ui/ui-components/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/attlr-ui/ui-components/actions/workflows/dependency-review.yml)
[![GitHub stars](https://img.shields.io/github/stars/attlr-ui/ui-components?style=flat)]
[![GitHub forks](https://img.shields.io/github/forks/attlr-ui/ui-components?style=flat)]
[![GitHub issues](https://img.shields.io/github/issues/attlr-ui/ui-components)]
[![GitHub pull requests](https://img.shields.io/github/issues-pr/attlr-ui/ui-components)]
[![GitHub license](https://img.shields.io/github/license/attlr-ui/ui-components)]

## Installation

```sh
npm install @attlr-ui/ui-components
```

We recommend using our [CLI](https://www.npmjs.com/package/@attlr/cli) to install the components you only need.

## Usage

```jsx
import { AButton } from '@attlr-ui/ui-components'

const App = () => {
  return (
    <AButton
      fill="solid"
      loadingColor="red"
      size="lg"
      iconRight={<AntDesign name="upcircle" size={24} color="white" />}
      icon
      onPress={() => console.log('Button clicked')}>
      <AButtonText variant="default">Click</AButtonText>
    </AButton>
  )
}
```

## Documentation

You can find the documentation [here](https://ui.attlr.org.za/)

## Contributing

We are open to contributions. Please read create a new [issue](https://github.com/attlr-ui/ui-components/issues/new/choose) and a pull request for any feature or bug fix.

Made with ❤️ by [Attlr](https://attlr.org.za)
