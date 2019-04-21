const { error } = require('./constants');
const { charactersCategories } = require('./constants');

/**
 * Registers a category of characters to use
 *
 * @private
 * @param {string} charactersCategory - Name of characters category
 */
function _register(charactersCategory) {
  // Add property to the schema
  this.categories.add(charactersCategory);
  return this;
}

function PasswordGenerator() {
  // Initialize a schema with no properties defined
  this.categories = new Set();
}

/**
 * Method to generate a password against schema
 *
 * @param {number} length - password length
 * @return {string} The generated password
 */
PasswordGenerator.prototype.generate = function(length) {
  // Checks if lenght is a positive number
  if (!Number.isInteger(length) || length < 1) {
    throw new Error(error.length);
  }

  // Result of the schema definition
  const characters = Array.from(this.categories).map(
    category => charactersCategories[category]
  );

  // Build the password
  let password = '';
  for (let i = 0; i < length; i++) {
    const categoryIndex = Math.floor(Math.random() * characters.length);
    const charCategory = characters[categoryIndex];
    const positionIndex = Math.floor(Math.random() * charCategory.length);
    const randomChar = charCategory.charAt(positionIndex);
    password = password.concat(randomChar);
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
