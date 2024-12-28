import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
  StatusBar,
} from "react-native";
import React, { useContext, useState, useEffect, useRef } from "react";
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
import SpiningLoader from "../../assets/SpiningLoader";
import BackgroundTimer from "react-native-background-timer";
import { CommonActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
const platformType = Platform.OS;
const PhoneVerification = (props: any) => {
  const {t} = useTranslation();
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [time, setTime] = useState<number>(180);
  const [visible, setvisible] = useState(false);
  const [barColor, setBarColor] = useState();
  const [value, setValue] = useState(0);
  const [Loader, setLoader] = useState(false);
  let email = props.route.params.Heading;
  const otpInputRef = useRef(null);
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
  // const submit = () => {
  //   if (OTPvalidate(otp) == true) {
  //     // props.navigation.navigate("EmailVerification",{Heading1:email});
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
    timerInterval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, [time]);

  // useEffect(() => {
  //   let timerInterval: NodeJS.Timeout;

  //   timerInterval = setInterval(() => {
  //     if (time > 0) {
  //       setTime(time - 1);
  //     }
  //   }, 1000);
  //   return () => {
  //     clearInterval(timerInterval);
  //   };
  // }, [time]);

  useEffect(() => {
    let timerInterval: number;

    const startBackgroundTimer = () => {
      timerInterval = BackgroundTimer.setInterval(() => {
        if (time > 0) {
          setTime(time - 1);
        }
      }, 1000); // 1000 milliseconds = 1 second
    };

    const stopBackgroundTimer = () => {
      BackgroundTimer.clearInterval(timerInterval);
    };

    startBackgroundTimer();

    return () => {
      stopBackgroundTimer();
    };
  }, [time]);

  const resetTimer = () => {
    setTime(180);
    setOtp("");
    // showMessage({
    //   message: "OTP Resend successfully!",
    //   type: "success",
    // });
    showToastMessage(t("Otp Resend Successfully"));
  };
  const [showToast, setShowToast] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const showToastMessage = (message, duration = 5000) => {
    setShowToast(message);
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  };

  const showToastMessage1 = (message1, duration = 5000) => {
    setShowToast1(message1);
    setTimeout(() => {
      setShowToast1(false);
    }, duration);
  };

  useEffect(() => {
    if (value == 1) {
      setBarColor("#0DBA7F");

      const timeout = setTimeout(() => {
        setValue(0);
      }, 2300);

      return () => clearTimeout(timeout);
    } else if (value == 2) {
      setBarColor("#d9534f");
      const timeout = setTimeout(() => {
        setValue(0);
      }, 3600);

      return () => clearTimeout(timeout);
    } else {
      setBarColor(COLORS.BACKGROUNDBTNCOLOR);
    }
  }, [value]);

  const MO_NUMBER = props.route.params.Phoneno;
  // console.log("dgfhjhkhgfds", MO_NUMBER);
  const maskedNumber = "XXXXXX" + MO_NUMBER.slice(-4);

  const Country_Code = props.route.params.CountryCode;
  // *************************API***************************

  const OtpVerificationApi = async () => {
    // console.log("ggggggggggg");

    setLoader(true);
    try {
      // console.log("Mobileeeeeee", MO_NUMBER);
      var postData = {
        mobile: MO_NUMBER,
        // email: Email,
        countryCode: Country_Code,
        otp: otp,
        role: "rider",
      };
      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        OtpVerificationUrl,
        postData,
        SucessDisplay
      );
      setLoader(loading);
      if (error) {
        setValue(2);
        showToastMessage1(t("Invalid Otp"));
        // console.log("API Error:", error?.response);
      } else {
        if (response?.responseCode === 200) {
          // console.log("yeahhhhhhhhhhhhhhh");
          setLoader(false);
          // console.log("_MOBILE_NO_Response", response);
          props?.navigation?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: "EmailVerification",
                  params: { Heading1: email, country: Country_Code },
                },
              ],
            })
          );

          // props.navigation.navigate("EmailVerification", { Heading1: email });
          // console.log("yeahhhhhhhhhhhhhhh");
        }
      }
    } catch (error: any) {
      console.error(
        "Error during MO_verify: phone verify1",
        error,
        error.response
      );
    }
  };

  // **************************API END****************************

  // *********************RESENDOTP API**************************
  const ResendOtpApi = async () => {
    setLoader(true);
    try {
      var postData = {
        mobile: MO_NUMBER,
        countryCode: Country_Code,
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
          setLoader(false);
          setOtp("");
          resetTimer(), setValue(1);
          // console.log("RESEND_MOBILE_NO_Resp", response);
        }
      }
    } catch (error: any) {
      console.error(
        "Error during MO_verify: phone verify2",
        error,
        error.response
      );
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
        Heading={t("Phone Verification")}
        HeaderStyle={{ marginLeft: "15%" }}
      />
      <KeyboardAwareScrollView>
        {/* <View> */}

        <View style={{ justifyContent: "space-between" }}>
          <View style={{ width: WIDTH * 0.9, alignSelf: "center" }}>
            <View style={{ alignSelf: "center" }}>
              <Text allowFontScaling={false} style={[styles.subText, { marginTop: "6%" }]}>
              {t('Please enter the 4 digit verification code that was sent to')}{" "}
                {Country_Code} {maskedNumber}.{t('The code is valid for 3 minutes.')}
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
                code={otp}
                onCodeFilled={() => {
                  // console.log("Code filled");
                  //  setvisible(true)
                  setOtpError("");
                }}
                autoFocusOnLoad={false}
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
                    OTP expired
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
                  width: time == 0 ? WIDTH * 0.3 : WIDTH * 0.51,
                },
              ]}
            >
              {time === 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    ResendOtpApi();
                  }}
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
                    Resend Code
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

          <View style={{ marginBottom: "20%" }}>
            <WholeButton
              styles={{
                marginTop: HEIGHT * 0.02,
                backgroundColor:
                  visible == false ? COLORS.GREY : COLORS.BACKGROUNDBTNCOLOR,
                color:
                  visible == false ? "rgba(36, 46, 66, 0.6)" : COLORS.WHITE,
              }}
              Label={t("CONTINUE")}
              Action={() => submit()}
            />
          </View>
        </View>
        {/* <WholeButton Label={'submit'}/> */}

        {/* </View> */}
      </KeyboardAwareScrollView>
      <SpiningLoader loader={Loader} />
      {/* </SafeAreaView> */}
    </>
  );
};

export default PhoneVerification;

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
    fontFamily: FONTS.bold,
    fontSize: 18,
    marginTop: platformType === "ios" ? "11.5%" : "0%",
    textAlign: "center",
    justifyContent: "center",
    width: WIDTH * 0.78,
  },
});
