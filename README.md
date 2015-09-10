# workshopper-node-default-exports-runner

> Workshopper runner to verify node module.exports function result

The verifier is heavily inspired by the [`runner` in the functional-javascript-workshop] (https://github.com/timoxley/functional-javascript-workshop/blob/1.0.2/exercises/runner.js).


### Installation

```sh
$ npm i workshopper-node-default-exports-runner
```

### Usage

```js
var runner = require("workshopper-node-default-exports-runner");

module.exports = runner({
  'Should return the first argument provided': { 'name': 'fred' }
});
```

## License

    Copyright © 2015 Douglas Duteil <douglasduteil@gmail.com>
    This work is free. You can redistribute it and/or modify it under the
    terms of the Do What The Fuck You Want To Public License, Version 2,
    as published by Sam Hocevar. See the LICENCE file for more details.
