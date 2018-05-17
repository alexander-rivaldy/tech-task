import WeatherController from '../../../controller/WeatherController'
import WeatherRepository from '../../../lib/WeatherRepository'
import { FactoryInterface } from '../../../lib/FactoryInterface';
import { LocationInterface } from '../../../model/LocationInterface';
import { Location } from '../../../model/Location';


//create object

const factory = FactoryInterface.createInstance();

const location = factory.Location();
