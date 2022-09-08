import API from "../../../api";
import axios from 'axios'

const searchCity = (city) => {
   return axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},VN&limit=5&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response  => ({response }))
        .catch(error  => ({error }))
}

export default searchCity