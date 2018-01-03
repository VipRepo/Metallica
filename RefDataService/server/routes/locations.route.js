import express from 'express';

const router = express.Router();

const locations = {
  "LN" : "London",
   "NY": "New York",
   "SG": "Singapore",
   "DN": "Denver"
}

router.get('/', (req, res) => {
  res.send(locations);
});

export default router;
