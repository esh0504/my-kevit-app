import React from "react";
import Navigation from './src/Navigation/index'
import { PermissionsAndroid } from 'react-native';
import {Provider,connect} from 'react-redux';
import {createStore,applyMiddleware}from 'redux';

import reducer from './src/redux/reducer/reducer'

const store=createStore(reducer);
export default class App extends React.Component{
  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  async requestLocationPermission(){
    try{
        // 퍼미션 요청 다이얼로그 보이기
        const granted=await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if(granted== PermissionsAndroid.RESULTS.GRANTED){
            console.log('위치정보 사용을 허가하셨습니다.');
        }else{
            console.log('위치정보 사용을 거부하셨습니다.\n앱의 기능사용이 제한됩니다.');
        }

    }catch(err){alert('퍼미션 작업 에러');}

}
async componentDidMount(){
  await this.requestCameraPermission();
  await this.requestLocationPermission();
}
  render()
  {
    console.log("store : ", store.getState());
    return (
    <Provider store={store}><Navigation/></Provider>
    );
  }
};