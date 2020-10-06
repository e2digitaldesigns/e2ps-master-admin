import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { updateSystemSettings } from '../../../../../../redux/actions/systemSettings/systemSettingsActions';

import Card from 'react-bootstrap/Card';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default () => {
  const history = useHistory();
  const query = useQuery();
  const dispatch = useDispatch();
  const system = useSelector((state) => state.system);

  const [state, setState] = useState({ error: false });

  const getParam = useCallback((param) => {
    return query.get(param);
  }, []);

  useEffect(() => {
    let stillHere = true;

    const loadData = async () => {
      try {
        const formData = {
          type: 'squareAuth',
          code: getParam('code'),
        };

        const result = await dispatch(updateSystemSettings(formData));
        if (result.error.errorCode === '0x0') {
          history.replace('/console/system-settings/payment-gateways');
        }
      } catch (err) {
        setState((state) => ({ ...state, error: true }));
        console.error(41, err);
      }
    };

    if (getParam('response_type') === 'code') {
      loadData();
    }

    return () => {
      stillHere = false;
    };
  }, [getParam]);

  if (state.error) {
    return (
      <>
        <Card className="main-content-card">
          Sorry... There was an error. Please try again later.
        </Card>
      </>
    );
  }

  if (!state.error) {
    return (
      <>
        <Card className="main-content-card">Processing</Card>
      </>
    );
  }
};
