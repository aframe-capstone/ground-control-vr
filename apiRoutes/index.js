const router = require('express').Router();

router.use('/results', require('./results'));
router.use('/users', require('./users'));

module.exports = router;
