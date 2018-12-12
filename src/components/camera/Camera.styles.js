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
    padding: 20,
    width: '100%',
    bottom: 0,
  },
  previewContainer: {
    flex: 1,
  },
  captureButton: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInnerView: {
    height: 40,
    width: 40,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'grey',
  }
});

export default styles;