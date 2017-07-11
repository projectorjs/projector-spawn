# projector-spawn

> Spawn processes with ease

## Installation

```sh
yarn add --dev projector-spawn
```

## Usage

```js
import spawn from 'projector-spawn';

export async function build() {
  await spawn('script-name', ['--flag'], {
    cwd: '/path/to/cwd'
  });
}
```
