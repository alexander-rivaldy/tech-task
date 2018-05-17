// @flow
import { WeatherInterface } from './WeatherInterface';

/**
 * please finish off the implementation for this Weather model class
 */
export default class Weather implements WeatherInterface {
    _temperature: string;
    _precipitation: int;
    _humidity: int;
    _wind: int;
    _sky: string;
    
    getTemperature(): ?string {
        return _temperature;
    }
    getPrecipitation(): ?int{
        return _precipitation;
    }
    getHumidity(): ?int{
        return _humidity;
    }
    getWind(): ?int{
        return _wind;
    }
    getSky(): ?string{
        return _sky;
    }

     setTemperature(value: string): WeatherInterface {
        return this;
     }
    setPrecipitation(value: int): WeatherInterface{
        return this;
    }
    setHumidity(value: int): WeatherInterface{
        return this;
    }
    setWind(value: int): WeatherInterface{
        return this;
    }
    setSky(value: string): WeatherInterface{
        return this;
    }
}
