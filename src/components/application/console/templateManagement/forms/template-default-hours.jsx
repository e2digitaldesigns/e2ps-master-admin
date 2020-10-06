import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import { updateStoreFronts } from '../../../../../redux/actions/storeFronts/storeFrontProfileActions';

export default ({ storeFrontId, data }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    hours: [],
  });

  useEffect(() => {
    let stillHere = true;

    if (stillHere) {
      setState((state) => ({
        ...state,
        hours: data.settings.template.hours,
      }));
    }

    return () => {
      stillHere = false;
    };
  }, [data]);

  const handleNewEntry = () => {
    let hours = _.cloneDeep(state.hours);
    hours.push({ day: '', time: '' });
    setState({ ...state, hours });
  };

  const handleDeleteEntry = (index) => {
    let hours = _.cloneDeep(state.hours);
    hours.splice(index, 1);
    setState({ ...state, hours });
  };

  const formChange = (e, i) => {
    e.preventDefault();
    let hours = _.cloneDeep(state.hours);
    hours[i][e.target.name] = e.target.value;
    setState({ ...state, hours });
  };

  const submit = async () => {
    const formData = {
      storeFrontId,
      type: 'hours',
      data: state,
    };

    await dispatch(updateStoreFronts(formData));
  };

  return (
    <>
      <Card className="main-content-card">
        <Card.Title>
          <span>Hours of Operation</span>
          <Button
            variant="primary"
            size="sm"
            className="pull-right"
            onClick={handleNewEntry}
          >
            Add
          </Button>
        </Card.Title>

        <hr />

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {state.hours.map((m, i) => (
              <tr key={i}>
                <td>
                  <Form.Control
                    size="sm"
                    name="day"
                    value={m.day}
                    onChange={(e) => formChange(e, i)}
                  ></Form.Control>
                </td>

                <td>
                  <Form.Control
                    size="sm"
                    name="time"
                    value={m.time}
                    onChange={(e) => formChange(e, i)}
                  ></Form.Control>
                </td>

                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteEntry(i)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

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
