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
import { OtpVerificationUrl, ResendOtpUrl } from "../../ApiConfig/Endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { callPostApi } from "../../ApiConfig/ApiCall";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
const platformType = Platform.OS;

import { useDispatch, useSelector } from "react-redux";
import { save_USER_ID } from "../../ReduxConfig/Slices";
import SpiningLoader from "../../assets/SpiningLoader";
import { CommonActions, useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const EmailVerification = (props: any) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [value, setValue] = useState(0);
  const [time, setTime] = useState<number>(180);
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

  // const handleBackPress = () => {
  //   Alert.alert(
  //     "Exit OTP",
  //     "Are you sure you want to back?",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel",
  //       },
  //       // { text: 'OK', onPress: () => BackHandler.exitApp() },
  //       {
  //         text: "OK",
  //         onPress: () =>
  //           props?.navigation?.dispatch(
  //             CommonActions.reset({
  //               index: 0,
  //               routes: [{ name: "Register" }],
  //             })
  //           ),
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  //   return true; // Prevent default back button behavior
  // };

  // const focused = useIsFocused();
  // useEffect(() => {
  //   if (focused) {
  //     const backHandler = BackHandler.addEventListener(
  //       "hardwareBackPress",
  //       handleBackPress
  //     );
  //     return () => backHandler.remove();
  //   }
  // }, [focused]);

  // const submit = () => {
  //   if (OTPvalidate(otp) == true && time != 0) {
  //     // props.navigation.navigate("EnterName");
  //     OtpVerificationApi();
  //   }
  // };

  const submit = () => {
    if (OTPvalidate(otp)) {
      OtpVerificationApi();
    }
  };

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    // Start the timer when the component is mounted
    timerInterval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(timerInterval);
    };
  }, [time]);
  // const resetTimer = () => {
  //   setOtp('');
  //   showMessage({
  //     message: "OTP Resend successfully!",
  //     type: "success",
  //     position: "top",
  //   });
  //   setTime(10);

  // };

  const [showToast, setShowToast] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const showToastMessage = (message, duration = 3000) => {
    setShowToast(message);
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  };

  const showToastMessage1 = (message1, duration = 1000) => {
    setShowToast1(message1);
    setTimeout(() => {
      setShowToast1(false);
    }, duration);
  };

  useEffect(() => {
    if (value == 1) {
      setBarColor("#0DBA7F");
      // setValue(0);
      const timeout = setTimeout(() => {
        setValue(0);
      }, 3000);

      return () => clearTimeout(timeout);
    } else if (value == 2) {
      setBarColor("#d9534f");
      const timeout = setTimeout(() => {
        setValue(0);
      }, 3650);

      return () => clearTimeout(timeout);
    } else {
      setBarColor(COLORS.BACKGROUNDBTNCOLOR);
    }
  }, [value]);

  const resetTimer = () => {
    setTime(180);
    setOtp("");
    showToastMessage(t("OTP Resend successfully!"));
  };
  const email_ = props.route.params.Heading1;
  const countryCode = props.route.params.country;

  // console.log("countryCodecountryCode", countryCode)
  // *************************API***************************
  const OtpVerificationApi = async () => {
    console.log("ggggggggggg");
    setLoader(true);
    try {
      // console.log("Emailllllllllllll", email_);
      var postData = {
        email: email_,
        otp: otp,
        role: "rider",
        countryCode: countryCode,
      };
      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        OtpVerificationUrl,
        postData,
        SucessDisplay
      );
      setLoader(loading);
      if (error) {
        // console.log("OtpVerificationUrl error1111", error?.response);
        showMessage({
          message: "Invalid OTP",
          type: "danger",
          icon: "danger",
          duration: 1000,
        });
        setOtp("");
        setValue(2);

        // console.log("API Error---:", error?.response);

        if (error?.response?.data?.responseCode === 404) {
          setOtp("");
          setValue(2);
          showMessage({
            message: error?.response?.data?.responseMessage,
            type: "danger",
            icon: "danger",
            duration: 1000,
          });
        }
        if (error?.response?.data?.responseCode === 400) {
          setOtp("");
          setValue(2);
          showMessage({
            message: error?.response?.data?.responseMessage,
            type: "danger",
            icon: "danger",
            duration: 1000,
          });
        }
      } else {
        if (response?.responseCode === 200) {
          // console.log("yeahhhhhhhhhhhhhhh");
          setLoader(false);
          // console.log("_Email_Response", response);

          //         const USER_ID = response.map((item:any) => ({
          //             return item.userId,
          // }

          //         ))
          const TOKEN = response.token; // Access the userId directly from the response
          // console.log(TOKEN, "token");

          dispatch(save_USER_ID(TOKEN));

          setTimeout(() => {
            props?.navigation?.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "EnterName" }],
              })
            );
          }, 200);
          // props?.navigation?.dispatch(
          //   CommonActions.reset({
          //     index: 0,
          //     routes: [{ name: "EnterName" }],
          //   })
          // )
        }
      }
    } catch (error: any) {
      console.error("Error during Email_verify:", error.response);
    }
  };

  // **************************API END****************************

  // *********************RESENDOTP API**************************
  const ResendOtpApi = async () => {
    setLoader(true);
    try {
      var postData = {
        email: email_,
        role: "rider",
      };
      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        ResendOtpUrl,
        postData,
        SucessDisplay
      );
      setLoader(loading);
      if (error) {
        console.error("API Error:", error?.response);
      } else {
        if (response?.responseCode === 200) {
          setOtp("");
          setLoader(false);
          // console.log("RESEND_Email_Resp", response);
          resetTimer();
          setValue(1);
        }
      }
    } catch (error: any) {
      console.error("Error during Email_verify:", error, error.response);
      setLoader(false);
    }
  };

  // ************************API END***************************

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
        Heading={t("Email Verification")}
        HeaderStyle={{ marginLeft: "15%" }}
        ToScreen={t("Register")}
        reset={true}
      />
      <KeyboardAwareScrollView>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={{ width: WIDTH * 0.9, alignSelf: "center" }}>
            <View style={{ alignSelf: "center" }}>
              <Text allowFontScaling={false} style={[styles.subText, { marginTop: "6%" }]}>
                {t('Please enter the 4 digit verification code that was sent to')}{" "}
                {props.route.params.Heading1}.{t('The code is valid for 3 minutes.')}
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
                  // OTPvalidate(code);
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
            <View
              style={{
                alignSelf: "center",
                width: WIDTH * 0.8,
                height: "8%",
              }}
            >
              {time === 0 && otp ? (
                <>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: COLORS.ERRORCOLORRED,
                      // marginTop: -2,
                      fontSize: 13,
                      fontFamily: FONTS.semibold,
                      alignSelf: "center",
                      alignItems: "center",
                    }}
                  >
                    {t('OTP expired')}
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: COLORS.ERRORCOLORRED,
                      // marginTop: -2,
                      fontSize: 13,
                      fontFamily: FONTS.semibold,
                      alignSelf: "center",
                      alignItems: "center",
                    }}
                  >
                    {otpError}
                  </Text>
                </>
              )}
            </View>
            <View
              style={[
                styles.timerview,
                {
                  backgroundColor:
                    time == 0 ? COLORS.BACKGROUNDBTNCOLOR : COLORS.GREY,
                  width: time == 0 ? WIDTH * 0.3 : WIDTH * 0.48,
                },
              ]}
            >
              {time === 0 ? (
                <TouchableOpacity
                  // onPress={() => {
                  //   resetTimer(), ResendOtpApi(), setValue(1);
                  // }}
                  onPress={ResendOtpApi}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: COLORS.WHITE,
                      // marginTop: -2,
                      fontSize: 13,
                      fontFamily: FONTS.semibold,
                    }}
                  >
                    {t('Resend Code')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text allowFontScaling={false} style={styles.subText1}>
                  {t('I did’t receive code')} ({Math.floor(time / 60)}:
                  {(time % 60).toString().padStart(2, "0")})
                </Text>
              )}
            </View>
          </View>

          <View style={{ marginTop: 8 }}>
            <WholeButton
              // disabled={otp ? (otp?.length === 4 ? false : true) : true}
              styles={{
                // marginTop: HEIGHT * 0.03,
                marginBottom: "90%",
                backgroundColor:
                  visible == false ? COLORS.GREY : COLORS.BACKGROUNDBTNCOLOR,
                color:
                  visible == false ? "rgba(36, 46, 66, 0.6)" : COLORS.WHITE,
              }}
              Label={t("CONTINUE")}
              Action={() => submit()}
            />
          </View>
          {/* <View
            style={{
              alignSelf: "center",
              width: WIDTH * 0.8,
              height: "8%",
            }}
          >
            {time === 0 && otp ? (
              <>
                <Text
                  style={{
                    color: COLORS.ERRORCOLORRED,
                    // marginTop: -2,
                    fontSize: 13,
                    fontFamily: FONTS.semibold,
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  OTP expired
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={{
                    color: COLORS.ERRORCOLORRED,
                    // marginTop: -2,
                    fontSize: 13,
                    fontFamily: FONTS.semibold,
                    alignSelf: "center",
                    alignItems: "center",
                    height: 30
                  }}
                >
                  {otpError}
                </Text>
              </>
            )}
          </View>
          <View
            style={[
              styles.timerview,
              {
                backgroundColor:
                  time == 0 ? COLORS.BACKGROUNDBTNCOLOR : COLORS.GREY,
                width: time == 0 ? WIDTH * 0.3 : WIDTH * 0.48,
              },
            ]}
          >
            {time === 0 ? (
              <TouchableOpacity
                onPress={() => {
                  resetTimer(), ResendOtpApi(), setValue(1);
                }}
              >
                <Text
                  style={{
                    color: COLORS.WHITE,
                    // marginTop: -2,
                    fontSize: 13,
                    fontFamily: FONTS.semibold,
                  }}
                >
                  Resend Code
                </Text>
              </TouchableOpacity>
            ) : (
              <Text allowFontScaling={false} style={styles.subText1}>
                I did’t receive code ({Math.floor(time / 60)}:
                {(time % 60).toString().padStart(2, "0")})
              </Text>
            )}
          </View> */}
        </View>
      </KeyboardAwareScrollView>
      <SpiningLoader loader={Loader} />

      {/* </SafeAreaView> */}
      {/* {showToast && (
        <View style={styles.toastContainer}>
          <Text allowFontScaling={false} style={styles.toastText}>{showToast}</Text>
        </View>
      )} */}
      {/* {showToast1 && (
        <View style={styles.toastContainer1}>
          <View
            style={{ justifyContent: "flex-start", paddingHorizontal: "5%" }}
          >
            <VECTOR_ICONS.Entypo
              name={"circle-with-cross"}
              color={"white"}
              size={18}
            />
          </View>

          <Text allowFontScaling={false} style={styles.toastText}>{showToast1}</Text>
        </View>
      )} */}
      {/* <FlashMessage
        position="top"
        titleStyle={{
          textAlign: "center",
          fontFamily: FONTS.medium,
          fontSize: 16,
          color: COLORS.WHITE,
          marginVertical: "2%",
        }}
      /> */}
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default EmailVerification;

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
