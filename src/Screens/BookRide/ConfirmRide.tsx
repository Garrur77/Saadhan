
import React, { useRef, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import { FONTS, VECTOR_ICONS, COLORS, IMAGEPATH } from '../../assets/Theme'
import MapBackground from '../../Components/GlobalBackground/MapBackground'
import { WIDTH, HEIGHT } from '../../Components/Helpers/Dimentions'
import WholeButton from '../../Components/Wholebutton/Wholebutton'
import RBSheet from "react-native-raw-bottom-sheet";
import CancelYourRide from '../../Components/RBSheetComponents/CancelYourRide'
import ConfirmPickupSpot from '../../Components/RBSheetComponents/ConfirmPickupSpot1'
import ConfirmVehicle from '../../Components/RBSheetComponents/ConfirmVehicle'
import { useFocusEffect } from '@react-navigation/native';
const ConfirmRide = (props: any) => {
  const bottomSheetRef1 = useRef(null);
  useEffect(() => {
    if (bottomSheetRef1.current) {
      bottomSheetRef1.current.open(); // Open the RBSheet when the component is mounted
    }
  }, []);

  {/* --------------------------  Confirm Vehicle -------------------------*/ }

  const openBottomSheet1 = () => {
    if (bottomSheetRef1.current) {
      bottomSheetRef1.current.open();
    }
  };
  const closeBottomSheet = () => {
    if (bottomSheetRef1.current) {
      bottomSheetRef1.current.close();
      setTimeout(() => {
        props.navigation.navigate('ConfirmPickup')
      }, 200)

    }

  }
  const closeBottomSheet1 = () => {
    if (bottomSheetRef1.current) {
      bottomSheetRef1.current.close();
      setTimeout(() => {
        props.navigation.navigate('PaymentOptions')
      }, 200)

    }

  }


  useFocusEffect(
    React.useCallback(() => {
      if (bottomSheetRef1.current) {
        bottomSheetRef1.current.open();
      }
      return () => {
        // any cleanup operations if necessary
      };
    }, [bottomSheetRef1])
  );

  const sheetheight = Platform.OS === 'ios' ? 270 : 255;
  return (
    <SafeAreaView>
      <MapBackground>
        <View style={styles.mainView}>
          <TouchableOpacity style={styles.backIcon} onPress={() => { props.navigation.goBack() }}>
            <VECTOR_ICONS.Ionicons name="chevron-back" size={26} color={COLORS.WHITE} style={{ alignSelf: "center" }} />
          </TouchableOpacity>

          {/* --------------------------  Confirm Vehicle -------------------------*/}
          <RBSheet
            ref={bottomSheetRef1}
            height={sheetheight}
            // onClose={()=>{ props.navigation.navigate("ConfirmPickup")}}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              container: styles.firstView1,

              draggableIcon: { opacity: 1, width: WIDTH * 0.15, backgroundColor: "#9B9B9B", },
            }}
          >
            {/* <View style={{backgroundColor:"#F6F6F6",height:HEIGHT*0.1}}> */}
            <ConfirmVehicle CloseSheeet={bottomSheetRef1} Action={() => { closeBottomSheet(); }} cashAction={() => { closeBottomSheet1() }} />
            {/* </View> */}
          </RBSheet>


        </View>
      </MapBackground>
    </SafeAreaView>
  )
}

export default ConfirmRide

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