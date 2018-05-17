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
        
        //retrieve public ip address used
        await publicIp.v4().then(ip => {
        	let ipAddress = ip;
        	
        	//create promise to return
        	return new Promise((resolve, reject) => {  
              if (typeof ipAddress === "")  {
                  //throwing an error if ipAddress not found
                  throw new Error("rejected!"); 
              }
              else{
                    //get longitude value
                    const geo = geoip.lookup(ipAddress);
                    
                    //data to be returned
                    resolve(geo.ll[1]);
              }
            });
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
