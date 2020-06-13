const initialState = {
  account: '0x0',
  seedPhrase: '',
}

const reducers = (state = initialState, action) => {
  console.log("actiontype "+action.type)
  let val = {}
  switch (action.type) {
    case 'UPDATE_ACCOUNT':
      console.log("actiontype matched")
      console.log(action.payload)
      return {
        ...state,
        account: action.payload,
      };
      break
    case 'UPDATE_SEEDPHRASE':
      console.log("actiontype matched")
      console.log(action.payload)
      return {
        ...state,
        seedPhrase: action.payload,
      };
      break
    default:
      console.log("actiontype not matched")
      val = state
  }
  return val
}

export default reducers
