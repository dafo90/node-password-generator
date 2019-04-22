const { error } = require('./constants');
const { charactersCategories } = require('./constants');

/**
 * Registers a category of characters to use
 *
 * @private
 * @param {string} charactersCategory - Name of characters category
 * @returns {object} This object
 */
function _register(charactersCategory) {
  // Add property to the schema
  this.categories.add(charactersCategory);
  return this;
}

/**
 * Generate a random string of configured characters set
 *
 * @private
 * @param {number} length - String length
 * @returns {string} The random string of requested length
 */
function _generateRandomString(length) {
  // Result of the schema definition
  const characters = Array.from(this.categories).map(
    category => charactersCategories[category]
  );

  // Generate a random string using the rules
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const categoryIndex = Math.floor(Math.random() * characters.length);
    const charCategory = characters[categoryIndex];
    const positionIndex = Math.floor(Math.random() * charCategory.length);
    const randomChar = charCategory.charAt(positionIndex);
    randomString = randomString.concat(randomChar);
  }

  return randomString;
}

function PasswordGenerator() {
  // Initialize a schema with no properties defined
  this.categories = new Set();
}

/**
 * Method to generate a password against schema
 *
 * @param {number} length - Password length
 * @param {object} options - Optional options to configure the generated password structure
 * @return {string} The generated password
 */
PasswordGenerator.prototype.generate = function(length, options) {
  // Checks if lenght is a positive number
  if (!Number.isInteger(length) || length < 1) {
    throw new Error(error.length);
  }

  // Checks if at least there is a rule
  if (this.categories.size === 0) {
    throw new Error(error.rules);
  }

  // Build the password
  let password = '';
  if (options && options.chunk) {
    // Separe the password in chunks
    const { quantity = 4, separator = '-' } = options.chunk;
    for (let i = 0; i < quantity; i++) {
      if (password.length > 0) {
        password = password.concat(separator);
      }
      password = password.concat(_generateRandomString.call(this, length));
    }
  } else {
    password = _generateRandomString.call(this, length);
  }
  return password;
};

/**
 * Rule to generate a password that contains uppercase
 */
PasswordGenerator.prototype.useUppercase = function useUppercase() {
  return _register.call(this, 'uppercase');
};

/**
 * Rule to generate a password that contains lowercase
 */
PasswordGenerator.prototype.useLowercase = function useLowercase() {
  return _register.call(this, 'lowercase');
};

/**
 * Rule to generate a password that contains digits
 */
PasswordGenerator.prototype.useDigits = function useDigits() {
  return _register.call(this, 'digits');
};

/**
 * Rule to generate a password that contains symbols
 */
PasswordGenerator.prototype.useSymbols = function useSymbols() {
  return _register.call(this, 'symbols');
};

module.exports = PasswordGenerator;
