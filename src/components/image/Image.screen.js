// @flow
import React from 'react';
import {View, ImageBackground, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import type {Element as ReactElement} from 'react';
import Svg,{G, Circle} from 'react-native-svg';

import styles from './Image.styles';

type ImageProps = {}; // TODO: Add props type here
type ImageState = {}; // TODO: Add state type here

class Image extends React.PureComponent<ImageProps, ImageState> {
  static defaultProps: any

  constructor(props: ImageProps) {
    super(props);
    const { navigation } = this.props;
    this.state = {
        imageUrl: navigation.getParam('imageUrl', ''),
        responseData: navigation.getParam('responseData', {}),
    }
  }

  renderFaceDetails = (): ReactElement<any> => {
    const { responseData } = this.state;
    const {height, width} = Dimensions.get('window');
    const facesToRender = responseData.map((faces) => {
      const { boundingBox: { right, left, top, bottom }, contourPoints } = faces;
      const contoursToRender = contourPoints.map((contourPoint) => {
        return (
          <Circle
            cx={contourPoint.x}
            cy={contourPoint.y}
            r={2}
            stroke={'blue'}
            fill={'yellow'}
          />
        )
      })
      return (
          <G>
            {contoursToRender}
          </G>
      )
    });
    return(
      <View style={styles.overlayContainer}>
        <Svg
          width={width}
          height={height}
          style={{borderWidth: 2, borderColor: 'white'}}
        >
            {facesToRender}
        </Svg>
      </View>
    )
  }

  renderContent = (): ReactElement<any> => {
    const { imageUrl, responseData } = this.state;
    const renderFaceContent = this.renderFaceDetails();
    console.log(responseData);
    return (
      <View style={styles.container}>
        <ImageBackground
            source={{ uri: imageUrl, isStatic:true }}
            style={styles.imageView}
        >
          {renderFaceContent}
        </ImageBackground>
      </View>
    );
  }

  render() {
    const content = this.renderContent();

    return content;
  }
}

Image.propTypes = {};

Image.defaultProps = {};

export default Image;
