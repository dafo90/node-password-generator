const { expect } = require('chai');
const { error } = require('../src/constants');
const PasswordGenerator = require('../src/index');

describe('password-generator', function() {
  let passwordGenerator;
  let password;

  describe('generate', function() {
    beforeEach(function() {
      passwordGenerator = new PasswordGenerator();
    });

    describe('the parameter is invalid', function() {
      it('should throw error', function(done) {
        try {
          password = passwordGenerator.generate();
        } catch (err) {
          expect(err.message).to.be.equal(error.length);
          done();
        }
      });
    });

    describe('no rules defined', function() {
      it('should throw error', function(done) {
        try {
          password = passwordGenerator.generate(8);
        } catch (err) {
          expect(err.message).to.be.equal(error.rules);
          done();
        }
      });
    });

    describe('the parameter is valid', function() {
      describe('useLowercase', function() {
        beforeEach(function() {
          passwordGenerator.useLowercase();
        });
        it('should return a password that contains only lowecase', function() {
          expect(new RegExp(/[a-z]{99}/).test(passwordGenerator.generate(99)))
            .to.be.true;
        });
      });

      describe('useUppercase', function() {
        beforeEach(function() {
          passwordGenerator.useUppercase();
        });
        it('should return a password that contains only uppercase', function() {
          expect(new RegExp(/[A-Z]{99}/).test(passwordGenerator.generate(99)))
            .to.be.true;
        });
      });

      describe('useDigits', function() {
        beforeEach(function() {
          passwordGenerator.useDigits();
        });
        it('should return a password that contains only digits', function() {
          expect(new RegExp(/[0-9]{99}/).test(passwordGenerator.generate(99)))
            .to.be.true;
        });
      });

      describe('useSymbols', function() {
        beforeEach(function() {
          passwordGenerator.useSymbols();
        });
        it('should return a password that contains only symbols', function() {
          expect(
            new RegExp(/[!@#$%&*()_+-=\[\]\|,.\/?><]{99}/).test(
              passwordGenerator.generate(99)
            )
          ).to.be.true;
        });
      });

      describe('mix', function() {
        beforeEach(function() {
          passwordGenerator
            .useLowercase()
            .useUppercase()
            .useDigits()
            .useSymbols();
        });
        it('should return a password that contains at least one lowercase, one uppercase, one digit and one symbol', function() {
          const password = passwordGenerator.generate(99);
          expect(new RegExp(/[a-z]+/).test(password)).to.be.true;
          expect(new RegExp(/[A-Z]+/).test(password)).to.be.true;
          expect(new RegExp(/[0-9]+/).test(password)).to.be.true;
          expect(
            new RegExp(/[\!\@\#\$\%\&\*\(\)\_\+\-\=\[\]\|\,\.\/\?\>\<]+/).test(
              password
            )
          ).to.be.true;
        });
      });

      describe('password separed in chunks (mix characters)', function() {
        describe('standard chunks', function() {
          beforeEach(function() {
            passwordGenerator
              .useLowercase()
              .useUppercase()
              .useDigits()
              .useSymbols();
          });
          it('should return a password that contains 4 chunks of 4 characters each, separed by a dash', function() {
            const password = passwordGenerator.generate(4, {
              chunk: {}
            });
            expect(
              new RegExp(
                /([a-zA-Z0-9\!\@\#\$\%\&\*\(\)\_\+\-\=\[\]\|\,\.\/\?\>\<]{4}-){3}[a-zA-Z0-9\!\@\#\$\%\&\*\(\)\_\+\-\=\[\]\|\,\.\/\?\>\<]{4}/
              ).test(password)
            ).to.be.true;
          });
        });

        describe('configured chunks', function() {
          beforeEach(function() {
            passwordGenerator
              .useLowercase()
              .useUppercase()
              .useDigits()
              .useSymbols();
          });
          it('should return a password that contains 8 chunks of 2 characters each, separed by a tilde', function() {
            const password = passwordGenerator.generate(2, {
              chunk: { quantity: 8, separator: '~' }
            });
            console.log(password);
            expect(
              new RegExp(
                /([a-zA-Z0-9\!\@\#\$\%\&\*\(\)\_\+\-\=\[\]\|\,\.\/\?\>\<]{2}\~){7}[a-zA-Z0-9\!\@\#\$\%\&\*\(\)\_\+\-\=\[\]\|\,\.\/\?\>\<]{2}/
              ).test(password)
            ).to.be.true;
          });
        });
      });
    });
  });
});
