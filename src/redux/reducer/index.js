import {actions} from '../contants'

const defaultLocation = [
    {
      name: 'Thai Nguyen',
      lat:21.592477,
      lon:105.8435398,
    },
    {
      name: 'Ha Noi',
      lat:21.0294498,
      lon:105.8544441
    },
    {
      name: 'Tuyen Quang',
      lat:21.7879695,
      lon:105.217387
    },
    {
      name: 'Da nang',
      lat:16.068,
      lon:108.212
    },
    {
      name: 'Ho Chi Minh City',
      lat:10.7758439,
      lon:106.7017555
    }
  ]
  
localStorage.setItem('cities',JSON.stringify(defaultLocation))

const initSate = {
    city: [],
    weather: null, 
    error: null,
    currentCity: null,
    isFetching: false,
}

const reducer = (state = initSate, action) => {

    switch (action.type) {
        case actions.RES_SEARCH_CITIES:
            return {...state, city: action.city};
        case actions.RES_GET_WEATHER:
            return {...state, weather: action.weather};
        case actions.ERROR: 
            return {...state, error: action.error}
        case actions.CLEAR_CITY: 
            return {...state, city: []}
        case actions.IS_FETCHING: 
            return {...state, isFetching: true}
        case actions.FETCHING_DONE: 
            return {...state, isFetching: false}
        case actions.SET_CUREENT_CITY: 
            return {...state, currentCity: action.city}
        default:
            return state;
    }
}

export default reducer