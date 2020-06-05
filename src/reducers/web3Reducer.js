// Initial State
const initialState = {
  web3Instance: {},
};

// Reducers (Modifies The State And Returns A New State)
const web3Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'WEB3_INITIALIZED': {
      return {
        // State
        ...state,
        // Redux Store
        web3Instance: action.payload.web3Instance,
      }
    }
    // Default
    default: {
      return state;
    }
  }
}

export default web3Reducer
