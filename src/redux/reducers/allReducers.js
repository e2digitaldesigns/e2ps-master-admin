import { combineReducers } from 'redux';
import accountReducer from './account/accountReducer';
import pageListingReducer from './pages/pageListingReducer';
import pageProfileReducer from './pages/pageProfileReducer';

import systemReducer from './system/systemReducer';
import systemSettingsReducer from './systemSettings/systemSettingsReducer';
import productsReducer from './products/productReducer';
import staffListingReducer from './staff/staffListingReducer';
import staffProfileReducer from './staff/staffProfileReducer';
import supplierListingReducer from './suppliers/supplierListingReducer';
import supplierProfileReducer from './suppliers/supplierProfileReducer';

import storeFrontProfileReducer from './storeFronts/storeFrontProfileReducer';

const allReducers = combineReducers({
  system: systemReducer,
  account: accountReducer,
  pageListing: pageListingReducer,
  pageProfile: pageProfileReducer,
  products: productsReducer,
  staffListing: staffListingReducer,
  staffProfile: staffProfileReducer,
  supplierListing: supplierListingReducer,
  supplierProfile: supplierProfileReducer,
  systemSettings: systemSettingsReducer,
  storeFrontProfile: storeFrontProfileReducer,
});

export default allReducers;
