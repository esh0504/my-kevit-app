import React from 'react';
import { View,BackHandler,ToastAndroid,Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import Geolocation from 'react-native-geolocation-service';
import { connect } from 'react-redux';
import { Qrread } from '../../redux/reducer/reducer';


class index extends React.Component{
  constructor () {
    super();
    this.state = {
      // url: 'http://121.162.8.56:8000/mobile/km/index',//로컬
      // url: 'http://121.162.8.56:8000/mobile/km/index',//개발계
      url: 'http://www.kevit.co.kr/mobile/km/index',//운영계
      location:{latitude:37,longitude:127},
      };
  }
  webView = {
    canGoBack: false,
    ref: null,
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref ) {
      this.webView.ref.goBack();
      return true;
    }
    
    if (this.exitApp == undefined || !this.exitApp ) {
      ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
      this.exitApp = true;
      this.timeout = setTimeout(
          () => {
              this.exitApp = false;
          },
          2000    // 2초
      );
  } else {
      clearTimeout(this.timeout);
      BackHandler.exitApp();  // 앱 종료
  }
  return true;
}
    

componentDidMount(){
  if (Platform.OS === 'android') {
    BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
  }
  setInterval(()=>{
    this.isqrread();
  },400);
}

getPosition=()=>{
  Geolocation.getCurrentPosition(
    (position) => {
      this.setState({location:{latitude:position.coords.latitude,longitude:position.coords.longitude}});
      this.setState({msg:"loc"+" "+this.state.location.latitude+" "+this.state.location.longitude})
      this.sendPostMessage();
    },
    (error) => {
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
}

 onMessage(msg) {
    let test = JSON.parse(msg);
    if(test=='showmap'){
      this.getPosition();
    }else if(test=="qr"){
      this.props.navigation.navigate('QR');
    }
  }
  
  sendPostMessage=()=>{
    this.webView.ref.postMessage(this.state.msg);
    console.log("msg : ",this.state.msg);
    return;
  };
  
  isqrread(){
    const{qrread,data,Qrread}=this.props;
    if(qrread==0){
      return;
    }else{
      this.setState({msg:"getqr "+data.substring(39)});
      this.sendPostMessage();
      Qrread(0);
      return;
    }
  };

    render(){
     return(
      <View style={{flex:1,justifyContent:"flex-end"}}>
      <WebView 
      ref={(webView) => { this.webView.ref = webView; }}
      geolocationEnabled={true}
      source={{uri:this.state.url}}
      onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
      onMessage={(event)=>{this.onMessage(event.nativeEvent.data)}}
      />
      </View>
     );
    }
}

const mapStateToProps = state =>({
  data:state.data,
  qrread:state.qrread,
});

const mapDispatchToProps=dispatch=>({
  Qrread:qrread=>dispatch(Qrread(qrread)),
});

export default connect(
  mapStateToProps,mapDispatchToProps)(index);
