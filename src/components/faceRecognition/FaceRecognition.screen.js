// @flow
import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import type {Element as ReactElement} from 'react';
import Camera from '../camera/Camera.screen.js';
import RNMLKit from '../../modules/RNMLKit';

import styles from './FaceRecognition.styles';

type FaceRecognitionProps = {}; // TODO: Add props type here
type FaceRecognitionState = {}; // TODO: Add state type here

const cameraOptions = {
    quality: 0.5,
    forceUpOrientation: true,
    fixOrientation: true,
    width: 480
};

class FaceRecognition extends React.PureComponent<FaceRecognitionProps, FaceRecognitionState> {
  static defaultProps: any

  constructor(props: FaceRecognitionProps) {
    super(props);
  }

  takePicture = async function(takenImage) {
    return await RNMLKit.deviceFaceRecognition(takenImage.uri);
  }

  renderContent = (): ReactElement<any> => {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Camera
            cameraOptions={cameraOptions}
            onCapture={this.takePicture}
            navigation={navigation} 
        />
      </View>
    );
  }

  render() {
    const content = this.renderContent();

    return content;
  }
}

FaceRecognition.propTypes = {};

FaceRecognition.defaultProps = {};

export default FaceRecognition;
