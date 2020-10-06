import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { PageTemplateHeader } from '../../../template/template-main-content/template-main-content-assets';
import { fetchSystemSettings } from '../../../../redux/actions/systemSettings/systemSettingsActions';
// import ErrorPage from '../_utils/_errors/error';
import LoadingPage from '../_utils/_loading/loading';
import SystemSettingsContact from './forms/system-settings-contact';
import SystemSettingsPaymentGateways from './forms/paymentGateways/system-settings-payment-gateways';
// import SystemSettingsPaymentGatewayOAuth from './forms/paymentGateways/square-oauth';
import SystemSettingsShipping from './forms/system-settings-shipping';
import SystemSettingsStoreFronts from './forms/system-settings-store-fronts';

export default (props) => {
  const dispatch = useDispatch();
  // const systemSettings = useSelector((state) => state.systemSettings);
  const [documentState, setDocumentState] = useState({ docReady: false });
  const settingsType = props.match.params.type;

  useEffect(() => {
    let stillHere = true;

    async function loadSystemSettings() {
      try {
        const result = await dispatch(fetchSystemSettings());

        if (result.error.errorCode === '0x0' && stillHere) {
          setDocumentState((documentState) => ({
            ...documentState,
            docReady: true,
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

  // if (systemSettings.error !== null) {
  //   return <ErrorPage error={systemSettings.error} />;
  // }

  if (!documentState.docReady) {
    return <LoadingPage />;
  }

  return (
    <>
      <PageTemplateHeader displayName={'System Settings'} />

      {settingsType === 'contact' && <SystemSettingsContact />}

      {settingsType === 'payment-gateways' && <SystemSettingsPaymentGateways />}

      {/* {settingsType === 'payment-gateways-square-oauth' && (
        <SystemSettingsPaymentGatewayOAuth />
      )} */}

      {settingsType === 'shipping-modules' && <SystemSettingsShipping />}

      {settingsType === 'storefronts' && <SystemSettingsStoreFronts />}
    </>
  );
};
