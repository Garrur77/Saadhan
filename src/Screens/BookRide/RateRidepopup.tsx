
import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Platform, Linking, Image } from 'react-native'
import { FONTS, VECTOR_ICONS, COLORS, IMAGEPATH } from '../../assets/Theme'
import MapBackground from '../../Components/GlobalBackground/MapBackground'
import { WIDTH, HEIGHT } from '../../Components/Helpers/Dimentions'
import { useIsFocused } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native';
import RateModalComponent from '../../Components/ModalComponent/RateModalComponent'

const platformType = Platform.OS;
const RateRidepopup = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false)
  useEffect(() => {
    setModalVisible(true)
  }, [useIsFocused()])




  const sheetHeight = Platform.OS === 'ios' ? 370 : 250;
  return (
    <SafeAreaView>
      <MapBackground>
        <View style={styles.mainView}>
          <TouchableOpacity style={styles.backIcon} onPress={() => { props.navigation.goBack() }}>
            <VECTOR_ICONS.Ionicons name="chevron-back" size={26} color={COLORS.WHITE} style={{ alignSelf: "center" }} />
          </TouchableOpacity>



        </View>


        {/* < RateModalComponent
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          rate={'Rate Your Driver'}
          head={'Ride Finished'}
          Message={'Cash Paid - $24.89'}
          img

          Button="Submit"
          Action2={() => { setModalVisible(false); props.navigation.navigate('BottomTabBar') }}
          source={IMAGEPATH.success}
          imgstyle={{ width: 48, height: 48, resizeMode: 'cover' }}
          modalstyle={{
            width: WIDTH * 0.75,
          }}
          msgstyle={{ fontSize: 16, color: '#242E42' }}
        /> */}
      </MapBackground>
    </SafeAreaView>

  )
};

export default RateRidepopup;
const styles = StyleSheet.create({
  mainView: { width: WIDTH * 0.9, alignSelf: "center" },
  backIcon: {
    backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
    width: 46,
    height: 46,
    borderRadius: 23,
    marginVertical: "5%",
    alignItems: "center",
    justifyContent: "center"
  },
  firstView1: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.WHITE,
  },

})