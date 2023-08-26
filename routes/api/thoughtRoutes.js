const router = require('express').Router();
const {
    getThoughts
} = require('../../controllers/thoughtControllers.js');

router.route('/').get(getThoughts);

module.exports = router;