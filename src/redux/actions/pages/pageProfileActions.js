import http from '../../../utils/httpServices';
import * as actions from '../actionTypes';

export const fetchPageProfile = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_PAGE_PENDING });
    try {
      const { data } = await http.get('pages/' + id, {});

      if (data.error.errorCode !== '0x0') {
        throw data;
      }

      dispatch({ type: actions.FETCH_PAGE_SUCCESS, payload: data });

      return data;
    } catch (error) {
      dispatch({
        type: actions.FETCH_PAGE_FAILURE,
        payload: error,
      });

      return error;
    }
  };
};

export const updatePageProfile = (formData) => {
  return async (dispatch) => {
    dispatch({ type: actions.UPDATE_PAGE_PENDING });
    try {
      const { data } = await http.put('pages/' + formData._id, {
        formData,
      });

      if (data.error.errorCode !== '0x0') {
        throw data;
      }

      dispatch({
        type: actions.UPDATE_PAGE_SUCCESS,
        payload: { result: data.result, formData },
      });

      return data;
    } catch (error) {
      dispatch({
        type: actions.UPDATE_PAGE_FAILURE,
        payload: error,
      });

      return error;
    }
  };
};

export const deletePageProfile = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.DELETE_PAGE_PENDING });
    try {
      const { data } = await http.delete('pages/' + id);

      if (data.error.errorCode === '0x0' && data.dataSet.deletedCount === 1) {
        dispatch({
          type: actions.DELETE_PAGE_SUCCESS,
          payload: { id },
        });
      } else {
        throw data;
      }

      return data;
    } catch (error) {
      dispatch({
        type: actions.DELETE_PAGE_FAILURE,
        payload: error,
      });

      return error;
    }
  };
};
