// @flow
import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import type {Element as ReactElement} from 'react';
import Camera from '../camera/Camera.screen.js';

import styles from './FaceRecognition.styles';

type FaceRecognitionProps = {}; // TODO: Add props type here
type FaceRecognitionState = {}; // TODO: Add state type here

class FaceRecognition extends React.PureComponent<FaceRecognitionProps, FaceRecognitionState> {
  static defaultProps: any

  constructor(props: FaceRecognitionProps) {
    super(props);
  }

  renderContent = (): ReactElement<any> => {
    return (
      <View style={styles.container}>
        <Camera />
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
