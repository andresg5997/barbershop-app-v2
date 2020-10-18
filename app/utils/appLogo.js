const appIcon = require('app-icon');

console.log('bLYAT');

Promise.resolve()
  .then(() => appIcon.generate({
    sourceIcon: '../beban-logo.png',
  }));
