import Web3 from 'web3'
import { store } from '../store/store'
import { ganachehost, rinkeby } from './constants'
import { web3Initialized } from '../actions/actions.js'

/*
export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'

export const web3Initialized = (results) => {
  return {
    type: actionTypes.WEB3_INITIALIZED,
    payload: results,
  }
};*/

const getWeb3 = new Promise((resolve, reject) => {
  let results
  let web3 = {}

  mnemonic = "pride auto solar tomorrow trim dismiss myth alert scrap gap clean rotate"

  // Wait for loading completion to avoid race conditions with web3 injection timing.
  web3 = new Web3(new Web3.providers.HttpProvider(rinkeby))
  results = {
    web3Instance: web3,
  }
  resolve(store.dispatch(web3Initialized(results)))
})

export default getWeb3
