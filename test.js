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
    expect(res).toMatchSnapshot();
  });
});

test('failure', () => {
  return spawn(fixture, ['FAILURE']).then(expectError, err => {
    expect(err.stack).toMatchSnapshot('failure err.stack');
    expect(err.code).toMatchSnapshot('failure err.code');
    expect(err.stdout).toMatchSnapshot('failure err.stdout');
    expect(err.stderr).toMatchSnapshot('failure err.stderr');
  });
});

test('throw', () => {
  return spawn(fixture, ['THROW']).then(expectError, err => {
    expect(err.stack).toMatchSnapshot('throw err.stack');
    expect(err.code).toMatchSnapshot('throw err.code');
    expect(err.stdout).toMatchSnapshot('throw err.stdout');
    expect(err.stderr).toMatchSnapshot('throw err.stderr');
  });
});
