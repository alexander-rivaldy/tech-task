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
    
    index(req: any, res: any): Promise<void> {
        try {
            const Location = require('../model/Location');
            // const WeatherRepository = require('../repository/WeatherRepository');
            // const WeatherApi = require('../service/WeatherApi');
            
            //create object
            const location = new Location();
            // const weatherApi = new WeatherApi();
            // const weatherRepository = new WeatherRepository(weatherApi,null);
            
            //grab longitude and latitude of current location
            location.getLongitude()
                .then(function(lon){
                    location.getLatitude()
                        .then(function(lat){
                            
                            
                            
                            res.render('weather/views/index.hbs', {
                                viewModel: {
                                    latitude: lat,
                                    longitude: lon,
                                  variable2: 'variable2',
                                  time: getTime(),
                                }
                             });
                        });
                })
                .catch(function(err){
                  console.log("error from getLongitude");
                  console.log(err);
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