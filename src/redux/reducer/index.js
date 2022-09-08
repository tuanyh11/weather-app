import {actions} from '../contants'

const initSate = {
    city: [],
    weather: null, 
    error: null
}

const reducer = (state = initSate, action) => {
    switch (action.type) {
        case actions.RES_GET_CITY:
            return {...state, city: action.city};
        case actions.RES_GET_WEATHER:
            return {...state, weather: action.weather};
        case actions.ERROR: 
            return {...state, error: action.error}
        default:
            return state;
    }
}

export default reducer