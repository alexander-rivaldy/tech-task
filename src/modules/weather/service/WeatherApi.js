// @flow
import axios from 'axios';

export default class WeatherApi {
    _secretKey: "61999b262a92fa262f01b7d55548a727";
    
    async getWeatherByGeolocation(lat: string, long: string): Promise<Object> {
        
        /**
         * https://darksky.net/dev/docs
         *
         * please create an account to read document and to register for an API key https://darksky.net/dev/register
         * please implement the proxy to darknet using the API key
         *
         */
        //  $.getJSON('https://api.darksky.net/forecast/' + _secretKey + '/' +
        //             lat + ',' + long, function(forecast) {
        //                 console.log(forecast);
        //             });
        const weather = 
            axios.get('https://api.darksky.net/forecast/' + _secretKey + 
            '/' + lat + ',' + lon)
            .then(function (response) {
                return response.data.currently;
                console.log("Time: " + response.data.currently.time);
                console.log("Summary: " + response.data.currently.summary);
                console.log("Temperature: " + response.data.currently.temperature);
                console.log("Precipitation: " + response.data.currently.precipProbability);
                console.log("Humidity: " + response.data.currently.humidity);
                console.log("Wind: " + response.data.currently.windSpeed);
            })
            .catch(function (error) {
              console.log("ERROR");
            });   
        return axios.get('');
    }
}
