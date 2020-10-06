import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Settingsheader from '../../settings-header';
import SquareGateway from './square';

import { updateSystemSettings } from '../../../../../../redux/actions/systemSettings/systemSettingsActions';

export default () => {
  const dispatch = useDispatch();
  const systemSettings = useSelector((state) => state.systemSettings);

  const [dataState, setDataState] = useState({
    authorizeNet: {
      id: '',
      isActive: false,
      key: '',
    },

    payPal: {
      email: '',
      isActive: false,
    },

    square: {
      accessToken: '',
      applicationId: '',
      isActive: true,
      refreshToken: '',
    },

    payPalPro: {
      email: '',
      isActive: false,
      password: '',
      signature: '',
      user: '',
    },
  });

  useEffect(() => {
    let stillHere = true;

    if (!systemSettings.settings || !systemSettings.settings.paymentGateway)
      return;

    if (stillHere)
      setDataState((dataState) => ({
        ...dataState,
        ...systemSettings.settings.paymentGateway,
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

  const activeFormChange = (e) => {
    e.preventDefault();
    const theState = _.cloneDeep(dataState);
    let { name, value } = e.target;
    name = name.split('-');

    theState.authorizeNet.isActive = name[0] !== 'authorizeNet' ? false : value;
    theState.payPalPro.isActive = name[0] !== 'payPalPro' ? false : value;
    theState.square.isActive = name[0] !== 'square' ? false : value;

    setDataState({ ...theState });
  };

  const paymentGatewaySubmit = async () => {
    const formData = {
      type: 'paymentGateway',
      data: dataState,
    };

    await dispatch(updateSystemSettings(formData));
  };

  return (
    <Card className="main-content-card">
      <Card.Title>
        <span>Payment Gateways</span>
      </Card.Title>

      <Settingsheader section="Authorize.Net" />

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            name="authorizeNet-isActive"
            required
            value={dataState.authorizeNet.isActive}
            onChange={(e) => activeFormChange(e)}
          >
            <option value={false}>in-Active</option>
            <option value={true}>Active</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Id</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="authorizeNet-id"
            required
            value={dataState.authorizeNet.id}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Key</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="authorizeNet-key"
            required
            value={dataState.authorizeNet.key}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => paymentGatewaySubmit()}
          >
            Submit
          </Button>
        </Form.Group>
      </Form.Row>

      <Settingsheader section="PayPal" />

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="payPal-email"
            required
            value={dataState.payPal.email}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => paymentGatewaySubmit()}
          >
            Submit
          </Button>
        </Form.Group>
      </Form.Row>

      <SquareGateway
        dataState={dataState}
        onChange={activeFormChange}
        onClick={paymentGatewaySubmit}
      />
    </Card>
  );
};
