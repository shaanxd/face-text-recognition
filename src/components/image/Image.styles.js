import { StyleSheet, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageView: {
    height: height,
    width: width,
  },
  overlayContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'red',
  }
});

export default styles;