import http from '../../../utils/httpServices';
import * as actions from '../actionTypes';

export const fetchStoreFronts = () => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_STOREFRONT_PENDING });
    try {
      const { data } = await http.get('storeFronts/', {});

      if (data.error.errorCode !== '0x0') {
        throw data;
      }

      dispatch({ type: actions.FETCH_STOREFRONT_SUCCESS, payload: data });

      return data;
    } catch (error) {
      console.error(18, error);

      dispatch({
        type: actions.FETCH_STOREFRONT_FAILURE,
        payload: error,
      });

      return error;
    }
  };
};

export const updateStoreFronts = (formData) => {
  return async (dispatch) => {
    dispatch({ type: actions.UPDATE_STOREFRONT_PENDING });
    try {
      const { data } = await http.put('storeFronts/' + formData.storeFrontId, {
        formData,
      });

      if (data.error.errorCode !== '0x0') {
        throw data;
      }

      dispatch({
        type: actions.UPDATE_STOREFRONT_SUCCESS,
        payload: { result: data.dataSet, formData },
      });

      return data;
    } catch (error) {
      dispatch({
        type: actions.UPDATE_STOREFRONT_FAILURE,
        payload: error,
      });

      console.error(56, error);

      return error;
    }
  };
};

export const storeFrontLogoDelete = (storeFrontId) => {
  return async (dispatch) => {
    dispatch({ type: actions.TEMPLATE_SETTINGS_LOGO_DELETE_PENDING });
    try {
      const { data } = await http.delete(
        `fileUpload/storeFrontImages/logo/${storeFrontId}/${null}`,
      );
      if (data.error.errorCode !== '0x0') {
        throw data;
      }
      dispatch({
        type: actions.TEMPLATE_SETTINGS_LOGO_DELETE_SUCCESS,
        payload: { storeFrontId },
      });
      return data;
    } catch (error) {
      dispatch({
        type: actions.TEMPLATE_SETTINGS_LOGO_DELETE_FAILURE,
        payload: error,
      });

      console.error(82, error);

      return error;
    }
  };
};

export const storeFrontCarouselDelete = (storeFrontId, id) => {
  return async (dispatch) => {
    dispatch({ type: actions.TEMPLATE_SETTINGS_CAROUSEL_DELETE_PENDING });
    try {
      const { data } = await http.delete(
        `fileUpload/storeFrontImages/homeCarousel/${storeFrontId}/${id}`,
      );
      if (data.error.errorCode !== '0x0') {
        throw data;
      }
      dispatch({
        type: actions.TEMPLATE_SETTINGS_CAROUSEL_DELETE_SUCCESS,
        payload: { storeFrontId, id },
      });
      return data;
    } catch (error) {
      dispatch({
        type: actions.TEMPLATE_SETTINGS_CAROUSEL_DELETE_FAILURE,
        payload: error,
      });

      return error;
    }
  };
};
