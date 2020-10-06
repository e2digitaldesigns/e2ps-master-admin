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
    defaultMenu: '',
    secondaryMenu: '',
  });

  useEffect(() => {
    let stillHere = true;

    if (stillHere) {
      setState((state) => ({
        ...state,
        defaultMenu: data.settings.template.defaultMenu,
        secondaryMenu: data.settings.template.secondaryMenu,
      }));
    }

    return () => {
      stillHere = false;
    };
  }, [data]);

  const formChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    e.preventDefault();
  };

  const submit = async () => {
    console.clear();
    const formData = {
      storeFrontId,
      type: 'defaultMenus',
      data: { ...state },
    };

    await dispatch(updateStoreFronts(formData));
  };

  const formCol = { sm: 12, md: 6 };

  return (
    <>
      <Card className="main-content-card">
        <Card.Title>
          <span>Default Menus</span>
        </Card.Title>
        <hr />

        <Form.Row>
          <Form.Group as={Col} sm={formCol.sm} md={formCol.md}>
            <Form.Label>Primary Menu</Form.Label>
            <Form.Control
              as="select"
              name="defaultMenu"
              size="sm"
              value={state.defaultMenu}
              onChange={(e) => formChange(e)}
            >
              <option value="design">Design Products</option>
              <option value="print">Print Products</option>
              <option value="wide-format">Wide Format Products</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} sm={formCol.sm} md={formCol.md}>
            <Form.Label>Secondary Menu</Form.Label>
            <Form.Control
              as="select"
              name="secondaryMenu"
              size="sm"
              value={state.secondaryMenu}
              onChange={(e) => formChange(e)}
            >
              <option value="design">Design Products</option>
              <option value="print">Print Products</option>
              <option value="wide-format">Wide Format Products</option>
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
