// @flow
'use strict';

const spawn = require('./');
const path = require('path');

const fixture = path.join(__dirname, 'fixture.js');

function expectError() {
  throw new Error('Promise should have errored instead of fulfilling.');
}

test('success', () => {
  return spawn(fixture, ['SUCCESS']).then(res => {
    expect(res.code).toEqual(0);
    expect(res.stdout).toContain('/fixture.js","SUCCESS"');
    expect(res.stderr).toEqual('');
  });
});

test('failure', () => {
  return spawn(fixture, ['FAILURE']).then(expectError, err => {
    expect(err.code).toEqual(1);
    expect(err.stack).toContain('Error: what have you done');
    expect(err.stdout).toContain('/fixture.js","FAILURE"');
    expect(err.stderr).toContain("what have you done");
  });
});

test('throw', () => {
  return spawn(fixture, ['THROW']).then(expectError, err => {
    expect(err.code).toEqual(1);
    expect(err.stack).toContain('throw new Error(\'no\');');
    expect(err.stdout).toContain('/fixture.js","THROW"');
    expect(err.stderr).toContain('Error: no');
  });
});
