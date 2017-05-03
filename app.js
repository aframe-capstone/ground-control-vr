const db = require('./db');

db.sync()
  .then(() => require('./server'));
