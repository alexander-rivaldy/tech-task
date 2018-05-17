// @flow
export interface WeatherInterface {
    getTemperature(): ?string;
    getPrecipitation(): ?int;
    getHumidity(): ?int;
    getWind(): ?int;
    getSky(): ?string;

    setTemperature(value: string): WeatherInterface;
    setPrecipitation(value: int): WeatherInterface;
    setHumidity(value: int): WeatherInterface;
    setWind(value: int): WeatherInterface;
    setSky(value: string): WeatherInterface;
    
}
