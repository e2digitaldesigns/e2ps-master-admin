import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchPages } from '../../../../redux/actions/pages/pageListingActions';

import PageManagementListingMain from './page-management-listing-main';
// import ErrorPage from '../_utils/_errors/error';
import LoadingPage from '../_utils/_loading/loading';

export default () => {
  const dispatch = useDispatch();
  // const pageListing = useSelector((state) => state.pageListing);
  const [documentState, setDocumentState] = useState({
    docReady: false,
  });

  useEffect(() => {
    let stillHere = true;
    const loadData = async () => {
      try {
        const result = await dispatch(fetchPages());

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
    };

    loadData();
    return () => {
      stillHere = false;
    };
  }, [dispatch]);

  // if (pageListing.error !== null)
  //   return <ErrorPage error={pageListing.error} />;

  if (!documentState.docReady) return <LoadingPage />;

  return <PageManagementListingMain />;
};
