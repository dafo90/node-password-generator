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
            new RegExp(/[!@#$%&*()_+-=[]|,.\/?><]{99}/).test(
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
          expect(new RegExp(/[!@#$%&*()_+-=[]|,.\/?><]+/).test(password)).to.be
            .true;
        });
      });
    });
  });
});
