// @flow
import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import type {Element as ReactElement} from 'react';

import {FACE_RECOGNITION} from '../../types/RecognitionTypes';
import {Camera} from '../../components';
import RNMLKit from '../../modules/RNMLKit';
import {faceOptions} from '../../constants/CameraOptions';

import styles from './FaceRecognition.styles';

type FaceRecognitionProps = {}; // TODO: Add props type here
type FaceRecognitionState = {}; // TODO: Add state type here

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
            cameraOptions={faceOptions}
            onCapture={this.takePicture}
            navigation={navigation}
            captureType={FACE_RECOGNITION} 
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
