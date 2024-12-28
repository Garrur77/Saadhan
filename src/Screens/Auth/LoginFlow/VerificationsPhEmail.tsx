import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import WholeButton from "../../../Components/Wholebutton/Wholebutton";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../../Components/HeaderComponent/Header";
import { HEIGHT, WIDTH } from "../../../Components/Helpers/Dimentions";
import { COLORS, FONTS, VECTOR_ICONS } from "../../../assets/Theme";
import { OtpVerificationUrl, ResendOtpUrl } from "../../../ApiConfig/Endpoints";
import { callPostApi } from "../../../ApiConfig/ApiCall";
import { saveUSERID, save_USER_ID } from "../../../ReduxConfig/Slices";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import BackgroundTimer from "react-native-background-timer";
import SpiningLoader from "../../../assets/SpiningLoader";
import { useTranslation } from "react-i18next";

const platformType = Platform.OS;
const VerificationPhEmail = (props: any) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [time, setTime] = useState<number>(180);
  const [visible, setvisible] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [barColor, setBarColor] = useState(COLORS.BACKGROUNDBTNCOLOR);
  const [value, setValue] = useState(0);

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
  //     OTPVerificationApi();
  //     // props.navigation.navigate("BottomTabBar");
  //   }
  // };
  const submit = () => {
    if (OTPvalidate(otp)) {
      OTPVerificationApi();
    }
  };

  // useEffect(() => {
  //   let timerInterval: NodeJS.Timeout;

  //   // Start the timer when the component is mounted
  //   timerInterval = setInterval(() => {
  //     if (time > 0) {
  //       setTime(time - 1);
  //     }
  //   }, 1000);

  //   // Clean up the interval when the component unmounts
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
    showToastMessage(t("OTP Resend successfully."));
    // showMessage({
    //   message: "OTP Resend successfully!",
    //   type: "success",

    // });
  };

  const [showToast, setShowToast] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const showToastMessage = (message, duration = 3000) => {
    setShowToast(message);
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  };

  const showToastMessage1 = (message1, duration = 3000) => {
    setShowToast1(message1);
    setTimeout(() => {
      setShowToast1(false);
    }, duration);
  };

  useEffect(() => {
    if (value == 1) {
      // setBarColor("#0DBA7F");

      const timeout = setTimeout(() => {
        setValue(0);
      }, 2300);

      return () => clearTimeout(timeout);
    } else if (value == 2) {
      // setBarColor("#d9534f");
      const timeout = setTimeout(() => {
        setValue(0);
      }, 3650);

      return () => clearTimeout(timeout);
    } else {
      setBarColor(COLORS.BACKGROUNDBTNCOLOR);
    }
  }, [value]);

  const token = AsyncStorage.getItem("TOKEN");

  const MO_NUMBER = props.route.params?.value1?.slice(4) || "";
  const Coutry_Code = props.route.params?.value1?.slice(1, 3) || "";
  const myCode = props?.route?.params?.code;
  const myMobNo = props?.route?.params?.mob;
  const Heading = props?.route?.params?.Heading;
  const maskedNumber = "XXXXXX" + MO_NUMBER.slice(-4);
  const email_ = props.route.params.value1;
  const switchtext = props.route.params.switchtext;

  // console.log(MO_NUMBER, "MO_NUMBER")
  // console.log(Coutry_Code, "Coutry_Code")
  // console.log(myCode, "myCode")
  // console.log(Heading, "Heading")
  // console.log(myMobNo, "myMobNo")
  // console.log(email_, "email_")
  // console.log(switchtext, "switchtext")
  // ***********************API*************************
  const OTPVerificationApi = async () => {
    setLoader(true);
    try {
      // console.log(MO_NUMBER, "numerbsaehraser", email_);

      var postData = {
        otp: otp,
        role: "rider",
      };

      if (switchtext === 2) {
        postData["email"] = email_;
      } else {
        (postData["mobile"] = myMobNo), (postData["countryCode"] = myCode);
      }

      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        OtpVerificationUrl,
        postData,
        SucessDisplay
      );
      setLoader(loading);
      if (error) {
        setValue(2);
        // console.log("API Error:sssssss", error.response);
        if (error.response?.status == 400) {
          setOtp("");
          showMessage({
            message: error.response?.data?.responseMessage,
            type: "danger",
            icon: "danger",
            duration: 2000,
          });
        }
      } else {
        if (response?.responseCode === 200) {
          setValue(1);
          await AsyncStorage.setItem("TOKEN", response?.token);
          const token = await AsyncStorage.getItem("TOKEN");
          // console.log("New TOKEN", token);
          setLoader(false);
          // console.log("OTP_Response----------", response);
          dispatch(save_USER_ID(response?.token));
          dispatch(saveUSERID(response?.userId));
          if (response?.isProfileUpdated) {
            setTimeout(() => {
              props?.navigation?.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "BottomTabBar" }],
                })
              );
            }, 500);
          } else {
            setTimeout(() => {
              props?.navigation?.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "EnterName" }],
                })
              );
            }, 500);
          }
        }
      }
    } catch (error: any) {
      console.error("Error during Email_verify:", error, error.response);
    }
  };

  // *******************RESENDOTP API************************
  const Resend_Otp_Api = async () => {
    setLoader(true);
    try {
      var postData = {
        // email: email_,
        // mobile: myMobNo,
        // countryCode: myCode,
        role: "rider",
      };

      if (switchtext == 2) {
        postData["email"] = email_;
      } else {
        (postData["mobile"] = myMobNo), (postData["countryCode"] = myCode);
      }
      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        ResendOtpUrl,
        postData,
        SucessDisplay
      );
      setLoader(loading);
      if (error) {
        // console.log("6666790000000");
        console.error("API Error:", error?.response);
      } else {
        if (response?.responseCode === 200) {
          setLoader(false);
          setOtp("");
          resetTimer(), setValue(1);
          // console.log("RESEND_Email_Resp", response);
        }
        // showMessage({
        //   message:response,
        //   type:"success"
        // })
      }
    } catch (error: any) {
      // console.log("yeahhhhhhhhhhhhhhh");
      console.error("Error during Email_verify:", error, error.response);
      setLoader(false);
    }
  };

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}
      ></SafeAreaView>
      <StatusBar backgroundColor={barColor} barStyle={"dark-content"} />

      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
        <Header
          navigation={props?.navigation}
          Heading={props.route.params.Heading}
          HeaderStyle={{ marginLeft: "15%" }}
        />
        <KeyboardAwareScrollView>
          <View style={{ justifyContent: "space-between" }}>
            <View style={{ width: WIDTH * 0.9, alignSelf: "center" }}>
              <View style={{ alignSelf: "center" }}>
                <Text allowFontScaling={false} style={[styles.subText, { marginTop: "6%" }]}>
                {t('Please enter the 4 digit verification code that was sent to')}{" "}

                  {Heading === t("Email Verification") ? email_ : `${myCode} ${maskedNumber}`}
                  . {t('The code is valid for 3 minutes.')}
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
                        fontSize: 13,
                        fontFamily: FONTS.semibold,
                        alignSelf: "center",
                        alignItems: "center",
                        height: 30,
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
                    width: time == 0 ? WIDTH * 0.3 : WIDTH * 0.54,
                  },
                ]}
              >
                {time === 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      Resend_Otp_Api();
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

            <View style={{ marginBottom: "22%" }}>
              <WholeButton
                styles={{
                  marginTop: HEIGHT * 0.03,
                  backgroundColor:
                    visible == false ? COLORS.GREY : COLORS.BACKGROUNDBTNCOLOR,
                  color: visible ? "rgba(36, 46, 66, 0.6)" : COLORS.WHITE,
                  width: WIDTH * 0.9,
                }}
                Label={t("CONTINUE")}
                Action={() => submit()}
              />
            </View>
          </View>
          <SpiningLoader loader={Loader} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <SpiningLoader loader={Loader} />
      {/* {showToast && (
        <View style={styles.toastContainer}>
          <Text allowFontScaling={false} style={styles.toastText}>{showToast}</Text>
        </View>
      )}
      {showToast1 && (
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

      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default VerificationPhEmail;

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 60,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 4,
    color: "rgba(36, 46, 66, 0.6)",
    // color:"black",
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
    width: WIDTH * 0.9,
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
    borderRadius: 31,
    paddingVertical: 10,
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
