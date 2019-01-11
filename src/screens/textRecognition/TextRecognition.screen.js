// @flow
import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import type {Element as ReactElement} from 'react';

import RNMLKit from '../../modules/RNMLKit';
import {TEXT_RECOGNITION} from '../../types/RecognitionTypes';
import {Camera} from '../../components';
import {textOptions} from '../../constants/CameraOptions';

import styles from './TextRecognition.styles';

type TextRecognitionProps = {}; // TODO: Add props type here
type TextRecognitionState = {}; // TODO: Add state type here

class TextRecognition extends React.PureComponent<TextRecognitionProps, TextRecognitionState> {
  static defaultProps: any

  constructor(props: TextRecognitionProps) {
    super(props);
  }

  takePicture = async function(takenImage) {
    return await RNMLKit.deviceTextRecognition(takenImage.uri);
  }

  renderContent = (): ReactElement<any> => {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Camera
            cameraOptions={textOptions}
            onCapture={this.takePicture}
            navigation={navigation}
            captureType={TEXT_RECOGNITION}
        />
      </View>
    );
  }

  render() {
    const content = this.renderContent();

    return content;
  }
}

TextRecognition.propTypes = {};

TextRecognition.defaultProps = {};

export default TextRecognition;
