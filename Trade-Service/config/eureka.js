import Eureka from 'eureka-js-client';
import { process } from 'joi/lib/errors';


// example configuration 
const client = new Eureka({
 // application instance information 
 instance: {
   app: 'trade-service',
   hostName: 'localhost',
   ipAddr: '127.0.0.1',
   port: {
    '$': 9080,
    '@enabled': 'true',
  },
   vipAddress: 'trade-service',
   dataCenterInfo: {
    '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
    name: 'MyOwn',
  }
 },       
 eureka: {
   // eureka server host / port 
   host: '127.0.0.1',
   port: 8761,
   servicePath: '/eureka/apps/',
 },
});

export default function connectToEureka() {               
    client.logger.level('debug');   
    client.start(function(error) {
    console.log('########################################################');
    console.log(JSON.stringify(error) || 'Eureka registration complete');   }); }
 