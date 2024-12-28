import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  Linking,
  Keyboard,
  StatusBar,
  Alert,
  BackHandler,
  ImageBackground,
} from "react-native";
import { FONTS, VECTOR_ICONS, COLORS, IMAGEPATH } from "../../../assets/Theme";
import GlobalBackground from "../../../Components/GlobalBackground/GlobalBackground";
import { HEIGHT, WIDTH } from "../../../Components/Helpers/Dimentions";
import InputFiled from "../../../Components/ValidationsConfig/InputField";
import Coutry from "../../../Components/ValidationsConfig/Country";
import {
  ValidateEmail,
  ValidateMobileNo,
} from "../../../Components/ValidationsConfig/Validations";
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk";
import WholeButton from "../../../Components/Wholebutton/Wholebutton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginUrl, socialLogin } from "../../../ApiConfig/Endpoints";
import { callPostApi } from "../../../ApiConfig/ApiCall";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpiningLoader from "../../../assets/SpiningLoader";
import FlashMessage, { showMessage } from "react-native-flash-message";
import axios from "axios";
import { CommonActions, useIsFocused } from "@react-navigation/native";
// import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useDispatch, useSelector } from "react-redux";
import { save_USER_ID } from "../../../ReduxConfig/Slices";
import { RootState } from "../../../ReduxConfig/Store";
import { useTranslation } from "react-i18next";

// pesonal user web id
// GoogleSignin.configure({
//   webClientId:
//     "995846131458-v1hod52kdlr2oq11v3lnp12nvv5alkl6.apps.googleusercontent.com", // from Firebase Console -> Authentication -> Web setup
//   offlineAccess: true,
// });

// Javed sir web id

GoogleSignin.configure({
  webClientId:
    Platform.OS === "ios"
      ? "765406367842-oq79fm1ct2utqg2csfsrjb4hjm65psur.apps.googleusercontent.com"
      : "781729825890-07a6g3nu2s063sofvk871g4rd6gl00go.apps.googleusercontent.com",
  offlineAccess: true,
});

