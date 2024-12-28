import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  Alert,
  BackHandler,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import WholeButton from "../../Components/Wholebutton/Wholebutton";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../Components/HeaderComponent/Header";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import { COLORS, FONTS, VECTOR_ICONS } from "../../assets/Theme";
import axios from "axios";
import { OtpVerificationUrl, ResendOtpUrl, verifyOTPpasscode } from "../../ApiConfig/Endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { callPostApi } from "../../ApiConfig/ApiCall";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
const platformType = Platform.OS;

import { useDispatch, useSelector } from "react-redux";
import { save_USER_ID } from "../../ReduxConfig/Slices";
import SpiningLoader from "../../assets/SpiningLoader";
import { CommonActions, useIsFocused } from "@react-navigation/native";
import { RootState } from "../../ReduxConfig/Store";
import { useTranslation } from "react-i18next";

const VerificationScreen = (props: any) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [value, setValue] = useState(0);
  const [time, setTime] = useState<number>(10);
  const [visible, setvisible] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [barColor, setBarColor] = useState(COLORS.BACKGROUNDBTNCOLOR);
  const OTPvalidate = (Code: any) => {
    if (Code == "" || Code == null || Code == undefined) {
      setOtpError(t("Please enter a valid OTP!"));
      return false;
    } else if (Code.length != 4) {
      setOtpError(t("Please enter a valid OTP!"));
      return false;
    } else {
      setOtpError("");

      return true;
    }
  };

  const RegisterTOKEN = useSelector(
    (state: RootState) => state.REGISTER_TOKEN.RegisterTOKEN
  );
  // console.log('tokkkkkennnttt', RegisterTOKEN)

  //verifyOTPpasscode
  const passcodeverification = async () => {
    try {
      setLoader(true)
      var postData = {
        token: RegisterTOKEN,
        otp: otp,

      };
      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        verifyOTPpasscode,
        postData,
        SucessDisplay
      );
      // console.log('ressssuu', response)
      setLoader(loading);
      if (response?.responseCode === 200) {
        setLoader(false);
        props?.navigation?.navigate("EnterNewPasscode")
      }
    } catch (error) {
      // console.log('error is', error)
    }
  }

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}
      ></SafeAreaView>
      <StatusBar
        backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
        barStyle={"dark-content"}
      />
      {/* <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}> */}
      <Header
        navigation={props?.navigation}
        Heading={t("Verification")}
        HeaderStyle={{ marginLeft: "15%" }}
        ToScreen={t("EnterPasscode")}
        reset={true}
      />
      <KeyboardAwareScrollView>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={{ width: WIDTH * 0.9, alignSelf: "center" }}>
            <View style={{ alignSelf: "center" }}>
              <Text allowFontScaling={false} style={[styles.subText, { marginTop: "6%" }]}>
                {t('Please enter the 4 digit verification code that was sent to your email.')}

              </Text>
            </View>

            <View style={{ marginTop: "10%", alignSelf: "center" }}>
              <OTPInputView
                style={{ width: WIDTH * 0.8, height: 80 }}
                pinCount={4}
                onCodeChanged={(code) => {
                  // console.log("Code changed:", code);
                  setvisible(true);
                  setOtp(code);
                  OTPvalidate(code);
                }}
                onCodeFilled={() => {
                  // console.log("Code filled");
                  //  setvisible(true)
                  setOtpError("");
                }}
                autoFocusOnLoad={false}
                // codeInputFieldStyle={
                //   styles.underlineStyleBase}
                //   {
                //     width: Platform.OS == 'ios' ? 75 : 60,
                //     height: Platform.OS == 'ios' ? 66 : 57,
                //     borderColor: otpError ? 'red' : '#F6F6F633',
                //   },
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
              />
            </View>

          </View>

          <View style={{ marginTop: HEIGHT * 0.5 }}>
            <WholeButton
              disabled={otp ? (otp?.length === 4 ? false : true) : true}
              styles={{
                // marginTop: HEIGHT * 0.03,
                marginBottom: "90%",
                backgroundColor:
                  visible == false ? COLORS.GREY : COLORS.BACKGROUNDBTNCOLOR,
                color:
                  visible == false ? "rgba(36, 46, 66, 0.6)" : COLORS.WHITE,
              }}
              Label={t("CONTINUE")}
              Action={() => passcodeverification()}
            />
          </View>

        </View>
      </KeyboardAwareScrollView>
      <SpiningLoader loader={Loader} />


      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default VerificationScreen;

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
  subText: {
    fontSize: 14,
    color: "#242E42",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    width: WIDTH * 0.75,
    lineHeight: 22.5,
  },
  subText1: {
    fontSize: 14,
    color: "rgba(36, 46, 66, 0.4)",
    fontFamily: FONTS.light,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  timerview: {
    marginTop: "5%",

    alignItems: "center",
    alignSelf: "center",
    borderRadius: 30,
    paddingVertical: 8,
  },

  toastContainer: {
    position: "absolute",
    backgroundColor: "#0DBA7F", // Choose your desired background color d9534f
    paddingVertical: platformType === "ios" ? "6.5%" : "4%",
    alignItems: "center",
    width: WIDTH,
    justifyContent: "center",
    // backgroundcolor:"red"
  },
  toastContainer1: {
    position: "absolute",
    backgroundColor: "#d9534f",
    paddingVertical: platformType === "ios" ? "6%" : "4%",
    alignItems: "center",
    width: WIDTH,
    //  justifyContent:'space-between',
    flexDirection: "row",
  },
  toastText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.medium,
    fontSize: 16,
    marginTop: platformType === "ios" ? "11.5%" : "0%",
    textAlign: "center",
    justifyContent: "center",
    width: WIDTH * 0.78,
    height: HEIGHT * 0.05,
  },
});
