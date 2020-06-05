const actionTypes = {
  WEB3_INITIALIZED : 'WEB3_INITIALIZED',
}

export const web3Initialized = (results) => {
  return {
    type: actionTypes.WEB3_INITIALIZED,
    payload: results,
  }
};

/*
export const web3Initialized = results => dispatch => ({
  dispatch({
    type: actionTypes.WEB3_INITIALIZED,
    payload: results,
  })
}); */