const platformType = Platform.OS;
const Login = (props: any) => {
  const { t } = useTranslation();
  const [Email, setEmail] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [ShowError, setShowError] = useState({
    emailError: false,
    PhoneNumberError: false,
  });
  const [states, setState] = useState("");
  const [firstId, setFirstIds] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userData, setUserData] = useState("");

  const [phone, setPhone] = useState("");
  const [PhoneNumberError, setphoneError] = useState("");
  const [show, setshow] = useState(true);
  const [countryCode, setCountryCode] = useState("+91");

  const [flag1, setFlag1] = useState("🇮🇳");
  const [switchtext, setswitchtext] = useState(1);
  const [Loader, setLoader] = useState(false);
  const [value, setValue] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [barColor, setBarColor] = useState(COLORS.WHITE);
  const dispatch = useDispatch();

  useEffect(() => {
    if (value == 1) {
      setBarColor("#0DBA7F");
      // setValue(0);
      const timeout = setTimeout(() => {
        setValue(0);
      }, 3000);

      return () => clearTimeout(timeout);
    } else if (value == 2) {
      setBarColor("#42843a");
      const timeout = setTimeout(() => {
        setValue(0);
      }, 3550);

      return () => clearTimeout(timeout);
    } else {
      setBarColor(COLORS.WHITE);
    }
  }, [value]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  //Google steup

  // const Handlegoogle = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     // console.log('Google login success:', userInfo);
  //     // You can now use the user information to authenticate the user with your server
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // console.log('Google login cancelled.');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // console.log('Google login is already in progress.');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // console.log('Play services are not available.');
  //     } else {
  //       console.error('Google login error:', error);
  //     }
  //   }
  // };

  const Handlegoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.log("44444 under google2", userInfo);

      const response = await axios({
        method: "post",
        url: socialLogin,
        data: {
          socialId: userInfo?.user?.id,
          socialType: "GOOGLE",
          deviceType: Platform.OS,
          firstName: userInfo?.user?.givenName,
          lastName: userInfo?.user?.familyName,
          email: userInfo?.user?.email,
          role: "rider",
        },
      });

      // console.log("google login response---->", response);

      if (response?.data?.responseCode === 200) {
        showMessage({
          message: response.data.responseMessage,
          type: "success",
        });

        // Check if the token is defined before storing it
        if (response?.data?.token !== undefined) {
          await AsyncStorage.setItem("TOKEN", response?.data?.token);
          // await AsyncStorage.removeItem('token')
          dispatch(save_USER_ID(response?.data?.token));
          props?.navigation?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "BottomTabBar" }],
            })
          );
          // console.log("token", response?.data?.result?.token);
        } else {
          // console.log("Token is undefined");
        }
      }
    } catch (error) {
      showMessage({
        message: "Google sign in cancelled",
        type: "danger",
        icon: "danger",
      });
      // console.log("error google sign in", error.response);
    }
  };

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      if (result.isCancelled) {
        // console.log("Facebook login cancelled.");
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (data) {
          // console.log("Facebook login success:", data.accessToken.toString());
          // You can now use the access token to authenticate the user with your server
        }
      }
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };

  const hidePhoneNumber = (phone: string): string => {
    if (!phone) return "";

    // Replace all digits with *
    const hiddenNumber = phone.replace(/\d/g, "x");
    return hiddenNumber;
  };
  const hiddenPhoneNumber = hidePhoneNumber(phone);
  // // console.log(hiddenPhoneNumber);
  const LoginButtonClicked = () => {
    let emailErr = ValidateEmail(Email, t);
    let phoneError = ValidateMobileNo(countryCode, `${countryCode}${phone}`, t);

    if (emailErr == "" || phoneError == "") {
      LoginApi();
      // props.navigation.navigate("VerificationPhEmail", { value: DATA, Heading: TYPE })
    } else {
      setEmailError(emailErr);
      setphoneError(phoneError);
      setShowError({
        emailError: true,
        PhoneNumberError: true,
      });
    }
  };

  const facebooksignIn = async () => {
    // console.log("socialIDDDDD", firstId);
    // console.log("SocialNAMMMMMMAMAMA", firstName);

    try {
      const response = await axios({
        method: "post",
        url: socialLogin,
        data: {
          socialId: firstId,
          socialType: "FACEBOOK",
          deviceType: Platform.OS,
          // deviceToken: deviceToken,
          fullname: firstName,
          // email: userInfo?.user?.email,
        },
      });

      // console.log("faceboook login response---->", response);
      if (response?.data?.responseCode === 200) {
        showMessage({
          message: response.data.responseMessage,
          type: "success",
          icon: "success",
        });
        // console.log("tokkkkenen", response?.data?.result?.token);
        await AsyncStorage.setItem("TOKEN", response?.data?.token);
        props?.navigation?.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "BottomTabNavigation" }],
          })
        );
      }
    } catch (error) {
      // console.log("error faceboook sign in", error.message);
    }
  };

  const logoutWithFacebook = () => {
    LoginManager.logOut();
    facebooksignIn();
    setState({ userInfo: {} });
  };

  const getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: "id,name,first_name,last_name",
      },
    };
    const profileRequest = new GraphRequest(
      "/me",
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          // console.log("login info has error: " + error);
        } else {
          setState({ userInfo: user });
          setFirstName(user?.name);
          setFirstIds(user?.id);

          // console.log("result:-----142", user);
          // console.log("resultfull:----565", user?.name);
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const loginWithFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(["public_profile"]).then(
      (login: { isCancelled: any }) => {
        if (login.isCancelled) {
          // console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data: { accessToken: { toString: () => any } }) => {
              const accessToken = data.accessToken.toString();
              getInfoFromToken(accessToken);
            }
          );
          facebooksignIn();
        }
      },
      (error: string) => {
        // console.log("Login fail with error: " + error);
      }
    );
  };

  const isLogin = states?.userInfo?.name;
  const buttonText = isLogin ? "Logout With Facebook" : "Login From Facebook";
  const onPressButton = isLogin ? logoutWithFacebook : loginWithFacebook;

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      // console.log(error);
    }
  };

  const _responseInfoCallback = (
    error: { toString: () => string },
    result: any
  ) => {
    if (error) {
      // console.log("Error fetching data: " + error.toString());
    } else {
      // console.log("Success fetching data: " + JSON.stringify(result));
      setUserData(result);
    }
  };

  const handleLogins = (data: { accessToken: any }) => {
    const { accessToken } = data;
    const infoRequest = new GraphRequest(
      "/me?fields=name,picture,email",
      null,
      _responseInfoCallback
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  };

  const handleBackPress = () => {
    Alert.alert(
      "Exit App",
      "Are you sure you want to exit app?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        // { text: 'OK', onPress: () => BackHandler.exitApp() },
        { text: "OK", onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
    return true; // Prevent default back button behavior
  };

  const focused = useIsFocused();

  useEffect(() => {
    if (focused) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );
      return () => backHandler.remove();
    }
  }, [focused]);

  // const openGoogle = () => {
  //   const googleUrl = "https://www.google.com";
  //   Linking.openURL(googleUrl).catch((err) =>
  //     console.error("An error occurred: ", err)
  //   );
  // };
  // const openFacebook = () => {
  //   const googleUrl = "https://www.facebook.com";
  //   Linking.openURL(googleUrl).catch((err) =>
  //     console.error("An error occurred: ", err)
  //   );
  // };

  let DATA = switchtext == 1 ? `${countryCode} ${hiddenPhoneNumber} ` : Email;

  let DATA1 = switchtext == 1 ? `${countryCode} ${phone}` : Email;
  let TYPE =
    switchtext == 1 ? t("Phone Verification") : t("Email Verification");
  let DATA2 = switchtext == 1 ? `${countryCode}` : Email;

  // // console.log(DATA1, "DATA1");
  const loctionData = useSelector(
    (state: RootState) => state?.locationSelector?.userCoordinated
  );
  const LoginApi = async () => {
    const deviceToken = await AsyncStorage.getItem("fcm");
    setLoader(true);
    try {
      var postData = {
        role: "rider",
        lat: loctionData?.coords?.latitude ?? 0,
        lng: loctionData?.coords?.longitude ?? 0,
      };
      // console.log("degtsadgasf", countryCode);

      if (switchtext == 2) {
        postData["email"] = Email;
      } else {
        (postData["mobile"] = phone), (postData["countryCode"] = countryCode);
      }
      if (deviceToken) {
        postData["deviceToken"] = deviceToken?.toString();
      }
      const SucessDisplay = true;

      const { response, error, loading } = await callPostApi(
        LoginUrl,
        postData,
        SucessDisplay
      );

      setLoader(loading);

      if (error) {
        setValue(2);
        // showToastMessage1("User not found or not verified yet.");
        console.error("API Error:", error?.response);
      } else {
        if (response?.responseCode === 200) {
          setValue(1);
          // showToastMessage("Otp send  Successfully");
          // console.log("API Response:", response);
          // setTimeout(() => {
          props?.navigation?.dispatch(
            CommonActions?.reset({
              routes: [
                {
                  name: "VerificationPhEmail",
                  params: {
                    value: DATA,
                    value1: DATA1,
                    mob: phone,
                    code: countryCode,
                    Heading: TYPE,
                    switchtext: switchtext,
                  },
                },
              ],
            })
          );
          // props.navigation.navigate("VerificationPhEmail", {
          //   value: DATA,
          //   value1: DATA1,
          //   mob: phone,
          //   code: countryCode,
          //   Heading: TYPE,
          //   switchtext: switchtext,
          // });
          // }, 1000);
        } else if (response?.responseCode === 404) {
          // console.log("jfgdfg");
        }
      }
    } catch (error: any) {
      // showMessage({
      //   message: "OTP Resend successfully!",
      //   type: "success",
      // });
      console.error("Error during Login:", error, error.response);
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE }}>
        <StatusBar backgroundColor={COLORS.WHITE} barStyle={"dark-content"} />
        {/* <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}> */}
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={isKeyboardVisible}
        >
          <ImageBackground
            source={IMAGEPATH.GlobalBackGroundImg1}
            style={styles.ImageStyle}
            imageStyle={{
              resizeMode: "cover",
            }}
          >
            <View style={styles.mainView}>
              <Text allowFontScaling={false} style={styles.mainheading}>
                {t("Sign In To Your Account")}
              </Text>
              <View style={styles.firstView}>
                <TouchableOpacity
                  onPress={() => {
                    setswitchtext(1), setphoneError("");
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.switchingtext,
                      { color: switchtext == 1 ? "#262628" : "#C8C7CC" },
                    ]}
                  >
                    {t("Phone")}
                  </Text>
                  <View
                    style={[
                      styles.switchLine,
                      { borderBottomColor: switchtext == 1 ? "#42843a" : "" },
                      { borderBottomWidth: switchtext == 1 ? 4 : 0 },
                    ]}
                  ></View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setswitchtext(2), setEmailError("");
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.switchingtext,
                      { color: switchtext == 2 ? "#262628" : "#C8C7CC" },
                    ]}
                  >
                    {t("Email")}
                  </Text>
                  <View
                    style={[
                      styles.switchLine,
                      { borderBottomColor: switchtext == 2 ? "#42843a" : "" },
                      { borderBottomWidth: switchtext == 2 ? 4 : 0 },
                    ]}
                  ></View>
                </TouchableOpacity>
              </View>
              <View style={styles.lineview}></View>
              {switchtext == 1 && (
                <View>
                  <Text allowFontScaling={false} style={styles.phonenotext}>
                    {t("Enter Your Phone Number")}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: Platform.OS === "ios" ? 6 : 2,
                      borderWidth: Platform.OS === "ios" ? 1 : 1.3,
                      borderColor: "rgba(188, 188, 191, 0.6)",
                      borderRadius: 8,
                      paddingVertical: Platform.OS === "ios" ? 1 : 0,
                    }}
                  >
                    <TouchableOpacity>
                      <Coutry
                        setCountrycode={setCountryCode}
                        style={{ color: COLORS.BLACK }}
                        countryCode1={countryCode}
                        flag1={flag1}
                        setFlags={setFlag1}
                      />
                    </TouchableOpacity>

                    <TextInput
                      allowFontScaling={false}
                      value={phone}
                      placeholder={t("Mobile Number")}
                      placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
                      keyboardType="number-pad"
                      maxLength={15}
                      onChangeText={(text: string) => {
                        setPhone(text);
                        if (PhoneNumberError) {
                          // setphoneError(
                          //   ValidateMobileNo(countryCode, `${countryCode}${text}`)
                          // );
                        }
                      }}
                      onEndEditing={() => {
                        // Validate the phone number when the TextInput loses focus
                        setphoneError(
                          ValidateMobileNo(
                            countryCode,
                            `${countryCode}${phone}`,
                            t
                          )
                        );
                      }}
                      onBlur={() => {
                        setphoneError(
                          ValidateMobileNo(
                            countryCode,
                            `${countryCode}${phone}`,
                            t
                          )
                        );
                      }}
                      style={{
                        backgroundColor: COLORS.WHITE,
                        // backgroundColor:"yellow",
                        width: WIDTH * 0.42,
                        paddingVertical: Platform.OS == "ios" ? 15 : "4.4%",
                        borderRadius: 8,
                        color: COLORS.BLACK,
                        fontFamily: FONTS.light,
                        fontWeight: Platform.OS == "ios" ? null : "100",
                        fontSize: 17,
                        // height: HEIGHT * 0.06,
                        // marginLeft:
                        //   countryCode?.length === 5
                        //     ? 0
                        //     : countryCode?.length === 4
                        //       ? -2
                        //       : -17,
                      }}
                    />
                  </View>
                  {PhoneNumberError && (
                    <Text
                      allowFontScaling={false}
                      style={[styles.Errorstyle, props.Errorstyle]}
                    >
                      {PhoneNumberError}
                    </Text>
                  )}

                  <WholeButton
                    Label={t("Continue")}
                    styles={styles.continuebtn}
                    Action={() => {
                      LoginButtonClicked();
                    }}
                  />
                </View>
              )}
              {switchtext == 2 && (
                <View>
                  <Text allowFontScaling={false} style={styles.phonenotext}>
                    {t("Enter Your Email Address")}
                  </Text>
                  <InputFiled
                    placeholder={t("Enter your email")}
                    MaxLength={256}
                    EmailFiled
                    Line
                    value={Email}
                    onBlur={() => {
                      if (Email != "" || Email != undefined) {
                        setShowError((prevState) => ({
                          ...prevState,
                          emailError: true,
                        }));
                      }
                    }}
                    onChangeText={(text: string) => {
                      if (Email != "" || Email != undefined) {
                        const lowercaseText = text.toLowerCase();
                        setEmail(lowercaseText);
                        // setEmail(text);
                        setEmailError(ValidateEmail(lowercaseText, t));
                      }
                    }}
                    ShowError={ShowError.emailError}
                    Error={EmailError}
                  />
                  <WholeButton
                    Label={t("Continue")}
                    styles={styles.continuebtn}
                    Action={() => {
                      LoginButtonClicked();
                    }}
                  />
                </View>
              )}

              <View style={styles.account}>
                <Text allowFontScaling={false} style={styles.dontAccText}>
                  {t("Don’t have an account?")}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("Register");
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.dontAccText,
                      { color: "#42843a", fontFamily: FONTS.medium },
                    ]}
                  >
                    {" "}
                    {t("Create an account")}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text allowFontScaling={false} style={styles.orText}>
                {t("OR")}
              </Text>
              {/* <WholeButton
                Facebook
                Label={"Connect with Facebook"}
                styles={styles.facebookbtn}
              // Action={() => {
              //   handleFacebookLogin();
              // }}
              /> */}

              <WholeButton
                Google
                Label={t("Connect with Google")}
                styles={styles.googlebtn}
                Action={() => {
                  Handlegoogle();
                }}
              />
            </View>
          </ImageBackground>
          <SpiningLoader loader={Loader} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default Login;
