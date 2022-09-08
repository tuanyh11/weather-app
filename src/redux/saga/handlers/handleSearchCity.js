import searchCity from '../request/searchCity'
import {call, put} from 'redux-saga/effects'
import { actions } from '../../contants'

const handleSearchCity = function* (action) {
   const {response, error} = yield call(searchCity, action.city)
   if(response) yield put({type: actions.RES_GET_CITY, city: response.data})
   else yield put({type: actions.ERROR, error: error.response.data.message})
}

export default handleSearchCity