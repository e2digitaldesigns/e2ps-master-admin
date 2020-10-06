import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PageTemplateHeader } from '../../../template/template-main-content/template-main-content-assets';
// import ErrorPage from '../_utils/_errors/error';
import LoadingPage from '../_utils/_loading/loading';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { fetchStoreFronts } from '../../../../redux/actions/storeFronts/storeFrontProfileActions';
import TemplateSettingsGeneral from './forms/template-settings-general';
import TemplateSettingsContact from './forms/template-settings-contact';
import TemplateSettingsDefaultMenus from './forms/template-settings-default-menus';
import TemplateSettingsHours from './forms/template-default-hours';

import TemplateSettingsLogo from './forms/template-settings-logo';
import TemplateSettingsCarousel from './forms/template-settings-home-carousel';

export default (props) => {
  const dispatch = useDispatch();
  const storeFronts = useSelector((state) => state.storeFrontProfile);
  const [documentState, setDocumentState] = useState({ docReady: false });
  const settingsType = props.match.params.type;

  const defaultStoreId = useSelector(
    (state) => state.system.defaultStoreFrontId,
  );

  const [selectorState, setSelectorState] = useState({
    storeFrontId: defaultStoreId,
  });

  const [storeFrontState, setStoreFrontState] = useState({
    storeFronts: [],
  });

  useEffect(() => {
    let stillHere = true;

    async function loadSystemSettings() {
      try {
        const result = await dispatch(fetchStoreFronts());

        if (result.error.errorCode === '0x0' && stillHere) {
          setDocumentState((documentState) => ({
            ...documentState,
            docReady: true,
          }));

          setStoreFrontState((storeFrontState) => ({
            ...storeFrontState,
            storeFronts: result.dataSet,
          }));
        } else {
          throw result;
        }
      } catch (err) {
        toast.error(err.error.errorDesc);
      }
    }

    loadSystemSettings();

    return () => {
      stillHere = false;
    };
  }, [dispatch]);

  const handleStoreFrontChange = (e) => {
    setSelectorState({ ...selectorState, storeFrontId: e.target.value });
  };

  // if (storeFronts.error !== null) {
  //   return <ErrorPage error={storeFronts.error} />;
  // }

  if (!documentState.docReady) {
    return <LoadingPage />;
  }

  const storeFrontData = storeFrontState.storeFronts.find(
    (f) => f._id === selectorState.storeFrontId,
  );

  if (storeFrontData)
    return (
      <>
        <PageTemplateHeader displayName={'Template Settings'} />

        <Card className="main-content-card">
          <Form.Row>
            <Form.Group as={Col} sm={12} md={6}>
              <Form.Label>Store Front</Form.Label>
              <Form.Control
                as="select"
                name="storeFrontId"
                size="sm"
                value={selectorState.storeFrontId}
                onChange={(e) => handleStoreFrontChange(e)}
              >
                {storeFronts.dataSet.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.domain + ' - ' + m.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Card>

        {settingsType === 'logo' && (
          <TemplateSettingsLogo
            storeFrontId={selectorState.storeFrontId}
            data={storeFrontData}
          />
        )}

        {settingsType === 'image-scroller' && (
          <TemplateSettingsCarousel
            storeFrontId={selectorState.storeFrontId}
            data={storeFrontData}
          />
        )}

        <Switch>
          <Route
            exact
            path="/console/template-settings/general"
            component={() => (
              <TemplateSettingsGeneral
                storeFrontId={selectorState.storeFrontId}
                data={storeFrontData}
              />
            )}
          />
          <Route
            exact
            path="/console/template-settings/contact"
            component={() => (
              <TemplateSettingsContact
                storeFrontId={selectorState.storeFrontId}
                data={storeFrontData}
              />
            )}
          />
          <Route
            exact
            path="/console/template-settings/default-menus"
            component={() => (
              <TemplateSettingsDefaultMenus
                storeFrontId={selectorState.storeFrontId}
                data={storeFrontData}
              />
            )}
          />
          <Route
            exact
            path="/console/template-settings/hours"
            component={() => (
              <TemplateSettingsHours
                storeFrontId={selectorState.storeFrontId}
                data={storeFrontData}
              />
            )}
          />
        </Switch>
      </>
    );

  return <></>;
};