const styles = StyleSheet.create({
  mainView: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: COLORS.WHITE,
    padding: "5%",
    margin: Platform.OS === "ios" ? HEIGHT * 0.24 : HEIGHT * 0.28,
  },
  ImageStyle: {
    height: HEIGHT,
    width: WIDTH,
    flex: 1,
  },
  mainheading: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.BLACK,
    alignSelf: "center",
    fontWeight: "600",
  },
  firstView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: WIDTH * 0.6,
    alignSelf: "center",
    marginVertical: "5%",
  },
  switchingtext: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: "#262628",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  phonenotext: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: "#242E42",
  },
  phoneIn: {
    // paddingHorizontal: "5%",
    color: "#242E42",
    fontSize: 15,
    fontFamily: FONTS.semibold,
  },
  Errorstyle: {
    color: COLORS.ERRORCOLORRED,
    fontSize: 13,
    fontFamily: FONTS.regular,
    marginTop: Platform.OS === "ios" ? 4 : 2,
    fontWeight: "400",
    paddingLeft: 7,
    // marginBottom: 5,
  },
  phoneView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "3%",
    width: WIDTH * 0.8,
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#EFEFF4",
    backgroundColor: COLORS.WHITE,
  },
  account: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  dontAccText: {
    fontFamily: FONTS.light,
    fontSize: 14,
    color: "#262626",
    fontWeight: "400",
  },
  orText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: "#4A4A4A",
    alignSelf: "center",
    paddingVertical: "2.5%",
  },
  lineview: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(239, 239, 244, 1)",
    width: WIDTH * 0.9,
    alignSelf: "center",
    marginBottom: "7%",
  },
  switchLine: {
    width: WIDTH * 0.1,
    alignSelf: "center",
    borderRadius: 5,
    marginVertical: "7%",
  },
  facebookbtn: {
    backgroundColor: "#2672CB",
    width: WIDTH * 0.8,
    alignSelf: "center",
    marginVertical: 10,
  },
  googlebtn: {
    backgroundColor: "#EDEDED",
    width: WIDTH * 0.8,
    alignSelf: "center",
    paddingVertical: 8,
    // marginTop: 25
  },
  continuebtn: {
    width: WIDTH * 0.8,
    alignSelf: "center",
    marginVertical: 18,
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
  toastContainer: {
    position: "absolute",
    backgroundColor: "#0DBA7F", // Choose your desired background color d9534f
    paddingVertical: platformType === "ios" ? "6.5%" : "4%",
    alignItems: "center",
    width: WIDTH,
    justifyContent: "center",
    // backgroundcolor:"red"
  },
});
