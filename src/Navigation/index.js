import { createAppContainer } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import Home from "../Screen/Home/index";
import Qr from "../Screen/QR/index";


const AppNavigator=createStackNavigator({

    Home:{
        screen:Home,
        navigationOptions:{headerShown:false},
        
    },
    QR:{
        screen:Qr,
        navigationOptions:{headerShown:false}
    }
    
},
{
    initialRouteName: "Home",
});

export default createAppContainer(AppNavigator);