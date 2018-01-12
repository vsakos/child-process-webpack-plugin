const path = require('path');
const ChildProcessPlugin = require('../index');

module.exports = {
    entry: [
        path.resolve(__dirname, 'index.js'),
    ],

    output: {
        path: path.resolve(__dirname),
        filename: 'build.js',
    },

    target: 'node',

    plugins: [
        new ChildProcessPlugin('echo Hello!'),

        new ChildProcessPlugin({
            command: 'npm run test:nodemon',
            once: true,
            prefix: '[nodemon] ',
        }),
    ],

    watch: true,
};