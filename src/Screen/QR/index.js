import React from 'react';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Button ,StyleSheet,View,Dimensions} from 'react-native';
import { qrdata, Qrread } from '../../redux/reducer/reducer';
import { connect } from 'react-redux';




class index extends React.Component{
  constructor () {
    super(); 
  }
      onSuccess = e => {
        if(e.data.includes("www.kevit.co.kr")){
          console.log(this.props);
          const {qrdata,Qrread}=this.props;
          qrdata(e.data);
          Qrread(1);
        }else{
          alert("잘못된 QR코드 입니다. 다시 시도해주세요.")
        }
        this.props.navigation.navigate('Home');
      };

    render(){
        return(
          <View style={styles.container}>
            <QRCodeScanner 
                onRead={this.onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}
                bottomContent={
                    <Button style={styles.buttonTouchable} title={"지도보기"}  onPress={()=>this.props.navigation.navigate('Home')}>
                    </Button>
                }
            />
          </View>
         );
    }
}
const mapStateToProps = state =>({
  data:state.data,
});
const mapDispatchToProps=dispatch=>({
  qrdata : data=>dispatch(qrdata(data)),
  Qrread : qrread => dispatch(Qrread(qrread)),
});

export default connect(mapStateToProps,mapDispatchToProps)(index);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    buttonTouchable: {
      padding: 16
    },
    buttonImage: {
      width:73,height:73
    }
  });
  