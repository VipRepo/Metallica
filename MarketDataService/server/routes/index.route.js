import express from 'express';

import marketDataRoute from './marketdata.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/ping', (req, res) =>
  res.send('OK')
);

router.get('/favicon.ico', function(req, res) {
    res.status(204);
});



router.use('/marketdata', marketDataRoute);

export default router;
