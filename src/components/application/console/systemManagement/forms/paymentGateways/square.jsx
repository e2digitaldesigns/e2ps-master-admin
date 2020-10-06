import React from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Settingsheader from '../../settings-header';

export default ({ dataState, onChange, onClick }) => {
  const system = useSelector((state) => state.system);

  const authorizeAccount = async () => {
    console.clear();
    let theLink = process.env.REACT_APP_SQUARE_CONNECTION;
    theLink += `&client_id=${process.env.REACT_APP_SQUARE_CLIENT_ID}`;
    theLink += `&state=${system.storeOwnerId}`;
    console.log(17, theLink);
    window.location.href = theLink;
  };

  return (
    <>
      <Settingsheader section="Square" />

      {/* <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => authorizeAccount(e)}
          >
            Authorize Account
          </Button>
        </Form.Group>
      </Form.Row> */}

      {!dataState.square.isAuthorized && (
        <Form.Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Button
              variant="primary"
              size="sm"
              onClick={(e) => authorizeAccount(e)}
            >
              Authorize Account
            </Button>
          </Form.Group>
        </Form.Row>
      )}

      {dataState.square.isAuthorized && (
        <>
          <Form.Row>
            <Form.Group as={Col} sm={12} md={6}>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                size="sm"
                name="square-isActive"
                required
                value={dataState.square.isActive}
                onChange={(e) => onChange(e)}
              >
                <option value={false}>in-Active</option>
                <option value={true}>Active</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={12} md={6}>
              <Button variant="primary" size="sm" onClick={() => onClick()}>
                Submit
              </Button>
            </Form.Group>
          </Form.Row>{' '}
        </>
      )}
    </>
  );
};
