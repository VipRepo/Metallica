import mongoose from 'mongoose';
import express from 'express';
import tradeController from '../controllers/trade.controller';
var rabbit = require('../../config/ramq');

const router = express.Router();

router.get('/', function(req, res) {
        tradeController.getAll().then((trades) => {
          res.send(trades);
        }).catch((error) => {
          res.send("Error occured while fetching trades");
        })
  });

  router.get('/query', function(req, res) {
    console.log("Query: "+ JSON.stringify(req.query));
    tradeController.find(req.query).then((trades) => {
      res.send(trades);
    }).catch((error) => {
      res.send("Error occured while fetching trades");
    })
});

  router.get('/:tradeId', function(req, res) {
          tradeController.getTrade(req.params.tradeId).then((trade) => {
            res.send(trade);
          }).catch((error) => {
            res.send("Error occured while fetching trade");
          })
    });

router.post('/', function(req, res) {
        var trade = {};
        trade.side = req.body.side;
        trade.price= req.body.price;
        trade.tradeDate= req.body.tradeDate;
        trade.commodity= req.body.commodity;
        trade.counterparty= req.body.counterparty;
        trade.location= req.body.location;
        trade.quantity= req.body.quantity;
        // rabbit.publishMessage(JSON.stringify(trade));
        trade.version = 0;
        tradeController.addTrade(trade).then((savedTrade) => {
          let msg = {};
          msg.type = 'create';
          msg.body = savedTrade;
          rabbit.publishMessage(JSON.stringify(msg));
          res.send(savedTrade);
        }).catch((error) => {
          res.send("Error occured while saving trade"+error);
        })
  });

  router.put('/', function(req, res) {
          var trade = {};
          trade._id = req.body._id;
          trade.side = req.body.side;
          trade.price= req.body.price;
          trade.tradeDate= req.body.tradeDate;
          trade.commodity= req.body.commodity;
          trade.counterparty= req.body.counterparty;
          trade.location= req.body.location;
          trade.quantity= req.body.quantity;
         trade.version = req.body.version;
         console.log("New version is "+ trade.version);
          tradeController.update(trade).then((savedTrade) => {
            let msg = {};
            msg.type = 'update';
            msg.body = savedTrade;
            rabbit.publishMessage(JSON.stringify(msg));
            res.send(savedTrade);
          }).catch((error) => {
            res.send("Error occured while updating trade"+error);
          })
    });

  router.delete('/:tradeId', function(req, res) {
          tradeController.deleteTrade(req.params.tradeId).then((trade) => {
            let msg = {};
            msg.type = 'delete';
            msg.body = req.params.tradeId;
            rabbit.publishMessage(JSON.stringify(msg));
            res.send(trade);
          }).catch((error) => {
            res.send(`Error occured while deleting trade: ${error}`);
          })
    });

// router.route('/').get(repoCtrl.load)

export default router;
