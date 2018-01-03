var rabbit = require('amqplib');


var server = 'amqp://guest:guest@localhost';

var exchangeName = 'trades';
var exchangeType = 'direct';
var connection, channel;
var queueOptions = {durable: true};
var routingKey = '';

function initPublisher(server){
  return rabbit.connect(server)
          .then(registerChannel)
          .then(registerExchange);
}

initPublisher(server);

function registerChannel(conn){
    console.log('registering channel');
    connection = conn;
    connection.on('close', function(){
      console.log('connection closed');
      console.log('trying to reconnect');
       initSubscriber().then(publishMessages);
    });
    return conn.createChannel();
}

function registerExchange(ch){
  console.log('registering exchange');
    channel = ch;

  return ch.assertExchange(exchangeName, exchangeType)
}

function publishMessage(msg){
  console.log(`publishing message to trade queue ${msg}`);
  var message = new Buffer(msg);
  channel.publish(exchangeName, routingKey, message);
}



module.exports.publishMessage = publishMessage;
