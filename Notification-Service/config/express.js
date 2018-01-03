const express = require('express');
const http = require("http");
const socketIO = require("socket.io");


const port = process.env.PORT || 9082;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var socket;

io.on('connection', (socket) => {

    console.log('user connected');
    socket = socket;
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('add-message', (message) => {
        io.emit('message', { type: 'new-message', text: message });

    });

});

function onMessage(message) {
    console.log(message.content.toString());
    let msg = JSON.parse(message.content);
    
    if(io){
        if(msg.type === 'create') {
            console.log("Emmiting TradeCreate event");
            io.emit("TradeCreate", JSON.stringify(msg.body));
        }
        if(msg.type === 'update') {
            console.log("Emmiting TradeUpdate event");
            io.emit("TradeUpdate", JSON.stringify(msg.body));
        }
        if(msg.type === 'delete') {
            console.log("Emmiting TradeDelete event");
            io.emit("TradeDelete", JSON.stringify(msg.body));
        }
        if(msg.type === 'marketdata') {
            console.log("Emmiting market data event");
            io.emit("MarketData", JSON.stringify(msg.body));
        }
     
    }

}

server.listen(port, () => {
  console.log(`Notification Server is up on port ${port}`);
});


module.exports.onMessage = onMessage;
