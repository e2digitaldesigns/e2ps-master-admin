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
  let storeFrontId, storeFrontIndex, imageIndex;
  const { type, payload } = action;

  switch (type) {
    case actions.FETCH_STOREFRONT_PENDING:
      return { ...state, pending: true };

    case actions.FETCH_STOREFRONT_SUCCESS:
      return { ...state, pending: false, dataSet: payload.dataSet };

    case actions.FETCH_STOREFRONT_FAILURE:
      return { ...state, pending: false, error: payload };

    case actions.UPDATE_STOREFRONT_PENDING:
      return { ...state, pending: true };

    case actions.UPDATE_STOREFRONT_SUCCESS:
      theState.pending = false;

      if (payload.result.nModified === 1) {
      }
      const { formData } = payload;
      storeFrontId = formData.storeFrontId;
      storeFrontIndex = theState.dataSet.findIndex(
        (f) => f._id === storeFrontId,
      );

      switch (payload.formData.type) {
        case 'contact':
          theState.dataSet[storeFrontIndex].settings.template.contact =
            payload.formData.data;
          break;

        case 'defaultMenus':
          theState.dataSet[storeFrontIndex].settings.template.defaultMenu =
            payload.formData.data.defaultMenu;
          theState.dataSet[storeFrontIndex].settings.template.secondaryMenu =
            payload.formData.data.secondaryMenu;
          break;

        case 'hours':
          theState.dataSet[storeFrontIndex].settings.template.hours =
            payload.formData.data.hours;
          break;

        case 'general':
          theState.dataSet[storeFrontIndex].settings.membersOnly =
            payload.formData.data.membersOnly;

          theState.dataSet[storeFrontIndex].settings.processingDeadline =
            payload.formData.data.processingDeadline;

          theState.dataSet[storeFrontIndex].settings.reOrderPricing =
            payload.formData.data.reOrderPricing;

          theState.dataSet[storeFrontIndex].settings.waterMarks =
            payload.formData.data.waterMarks;
          break;

        case 'carouselUpdate':
          imageIndex = theState.dataSet[
            storeFrontIndex
          ].settings.template.images.homeCarousel.findIndex(
            (f) => f._id === payload.formData.data._id,
          );

          theState.dataSet[
            storeFrontIndex
          ].settings.template.images.homeCarousel[imageIndex].isActive =
            payload.formData.data.isActive === 'true' ? true : false;

          theState.dataSet[
            storeFrontIndex
          ].settings.template.images.homeCarousel[imageIndex].order = parseInt(
            payload.formData.data.order,
          );

          theState.dataSet[
            storeFrontIndex
          ].settings.template.images.homeCarousel[imageIndex].link =
            payload.formData.data.link;
          break;

        default:
          break;
      }

      return theState;

    case actions.UPDATE_STOREFRONT_FAILURE:
      return { ...state, pending: false, error: payload };

    case actions.TEMPLATE_SETTINGS_LOGO_UPLOAD_PENDING:
      return theState;

    case actions.TEMPLATE_SETTINGS_LOGO_UPLOAD_SUCCESS:
      storeFrontId = payload.storeFrontId;
      storeFrontIndex = theState.dataSet.findIndex(
        (f) => f._id === storeFrontId,
      );

      theState.dataSet[storeFrontIndex].settings.template.images.logo = {
        ...payload.images,
      };
      return theState;

    case actions.TEMPLATE_SETTINGS_LOGO_UPLOAD_FAILURE:
      return theState;

    case actions.TEMPLATE_SETTINGS_LOGO_DELETE_PENDING:
      return theState;

    case actions.TEMPLATE_SETTINGS_LOGO_DELETE_SUCCESS:
      storeFrontId = payload.storeFrontId;
      storeFrontIndex = theState.dataSet.findIndex(
        (f) => f._id === storeFrontId,
      );

      theState.dataSet[storeFrontIndex].settings.template.images.logo = {};
      return theState;

    case actions.TEMPLATE_SETTINGS_LOGO_DELETE_FAILURE:
      return theState;

    /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
    /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
    /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
    case actions.TEMPLATE_SETTINGS_CAROUSEL_UPLOAD_PENDING:
      return theState;

    case actions.TEMPLATE_SETTINGS_CAROUSEL_UPLOAD_SUCCESS:
      storeFrontId = payload.storeFrontId;
      storeFrontIndex = theState.dataSet.findIndex(
        (f) => f._id === storeFrontId,
      );

      theState.dataSet[storeFrontIndex].settings.template.images.homeCarousel =
        payload.image;
      return theState;

    case actions.TEMPLATE_SETTINGS_CAROUSEL_UPLOAD_FAILURE:
      return theState;

    case actions.TEMPLATE_SETTINGS_CAROUSEL_UPDATE_PENDING:
      return theState;

    case actions.TEMPLATE_SETTINGS_CAROUSEL_UPDATE_SUCCESS:
      storeFrontId = payload.storeFrontId;
      storeFrontIndex = theState.dataSet.findIndex(
        (f) => f._id === payload.storeFrontId,
      );

      theState.dataSet[
        storeFrontIndex
      ].settings.template.images.homeCarousel = theState.dataSet[
        storeFrontIndex
      ].settings.template.images.homeCarousel.filter(
        (f) => f._id !== payload.id,
      );

      return theState;

    case actions.TEMPLATE_SETTINGS_CAROUSEL_UPDATE_FAILURE:
      return theState;

    case actions.TEMPLATE_SETTINGS_CAROUSEL_DELETE_PENDING:
      return theState;

    case actions.TEMPLATE_SETTINGS_CAROUSEL_DELETE_SUCCESS:
      storeFrontId = payload.storeFrontId;
      storeFrontIndex = theState.dataSet.findIndex(
        (f) => f._id === payload.storeFrontId,
      );

      theState.dataSet[
        storeFrontIndex
      ].settings.template.images.homeCarousel = theState.dataSet[
        storeFrontIndex
      ].settings.template.images.homeCarousel.filter(
        (f) => f._id !== payload.id,
      );

      return theState;

    case actions.TEMPLATE_SETTINGS_CAROUSEL_DELETE_FAILURE:
      return theState;
    /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
    /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
    /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

    default:
      return theState;
  }
};

export default reducer;
