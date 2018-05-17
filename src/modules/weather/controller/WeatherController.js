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
             const location = new Location();
            // const location: Location = 
            //     this._locationFactory.createInstance();
            
            // const location: FactoryInterface = new Location()
            console.log(location);
            
            const lonValue = location.getLongitude()
                .then(function(response){
                    console.log("inside then");
                    console.log(response);
                    console.log(lonValue);
                })
                .catch(function(err){
                    console.log("catch error");
                });
            
            
            // console.log("Longitude: " + lonValue);
            // const location = Location.createInstance;
            
            // const location = new Location();
            
            // please finish of the implementation by using the weatherRepository to get the current temperature
            // for your location
            
            // const weather = 
            //         _weatherRepository.getWeatherByGeolocation(location);
            
            console.log("SUCCESS");
            console.log(lonValue);
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