import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
  StatusBar
} from "react-native";
import React, { useContext, useState, useEffect, } from "react";
import WholeButton from "../../Components/Wholebutton/Wholebutton";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../Components/HeaderComponent/Header";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import { COLORS, FONTS } from "../../assets/Theme";
import { useTranslation } from "react-i18next";

const platformType = Platform.OS;
const BankVerification = (props: any) => {
  const {t} = useTranslation();



  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [time, setTime] = useState<number>(10);
  const [visible, setvisible] = useState(false);

  const [barColor, setBarColor] = useState(COLORS.BACKGROUNDBTNCOLOR);
  const [value, setValue] = useState(0);

  const OTPvalidate = (Code: any) => {
    if (Code == "" || Code == null || Code == undefined) {
      setOtpError("Please enter a valid OTP!");
      return false;
    } else if (Code.length != 4) {
      setOtpError("Please enter a valid OTP!");
      return false;
    } else {
      setOtpError("");

      return true;
    }
  };
  const submit = () => {
    if (OTPvalidate(otp) == true) {
      props.navigation.navigate("AddFunds");
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
  //   setTime(10);
  //   showMessage({
  //     message: "OTP Resend successfully!",
  //     type: "success",
  //   });
  // };
  const [showToast, setShowToast] = useState(false);
  const showToastMessage = (message, duration = 3000) => {
    setShowToast(message);
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  };

  // const resetTimer1 = () => {
  //   showMessage({
  //     message: "OTP Resend successfully!",
  //     type: "success",
  //     // style: {{backgroundColor:'#5cb85c'}},
  //   });
  //   StatusBar.setBackgroundColor('#5cb85c');
  //   StatusBar.setBarStyle('light-content');
  //   setOtp(''); 
  //   setTimeout(() => {
  //     StatusBar.setBackgroundColor('#FF5500');
  //     StatusBar.setBarStyle('dark-content');
  //     hideMessage();
  //     setTime(10);
  //   }, 2260);


  // };

  const resetTimer = () => {
    setTime(10);
    setOtp('');
    showToastMessage("OTP Resend successfully!");
    setTime(10);
  };

  useEffect(() => {
    if (value == 1) {
      setBarColor('#0DBA7F');
      // setValue(0);
      const timeout = setTimeout(() => {
        setValue(0)
      }, 3000);

      return () => clearTimeout(timeout);
    }
    else {
      setBarColor(COLORS.BACKGROUNDBTNCOLOR);
    }
  }, [value]);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}></SafeAreaView>
      <StatusBar
        backgroundColor={barColor}
        barStyle={"dark-content"}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
        <Header navigation={props?.navigation} Heading={"Bank Verification"}
          HeaderStyle={{ marginLeft: '13%' }} />
        <KeyboardAwareScrollView>
          <View>


            <View style={{ justifyContent: "space-between" }}>
              <View style={{ width: WIDTH * 0.9, alignSelf: "center" }}>
                <View style={{ alignSelf: "center" }}>
                  <Text allowFontScaling={false} style={[styles.subText, { marginTop: "6%" }]}>
                    Enter One Time Password (OTP) sent by {'\n'}"Bank Name" Debit card on your registered mobile number.
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
                        allowFontScaling={false} style={{
                          color: COLORS.ERRORCOLORRED,
                          // marginTop: -2,
                          fontSize: 13,
                          fontFamily: FONTS.semibold,
                          alignSelf: "center",
                          alignItems: "center",
                        }}
                      >
                        Code expired
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text
                        allowFontScaling={false} style={{
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
                      width: time == 0 ? WIDTH * 0.28 : WIDTH * 0.51,
                    },
                  ]}
                >
                  {time === 0 ? (
                    <TouchableOpacity onPress={() => { resetTimer(), setValue(1); }}>
                      <Text
                        allowFontScaling={false} style={{
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

              <View style={{ marginTop: 10 }}>
                <WholeButton
                  styles={{
                    // marginTop: HEIGHT * 0.03,
                    marginBottom: "90%",
                    backgroundColor:
                      visible == false ? COLORS.GREY : COLORS.BACKGROUNDBTNCOLOR,
                    color:
                      visible == false ? "rgba(36, 46, 66, 0.6)" : COLORS.WHITE,
                  }}
                  Label={"CONTINUE"}
                  Action={() => submit()}
                />
              </View>
            </View>
            {/* <WholeButton Label={'submit'}/> */}

          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <FlashMessage
        position="top"
        titleStyle={{
          textAlign: "center",
          fontFamily: FONTS.bold,
          fontSize: 18,
          color: COLORS.WHITE,
          marginVertical: platformType === 'ios' ? '1.7%' : '0%',
        }}
      />
      {showToast && (
        <View style={styles.toastContainer}>
          <Text allowFontScaling={false} style={styles.toastText}>{showToast}</Text>
        </View>
      )}
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  )
}

export default BankVerification

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
    lineHeight: 22.5
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
    position: 'absolute',
    backgroundColor: '#0DBA7F', // Choose your desired background color
    paddingVertical: platformType === 'ios' ? "6.5%" : '4%',
    alignItems: 'center',
    width: WIDTH,
    justifyContent: "center",
    backgroundcolor: "red"
  },
  toastText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.bold,
    fontSize: 18,
    marginTop: platformType === 'ios' ? "11.6%" : '0%',
    justifyContent: 'center'

  },
});
