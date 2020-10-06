import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  alphaNumericValidate,
  emailValidate,
  numberMaxValidate,
  phoneValidate,
} from '../../_utils';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { updateStoreFronts } from '../../../../../redux/actions/storeFronts/storeFrontProfileActions';

import { FormStates } from '../../../../../utils/forms';

export default ({ storeFrontId, data }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    let stillHere = true;

    if (stillHere) {
      setState((state) => ({
        ...state,
        ...data.settings.template.contact,
      }));
    }

    return () => {
      stillHere = false;
    };
  }, [data]);

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
    setState({ ...state, [name]: value });
  };

  const contactSubmit = async () => {
    const formData = {
      storeFrontId,
      type: 'contact',
      data: state,
    };

    await dispatch(updateStoreFronts(formData));
  };

  const formCol = { sm: 12, md: 6 };

  return (
    <>
      <Card className="main-content-card">
        <Card.Title>
          <span>Contact</span>
        </Card.Title>
        <hr />

        <Form.Row>
          <Form.Group as={Col} sm={formCol.sm} md={formCol.md}>
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="address"
              size="sm"
              value={state.address}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} sm={formCol.sm} md={formCol.md}>
            <Form.Label>City</Form.Label>
            <Form.Control
              name="city"
              size="sm"
              value={state.city}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} sm={formCol.sm} md={formCol.md}>
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              name="state"
              size="sm"
              value={state.state}
              onChange={(e) => formChange(e)}
            >
              <FormStates />
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} sm={formCol.sm} md={formCol.md}>
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              name="zipCode"
              size="sm"
              value={state.zipCode}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} sm={formCol.sm} md={formCol.md}>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phone"
              size="sm"
              value={state.phone}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} sm={formCol.sm} md={formCol.md}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              size="sm"
              value={state.email}
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
    </>
  );
};
