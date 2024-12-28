import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
  Keyboard,
  Alert,
  BackHandler,
} from "react-native";
import { COLORS, FONTS, IMAGEPATH } from "../../../assets/Theme";
import { HEIGHT, WIDTH } from "../../../Components/Helpers/Dimentions";
import InputFiled from "../../../Components/ValidationsConfig/InputField";
import { useState, useEffect } from "react";
import {
  ValidateEmail,
  ValidateMobileNo,
} from "../../../Components/ValidationsConfig/Validations";
import Coutry from "../../../Components/ValidationsConfig/Country";
import WholeButton from "../../../Components/Wholebutton/Wholebutton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RegisterUrl, socialLogin } from "../../../ApiConfig/Endpoints";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { callPostApi } from "../../../ApiConfig/ApiCall";
import SpiningLoader from "../../../assets/SpiningLoader";
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useDispatch } from "react-redux";
import { save_USER_ID } from "../../../ReduxConfig/Slices";
import { CommonActions, useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

GoogleSignin.configure({
  webClientId: Platform.OS === "ios" ? "765406367842-oq79fm1ct2utqg2csfsrjb4hjm65psur.apps.googleusercontent.com" : "781729825890-07a6g3nu2s063sofvk871g4rd6gl00go.apps.googleusercontent.com",
  offlineAccess: true,
});
const Register = (props: any) => {
  const {t} = useTranslation();
  const [Email, setEmail] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [PhoneNumberError, setphoneError] = useState("");
  const [show, setshow] = useState(true);
  const [countryCode, setCountryCode] = useState("+91");
  const [flag1, setFlag1] = useState("🇮🇳");
  const [Loader, setLoader] = useState(false);
  const [ShowError, setShowError] = useState({
    emailError: false,
    PhoneNumberError: false,
  });
  const [states, setState] = useState("");
  const [value, setValue] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [barColor, setBarColor] = useState(COLORS.WHITE);
  const [firstId, setFirstIds] = useState("")
  const [firstName, setFirstName] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    if (value == 1) {
      setBarColor("#5cb85c");

      const timeout = setTimeout(() => {
        setValue(0);
      }, 4400);

      return () => clearTimeout(timeout);
    } else if (value == 2) {
      setBarColor("#d9534f");
      const timeout = setTimeout(() => {
        setValue(0);
      }, 3650);

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
  const openGoogle = () => {
    const googleUrl = "https://mail.google.com/";
    Linking.openURL(googleUrl).catch((err) =>
      console.error("An error occurred: ", err)
    );
  };
  useEffect(() => {
    GoogleSignin.configure()
  }, [])

  const Handlegoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
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
        } else {
        }
      }
    } catch (error) {
      showMessage({
        message: "Google sign in cancelled",
        type: "danger",
        icon: "danger",
      });
    }
  };
  const hidePhoneNumber = (phone: string): string => {
    if (!phone) return "";

    // Replace all digits with *
    const hiddenNumber = phone.replace(/\d/g, "x");
    return hiddenNumber;
  };
  const hiddenPhoneNumber = hidePhoneNumber(phone);
  const Register = () => {
    let emailErr = ValidateEmail(Email , t);
    let phoneError = ValidateMobileNo(
      countryCode,
      `${countryCode}${phone}`,t
    );

    if (emailErr == "" && phoneError == "") {
      RegisterApi();
      // props.navigation.navigate('PhoneVerification',{ value:DATA ,Heading:email,Phoneno:mobile,CountryCode:countryCode})
    } else {
      setEmailError(emailErr);
      setphoneError(phoneError);
      setShowError({
        emailError: true,
        PhoneNumberError: true,
      });
    }
  };
  let DATA = `${countryCode} ${hiddenPhoneNumber}`;
  let email = Email;
  let mobile = phone;
  //*************API**************************

  const RegisterApi = async () => {
    // // console.log("hiiiiiiiiiiiii");
    const deviceToken = await AsyncStorage.getItem("fcm");
    setLoader(true);
    try {
      var postData = {
        mobile: phone,
        email: Email,
        countryCode: countryCode,
        role: "rider",
        deviceToken: deviceToken?.toString()

      };
      // console.log("postDatapostData--", postData);

      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        RegisterUrl,
        postData,
        SucessDisplay
      );
      setLoader(loading);
      if (error) {
        // console.log("API Error:-------------", error?.response);
        if (error?.response?.data?.responseCode === 400) {
          showMessage({
            message: error?.response?.data?.responseMessage,
            type: "danger",
            icon: "danger",
            duration: 1000,
          });
        }
      } else {
        // console.log("Successssss");
        if (response?.responseCode === 200) {
          // console.log("LOGIN_POSTResponse", response);
          setValue(1);
          setLoader(false);
          // setTimeout(() => {
          props?.navigation?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: "PhoneVerification", params: {
                    value: DATA,
                    Heading: email,
                    Phoneno: mobile,
                    CountryCode: countryCode,

                  }
                }

              ]
            })
          )
          // }, 500);
        }
      }
    } catch (error: any) {
      console.error("Error during register:", error, error.response);
    }
  };

  const facebooksignIn = async () => {
    // console.log("socialIDDDDD", firstId)
    // console.log("SocialNAMMMMMMAMAMA", firstName)
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
        });
        // console.log("tokkkkenen", response?.data?.result?.token);
        if (response?.data?.token !== undefined) {
          await AsyncStorage.setItem("TOKEN", response?.data?.token);
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
        message: error.message,
        type: "danger",
      });
      // console.log("error faceboook sign in", error.message);
    }
  };

  const logoutWithFacebook = () => {
    LoginManager.logOut();
    facebooksignIn()
    setState({ userInfo: {} });
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        // console.log('Facebook login cancelled.');
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (data) {
          // console.log('Facebook login success:', data.accessToken.toString());
          // You can now use the access token to authenticate the user with your server
        }
      }
    } catch (error) {
      console.error('Facebook login error:', error);
    }
  };

  const getInfoFromToken = (token: any) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: "id,name,first_name,last_name",
      },
    };
    const profileRequest = new GraphRequest(
      "/me",
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error: string, user: { name: React.SetStateAction<string>; id: React.SetStateAction<string>; }) => {
        if (error) {
          // console.log("login info has error: " + error);
        } else {
          setState({ userInfo: user });
          setFirstName(user?.name)
          setFirstIds(user?.id)

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
      (login: { isCancelled: any; }) => {
        if (login.isCancelled) {
          // console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then((data: { accessToken: { toString: () => any; }; }) => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
          facebooksignIn()
        }
      },
      (error: string) => {
        // console.log("Login fail with error: " + error);
      }
    );
  };

  const isLogin = states?.userInfo?.name;
  // // console.log("fsdgdsfgdf", isLogin)
  const buttonText = isLogin ? "Logout With Facebook" : "Login From Facebook";
  const onPressButton = isLogin
    ? logoutWithFacebook
    : loginWithFacebook;



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


  const handlePress = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
  };
  //*************API End**************************
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={isKeyboardVisible}
        >
          <ImageBackground
            source={IMAGEPATH.GlobalBackGroundImg1}
            style={style.ImageStyle}
            imageStyle={{
              resizeMode: "cover",
            }}
          >
            {/* <ScrollView showsVerticalScrollIndicator={false}  scrollEnabled={isKeyboardVisible}> */}
            <View style={style.mainView}>
              <Text allowFontScaling={false} style={style.CreateText}>{t('Create Your Account')}</Text>
              <View style={style.LINE}></View>
              <Text allowFontScaling={false} style={style.InputFiledText}>{t('Phone Number')}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: "1.5%",

                  borderWidth: 1,
                  borderColor: "rgba(239, 239, 244, 1)",
                  borderRadius: 8,
                }}
              >
                <TouchableOpacity >
                  <Coutry
                    setCountrycode={setCountryCode}
                    style={{ color: COLORS.BLACK }}
                    countryCode1={countryCode}
                    flag1={flag1}
                    setFlags={setFlag1}
                    onPress={handlePress}
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

                    // setphoneError(ValidateMobileNo(countryCode, `${countryCode}${text}`));
                  }}
                  onEndEditing={() => {
                    // Validate the phone number when the TextInput loses focus
                    setphoneError(
                      ValidateMobileNo(countryCode, `${countryCode}${phone}`,t)
                    );
                  }}
                  onBlur={() => {
                    setphoneError(
                      ValidateMobileNo(
                        countryCode,
                        `${countryCode}${phone}`,t
                      )
                    );
                  }}
                  // onChangeText={(text: string) => {
                  //   setPhone(text);
                  //   if (PhoneNumberError) {
                  //     setphoneError(ValidateMobileNo(text));
                  //   }
                  //   // if (phone != '' || phone != undefined) {
                  //   //   setPhone(text);
                  //   //   setphoneError(ValidateMobileNo(text));
                  //   // }
                  // }}
                  // onBlur={() => {
                  //   setphoneError(ValidateMobileNo(phone));

                  //   // if (phone != '' || phone != undefined) {
                  //   //   setShowError(prevState => ({
                  //   //     ...prevState,
                  //   //     PhoneNumberError: true,
                  //   //   }));
                  //   // }
                  // }}
                  style={{
                    backgroundColor: COLORS.WHITE,
                    width: WIDTH * 0.42,
                    paddingVertical: 15,
                    borderRadius: 8,
                    color: COLORS.BLACK,
                    fontFamily: FONTS.light,
                    fontWeight: Platform.OS == "ios" ? null : "100",
                    fontSize: 17,
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
                <Text allowFontScaling={false} style={[style.Errorstyle, props.Errorstyle]}>
                  {PhoneNumberError}
                </Text>
              )}
              <Text allowFontScaling={false} style={style.InputFiledText}>{t('Email Address')}</Text>
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
                    setEmailError(ValidateEmail(lowercaseText, t));
                  }
                }}
                ShowError={ShowError.emailError}
                Error={EmailError}
              />
              <WholeButton
                Label={t("Continue")}
                styles={style.ButtonStyle}
                Action={() => {
                  Register();
                }}
              />
              <View style={style.TextStyle}>
                <Text allowFontScaling={false} style={style.HaveAccountText}>
                  {t('Already have an account?')}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("Login");
                  }}
                >
                  <Text allowFontScaling={false} style={{ ...style.SignText, fontFamily: FONTS.medium }}> {t('Sign In')}</Text>
                </TouchableOpacity>
              </View>
              <Text allowFontScaling={false} style={style.HaveAccountText1}>{t('OR')}</Text>

              {/* <WholeButton
                Label="Connect with Facebook"
                styles={style.FacBookButtonStyle}
                buttonText={style.ButtonText}
                Facebook
              // Action={() => {
              //   handleFacebookLogin();
              // }}
              /> */}
              <WholeButton
                Label={t("Connect with Google")}
                styles={style.GoogleButtonStyle}
                buttonText={[style.ButtonText, { color: COLORS.BLACK }]}
                Google
                // Action={() => {
                //   openGoogle();
                // }}
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
const style = StyleSheet.create({
  ImageStyle: {
    height: HEIGHT,
    width: WIDTH,
    flex: 1
  },
  Errorstyle: {
    color: COLORS.ERRORCOLORRED,
    fontSize: 13,
    fontFamily: FONTS.regular,
    fontWeight: "400",
    paddingLeft: 7,
    // marginTop: -5,
    marginBottom: 5,
  },
  InputFiledText: {
    fontFamily: FONTS.medium,
    paddingVertical: "1%",
    fontSize: 14,
    color: "#242E42",
  },
  mainView: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: COLORS.WHITE,
    padding: "5%",
    margin: Platform.OS === 'ios' ? HEIGHT * 0.24 : HEIGHT * 0.28,
  },
  ButtonStyle: {
    width: WIDTH * 0.8,
    alignSelf: "center",
    marginVertical: 10,
  },
  TextStyle: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: HEIGHT * 0.02
  },
  HaveAccountText: {
    fontSize: 14,
    fontFamily: FONTS.light,
    color: COLORS.BLACK,
  },
  SignText: {
    fontSize: 14,
    fontFamily: FONTS.light,
    color: "#FF5500",
  },
  HaveAccountText1: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: "rgba(74, 74, 74, 1)",
    textAlign: "center",
    paddingTop: "2.5%",
  },
  orText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: "#4A4A4A",
    alignSelf: "center",
    marginVertical: "3%",
  },
  FacBookButtonStyle: {
    width: WIDTH * 0.8,
    alignSelf: "center",
    backgroundColor: "#2672CB",
    borderRadius: 6,
  },
  ButtonText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  GoogleButtonStyle: {
    width: WIDTH * 0.8,
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: "#EDEDED",
    borderRadius: 6,
  },
  CreateText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.BLACK,
    textAlign: "center",
    fontWeight: '600'
  },
  LINE: {
    backgroundColor: "rgba(239, 239, 244, 1)",
    width: WIDTH * 0.9,
    height: "0.1%",
    alignSelf: "center",
    marginBottom: "4%",
    marginTop: "6%",
  },
});
export default Register;
