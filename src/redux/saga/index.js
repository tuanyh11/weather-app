import {takeLatest} from 'redux-saga/effects'
import {actions} from '../contants'
import handleSearchCity from './handlers/handleSearchCity'
import getWeatherofCity from './handlers/getWeatherofCity'

const rootSaga = function* () {
   yield takeLatest(actions.GET_CITY, handleSearchCity)
   yield takeLatest(actions.GET_WEATHER, getWeatherofCity)
}

export default rootSaga