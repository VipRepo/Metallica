import mongoose from 'mongoose';

const TradeSchema = new mongoose.Schema({
  side: String,
  commodity: String,
  counterparty: String,
  location: String,
  price: Number,
  quantity: Number,
  tradeDate: Date,
  version: Number
});

export default mongoose.model('Trade', TradeSchema);
