const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes.js');

router.use(require('./zookeeperRoutes'));

router.use(animalRoutes);

module.exports = router;