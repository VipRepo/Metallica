import Trade from '../models/trade.model';


const tradeController = {};

  tradeController.addTrade = (trade) => {
    return new Promise((resolve, reject) => {
      new Trade(trade).save().then((savedTrade) => {
        resolve(savedTrade);
      },(error) => {
        reject(error);
      })
    })
  }

  tradeController.getAll = (trade) => {
    return new Promise((resolve, reject) => {
      Trade.find({}).then((trades) => {
        resolve(trades);
      },(error) => {
        reject(error);
      })
    })
  }

  tradeController.find = (query) => {
    return new Promise((resolve, reject) => {
      Trade.find({
        side: query.side,
        commodity: query.commodity,
        counterparty: query.counterparty,
        location: query.location,
        $and:[
          {tradeDate:{$lte: new Date(query.toDate)}},
          {tradeDate:{$gte: new Date(query.fromDate)}}
        ]
      }).then((trades) => {
        resolve(trades);
      },(error) => {
        reject(error);
      })
    })
  }



  tradeController.getTrade = (tradeId) => {
    console.log("Trade ID:"+ tradeId);
    return new Promise((resolve, reject) => {
      Trade.findById(tradeId).then((trade) => {
        resolve(trade);
      },(error) => {
        reject(error);
      })
    })
  }

  tradeController.deleteTrade = (tradeId) => {
    return new Promise((resolve, reject) => {
      Trade.remove({_id: tradeId}).then((trade) => {
        resolve(trade);
      },(error) => {
        reject(error);
      })
    })
  }

  tradeController.update = (trade) => {
    let version = parseInt(trade.version);
    trade.version = version + 1;
    return new Promise((resolve, reject) => {
      Trade.findOneAndUpdate({_id: trade._id, version: version}, trade, {new: true},
      function(err, updatedTrade) {
        if(err) {
          reject(error);
        } else {
          resolve(updatedTrade);
        }
      })
    })
  }

  export default tradeController;










// function load(req, res) {
//   let totalCountPromise = Repo.totalCount(req.query.lang);
//   let repos;
//
//   Repo.get(req.query)
//     .then((result) => {
//       repos = result;
//       return totalCountPromise;
//     })
//     .then(count => {
//       res.count = count;
//       res.setHeader('Access-Control-Expose-Headers', 'totalItems');
//       res.setHeader('totalItems', count);
//       return res.json(repos);
//     })
//     .catch(e => console.log(e));
//
// }
//
// export default { load };
