// @flow
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import type {Element as ReactElement} from 'react';

import styles from './Home.styles';

type HomeProps = {}; // TODO: Add props type here
type HomeState = {}; // TODO: Add state type here

class Home extends React.PureComponent<HomeProps, HomeState> {
  static defaultProps: any

  constructor(props: HomeProps) {
    super(props);
  }

  navigateToFaceRecognition = () => {
    const {navigation} = this.props;
    navigation.navigate('FaceRecognitionScreen');
  }

  navigateToTextRecognition = () => {
    const {navigation} = this.props;
    navigation.navigate('TextRecognitionScreen');
  }

  renderContent = (): ReactElement<any> => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.navigateToFaceRecognition}
          style={styles.navigationButton}
        >
          <Text style={styles.navigationButtonText}>
            Face Recognition
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.navigateToTextRecognition}
          style={styles.navigationButton}
        >
          <Text style={styles.navigationButtonText}>
            Text Recognition
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const content = this.renderContent();

    return content;
  }
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
