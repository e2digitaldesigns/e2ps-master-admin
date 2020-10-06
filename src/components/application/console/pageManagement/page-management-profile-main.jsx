import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { PageTemplateHeader } from '../../../template/template-main-content/template-main-content-assets';
import {
  updatePageProfile,
  deletePageProfile,
} from '../../../../redux/actions/pages/pageProfileActions';
import { alphaNumericValidate } from '../_utils';

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // const defaultStoreId = useSelector(
  //   (state) => state.system.defaultStoreFrontId,
  // );

  const pageProfile = _.cloneDeep(
    useSelector((state) => state.pageProfile.dataSet),
  );

  const [state, setState] = useState({
    ...pageProfile,
  });

  const formChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    if (name === 'name') {
      value = alphaNumericValidate(value, true);
    }

    if (value !== null) setState({ ...state, [name]: value });
  };

  const formSwitchChange = (e) => {
    let { id, value } = e.target;
    value = !state[id];
    setState({ ...state, [id]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updatePageProfile(state));
      // if (result.error.errorCode !== '0x0') throw result;
    } catch (error) {
      console.error(58, error);
      toast.error(error.error.errorDesc);
    }
  };

  const handleDeletePage = async () => {
    let confirm = window.confirm(
      'Deleted pages can not be retrieved later. Do you wish to proceed?',
    );

    if (!confirm) return;

    try {
      const result = await dispatch(deletePageProfile(state._id));

      if (
        result.error.errorCode === '0x0' &&
        result.dataSet.deletedCount === 1
      ) {
        history.push('/console/page-management/listing');
      } else {
        throw result;
      }
    } catch (error) {
      console.error(83, error);
    }
  };

  const formCheck = (property, display) => {
    return (
      <Form.Group as={Col} sm={12} md={4}>
        <Form.Check
          id={property}
          type="switch"
          label={display}
          checked={state[property]}
          onChange={(e) => formSwitchChange(e)}
        />
      </Form.Group>
    );
  };

  return (
    <>
      <PageTemplateHeader
        displayName="Page Management"
        button={{
          text: 'New Page',
          url: '/console/page-management/new',
        }}
      />

      <Card className="main-content-card">
        <Form.Row>
          <Form.Group as={Col} sm={12} md={4}>
            <Form.Check
              id="isActive"
              type="switch"
              label="Is Active"
              checked={state.isActive}
              onChange={(e) => formSwitchChange(e)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              size="sm"
              required
              value={state.name}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Store Front</Form.Label>
            <Form.Control
              as="select"
              name="storeFrontId"
              size="sm"
              disabled={true}
              value={state.storeFrontId}
              onChange={(e) => formChange(e)}
            >
              {useSelector((state) => state.system.storeFronts).map((m) => (
                <option key={m._id} value={m._id}>
                  {m.domain + ' - ' + m.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={12} md={12} controlId="designDesc">
            <Form.Label>Page Information</Form.Label>
            <Form.Control
              as="textarea"
              name="info"
              rows="5"
              value={state.info}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>
        </Form.Row>

        <hr />
        <h6>Placement</h6>

        <Form.Row>
          {formCheck('isPrimaryMenu', 'Primary Menu')}
          {formCheck('isPageMenu', 'Page Menu')}
          {formCheck('isInformationMenu', 'Information Menu')}
          {formCheck('isResourceMenu', 'Resource Menu')}
          {formCheck('isAccountMenu', 'Account Menu')}
        </Form.Row>

        <hr />

        <Form.Row>
          <Form.Group as={Col} sm={12} md={6} className="mb-0">
            <Button variant="primary" size="sm" onClick={(e) => formSubmit(e)}>
              Submit
            </Button>
          </Form.Group>
        </Form.Row>
      </Card>

      <Card className="main-content-card">
        <Form.Row>
          <Form.Group as={Col} sm={12} md={6} className="mb-0">
            <Button
              variant="danger"
              size="sm"
              onClick={(e) => handleDeletePage(e)}
            >
              Delete
            </Button>
          </Form.Group>
        </Form.Row>
      </Card>
    </>
  );
};
