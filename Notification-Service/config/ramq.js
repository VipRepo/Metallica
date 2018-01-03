var rabbit = require('amqplib');
var app = require('./express');

var server = 'amqp://guest:guest@localhost';

var queueName = 'trades.q';
var exchangeName = 'trades';
var exchangeType = 'direct';
var connection, channel;
var queueOptions = {durable: true};
var routingKey = '';

function initSubscriber(server){
  return rabbit.connect(server)
          .then(registerChannel)
          .then(registerExchange)
          .then(registerQueue)
          .then(bindQueueToExchange);  // you can pass that back from the factory
}

initSubscriber(server).then(listenToMessages);

function registerChannel(conn){
    console.log('registering channel');
    connection = conn;
    return conn.createChannel();
}

function registerExchange(ch){
  console.log('registering exchange');
    channel = ch;
  return ch.assertExchange(exchangeName, exchangeType)
}

function registerQueue(){
  console.log('registering queue');
   return channel.assertQueue(queueName, queueOptions);
}

function bindQueueToExchange(){
  console.log('binding queue');
  return channel.bindQueue(queueName, exchangeName, routingKey);
}


function listenToMessages(){

   console.log('listening to messages');

  channel.consume(queueName, function(msg){
      if (!msg){return ; }
      // do the message processing here
      // console.log(msg.content.toString());
      app.onMessage(msg);
      channel.ack(msg);
  });

  connection.on('close', function(){
    console.log('connection closed');
    console.log('trying to reconnect');
     initSubscriber().then(listenToMessages);
  });

}
