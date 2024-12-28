
import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Platform, Linking, Image } from 'react-native'
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
import Map1 from '../../Components/SvgComponent/Location/Map1'
import Message from '../../Components/SvgComponent/CancelRide/Message'
import Call from '../../Components/SvgComponent/CancelRide/Call'
import CarSvg from '../../Components/SvgComponent/CarRide/CarSvg'
import RateModalComponent from '../../Components/ModalComponent/RateModalComponent'
import { useTranslation } from 'react-i18next'

const platformType = Platform.OS;
const AfterStartingRide = (props: any) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false)
  const bottomSheetRef = useRef(null);

  const phoneNumber = '1234567890'; // Replace with the desired phone number
  const openCallLog = () => {
    let phoneNumberWithPrefix = '';
    if (Platform.OS === 'ios') {
      phoneNumberWithPrefix = `telprompt:${phoneNumber}`;
    } else {
      phoneNumberWithPrefix = `tel:${phoneNumber}`;
    }

    Linking.openURL(phoneNumberWithPrefix)
      .catch((err) => console.error('An error occurred', err));
  };
  useEffect(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
  }, [props]);

  const openModal = () => {

    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };


  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
      setTimeout(() => {
        props.navigation.navigate('RateRidepopup')
      }, 200)

    }

  }

  const closeBottomSheet1 = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
      setTimeout(() => {
        props.navigation.navigate('ChatScreen')
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

  const sheetHeight = Platform.OS === 'ios' ? 370 : 360;
  return (
    <SafeAreaView>
      <MapBackground>
        <View style={styles.mainView}>
          <TouchableOpacity style={styles.backIcon} onPress={() => { props.navigation.goBack() }}>
            <VECTOR_ICONS.Ionicons name="chevron-back" size={26} color={COLORS.WHITE} style={{ alignSelf: "center" }} />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "flex-end",
              height: Platform.OS === 'ios' ? HEIGHT * 0.42 : HEIGHT * 0.40,
            }}
          >
            <View style={{ alignSelf: "flex-end" }}>
              <Image
                source={IMAGEPATH.Phone}
                style={{
                  width: WIDTH * 0.32,
                  height: HEIGHT * 0.12,
                  resizeMode: "contain",
                }}
              />
            </View>
          </View>
          <RBSheet
            ref={bottomSheetRef}
            // onClose={()=>{props.navigation.navigate('RateRidepopup',)}}
            height={sheetHeight}
            closeOnPressMask={false}
            customStyles={{
              container: styles.firstView1,
              draggableIcon: { opacity: 0 },
            }}
          >
            <View>
              <View style={{ flexDirection: 'row', alignContent: 'center', width: WIDTH * 0.9, margin: '5%' }}>
                <View>
                  <Image source={IMAGEPATH.Man} />
                </View>
                <TouchableOpacity onPress={() => { closeBottomSheet() }}
                  style={{ width: WIDTH * 0.4, marginLeft: "4%" }}>
                  <Text allowFontScaling={false} style={styles.head}>Gregory Smith</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                    <Image source={IMAGEPATH.star}
                    // style={{marginTop:'3%',}}
                    />
                    <Text allowFontScaling={false} style={{ color: '#C8C7CC', fontSize: 17, fontFamily: FONTS.semibold, marginLeft: '3%' }}>4.9</Text>
                  </View>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', width: WIDTH * 0.2, marginLeft: "15%", justifyContent: 'space-between' }}>
                  <TouchableOpacity onPress={() => { closeBottomSheet1() }}
                    style={{
                      backgroundColor: '#4252FF', width: WIDTH * 0.087, height: 34, borderRadius: 100, alignItems: "center", justifyContent: 'center'
                    }}>
                    {/* <Image source={IMAGEPATH.chat}
                style={{alignSelf:'center',}}/> */}
                    <Message />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={openCallLog} style={{
                    backgroundColor: '#FF5500', width: WIDTH * 0.087, height: 34, borderRadius: 100, alignItems: "center", justifyContent: 'center'
                  }}>

                    {/* <Image source={IMAGEPATH.call}/> */}
                    <Call />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.line1}></View>
              <View style={styles.topview}>
                <View style={{ marginTop: platformType === 'ios' ? "10%" : "13%", marginLeft: '4%' }}>
                  <Map1 />
                </View>
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: WIDTH * 0.85, }}>
                        <Text allowFontScaling={false} style={[styles.pickup, { marginTop: '4%' }]}>{t('PICKUP')}</Text>
                        {/* <Text allowFontScaling={false} style={[styles.pickup,{marginTop:'4%'}]}>Code 53565</Text> */}
                      </View>

                      <Text
                        allowFontScaling={false} style={{
                          color: "#242E42",
                          fontSize: 17,
                          fontFamily: FONTS.semibold,
                          marginLeft: "5%",
                          width: WIDTH * 0.62,
                          marginTop: "1%"
                        }}>JK Bata chauk 3 , Govind Puri Delhi Metro , Delhi</Text>
                    </View>


                  </View>
                  <View style={[styles.line, { marginLeft: "1%", width: WIDTH * 0.8, marginTop: '2.5%' }]}></View>
                  <View style={{ marginTop: '2%' }}>
                    <View>
                      <Text allowFontScaling={false} style={styles.pickup}>{t('Destination')}</Text>
                      <Text
                        allowFontScaling={false} style={{
                          color: "#242E42",
                          fontSize: 17,
                          fontFamily: FONTS.semibold,
                          marginLeft: "5%",
                          width: WIDTH * 0.62,
                          marginTop: "1%"
                        }}>JK Bata chauk 3 , Govind Puri Delhi Metro , Delhi</Text>
                    </View>

                  </View>
                </View>
              </View>
              <View style={[styles.line, { marginTop: '5%' }]}></View>
              <View style={{ flexDirection: 'row', }}>
                {/* <Image source={IMAGEPATH.car} style={{marginTop:'5%',marginLeft:'6%'}}/> */}
                <View style={{ marginTop: '5%', marginLeft: '6%' }}>
                  <CarSvg />
                </View>

                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: WIDTH * 0.64, marginLeft: '10%', marginTop: '5%' }}>
                    <Text allowFontScaling={false} style={{ color: '#C8C7CC', fontSize: 15, fontFamily: FONTS.bold }}>{t('DISTANCE')}</Text>
                    <Text allowFontScaling={false} style={{ color: '#C8C7CC', fontSize: 15, fontFamily: FONTS.bold }}>{t('TIME')}</Text>
                    <Text allowFontScaling={false} style={{ color: '#C8C7CC', fontSize: 15, fontFamily: FONTS.bold }}>{t('PRICE')}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: WIDTH * 0.64, marginLeft: '13%', marginTop: '2%' }}>
                    <Text allowFontScaling={false} style={{ color: '#242E42', fontSize: 15, fontFamily: FONTS.bold }}>0.2 km</Text>
                    <Text allowFontScaling={false} style={{ color: '#242E42', fontSize: 15, fontFamily: FONTS.bold }}>2 min</Text>
                    <Text allowFontScaling={false} style={{ color: '#242E42', fontSize: 15, fontFamily: FONTS.bold }}>$25.00</Text>
                  </View>

                </View>

              </View>



            </View>
          </RBSheet>
        </View>



      </MapBackground>
    </SafeAreaView>

  )
};

export default AfterStartingRide;
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
  line1: {
    backgroundColor: "#ECECEC",
    width: WIDTH * 0.9,
    height: 3,
    // marginTop: "5%",
    alignSelf: "center",
  },
  head: {
    fontSize: 17,
    fontFamily: FONTS.bold,
    // alignSelf: "center",
    color: "#242E42",
  },
  pickup: {
    color: "#242E42",
    fontSize: 14,
    fontFamily: FONTS.bold,
    marginLeft: "5%",
  },
  line: {
    backgroundColor: "#ECECEC",

    width: WIDTH * 0.9,
    height: 1,
    // marginTop: "5%",
    alignSelf: "center",
  },
  topview: {
    flexDirection: 'row',
    width: WIDTH * 0.9,
    justifyContent: 'space-between'
  },

})