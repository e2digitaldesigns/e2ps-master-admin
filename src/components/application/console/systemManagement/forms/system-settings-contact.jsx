import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { updateSystemSettings } from './../../../../../redux/actions/systemSettings/systemSettingsActions';

import {
  alphaNumericValidate,
  emailValidate,
  numberMaxValidate,
  phoneValidate,
} from '../../_utils';

export default () => {
  const dispatch = useDispatch();
  const systemSettings = useSelector((state) => state.systemSettings);

  const [dataState, setDataState] = useState({
    address: '',
    city: '',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    state: '',
    zip: '',
  });

  useEffect(() => {
    let stillHere = true;

    if (!systemSettings.settings || !systemSettings.settings.contact) return;

    if (stillHere)
      setDataState((dataState) => ({
        ...systemSettings.settings.contact,
      }));

    return () => {
      stillHere = false;
    };
  }, [systemSettings]);

  const formChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    if (name === 'companyName' || name === 'contactName') {
      value = alphaNumericValidate(value, true);
    }

    if (name === 'phone') {
      value = phoneValidate(value);
    }

    if (name === 'email') {
      value = emailValidate(value);
    }

    if (name === 'address1' || name === 'city') {
      value = alphaNumericValidate(value, true);
    }

    if (name === 'zipCode') {
      value = numberMaxValidate(value);
    }

    if (value === null) return;
    setDataState({ ...dataState, [name]: value });
  };

  const contactSubmit = async () => {
    const formData = {
      type: 'contact',
      data: dataState,
    };

    await dispatch(updateSystemSettings(formData));
  };

  return (
    <Card className="main-content-card">
      <Card.Title>
        <span>Contact</span>
      </Card.Title>
      <hr />

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Contact Name</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="contactName"
            required
            value={dataState.contactName}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="companyName"
            required
            value={dataState.companyName}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="phone"
            required
            value={dataState.phone}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="email"
            required
            value={dataState.email}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="address"
            required
            value={dataState.address}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="city"
            required
            value={dataState.city}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="state"
            required
            value={dataState.state}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>ZipCode</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="zip"
            required
            value={dataState.zip}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Button variant="primary" size="sm" onClick={() => contactSubmit()}>
            Submit
          </Button>
        </Form.Group>
      </Form.Row>
    </Card>
  );
};
