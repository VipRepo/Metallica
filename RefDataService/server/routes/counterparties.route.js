import express from 'express';

const router = express.Router();

const counterparties = {
  "Lorem" : "Lorem",
   "Ipsum": "Ipsum",
   "Dolor": "Dolor",
   "Amet": "Amet"
}

router.get('/', (req, res) => {
  res.send(counterparties);
});

export default router;
