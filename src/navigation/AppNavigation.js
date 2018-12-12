import { createStackNavigator, createAppContainer } from 'react-navigation';
import Camera from '../components/camera/Camera.screen';
import Image from '../components/image/Image.screen';

const AppNavigator = createStackNavigator(
    {
        CameraScreen: {
            screen: Camera,
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