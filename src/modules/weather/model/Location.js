import { LocationInterface } from './LocationInterface';

export default class Location implements LocationInterface {
    // please complete the implementation of the concrete class based on the interface it implements
    
    constructor(){
        console.log("TEST2");
        
    }

    async getLongitude(): ?string {
        
        //geoip is a module to get latitude longitude based on IP
        //external is a module to retrieve public ip address used
        const geoip = require('geoip-lite');
        const externalip = require('externalip');
        let ipAddress = "";
        
        await externalip(function(err,ip){
            console.log("externalip");
            ipAddress = ip;
        });
    
        
        let promise = await new Promise((resolve, reject) => {  
          if (ipAddress === "")  {
              console.log("promise error");
              throw new Error("rejected!"); // same as rejection
          }
          else{
                console.log("inside if promise");
                const geo = geoip.lookup(ip);
                resolve(geo.ll[1]);
          }
        });
        
        return promise;
            
            
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
