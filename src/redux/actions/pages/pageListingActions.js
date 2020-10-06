import http from '../../../utils/httpServices';
import * as actions from './../../actions/actionTypes';

export const fetchPages = () => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_PAGES_PENDING });
    try {
      const { data } = await http.get('pages');

      if (data.error.errorCode !== '0x0') {
        throw data;
      }

      dispatch({ type: actions.FETCH_PAGES_SUCCESS, payload: data });

      return data;
    } catch (error) {
      dispatch({
        type: actions.FETCH_PAGES_FAILURE,
        payload: error,
      });

      return error;
    }
  };
};
