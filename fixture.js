#!/usr/bin/env node

process.stdout.write('argv: ' + JSON.stringify(process.argv.slice(1)));

if (process.argv.includes('SUCCESS')) {
  process.exit(0);
}

if (process.argv.includes('FAILURE')) {
  process.stderr.write('what have you done');
  process.exit(1);
}

if (process.argv.includes('THROW')) {
  throw new Error('no');
}
