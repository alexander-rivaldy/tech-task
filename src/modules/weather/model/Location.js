import { LocationInterface } from './LocationInterface';

export default class Location implements LocationInterface {
    // please complete the implementation of the concrete class based on the interface it implements
    
    //empty constructor to create Location object
    constructor(){
    }
    
    //get Longitude of current location
    async getLongitude(): Promise {

        //geoip is a module to get latitude longitude based on IP
        //external is a module to retrieve public ip address used
        const geoip = require('geoip-lite');
        const publicIp = require('public-ip');

        //create promise to send back value
        const promise = await new Promise((resolve, reject) => {
          console.log("in promise");
          publicIp.v4()
                .then((ip) => {
                  console.log(ip);
                  resolve(geoip.lookup(ip).ll[1]);
               })
                .catch((error) => {
                  console.log("error from publicIp");
                  reject(error);
                });
        });

        return promise;
    
            
    }
    
    //get latitude of current location
    async getLatitude(): Promise {
        //geoip is a module to get latitude longitude based on IP
        //external is a module to retrieve public ip address used
        const geoip = require('geoip-lite');
        const publicIp = require('public-ip');
        
        //create promise to send back value
        const promise = await new Promise((resolve, reject) => {
          console.log("in promise");
          publicIp.v4()
                  .then((ip) => {
                    console.log(ip);
                    resolve(geoip.lookup(ip).ll[0]);
                 })
                  .catch((error) => {
                    console.log("error from publicIp");
                    reject(error);
                  });
        });

        return promise;        
    }
    
}

module.exports = Location;
