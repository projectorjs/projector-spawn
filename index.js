// @flow
'use strict';

const crossSpawn = require('cross-spawn');

class ChildProcessError extends Error {
  /*::
  code: number;
  stdout: string;
  stderr: string;
  */
  constructor(code, stdout, stderr) {
    super(stderr);
    Error.captureStackTrace(this, this.constructor);
    this.code = code;
    this.stdout = stdout;
    this.stderr = stderr;
  }
}

function spawn(
  cmd /*: string */,
  args /*: Array<string> */,
  opts /*: ?child_process$spawnOpts */
) {
  return new Promise((resolve, reject) => {
    let stdoutBuf = Buffer.from('');
    let stderrBuf = Buffer.from('');

    let child = crossSpawn(cmd, args, opts);

    if (child.stdout) {
      child.stdout.on('data', data => {
        stdoutBuf = Buffer.concat([stdoutBuf, data]);
      });
    }

    if (child.stderr) {
      child.stderr.on('data', data => {
        stderrBuf = Buffer.concat([stderrBuf, data]);
      });
    }

    child.on('error', reject);

    child.on('close', code => {
      let stdout = stdoutBuf.toString();
      let stderr = stderrBuf.toString();

      if (code === 0) {
        resolve({code, stdout, stderr});
      } else {
        reject(new ChildProcessError(code, stdout, stderr));
      }
    });
  });
}

spawn.ChildProcessError = ChildProcessError;

module.exports = spawn;
