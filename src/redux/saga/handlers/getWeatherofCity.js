import { call, put } from 'redux-saga/effects';
import getWeather from '../request/getWeather';
import { actions } from './../../contants/index';

const getWeatherofCity = function* (action) {
    const {response, error} = yield call(getWeather, action.city)
    if(response) yield put({type: actions.RES_GET_WEATHER, weather: response.data})
    else yield put({type: actions.ERROR, error: error.response.data.message})
}

export default getWeatherofCity