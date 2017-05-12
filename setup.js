'use strict';
const fs = require('fs');
fs.createReadStream('.project-env')
  .pipe(fs.createWriteStream('.env'));
console.log('SET UP ENV VARIABLES')