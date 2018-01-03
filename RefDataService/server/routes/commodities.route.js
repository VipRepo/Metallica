import express from 'express';

const router = express.Router();

const commodities = {
  "AL" : "Aluminum",
   "ZN": "Zinc",
   "CU": "Copper",
   "AU": "Gold",
   "AG": "Silver"
}

router.get('/', (req, res) => {
  res.send(commodities);
});

export default router;
