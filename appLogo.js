const appIcon = require('app-icon');

Promise.resolve()
  .then(() => appIcon.generate({
    sourceIcon: './beban-logo.png',
  }));
