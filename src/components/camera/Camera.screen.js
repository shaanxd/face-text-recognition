// @flow
import React from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import type { Element as ReactElement } from 'react';
import { RNCamera } from 'react-native-camera';
import RNMLKit from '../../modules/RNMLKit';

import styles from './Camera.styles';

type CameraProps = {}; // TODO: Add props type here
type CameraState = {}; // TODO: Add state type here

const cameraChangeIcon = require('../../images/camera_switch.png');

class Camera extends React.PureComponent<CameraProps, CameraState> {
  static defaultProps: any

  constructor(props: CameraProps) {
    super(props);
    this.state = {
      isFrontCamera: true,
      isTakingPicture: false,
    }
  }

  getRef = (ref) => {
    this._camera = ref;
  }

  handleCameraChange = () => {
    const { isFrontCamera } = this.state;
    this.setState({isFrontCamera: !isFrontCamera});
  }

  takePicture = () => {
    if(this._camera) {
      const { navigation, onCapture, cameraOptions } = this.props;
      this.setState({isTakingPicture: true});
      this._camera.takePictureAsync(cameraOptions)
        .then(image => {
          onCapture(image)
            .then((data) => {
              this.setState({isTakingPicture: false});
              navigation.navigate('ImageScreen', {
                capturedImage: image,
                responseData: data,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(error => {
          this.setState({isTakingPicture: false});
          console.log(error);
        });
    }
  }

  renderContent = (): ReactElement<any> => {
    const { Constants: { Type: { front, back } } } = RNCamera;
    const { isFrontCamera, isTakingPicture } = this.state;
    const cameraType = isFrontCamera ? front : back;
    
    return (
      <View style={styles.container}>
          <View style={styles.cameraContainer}>
            <RNCamera
              autoFocus={RNCamera.Constants.AutoFocus.off}
              ref={this.getRef}
              style = {styles.previewContainer}
              type={cameraType}
              flashMode={RNCamera.Constants.FlashMode.off}
              permissionDialogTitle={'Permission to access camera.'}
              permissionDialogMessage={'DetectApp requires your permission to access the camera.'}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.smallButtonContainer}>
              <TouchableOpacity
                  onPress={this.handleCameraChange}
                  style = {styles.cameraChangeButton}
              >
                <Image
                  source={cameraChangeIcon}
                  style={styles.cameraChangeIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.middleButtonContainer}>
              <TouchableOpacity
                  disabled={isTakingPicture}
                  onPress={this.takePicture}
                  style = {styles.captureButton}
              >
                <View style={styles.buttonInnerView}>
                  {isTakingPicture &&
                    <ActivityIndicator size={'large'} />
                  }
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.smallButtonContainer}>
              <TouchableOpacity
                  style = {styles.cameraChangeButton}
              >
                <Image
                  source={cameraChangeIcon}
                  style={styles.cameraChangeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
      </View>
    );
  }

  render() {
    const content = this.renderContent();

    return content;
  }
}

Camera.propTypes = {};

Camera.defaultProps = {};

export default Camera;
