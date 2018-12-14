import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent : 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    flexDirection: 'row',
  },
  previewContainer: {
    flex: 1,
  },
  captureButton: {
    height: 75,
    width: 75,
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
    height: 50,
    width: 50,
    backgroundColor: 'transparent',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  smallButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  middleButtonContainer: {
    padding: 30,
  },
  cameraChangeIcon: {
    height: 30,
    width: 30,
    tintColor: 'white',
  }
});

export default styles;