import Eureka from 'eureka-js-client';


// example configuration 
const client = new Eureka({
 // application instance information 
 instance: {
   app: 'ref-data-service',
   hostName: 'localhost',
   ipAddr: '127.0.0.1',
   port: {
    '$': 9081,
    '@enabled': 'true',
  },
   vipAddress: 'ref-data-service',
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
 