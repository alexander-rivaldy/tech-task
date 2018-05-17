import { LocationInterface } from './LocationInterface';

export default class Location implements LocationInterface {
    // please complete the implementation of the concrete class based on the interface it implements
    
    constructor(){
        console.log("TEST2");
        
    }

    async getLongitude(): Promise {
        
        //geoip is a module to get latitude longitude based on IP
        //external is a module to retrieve public ip address used
        const geoip = require('geoip-lite');
        // const externalip = require('externalip');
        
        const publicIp = require('public-ip');
        
        await publicIp.v4().then(ip => {
        	let ipAddress = ip;
        	console.log(ipAddress);
        	const promise = new Promise((resolve, reject) => {  
              if (typeof ipAddress === "")  {
                  console.log("promise error");
                  throw new Error("rejected!"); // same as rejection
              }
              else{
                    console.log("inside if promise");
                    console.log(ipAddress);
                    const geo = geoip.lookup(ipAddress);
                    console.log(geo);
                    resolve(geo.ll[1]);
              }
            });
            console.log(promise);
            return promise;
        });
            
    }
    
    getLatitude(): ?string {
        if(navigator.geolocation)
            return navigator.geolocation.getCurrentPosition.coords.latitude;
        else
            window.alert("Your browser does not support Geolocation");
        return "ERROR";        
    }
    
}

module.exports = Location;
