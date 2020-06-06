import { combineReducers } from 'redux'
import web3Reducer from './web3Reducer'
import reducers from './reducers'

const rootReducer =
  combineReducers({
    reducers: reducers,
    web3: web3Reducer
})

export default rootReducer;
