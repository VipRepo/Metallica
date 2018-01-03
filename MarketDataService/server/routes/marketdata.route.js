import express from 'express';


const router = express.Router();
var rabbit = require('../../config/ramq');
var MarketData =require('../model/marketdata.model');


router.post('/', function(req, res) {
		 
var marketDataArray=[];

for (var key in req.body) {
  if (req.body.hasOwnProperty(key)) {
  let  marketdata = new MarketData(req.body[key].price,req.body[key].name,req.body[key].location);
    marketDataArray.push(marketdata);
  }
}
       
		
		let msg = {};
    msg.type = 'marketdata';
    msg.body = marketDataArray;
        
    rabbit.publishMessage(JSON.stringify(msg));
		res.send(marketDataArray);
  });
export default router;
