// @flow
import React from 'react';
import {View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import type {Element as ReactElement} from 'react';
import Svg,{G, Circle, Polygon} from 'react-native-svg';

import styles from './Image.styles';

type ImageProps = {}; // TODO: Add props type here
type ImageState = {}; // TODO: Add state type here

class Image extends React.PureComponent<ImageProps, ImageState> {
  static defaultProps: any

  constructor(props: ImageProps) {
    super(props);
    const { navigation } = this.props;
    this.state = {
        capturedImage: navigation.getParam('capturedImage', {}),
        responseData: navigation.getParam('responseData', {}),
    }
  }

  renderFaceDetails = (): ReactElement<any> => {
    const { responseData, capturedImage } = this.state;
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
            <Polygon
                points={`${left},${top} ${right},${top} ${right},${bottom} ${left},${bottom}`}
                fill="transparent"
                stroke="red"
                strokeWidth="1"
            />
            {contoursToRender}
          </G>
      )
    });

    return(
      <View style={styles.overlayContainer}>
        <Svg
          width={'100%'}
          height={'100%'}
          viewBox={`0 0 ${capturedImage.width} ${capturedImage.height}`}
        >
            {facesToRender}
        </Svg>
      </View>
    )
  }

  renderContent = (): ReactElement<any> => {
    const { capturedImage, responseData } = this.state;
    const renderFaceContent = this.renderFaceDetails();
    return (
      <View style={styles.container}>
        <ImageBackground
            resizeMode={'contain'}
            source={{ uri: capturedImage.uri, isStatic:true }}
            style=
            {[
              { 
                aspectRatio:(capturedImage.width/capturedImage.height),
                width: '100%',
                height: undefined,
              },
              styles.imageView
            ]}
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
