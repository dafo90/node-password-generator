# Password Generator

[![build status][travis-image]][travis-url]
[![license][license-image]][license-url]

## Usage

```js
// Create a schema
const schema = new PasswordGenerator();

// Add properties to it
schema
  .useLowercase() // Include lowercase characters
  .useUppercase() // Include uppercase characters
  .useDigits() // Include digits
  .useSymbols(); // Include symbols

// Generate a password 8 characters length
console.log(schema.generate(8));
```

[travis-image]: https://travis-ci.com/dafo90/node-password-generator.svg
[travis-url]: https://travis-ci.com/dafo90/node-password-generator
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: https://github.com/dafo90/node-password-generator/blob/master/LICENSE
