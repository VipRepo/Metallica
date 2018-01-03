import express from 'express';
import tradeRoute from './trade.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.get('/favicon.ico', function(req, res) {
    res.status(204);
});

router.use('/trades', tradeRoute)
// mount user routes at /users
// router.use('/users', userRoutes);

// mount auth routes at /auth
// router.use('/auth', authRoutes);

export default router;
