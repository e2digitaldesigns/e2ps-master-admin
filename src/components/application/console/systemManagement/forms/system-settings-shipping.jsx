import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Settingsheader from './../settings-header';

import { updateSystemSettings } from './../../../../../redux/actions/systemSettings/systemSettingsActions';

export default () => {
  const dispatch = useDispatch();

  const systemSettings = useSelector((state) => state.systemSettings);

  const [dataState, setDataState] = useState({
    global: {
      state: 'MI',
      zipCode: '',
      upsaleRate: 0,
    },

    fedEx: {
      isActive: false,
      accountNumber: '',
      password: '',
      key: '',
      meter: '',
    },

    ups: {
      isActive: false,
      userId: '',
      password: '',
      key: '',
    },
  });

  useEffect(() => {
    let stillHere = true;

    if (!systemSettings.settings || !systemSettings.settings.shippingModules)
      return;

    if (stillHere)
      setDataState((dataState) => ({
        ...systemSettings.settings.shippingModules,
      }));

    return () => {
      stillHere = false;
    };
  }, [systemSettings]);

  const formChange = (e) => {
    e.preventDefault();
    const theState = _.cloneDeep(dataState);
    let { value, name } = e.target;
    name = name.split('-');
    theState[name[0]][name[1]] = value;
    setDataState({ ...theState });
  };

  const shippingModuleSubmit = async () => {
    console.clear();
    const formData = {
      type: 'shippingModules',
      data: dataState,
    };

    await dispatch(updateSystemSettings(formData));
  };

  return (
    <Card className="main-content-card">
      <Card.Title>
        <span>Shipping</span>
      </Card.Title>

      <Settingsheader section="Global Settings" />

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="global-state"
            required
            value={dataState.global.state}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="global-zipCode"
            required
            value={dataState.global.zipCode}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Up Scale</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="global-upsaleRate"
            required
            value={dataState.global.upsaleRate}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => shippingModuleSubmit()}
          >
            Submit
          </Button>
        </Form.Group>
      </Form.Row>

      <Settingsheader section="FedEx Settings" />

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            name="fedEx-isActive"
            required
            value={dataState.fedEx.isActive}
            onChange={(e) => formChange(e)}
          >
            <option value={false}>in-Active</option>
            <option value={true}>Active</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Account Number</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="fedEx-accountNumber"
            required
            value={dataState.fedEx.accountNumber}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="fedEx-password"
            required
            value={dataState.fedEx.password}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Key</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="fedEx-key"
            required
            value={dataState.fedEx.key}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Meter</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="fedEx-meter"
            required
            value={dataState.fedEx.meter}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => shippingModuleSubmit()}
          >
            Submit
          </Button>
        </Form.Group>
      </Form.Row>

      <Settingsheader section="UPS Settings" />

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            name="ups-isActive"
            required
            value={dataState.ups.isActive}
            onChange={(e) => formChange(e)}
          >
            <option value={false}>in-Active</option>
            <option value={true}>Active</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="ups-userId"
            required
            value={dataState.ups.userId}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="ups-password"
            required
            value={dataState.ups.password}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Key</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="ups-key"
            required
            value={dataState.ups.key}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => shippingModuleSubmit()}
          >
            Submit
          </Button>
        </Form.Group>
      </Form.Row>
    </Card>
  );
};
