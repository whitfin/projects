#!/usr/bin/env node
const generate = require('markdown-table');

const HEADER = [['Package', 'Downloads']];

const PACKAGES = {
  'Elixir & Hex.pm': {
    format: {
      shield: 'https://img.shields.io/hexpm/dt',
      locate: function (name) {
        return 'https://hex.pm/packages/' + name.replace(/-/g, '_');
      }
    },
    packages: [
      'cachex',
      'child-spec-compat',
      'deppie',
      'dot-notes',
      'eternal',
      'expool',
      'gen_delegate',
      'hypex',
      'luger',
      'pre_plug',
      'sentix',
      'siphash',
      'stash',
      'tiny',
      'unsafe',
      'vessel'
    ]
  },
  'Node.js & npm': {
    format: {
      shield: 'https://img.shields.io/npm/dt',
      locate: function (name) {
        return 'https://www.npmjs.com/package/' + name;
      }
    },
    packages: [
      'argle',
      'capture-console',
      'dep-validate',
      'dockserv',
      'dot-notes',
      'expansion',
      'granular-logger',
      'icomoon-scss-mixins',
      'it-each',
      'joiless',
      'kscrash-converter',
      'lori',
      'native-hashset',
      'neek',
      'neps',
      'noddle',
      'oryx',
      'rabbitmq-manager',
      'redis-scanner',
      'require-under'
    ]
  }
};

console.log('# Downloads');
console.log('');
console.log('This page tracks downloads for projects hosted on package managers which ' +
            'support download counting. Not of any real use other than guaging where ' +
            'focus should lie on open source projects. There will probably be some ' +
            'omission for those things I have already decided against maintaining.');

Object.keys(PACKAGES).forEach(function (manager) {
  console.log('');
  console.log('## ' + manager);
  console.log('');

  let pkg = PACKAGES[manager].packages;
  let fmt = PACKAGES[manager].format;

  let map = pkg.map(function (name) {
    return [
      `[${name}](https://github.com/whitfin/${name})`,
      `[![${name}](${fmt.shield}/${name}.svg?style=flat-square)]` +
      `(${fmt.locate(name)})`
    ];
  });

  let tab = generate(HEADER.concat(map));

  console.log(tab);
});
