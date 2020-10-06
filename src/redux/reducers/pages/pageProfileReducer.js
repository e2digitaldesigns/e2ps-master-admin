import * as actions from '../../actions/actionTypes';

const reducer = (
  state = {
    pending: false,
    dataSet: {},
    error: null,
  },
  action,
) => {
  let theState = { ...state };
  const { type, payload } = action;

  switch (type) {
    case actions.FETCH_PAGE_PENDING:
      return { ...state, pending: true };

    case actions.FETCH_PAGE_SUCCESS:
      return { ...state, pending: false, dataSet: payload.dataSet };

    case actions.FETCH_PAGE_FAILURE:
      return { ...state, pending: false, error: payload };

    case actions.UPDATE_PAGE_PENDING:
      return { ...state, pending: true };

    case actions.UPDATE_PAGE_SUCCESS:
      return theState;

    case actions.UPDATE_PAGE_FAILURE:
      return { ...state, pending: false, error: payload };

    case actions.DELETE_PAGE_PENDING:
      return { ...state, pending: true };

    case actions.DELETE_PAGE_SUCCESS:
      return { ...state, pending: false, dataSet: payload };

    case actions.DELETE_PAGE_FAILURE:
      return { ...state, pending: false, dataSet: '' };

    default:
      return state;
  }
};

export default reducer;
