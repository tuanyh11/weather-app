import {actions} from '../contants'

export const getCity = (city) => {
    return ({
        type: actions.GET_CITY,
        city
    })
}

export const getWeather = (city) => {
    return ({
        type: actions.GET_WEATHER,
        city
    })
}