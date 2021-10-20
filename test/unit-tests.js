const assert = require('assert');
const validate = require('../validate');

const emails = [
  { value: null, expected: false },
  { value: undefined, expected: false },
  { value: 'email', expected: false },
  { value: 'invalid@email', expected: false },
  { value: 'invalid@email.com@email', expected: false },
  { value: 'valid@email.com', expected: true },
];

describe('validate(email)', () => {
  emails.forEach((email) => {
    it(`should return ${email.expected} for ${email.value}`, () => {
      assert.strictEqual(validate(email.value), email.expected);
    });
  });
});
