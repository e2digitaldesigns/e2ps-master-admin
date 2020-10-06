import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { updateStoreFronts } from '../../../../../redux/actions/storeFronts/storeFrontProfileActions';

export default ({ storeFrontId, data }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    membersOnly: false,
    processingDeadline: 12.5,
    reOrderPricing: 'listing',
    waterMarks: false,
  });

  useEffect(() => {
    let stillHere = true;

    if (stillHere) {
      setState((state) => ({
        ...state,
        membersOnly: data.settings.membersOnly,
        processingDeadline: data.settings.processingDeadline,
        reOrderPricing: data.settings.reOrderPricing,
        waterMarks: data.settings.waterMarks,
      }));
    }

    return () => {
      stillHere = false;
    };
  }, [data]);

  const formChange = (e) => {
    let { name, value } = e.target;
    value = value === 'true' ? true : value === 'false' ? false : value;

    setState({ ...state, [name]: value });
    e.preventDefault();
  };

  const submit = async () => {
    const formData = {
      storeFrontId,
      type: 'general',
      data: { ...state },
    };

    await dispatch(updateStoreFronts(formData));
  };

  const formCol = { sm: 12, md: 6 };

  const displayParser = (time) => {
    let day = time < 12 ? 'AM' : 'PM';
    let min = String(time).includes('.') ? '30' : '00';
    let hour = String(time <= 12.5 ? time : time - 12).split('.')[0];
    return `${hour}:${min} ${day}`;
  };

  const deadlineOptions = () => {
    let options = [];
    for (let i = 8; i < 23; i = i + 0.5) {
      let display = displayParser(i);
      options.push({ value: i, display });
    }

    return options;
  };

  return (
    <>
      <Card className="main-content-card">
        <Card.Title>
          <span>General Setting</span>
        </Card.Title>
        <hr />

        <Form.Row>
          <Form.Group as={Col} sm={formCol.sm} md={formCol.md}>
            <Form.Label>Members Only</Form.Label>
            <Form.Control
              as="select"
              name="membersOnly"
              size="sm"
              value={state.membersOnly}
              onChange={(e) => formChange(e)}
            >
              <option value={true}>Active</option>
              <option value={false}>In-Active</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} sm={formCol.sm} md={formCol.md}>
            <Form.Label>Processing Deadline</Form.Label>
            <Form.Control
              as="select"
              name="processingDeadline"
              size="sm"
              value={state.processingDeadline}
              onChange={(e) => formChange(e)}
            >
              {deadlineOptions().map((m, i) => (
                <option key={i} value={m.value}>
                  {m.display}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} sm={formCol.sm} md={formCol.md}>
            <Form.Label>Re-Order Pricing</Form.Label>
            <Form.Control
              as="select"
              name="reOrderPricing"
              size="sm"
              value={state.reOrderPricing}
              onChange={(e) => formChange(e)}
            >
              <option value="listing">Lisitng Price</option>
              <option value="order">Order Pricing</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} sm={formCol.sm} md={formCol.md}>
            <Form.Label>Watermark Design Proofs</Form.Label>
            <Form.Control
              as="select"
              name="waterMarks"
              size="sm"
              value={state.waterMarks}
              onChange={(e) => formChange(e)}
            >
              <option value={true}>Active</option>
              <option value={false}>In-Active</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Button variant="primary" size="sm" onClick={() => submit()}>
              Submit
            </Button>
          </Form.Group>
        </Form.Row>
      </Card>
    </>
  );
};
