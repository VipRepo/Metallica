import express from 'express';
import counterpartyRoute from './counterparties.route';
import commoditiesRoute from './commodities.route';
import locationsRoute from './locations.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/ping', (req, res) =>
  res.send('OK')
);

router.get('/favicon.ico', function(req, res) {
    res.status(204);
});

router.use('/locations', locationsRoute);
router.use('/counterparties', counterpartyRoute);
router.use('/commodities', commoditiesRoute);

export default router;
