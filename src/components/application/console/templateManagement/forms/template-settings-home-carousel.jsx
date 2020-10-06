import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Dropzone from 'react-dropzone';
import _ from 'lodash';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {
  storeFrontCarouselDelete,
  updateStoreFronts,
} from '../../../../../redux/actions/storeFronts/storeFrontProfileActions';

export default ({ storeFrontId, data }) => {
  const dispatch = useDispatch();
  const [progressState, setProgressState] = useState(0);

  const [imageState, setImageState] = useState({
    images: [],
  });

  const images = data.settings.template.images.homeCarousel;

  useEffect(() => {
    let stillHere = true;

    if (stillHere === true) {
      setImageState((imageState) => ({
        images: images,
      }));
    }

    return () => {
      stillHere = false;
    };
  }, [images]);

  const deleteImage = async (e, id) => {
    e.preventDefault();

    let confirm = window.confirm('Are you sure you want to delete this image?');

    if (!confirm) return;

    await dispatch(storeFrontCarouselDelete(storeFrontId, id));
  };

  const handleFileUploads = async (acceptedFiles) => {
    // return;
    dispatch({ type: 'TEMPLATE_SETTINGS_CAROUSEL_UPLOAD_PENDING' });

    var formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('imageType', 'homeCarousel');
    formData.append('storeFrontId', storeFrontId);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', process.env.REACT_APP_REST_API + 'fileUpload');

    xhr.upload.addEventListener('progress', (e) => {
      const percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0;
      setProgressState({ ...progressState, percent });
    });

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const data = JSON.parse(xhr.response);
        setProgressState(0);

        if (data.error.errorCode === '0x0') {
          const payload = {
            storeFrontId,
            image: data.dataSet.settings.template.images.homeCarousel,
          };

          dispatch({
            type: 'TEMPLATE_SETTINGS_CAROUSEL_UPLOAD_SUCCESS',
            payload,
          });
        } else {
          dispatch({ type: 'TEMPLATE_SETTINGS_CAROUSEL_UPLOAD_FAILURE' });
        }
      }
    };

    xhr.send(formData);
  };

  const formChange = async (e, i) => {
    const theImageState = _.cloneDeep(imageState);
    let { name, value } = e.target;
    theImageState.images[i][name] = value;
    setImageState({ ...theImageState });
  };

  const handleUpdateImage = async (i) => {
    try {
      const imgData = _.pick(imageState.images[i], [
        '_id',
        'isActive',
        'order',
        'link',
      ]);

      const formData = {
        storeFrontId,
        type: 'carouselUpdate',
        data: imgData,
      };

      await dispatch(updateStoreFronts(formData));
    } catch (error) {}
  };

  return (
    <Card className="main-content-card">
      <Card.Title>
        <span>Image Scroller</span>
      </Card.Title>
      <hr />
      <div className="carousel-image-wrapper">
        {imageState.images.map((m, i) => (
          <div key={i} className="image-wrapper">
            <div className="image-div">
              <img src={`${process.env.REACT_APP_CLOUD}${m.thumb}`} alt="xxx" />
            </div>

            <div className="options-div">
              <Form autoComplete="off">
                <Form.Row>
                  <Form.Group as={Col} sm={12} md={6} lg={4}>
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="isActive"
                      size="sm"
                      value={m.isActive}
                      onChange={(e) => formChange(e, i)}
                    >
                      <option value={true}>On</option>
                      <option value={false}>Off</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} sm={12} md={6} lg={4}>
                    <Form.Label>Order</Form.Label>
                    <Form.Control
                      as="select"
                      name="order"
                      size="sm"
                      value={m.order}
                      onChange={(e) => formChange(e, i)}
                    >
                      {_.range(imageState.images.length).map((i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} sm={12} md={8} lg={8}>
                    <Form.Label>Link</Form.Label>
                    <Form.Control
                      name="link"
                      size="sm"
                      value={m.link ? m.link : ''}
                      onChange={(e) => formChange(e, i)}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} sm={12} md={6} lg={4}>
                    <Button size="sm" onClick={(e) => handleUpdateImage(i)}>
                      Update
                    </Button>
                  </Form.Group>
                </Form.Row>

                <hr />

                <Form.Row>
                  <Form.Group as={Col} sm={12} md={6} lg={4}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={(e) => deleteImage(e, m._id)}
                    >
                      Delete
                    </Button>
                  </Form.Group>
                </Form.Row>
              </Form>
            </div>
          </div>
        ))}
      </div>

      <hr />

      <div className="drop-zone-wrapper">
        <Dropzone
          onDrop={(acceptedFiles) => handleFileUploads(acceptedFiles)}
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="drop-zone-pad" {...getRootProps()}>
              <input {...getInputProps()} />

              <Button className="drop-zone-text" size="sm">
                Add New Image
              </Button>
            </div>
          )}
        </Dropzone>
      </div>
    </Card>
  );
};
