import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, FlatList, Platform } from 'react-native'
import { useState } from 'react'
import { HEIGHT, WIDTH } from '../Helpers/Dimentions';
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from '../../assets/Theme';


interface ModalComponentProps {
  setModalVisible(arg0: boolean): unknown;
  modalVisible: boolean;
  Message: string;
  Message1?: string;
  head: string;
  btn1?: string;
  btn2?: string;
  Action?: any;
  Action2?: any;
  source: any;
  Button?: string;
  imgstyle?: any
  Button12?: any,
  modalstyle?: any
  navigated?: any

}

const platformType = Platform.OS;
const ModalComponent: React.FC<ModalComponentProps> = (props: any) => {
  const [modalVisible, setmodalVisible] = useState(false);
  return (
    // <View style={styles.view1}>
    <Modal visible={props.modalVisible}
      transparent={true}>
      <View style={{
        backgroundColor: "rgba(0,0,0,0.65)",
        flex: 1,
        justifyContent: "center",

      }}>
        <View style={[styles.modal, props.modalstyle]}>
          <Image source={props.source} style={[styles.img, props.imgstyle]} />
          <Text allowFontScaling={false} style={styles.head}>{props.head}</Text>
          <Text allowFontScaling={false} style={styles.text1}>{props.Message}</Text>
          <Text allowFontScaling={false} style={styles.text2}>{props.Message1}</Text>


          {props?.Button12 && (
            <View>
              <View style={styles.line}></View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>
                <TouchableOpacity onPress={() => { props.setModalVisible(false); props.navigated }}>
                  <TouchableOpacity style={styles.touchableContainer} onPress={() => { props.setModalVisible(false); props.navigated }}>
                    <Text allowFontScaling={false} style={styles.btn}>{props.btn1}</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
                <View style={styles.line2}></View>
                <TouchableOpacity onPress={props.Action}>
                  <View style={[styles.touchableContainer, { borderColor: COLORS.BACKGROUNDBTNCOLOR }]} >
                    <Text allowFontScaling={false} style={[styles.btn, { color: COLORS.BACKGROUNDBTNCOLOR }]}>{props.btn2}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {props?.Button && (
            <TouchableOpacity onPress={props.Action2}
              style={[styles.WholeButtonStyle, props.btnstyle]}>
              <Text allowFontScaling={false} style={styles.buttonText}>{props?.Button}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>


  )
}

export default ModalComponent

const styles = StyleSheet.create({
  view1: {

    justifyContent: 'center',
    alignSelf: 'center',

    // backgroundColor: 'red',
  },
  img: {
    marginTop: '6%',
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  WholeButtonStyle: {
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
    marginTop: '8%',

  },
  buttonText: {
    fontSize: 17,
    color: COLORS.WHITE,
    textAlign: 'center',
    fontFamily: FONTS.bold,
    margin: '2%',
  },
  modal: {
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.8,
    // justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop:"60%",
    borderRadius: 30,
    // paddingVertical:'6%'
  },

  head: {
    fontSize: 20,
    color: '#242E42',
    fontFamily: FONTS.bold,
    marginTop: '4%',
    fontWeight: "700"
  },
  text1: {
    fontSize: 14,
    color: '#8A8A8F',
    fontFamily: FONTS.light,
    marginTop: '2%'
  },
  text2: {
    fontSize: 14,
    color: '#8A8A8F',
    fontFamily: FONTS.light,
  },
  line: {
    backgroundColor: '#ECECEC',
    width: WIDTH * 0.8,
    height: 1,
    marginTop: '7%'
  },
  line2: {
    backgroundColor: '#ECECEC',
    width: "0.4%",
    height: 58,
    // alignItems:'center'
    // marginTop:'4%'
  },
  btn: {
    fontSize: 17,
    color: '#C8C7CC',
    fontFamily: FONTS.bold,
    fontWeight: "700"
  },
  touchableContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // Adjust the padding as needed
    // borderWidth: 1, // Add a border to visually see the touchable area
    borderRadius: 5, // Optional: add borderRadius for rounded corners
    width: WIDTH * 0.4,
    justifyContent: 'space-around',
    paddingLeft: 55
    // paddingHorizontal: 40
  },
})