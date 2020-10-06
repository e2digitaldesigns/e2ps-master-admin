import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Dropzone from 'react-dropzone';

import { storeFrontLogoDelete } from '../../../../../redux/actions/storeFronts/storeFrontProfileActions';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default ({ storeFrontId, data }) => {
  const dispatch = useDispatch();
  const [progressState, setProgressState] = useState(0);
  const [imageState, setImageState] = useState({
    file: '_default-thumb.jpg',
    thumb: '_default-thumb.jpg',
  });

  const logoObj = data.settings.template.images.logo;

  useEffect(() => {
    let stillHere = true;

    if (stillHere === true) {
      setImageState((imageState) => ({
        ...imageState,
        file: logoObj.file ? logoObj.file : '_default-thumb.jpg',
        thumb: logoObj.thumb ? logoObj.thumb : '_default-thumb.jpg',
      }));
    }

    return () => {
      stillHere = false;
    };
  }, [logoObj]);

  const deleteImage = async (e) => {
    e.preventDefault();

    let confirm = window.confirm('Are you sure you want to delete this logo?');

    if (!confirm) return;

    await dispatch(storeFrontLogoDelete(storeFrontId));
  };

  const handleFileUploads = async (acceptedFiles) => {
    setProgressState(0);
    dispatch({ type: 'TEMPLATE_SETTINGS_LOGO_UPLOAD_PENDING' });

    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('imageType', 'templateLogo');
    formData.append('storeFrontId', storeFrontId);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', process.env.REACT_APP_REST_API + 'fileUpload');

    xhr.upload.addEventListener('progress', (e) => {
      const percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0;
      setProgressState(percent);
    });

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const data = JSON.parse(xhr.response);
        setProgressState(0);

        if (data.error.errorCode === '0x0') {
          const payload = {
            storeFrontId,
            images: data.dataSet.settings.template.images.logo,
          };

          dispatch({ type: 'TEMPLATE_SETTINGS_LOGO_UPLOAD_SUCCESS', payload });
        } else {
          dispatch({ type: 'TEMPLATE_SETTINGS_LOGO_UPLOAD_FAILURE' });
        }
      }
    };

    xhr.send(formData);
  };

  return (
    <Card className="main-content-card">
      <Card.Title>
        <span>Storefront Logo</span>
      </Card.Title>
      <hr />

      <div className="order-image-wrapper">
        {/* <div>{progressState}</div>
        <div>{imageState.file}</div>
        <div>{imageState.thumb}</div> */}
        <div className="image-wrapper">
          <img
            src={`${process.env.REACT_APP_CLOUD}${imageState.thumb}`}
            alt=" "
          />
          <div className="progress-bar">
            <div
              className="progress-bar-inner"
              style={{ width: progressState + '%' }}
            ></div>
          </div>
        </div>

        <div className="drop-zone-wrapper">
          <Dropzone
            onDrop={(acceptedFiles) => handleFileUploads(acceptedFiles)}
            multiple={false}
            accept="image/jpeg"
            minSize={0}
            maxSize={5242880}
          >
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
              <Button {...getRootProps()}>
                <input {...getInputProps()} />

                <span className="text">
                  {!isDragActive && 'Browse'}
                  {isDragActive && !isDragReject && "Drop it like it's hot!"}
                  {isDragReject && 'File type not accepted, sorry!'}
                </span>
              </Button>
            )}
          </Dropzone>
        </div>

        <hr />

        <div className="options-wrapper">
          {logoObj.file && (
            <Button variant="danger" onClick={deleteImage}>
              Delete
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
