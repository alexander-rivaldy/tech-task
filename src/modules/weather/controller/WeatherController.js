// @flow
import WeatherRepository from '../repository/WeatherRepository';
import { FactoryInterface } from '../../../lib/FactoryInterface';
import { LocationInterface } from '../model/LocationInterface';
import { Location } from '../model/Location';

import axios from 'axios';

export default class WeatherController {
    _weatherRepository: WeatherRepository;
    _locationFactory: FactoryInterface;

    constructor(weatherRepository: WeatherRepository, locationFactory: FactoryInterface) {
        this._weatherRepository = weatherRepository;
        this._locationFactory = locationFactory;
    }
    
    async index(req: any, res: any): Promise<void> {
        try {
            const Location = require('../model/Location');
            
            // this._locationFactory = Object.create(FactoryInterface);
            
            //create Location object
            // I wasn't able to create the object using Factory, therefore
            // I created the object using it's own constructor
             const location = new Location();
            // const location: Location = 
            //     this._locationFactory.createInstance();
            
            let lonValue = "";
            
            //grab longitude of current location
            location.getLongitude()
                .then(function(response){
                    lonValue = response;
                })
                .catch(function(err){
                    console.log("catch error");
                });
            
            
            // console.log("Longitude: " + lonValue);
            // const location = Location.createInstance;
            
            // const location = new Location();
        
            // const weather = 
            //         _weatherRepository.getWeatherByGeolocation(location);
            
            //pass back the value to view layout
            // WeatherRepository function not yet called due to difficulty in
            // getLongitude and getLatitude (async, await, Promise problem)
            res.render('weather/views/index.hbs', {
                viewModel: {
                    variable1: lonValue,
                    variable2: 'variable2',
                    time: getTime(),
                }
            });
        } catch (error) {
            res.json({ error });
        }
    }
}

//function to get current time
function getTime():String{
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    const day = days[d.getDay()];
    const hr = d.getHours();
    const min = d.getMinutes();
    if (min < 10) {
        let min = "0" + min;
    }
    let ampm = "am";
    if( hr > 12 ) {
        let hr = hr - 12;
        ampm = "pm";
    }
    return(day + " " + hr + ":" + min + " " + ampm);
    
}