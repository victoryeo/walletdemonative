const actionTypes = {
  WEB3_INITIALIZED : 'WEB3_INITIALIZED',
  UPDATE_ACCOUNT: 'UPDATE_ACCOUNT',
}

export const web3Initialized = (results) => {
  return {
    type: actionTypes.WEB3_INITIALIZED,
    payload: results,
  }
};

export const STPupdateAccounts = account0 => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_ACCOUNT,
    payload: account0,
  });
};

/*
export const web3Initialized = results => dispatch => ({
  dispatch({
    type: actionTypes.WEB3_INITIALIZED,
    payload: results,
  })
}); */
