import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  ImageBackground,
  Image,
  Modal
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { WIDTH, HEIGHT } from "../../Components/Helpers/Dimentions";
import { COLORS, FONTS, VECTOR_ICONS, IMAGEPATH } from "../../assets/Theme";

const Modal1 = (props: any) => {
  const [modalVisible, setmodalVisible] = useState(true);
  return (

    <Modal visible={modalVisible}

      transparent={true}>
      <View style={{
        backgroundColor: COLORS.WHITE,
        width: WIDTH * 0.8,
        height: HEIGHT * 0.25,
        // justifyContent:'center',

        alignSelf: 'center',
        marginTop: "60%",
        borderRadius: 30,
      }}>
        <View style={{ margin: '5%', width: '90%' }}>
          <Text allowFontScaling={false} style={{ color: '#242E42', fontFamily: FONTS.bold, fontSize: 20, }}>Forgot Passcode</Text>
          <Text allowFontScaling={false} style={{ color: '#8A8A8F', fontFamily: FONTS.light, fontSize: 14, marginTop: '10%' }}>If you forgot your passcode, please delete and reinstall the app.</Text>
          <Text allowFontScaling={false} style={{ color: '#8A8A8F', fontFamily: FONTS.light, fontSize: 14, marginTop: '2%' }}>All secret chats will be lost</Text>
          <Text allowFontScaling={false} style={{ color: '#FF5500', fontFamily: FONTS.bold, fontSize: 16, marginTop: '5%', textAlign: 'right' }}>Close</Text>
        </View>

      </View>


    </Modal>
  )
}

export default Modal1

const styles = StyleSheet.create({})