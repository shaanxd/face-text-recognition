import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Camera from '../components/camera/Camera.screen';
import {Home, Image, FaceRecognition, TextRecognition} from '../screens';

const AppNavigator = createStackNavigator(
    {
        HomeScreen: {
            screen: Home,
        },
        FaceRecognitionScreen: {
            screen: FaceRecognition,
        },
        TextRecognitionScreen: {
            screen: TextRecognition,
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