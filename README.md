# Child Process Webpack Plugin

Webpack plugin for starting child processes after each build.

## Installation

```
$ npm install child-process-webpack-plugin
```

## Basic usage

In your `webpack.config.js`:

```javascript
const ChildProcessPlugin = require('child-process-webpack-plugin');

module.exports = {
    // ...
    plugins: [
        new ChildProcessPlugin('echo Hello!')
    ]
    // ...
}
```

## Options

```javascript
new ChildProcessPlugin(config: array | object | string)
```

Ideally `config` is an array of child process configurations. Each config is an object with the following keys:

Key|Type|Default value|Description
:---:|:----:|:-------------:|-----------
**`command`**|String|`''`|The command to be executed
**`once`**|Boolean|`false`|Run the command only after the first build (`true` makes sense only in watch mode)
**`prefix`**|String|`''`|Each line of the process output gets prefixed with this string
**`cwd`**|String|`'.'`|Working directory the process will run in
**`env`**|Object|`{PATH:process.env.PATH}`|Environment variables for the child process

If `config` is an object, it's interpreted as an array with a single configuration:

```javascript
new ChildProcessPlugin([config])
```

If `config` is a string, it's interpreted as a single command:

```javascript
new ChildProcessPlugin([{
    command: config
}])
```

If you don't like the array syntax, you can create multiple instances:

```javascript
module.exports = {
    // ...
    plugins: [
        new ChildProcessPlugin(config1),
        new ChildProcessPlugin(config2)
    ]
    // ...
}
```

## Example

For a complete example check the [test folder](/test).
