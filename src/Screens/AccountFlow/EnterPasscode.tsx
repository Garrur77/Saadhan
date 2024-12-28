import React, { useState, useEffect } from "react";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  SafeAreaView, Platform, StatusBar, Alert
} from "react-native";
import Header from "../../Components/HeaderComponent/Header";
import { COLORS, FONTS, IMAGEPATH } from "../../assets/Theme";
import EnterPasscodesvg from "../../Components/SvgComponent/Account/EnterPasscodesvg";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import { ViewProfile, forgotPasscode } from "../../ApiConfig/Endpoints";
import { callPostApi } from "../../ApiConfig/ApiCall";
import SpiningLoader from "../../assets/SpiningLoader";
import axios from "axios";
import { useTranslation } from "react-i18next";

const EnterPasscode = (props: any) => {
  const {t} = useTranslation();
  const [code, setcode] = useState(" ");
  const [modalVisible, setmodalVisible] = useState(false);
  const [Loader, setLoader] = useState(false)
  const RegisterTOKEN = useSelector((state: RootState) => state.REGISTER_TOKEN.RegisterTOKEN)
  // console.log('tokeennn', RegisterTOKEN)

  //forgot Passcode 
  const forgotPsscode = async () => {
    setLoader(true);
    try {
      const postData = {
        token: RegisterTOKEN
      }
      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        forgotPasscode,
        postData,
        SucessDisplay
      );
      setLoader(loading);
      // console.log('forgot', response)
      if (error) {
        console.error("API Error:", error);
      }

    } catch (error) {
      // console.log('errordfsdfsdfs', error)
    }
  }

  const Data = useSelector(
    (state: RootState) => state.value
  );
  const token = Data?.RegisterTOKEN;

  //api for get user data && check for correct passcode 
  const userDataViewProfile = async () => {
    try {
      const result = await axios({
        method: 'POST',
        url: ViewProfile,
        headers: {
          token: token
        }
      })
      if (result?.data?.responseCode === 200) {
        const passcode = result?.data?.data?.passcode;
        // console.log("result?.dataresult?.data", passcode);
        if (code === passcode) {
          props?.navigation?.navigate("Wallet")
        }
        else {
          Alert.alert(
            "Wrong Passcode",
            "You have entered the wrong passcode.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
          );
          // console.log("entered wrong passcode")
        }
      }

    } catch (error) {
      // console.log("error is", error)
    }
  }

  useEffect(() => {
    if (code.length === 4) {
      userDataViewProfile()
      // props.navigation.navigate("Security");
    }
  }, [code]);
  const platformType = Platform.OS;

  return (

    <>
      <SafeAreaView style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}></SafeAreaView>
      <StatusBar
        backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
        barStyle={"dark-content"}
      />
      <SafeAreaView style={[{ flex: 1, }, { backgroundColor: COLORS.WHITE }]}>
        <Header navigation={props?.navigation} Heading={"Enter Passcode"} HeaderStyle={{ marginLeft: Platform.OS == "ios" ? WIDTH * 0.24 : WIDTH * 0.24 }} />
        <View style={styles.mainview}>
          <EnterPasscodesvg />
          <View style={styles.lineview}>
            <OTPInputView
              style={{ width: WIDTH * 0.8, height: 80 }}
              pinCount={4}
              onCodeChanged={(code) => {
                setcode(code);
                // console.log("Code changed:", code);
              }}
              onCodeFilled={() => {
                // console.log("Code filled");
              }}
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
            />
            <TouchableOpacity
              onPress={() => {
                setmodalVisible(true);

              }}
              style={{
                width: WIDTH * 0.9,
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <Text allowFontScaling={false} style={styles.forgottext}>{t('Forgot passcode?')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={{  backgroundColor: "rgba(0,0,0,0.65)",}}> */}
        <Modal visible={modalVisible} transparent={true} >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.65)",
              flex: 1,


              justifyContent: "center",
              //   alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.WHITE,
                width: WIDTH * 0.8,
                // height:platformType==='ios'? HEIGHT * 0.22:0,
                justifyContent: 'center',
                alignSelf: "center",
                marginVertical: platformType == "ios" ? "82%" : "70%",
                borderRadius: 20,
              }}
            >
              <View style={{ margin: "5%" }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    color: "#242E42",
                    fontFamily: FONTS.bold,
                    fontWeight: Platform.OS === 'ios' ? '600' : '400',
                    fontSize: 20,
                  }}
                >
                  Forgot Passcode
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    color: "#8A8A8F",
                    fontFamily: FONTS.light,
                    fontSize: 14,
                    marginTop: 30,
                  }}
                >
                  {t('If you forgot your passcode, please delete and reinstall the app.')}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    color: "#8A8A8F",
                    fontFamily: FONTS.light,
                    fontSize: 14,
                    marginTop: 10,
                  }}
                >
                  {t('All secret chats will be lost')}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setmodalVisible(false);
                    forgotPsscode()
                    props.navigation.navigate("VerificationScreen");
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: "#FF5500",
                      fontFamily: FONTS.bold,
                      fontSize: 16,
                      marginTop: 25,
                      textAlign: "right",
                    }}
                  >
                    {t('Close')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* </View> */}
      </SafeAreaView>
      <SpiningLoader loader={Loader} />
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default EnterPasscode;

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 60,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 4,
    color: "rgba(36, 46, 66, 0.6)",
    borderColor: "#D8D8D8",
    fontSize: 20,
    fontFamily: FONTS.bold,
    // borderColor: otpError ? 'red' : '#F6F6F633',
  },
  underlineStyleHighLighted: {
    borderColor: "#242E42",
    borderBottomWidth: 4,
  },
  forgottext: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: "#FC281A",
  },
  lineview: { marginVertical: "10%", alignItems: "center", width: WIDTH * 0.9 },
  mainview: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    alignItems: "center",
    marginVertical: "5%",
  },
});
