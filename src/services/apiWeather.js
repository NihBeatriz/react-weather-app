import axios from 'axios';

const apiWeather = axios.create({    
    baseURL: "https://api.openweathermap.org/data/2.5",
})

export default apiWeather;