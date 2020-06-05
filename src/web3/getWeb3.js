import Web3 from 'web3'
import { store } from '../store/store'
import { ganachehost } from './constants'
import { web3Initialized } from '../action/actions.js'

const getWeb3 = new Promise((resolve, reject) => {
  let results
  let web3 = {}
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  web3 = new Web3(new Web3.providers.HttpProvider(ganachehost))
  results = {
    web3Instance: web3,
  }
  resolve(store.dispatch(web3Initialized(results)))
})

export default getWeb3
