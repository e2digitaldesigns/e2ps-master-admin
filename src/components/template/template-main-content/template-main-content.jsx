import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PageManagementNew from '../../application/console/pageManagement/page-management-new';
import PageManagementListing from '../../application/console/pageManagement/page-management-listing';
import PageManagementProfile from '../../application/console/pageManagement/page-management-profile';

import StaffManagementNew from '../../application/console/staffManagement/staff-management-new';
import StaffManagementListing from '../../application/console/staffManagement/staff-management-listing';
import StaffManagementProfile from '../../application/console/staffManagement/staff-management-profile';

import ProductManagement from '../../application/console/productManagement/product-managment';

import SuppliersManagementNew from '../../application/console/suppliersManagement/suppliers-management-new';
import SuppliersManagementListing from '../../application/console/suppliersManagement/suppliers-management-listing';
import SuppliersManagementProfile from '../../application/console/suppliersManagement/suppliers-management-profile';

import SystemSettings from '../../application/console/systemManagement/system-settings';
import TemplateSettings from '../../application/console/templateManagement/template-settings';

export default () => {
  return (
    <>
      <div
        className="main-content-container"
        data-test="template-main-content-container"
      >
        <Switch>
          <Route
            exact
            path="/console/render"
            render={(props) => <h1>render</h1>}
          />

          <Route
            exact
            path="/console/page-management/new"
            component={PageManagementNew}
          />

          <Route
            exact
            path="/console/page-management/listing"
            component={PageManagementListing}
          />

          <Route
            exact
            path="/console/page-management/profile/:id"
            component={PageManagementProfile}
          />

          <Route
            exact
            path="/console/staff-management/listing"
            component={StaffManagementListing}
          />

          <Route
            exact
            path="/console/staff-management/new"
            component={StaffManagementNew}
          />

          <Route
            exact
            path="/console/staff-management/profile/:id"
            component={StaffManagementProfile}
          />

          <Route
            path="/console/product-management"
            component={ProductManagement}
          />

          <Route
            path="/console/suppliers-management/listing"
            component={SuppliersManagementListing}
          />

          <Route
            path="/console/suppliers-management/new"
            component={SuppliersManagementNew}
          />

          <Route
            exact
            path="/console/suppliers-management/profile/:id"
            component={SuppliersManagementProfile}
          />

          <Route
            exact
            path="/console/template-settings/:type"
            component={TemplateSettings}
          />

          <Route
            exact
            path="/console/system-settings/:type"
            component={SystemSettings}
          />
        </Switch>
      </div>
    </>
  );
};
