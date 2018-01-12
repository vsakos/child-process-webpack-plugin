const spawn = require('child_process').spawn;
const _ = require('lodash');
const LineWrapper = require('stream-line-wrapper');

function ChildProcessPlugin (options) {
    this.processes = [];

    const defaultValues = {
        command: '',
        once: false,
        runCount: 0,
        prefix: '',
        cwd: '.',
        env: {
            'PATH': process.env.PATH,
        },
    };

    if (_.isString(options)) {
        this.processes.push({
            command: options
        });
    }
    else if (_.isObject(options)) {
        this.processes.push(options);
    }
    else if (_.isArray(options)) {
        this.processes = _.filter(options, (proc) => {
            return _.isObject(proc);
        });
    }

    this.processes = _.map(this.processes, (proc) => {
        return _.defaultsDeep(proc, defaultValues);
    });
}

ChildProcessPlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', () => {
        _.each(this.processes, (proc) => {
            if (proc.once && proc.runCount >= 1)
                return;

            proc.runCount++;

            const child = spawn(proc.command, {
                cwd: proc.cwd,
                env: proc.env,
                stdio: ['ignore', 'pipe', 'pipe'],
                shell: true,
            });

            const wrapperOut = new LineWrapper({
                prefix: proc.prefix,
            });

            const wrapperErr = new LineWrapper({
                prefix: proc.prefix,
            });

            child.stdout.pipe(wrapperOut).pipe(process.stdout);
            child.stderr.pipe(wrapperErr).pipe(process.stderr);
        });
    });
};

module.exports = ChildProcessPlugin;