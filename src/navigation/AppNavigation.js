import { createStackNavigator, createAppContainer } from 'react-navigation';
import Camera from '../components/camera/Camera.screen';
import Image from '../components/image/Image.screen';
import FaceRecognition from '../components/faceRecognition/FaceRecognition.screen.js';

const AppNavigator = createStackNavigator(
    {
        FaceRecognitionScreen: {
            screen: FaceRecognition,
        },
        ImageScreen: {
            screen: Image,
        },
    },
    {
        defaultNavigationOptions: {
            header: null,
        },
    }
);

export default createAppContainer(AppNavigator);