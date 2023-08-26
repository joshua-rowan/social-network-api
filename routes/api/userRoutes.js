const router = require('express').Router();
const {
    getUsers
} = require('../../controllers/userControllers.js');

router.route('/').get(getUsers);

module.exports = router;