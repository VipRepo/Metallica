
import util from 'util';


// config should be imported before importing any other file
import config from './config/config';
import app from './config/express';
import connectToEureka  from "./config/eureka";

 
const debug = require('debug')('express-mongoose-es6-rest-api:index');


app.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`);
  console.log("registering to eureka server");
   connectToEureka ();
 
});

 
export default app;
