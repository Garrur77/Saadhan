
import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Platform, FlatList } from 'react-native'
import { FONTS, VECTOR_ICONS, COLORS, IMAGEPATH } from '../../assets/Theme'
import MapBackground from '../../Components/GlobalBackground/MapBackground'
import { WIDTH, HEIGHT } from '../../Components/Helpers/Dimentions'
import RBSheet from "react-native-raw-bottom-sheet";
import CancelYourRide from '../../Components/RBSheetComponents/CancelYourRide'
import ModalComponent from '../../Components/ModalComponent/ModalComponent'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'
import WholeButton from '../../Components/Wholebutton/Wholebutton'
import { Image } from 'react-native-svg'
import Cross from '../../Components/SvgComponent/Account/Cross'
import { useTranslation } from 'react-i18next'

const platformType = Platform.OS;

const CancelBooking = (props: any) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false)
  const bottomSheetRef = useRef(null);
  const [selectedCircle, setselectedCircle] = useState(1)
  const data: DataItems[] = [
    {
      id: 1,
      icon: IMAGEPATH.SelectedCircle,
      notselected: IMAGEPATH.NotSelectedCircle,
      title: "The waiting period was excessively lengthy."
    },
    {
      id: 2,
      icon: IMAGEPATH.SelectedCircle,
      notselected: IMAGEPATH.NotSelectedCircle,
      title: "I chose the incorrect pickup location."
    },
    {
      id: 3,
      icon: IMAGEPATH.SelectedCircle,
      notselected: IMAGEPATH.NotSelectedCircle,
      title: "I made the request unintentionally."
    },
    {
      id: 4,
      icon: IMAGEPATH.SelectedCircle,
      notselected: IMAGEPATH.NotSelectedCircle,
      title: "I accidentally requested the wrong vehicle."
    },
    {
      id: 5,
      icon: IMAGEPATH.SelectedCircle,
      notselected: IMAGEPATH.NotSelectedCircle,
      title: "I mistakenly chose the incorrect drop-off location."
    },
    {
      id: 6,
      icon: IMAGEPATH.SelectedCircle,
      notselected: IMAGEPATH.NotSelectedCircle,
      title: "Other"
    },


  ]
  const handleCirclePress = (itemId: number) => {
    setselectedCircle(itemId);
  };

  useEffect(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open(); // Open the RBSheet when the component is mounted
    }
  }, []);
  // const openModal = () => {
  //   setModalVisible(true);
  //   if (bottomSheetRef.current) {
  //     bottomSheetRef.current.close();
  //   }
  // };
  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
      setTimeout(() => {
        setModalVisible(true);
      }, 200)

    }

  }
  useFocusEffect(
    React.useCallback(() => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.open();
      }

    }, [bottomSheetRef])
  );


  return (
    <SafeAreaView>
      <View style={styles.mainView}>
        <Text allowFontScaling={false} style={{ fontSize: 40 }}>dgfadshbg </Text>

        {/* <CancelYourRide CloseSheeet={bottomSheetRef} Action={() => { closeBottomSheet() }} /> */}
        <ModalComponent
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}

          Message={t('Are you sure, you want to cancel your')}
          Message1={t("ride?")}
          head={t('Cancel Your Ride')}
          Button12
          btn1={t('Back')}
          btn2={t("Confirm")}
          // navigated={()=>{setModalVisible(false);}}
          navigated={() => { props.navigation.goBack(); }}

          Action={() => {
            setModalVisible(false);
            props.navigation.navigate('AfterStartingRide');
          }}
          source={IMAGEPATH.cancle}
          imgstyle={{}}
          modalstyle={{
            // height:platformType==='ios'? 284:  HEIGHT*0.38,
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default CancelBooking

const styles = StyleSheet.create({
  mainView: { width: WIDTH * 0.9, alignSelf: "center", flex: 1 },

  HeadingView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    // backgroundColor:"rgba(246, 246, 246, 1)",
    marginVertical: "5%"
  },
  cancel: { alignItems: "center", justifyContent: "center", width: WIDTH * 0.82, },
  canceltext: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: "rgba(36, 46, 66, 1)",
  },
  lineStyle: {
    borderBottomColor: "rgba(239, 239, 244, 1)",
    borderBottomWidth: 2,
    width: WIDTH,
    alignSelf: "center"
  },
  selecttext: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: "rgba(36, 46, 66, 1)",
    marginTop: "4%"
  },
  description: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: "rgba(36, 46, 66, 1)",
    marginHorizontal: "4%"
  },
  backbtn: {
    backgroundColor: "rgba(36, 46, 66, 1)",
    marginVertical: HEIGHT * 0.04
  }

})