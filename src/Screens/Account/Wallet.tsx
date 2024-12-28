import { ImageBackground, StyleSheet, Text, View, Image, ToastAndroid, TouchableOpacity, SafeAreaView, StatusBar, Alert, Platform } from 'react-native'
import React, { useState } from 'react'
import Header from '../../Components/HeaderComponent/Header'
import { COLORS, FONTS, IMAGEPATH } from '../../assets/Theme'
import { HEIGHT, WIDTH } from '../../Components/Helpers/Dimentions'
import Walletsvg from '../../Components/SvgComponent/Wallet/Walletsvg'
import ToggleSwitch from 'toggle-switch-react-native'
import CardSvg from '../../Components/SvgComponent/Wallet/CardSvg'
import PromoSvg from '../../Components/SvgComponent/Wallet/PromoSvg'
import Skpe from '../../Components/SvgComponent/Wallet/Skpe'
import Facebook from '../../Components/SvgComponent/Wallet/Facebook'
import Telegram from '../../Components/SvgComponent/Wallet/Telegram'
import Instagram from '../../Components/SvgComponent/Wallet/Instagram'
import WhatsApp from '../../Components/SvgComponent/Wallet/WhatsApp'
import CopySvg from '../../Components/SvgComponent/Wallet/CopySvg'
import Clipboard from '@react-native-community/clipboard'
import { useTranslation } from 'react-i18next'





const Wallet = (props: any) => {
  const {t} = useTranslation();
  const [isSwitchOn, setSwitchOn] = useState(false);

  const handleToggle = () => {
    setSwitchOn(!isSwitchOn);
    props.navigation.navigate('PaymentOptions')
  };

  const handleCopyText = (text) => {
    Clipboard.setString(text);
    Alert.alert('Copied to clipboard', '{Text copied to clipboard}');
    ToastAndroid.showWithGravity(
      'Text copied to clipboard',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}></SafeAreaView>
      <StatusBar
        backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
        barStyle={"dark-content"}
      />
      <SafeAreaView >
        <Header navigation={props?.navigation} Heading={'Wallet'} HeaderStyle={{ marginLeft: '10%' }} ToScreen={"BottomTabBar"} />


        <ImageBackground
          source={IMAGEPATH.Wallet}
          style={{ width: WIDTH * 0.9, height: HEIGHT * 0.15, alignSelf: "center", marginVertical: '5%' }}
          imageStyle={{
            resizeMode: 'stretch',
          }}>
          <View style={styles.viewStyle}>
            <Text allowFontScaling={false} style={styles.currentStyle}>{t('Current Balance')}</Text>
            <TouchableOpacity><Text allowFontScaling={false} style={styles.currentStyle1}>$0.00</Text></TouchableOpacity>
          </View>
        </ImageBackground>

        <Text allowFontScaling={false} style={styles.textStyle}>{t('Payment Method')}</Text>

        <View style={styles.line}></View>
        <View style={styles.textviewStyle}>
          <View style={styles.view1Style}>
            <Walletsvg />
            <Text allowFontScaling={false} style={styles.textStyle1}>{t('Cash')}</Text>
          </View>
          <ToggleSwitch
            isOn={isSwitchOn}
            onColor="#4CE5B1"
            offColor="#242E42"
            labelStyle={{ color: "black", fontWeight: "900" }}
            size="small"
            onToggle={handleToggle}

          />

        </View>
        <Text allowFontScaling={false} style={styles.textStyle2}>{t('Add Money To Your Wallet')}</Text>
        <View style={styles.cardStyle}>
          <CardSvg />
          <Text allowFontScaling={false} style={styles.textStyle3}>{t('Credit Or Debit Card')}</Text></View>
        <TouchableOpacity onPress={() => { props.navigation.navigate('Promocode') }}
          style={{ flexDirection: 'row', width: WIDTH * 0.33, justifyContent: 'space-between', marginHorizontal: '6%', marginVertical: '4%' }}>
          <PromoSvg />
          <Text allowFontScaling={false} style={styles.textStyle4}>{t('Promo Codes')}</Text>
        </TouchableOpacity>
        <View style={styles.line1}></View>
        <Text allowFontScaling={false} style={styles.textStyle5}>{t('Refer & Earn')}</Text>
        <Text allowFontScaling={false} style={styles.textStyle6}>{t('Invite your Friends! & Earn Amount')}</Text>

        <Text allowFontScaling={false} style={styles.share}>{t('Share Via')}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: WIDTH * 0.7, alignSelf: 'center' }} >
          <TouchableOpacity>
            <Skpe />
          </TouchableOpacity>
          <TouchableOpacity>
            <Facebook />
          </TouchableOpacity>
          <TouchableOpacity>
            <Telegram />
          </TouchableOpacity>
          <TouchableOpacity>
            <Instagram />
          </TouchableOpacity>
          <TouchableOpacity>
            <WhatsApp />
          </TouchableOpacity>
        </View>

        <View style={styles.InputFieldStyle} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: WIDTH * 0.8 }}>

            <Text allowFontScaling={false} style={{
              fontFamily: FONTS.medium,
              fontSize: 17,
              color: COLORS.BLACKISH, paddingHorizontal: '3%'
            }}>dghffvdhf</Text>
            <TouchableOpacity onPress={() => handleCopyText('dghffvdhf')}>
              {/* <CopySvg/> */}
              <Image source={require("../../assets/Images/draft.png")} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>

          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  )
}

export default Wallet

const styles = StyleSheet.create({
  viewStyle: {
    alignSelf: 'center',
    width: WIDTH * 0.68,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '12%',
    alignItems: 'center'
  },
  currentStyle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.WHITE
  },
  currentStyle1: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.WHITE
  },
  textStyle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.BLACKISH,
    marginHorizontal: '6%'
  },
  line: {
    backgroundColor: "#ECECEC",
    width: WIDTH * 0.99,
    height: 2,
    marginTop: "4%",
    alignSelf: "center",
  },
  line1: {
    backgroundColor: "#ECECEC",
    width: WIDTH * 0.99,
    height: 2,
    marginTop: "6%",
    alignSelf: "center",
  },
  textStyle1: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.BLACKISH,

  },
  textviewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: WIDTH * 0.9,
    justifyContent: 'space-between',
    marginTop: '3%',
  },
  view1Style: {
    flexDirection: 'row',
    width: WIDTH * 0.17,
    justifyContent: 'space-between'

  },
  textStyle2: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.BLACKISH,
    marginHorizontal: '6%',
    marginVertical: '4%'
  },
  textStyle3: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.BLACKISH,
    marginHorizontal: '6%',
    marginVertical: '3%'
  },
  textStyle4: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.BLACKISH,
    marginHorizontal: '6%',
    marginVertical: '3%'
  },
  textStyle5: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: COLORS.BLACKISH,
    marginHorizontal: '6%',
    marginVertical: '3%',
    marginTop: '3%'
  },
  textStyle6: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.BLACKISH,
    marginHorizontal: '6%',

  },
  share: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.BLACKISH,
    alignSelf: 'center',
    marginVertical: '4%',
    marginTop: '8%'
  },
  InputFieldStyle: {
    width: WIDTH * 0.90,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: '#ECECEC',
    borderWidth: 2,
    backgroundColor: '#D9D9D9',
    marginVertical: '8%',
    padding: '4%'
  },
  cardStyle: {
    flexDirection: 'row',
    width: WIDTH * 0.44,
    justifyContent: 'space-between',
    marginHorizontal: '6%'
  },



})
