
import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import { FONTS, VECTOR_ICONS, COLORS, IMAGEPATH } from '../../assets/Theme'
import MapBackground from '../../Components/GlobalBackground/MapBackground'
import { WIDTH, HEIGHT } from '../../Components/Helpers/Dimentions'
import WholeButton from '../../Components/Wholebutton/Wholebutton'
import RBSheet from "react-native-raw-bottom-sheet";
import CancelYourRide from '../../Components/RBSheetComponents/CancelYourRide'
import ConfirmPickupSpot1 from '../../Components/RBSheetComponents/ConfirmPickupSpot1'
import ConfirmVehicle from '../../Components/RBSheetComponents/ConfirmVehicle'
import ModalComponent from '../../Components/ModalComponent/ModalComponent'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native';
const platformType = Platform.OS;
const ConfirmPickup = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false)
  const bottomSheetRef = useRef(null);
  useEffect(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
  }, []);

  // const openModal = () => {
  //   setModalVisible(true);
  //   if (bottomSheetRef.current) {
  //     bottomSheetRef.current.close();
  //   }
  // };


  // const closeBottomSheet = () => {
  //   if (bottomSheetRef.current) {
  //     bottomSheetRef.current.close()
  //   }
  // };

  useFocusEffect(
    React.useCallback(() => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.open();
      }

    }, [bottomSheetRef])
  );

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
      setTimeout(() => {
        setModalVisible(true)
      }, 200)
    }
  }

  const sheetHeight = Platform.OS === 'ios' ? 275 : 250;
  return (
    <SafeAreaView>
      <MapBackground>
        <View style={styles.mainView}>
          <TouchableOpacity style={styles.backIcon} onPress={() => { props.navigation.goBack() }}>
            <VECTOR_ICONS.Ionicons name="chevron-back" size={26} color={COLORS.WHITE} style={{ alignSelf: "center" }} />
          </TouchableOpacity>
          <RBSheet
            ref={bottomSheetRef}
            // onClose={()=>{openModal()}}
            height={sheetHeight}
            closeOnPressMask={false}
            customStyles={{
              container: styles.firstView1,
              draggableIcon: { opacity: 0 },
            }}
          >
            {/* <View style={{backgroundColor:"#F6F6F6",height:HEIGHT*0.065}}> */}
            <ConfirmPickupSpot1 Action={() => { closeBottomSheet() }} />
            {/* </View>
          */}
          </RBSheet>
        </View>
        <ModalComponent
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          Message={'Your booking has been confirmed.'}
          Message1={'Driver will pickup you in 2 minutes.'}
          head={'Booking Successful'}
          Button={'Okay'}
          Action2={() => { setModalVisible(false); props.navigation.navigate('BookConfirmpopup') }}
          source={IMAGEPATH.success}
          imgstyle={{ marginTop: '0%' }}
          modalstyle={{
            paddingVertical: '6%',
          }}
        />

      </MapBackground>
    </SafeAreaView>

  )
};

export default ConfirmPickup;
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