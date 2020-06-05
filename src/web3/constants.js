/* Default HD path string for key generation from seed */
export const hdPathString = `m/44'/60'/0'/0`
/* keystore will be saved to local storage under this key */
export const localStorageKey = 'ks'

export const ganachehost = 'http://localhost:7545'

/*usage: convert amount to wei
const sendAmount = new BigNumber(amount).times(Ether);
*/
export const Ether = (1.0e18).toString()
export const Gwei = (1.0e9).toString()
