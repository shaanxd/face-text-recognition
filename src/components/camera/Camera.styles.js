import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const height = width / (3/4);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    justifyContent : 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  cameraContainer: {
    flex: 1,
    justifyContent : 'center',
    alignItems: 'center',
  },
  previewContainer: {
    width: width,
    height: height,
  },
  captureButton: {
    height: 60,
    width: 60,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInnerView: {
    height: 50,
    width: 50,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraChangeButton: {
    height: 40,
    width: 40,
    backgroundColor: 'transparent',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  middleButtonContainer: {
    padding: 20,
  },
  cameraChangeIcon: {
    height: 30,
    width: 30,
    tintColor: 'white',
  }
});

export default styles;