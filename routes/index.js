const express = require('express');
const swaggerConfig = require('../config/swagger');
const router = express.Router();

swaggerConfig(router, { basedir: __dirname, filedir: './' })

router.get('/', (req, res) => {
    res.send(req.originalUrl);
});


module.exports = router;
