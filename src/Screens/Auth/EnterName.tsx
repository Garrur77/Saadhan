import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  BackHandler,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS } from "../../assets/Theme";
import Header from "../../Components/HeaderComponent/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import WholeButton from "../../Components/Wholebutton/Wholebutton";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import CheckBox from "@react-native-community/checkbox";
import InputFiled from "../../Components/ValidationsConfig/InputField";
import Coutry from "../../Components/ValidationsConfig/Country";
import { useDispatch, useSelector } from "react-redux";
import {
  ValidateFirstname,
  ValidateLastname,
  ValidateMobileNo,
} from "../../Components/ValidationsConfig/Validations";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Enter_Name } from "../../ApiConfig/Endpoints";
import FlashMessage, { showMessage } from "react-native-flash-message";

import { RootState } from "../../ReduxConfig/Store";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { userDataInfo } from "../../ReduxConfig/Slices";
import SpiningLoader from "../../assets/SpiningLoader";
import { ErrorMessages } from "../../Components/ValidationsConfig/ErrorMessage";
import { useTranslation } from "react-i18next";

const platformType = Platform.OS;
const EnterName = (props: any) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  // console.log("toggleCheckBox", toggleCheckBox);
  const [fname, setfName] = useState("");
  const [firstnameError, setfnameError] = useState("");

  const [lname, setLName] = useState("");
  const [LastNameError, setLNameError] = useState("");
  const [checkBoxe, setCheckBoxe] = useState(false);
  // console.log("checkBoxe", checkBoxe);

  const [phone, setPhone] = useState("");
  const [PhoneNumberError, setphoneError] = useState("");
  const [Loader, setLoader] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [flag1, setFlag1] = useState("🇮🇳");
  const [showToast, setShowToast] = useState(false);
  const [barColor, setBarColor] = useState(COLORS.BACKGROUNDBTNCOLOR);
  const [value, setValue] = useState(0);

  const showToastMessage = (message, duration = 3000) => {
    setShowToast(message);
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  };

  useEffect(() => {
    if (value == 1) {
      setBarColor("#0DBA7F");

      const timeout = setTimeout(() => {
        setValue(0);
      }, 3300);

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

  const dispatch = useDispatch();

  const [ShowError, setShowError] = useState({
    fnameError: false,
    LNameError: false,
    PhoneNumberError: false,
  });

  const EnterName = () => {
    let fnameError = ValidateFirstname(fname,t);
    let LNameError = ValidateLastname(lname,t);
    let PhoneNumberError = ValidateMobileNo(
      countryCode,
      `${countryCode}${phone}`,t
    );
    let checkError = toggleCheckBox ? true : false;
    if (
      fnameError == "" &&
      LNameError == "" &&
      PhoneNumberError == "" &&
      checkError
    ) {
      EditProfileApi();
    } else {
      setfnameError(fnameError);
      setLNameError(LNameError);
      setphoneError(PhoneNumberError);
      setShowError({
        fnameError: true,
        LNameError: true,
        PhoneNumberError: true,
      });
      setCheckBoxe(!checkError);
    }
  };

  const checkboxStyle = Platform.select({
    ios: {
      borderRadius: 12, // Adjust the borderRadius for iOS
    },
    android: {
      // Adjust the style for Android if necessary
    },
  });

  const RegisterTOKEN = useSelector(
    (state: RootState) => state.REGISTER_TOKEN.RegisterTOKEN
  );

  // console.log(RegisterTOKEN, "GET_USERID");

  const EditProfileApi = async () => {
    // const token = await AsyncStorage.getItem('TOKEN');
    // // console.log(token, 'TOkEN_____TOkEN');
    setLoader(true);

    axios({
      method: "POST",
      url: Enter_Name,

      data: {
        firstName: fname,
        lastName: lname,
        emergencyContact: phone,
        emergencyCountryCode: countryCode,
        emergencyContactFlag: flag1,
        token: RegisterTOKEN,
      },
    })
      .then((response) => {
        if (response.data.responseCode === 200) {
          setValue(1);
          showMessage({
            message: "Account Created Successfully!",
            type: "success",
            icon: "success",
            duration: 1000,
          });
          //   showToastMessage("Account Created Successfully!");
          setLoader(false);

          // console.log(response, "Profile response ___SUBMIT______ododo");
          dispatch(userDataInfo(response));

          // console.log(response, "gfgdjgdjgsjgf");
          setTimeout(() => {
            props?.navigation?.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "BottomTabBar" }],
              })
            );
          }, 200);
        } else {
        }
      })
      .catch((err) => {
        // console.log("====================================", err.response?.data);
      });
  };

  const handleBackPress = () => {
    Alert.alert(
      "Exit App",
      "Are you sure you want to exit?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        // { text: 'OK', onPress: () => BackHandler.exitApp() },
        {
          text: "OK",
          onPress: () =>
            props?.navigation?.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            ),
        },
      ],
      { cancelable: false }
    );
    return true; // Prevent default back button behavior
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, []);

  // const ValidateFirstname = (text: string) => {
  //   if (text.length < 2) {
  //     return 'First name must be at least 2 characters long';
  //   }
  //   if (text.charAt(0) !== text.charAt(0).toUpperCase()) {
  //     return 'First letter must be capitalized';
  //   }
  //   return ''; // No error
  // };

  const handleFirstNameChange = (text: string) => {
    // Capitalize the first letter
    const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);

    // Update state
    setfName(capitalizedText);
    setfnameError(ValidateFirstname(capitalizedText,t));

    // Show error if the field is not empty
    if (capitalizedText !== "" && fname !== undefined) {
      setShowError((prevState) => ({
        ...prevState,
        fnameError: true,
      }));
    }
  };

  // const ValidateLastname = (text: string) => {
  //   if (text.length < 2) {
  //     return 'Last name must be at least 2 characters long';
  //   }
  //   if (text.charAt(0) !== text.charAt(0).toUpperCase()) {
  //     return 'First letter must be capitalized';
  //   }
  //   return ''; // No error
  // };

  const handleLastNameChange = (text: string) => {
    // Capitalize the first letter
    const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);

    // Update state
    setLName(capitalizedText);
    setLNameError(ValidateLastname(capitalizedText,t));

    // Show error if the field is not empty
    if (capitalizedText !== "" && lname !== undefined) {
      setShowError((prevState) => ({
        ...prevState,
        LNameError: true,
      }));
    } else {
      setShowError((prevState) => ({
        ...prevState,
        LNameError: false,
      }));
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
          height: Platform.OS === "ios" ? HEIGHT * 0.1 : HEIGHT * 0.065,
        }}
      >
        <StatusBar backgroundColor={barColor} barStyle={"dark-content"} />
        <Header
          navigation={props?.navigation}
          reset={true}
          ToScreen={"Login"}
        />
      </SafeAreaView>
      <View
        style={{ flex: 1, backgroundColor: COLORS.WHITE, position: "relative" }}
      >
        <KeyboardAwareScrollView
          style={{ position: "relative" }}
          contentContainerStyle={{ flex: 1 }}
          keyboardDismissMode={true}
        >
          <Text allowFontScaling={false} style={styles.textStyle1}>{t('Hi! What is your name?')}</Text>

          <Text allowFontScaling={false} style={styles.textStyle2}>
            {t('Please inform us of the correct way to address you.')}
          </Text>

          <Text allowFontScaling={false} style={styles.textStyle3}>{t('First Name')}</Text>
          <InputFiled
            InputFieldStyle={styles.InputStyle}
            placeholder={t("Enter first name")}
            // placeholderTextColor={COLORS.BLACKISH}
            placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
            MaxLength={30}
            value={fname}
            onBlur={() => {
              if (fname != "" || fname != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  fnameError: true,
                }));
              }
            }}
            onChangeText={handleFirstNameChange}
            // onChangeText={(text: string) => {
            //   if (fname != "" || fname != undefined) {
            //     setfName(text);
            //     setfnameError(ValidateFirstname(text));
            //   }
            // }}
            // onEndEditing={() => {
            //   // Validate the phone number when the TextInput loses focus
            //   setfnameError(ValidateFirstname(fname));
            // }}
            ShowError={ShowError.fnameError}
            Error={firstnameError}
            Errorstyle={{ right: "7%" }}
          />

          <Text allowFontScaling={false} style={styles.textStyle3}>{t('Last Name')}</Text>

          <InputFiled
            textinputstyle={{}}
            InputFieldStyle={styles.InputStyle}
            placeholder={t("Enter last name")}
            placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
            MaxLength={30}
            value={lname}
            onBlur={() => {
              if (lname != "" || lname != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  LNameError: true,
                }));
              }
            }}
            // onChangeText={(text: string) => {
            //   if (lname != "" || lname != undefined) {
            //     setLName(text);
            //     setLNameError(ValidateLastname(text));
            //   }
            // }}
            onChangeText={handleLastNameChange}
            ShowError={ShowError.LNameError}
            Error={LastNameError}
            Errorstyle={{ right: "7%" }}
          />


          <Text allowFontScaling={false} style={styles.textStyle3}>{t('Emergency Contact Number')}</Text>
          <View style={[styles.countryStyle]}>
            <TouchableOpacity>
              <Coutry
                setCountrycode={setCountryCode}
                contryStyle={{
                  color: COLORS.BLACK,
                  backgroundColor: "#F7F8F9",
                }}
                countryCode1={countryCode}
                flag1={flag1}
                setFlags={setFlag1}
              />
            </TouchableOpacity>

            <TextInput
              allowFontScaling={false}
              value={phone}
              placeholder={t("Enter contact number")}
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="number-pad"
              maxLength={15}
              onChangeText={(text: string) => {
                setPhone(text);
                // setphoneError(
                //   ValidateMobileNo(countryCode, `${countryCode}${text}`)
                // );
              }}
              onEndEditing={() => {
                // Validate the phone number when the TextInput loses focus
                setphoneError(
                  ValidateMobileNo(countryCode, `${countryCode}${phone}`,t)
                );
              }}
              onBlur={() => {
                setphoneError(
                  ValidateMobileNo(countryCode, `${countryCode}${phone}`,t)
                );
              }}
              // onChangeText={(text: string) => {
              //   setPhone(text);
              //   if (PhoneNumberError) {
              //     setphoneError(ValidateMobileNo(text));
              //   }
              //   if (phone != "" || phone != undefined) {
              //     setPhone(text);
              //     setphoneError(ValidateMobileNo(text));
              //   }
              // }}
              // onBlur={() => {
              //   setphoneError(ValidateMobileNo(phone));

              //   if (phone != "" || phone != undefined) {
              //     setShowError((prevState) => ({
              //       ...prevState,
              //       PhoneNumberError: true,
              //     }));
              //   }
              // }}
              style={{
                backgroundColor: COLORS.WHITE,
                // width: WIDTH * 0.42,
                flex: 1,
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
            <Text
              allowFontScaling={false}
              style={[styles.Errorstyle, props.Errorstyle]}
            >
              {PhoneNumberError}
            </Text>
          )}

          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginTop: "2%",
              width: WIDTH * 0.9,
              alignItems: Platform.OS === "android" ? "center" : null,
            }}
          >
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              lineWidth={1}
              onValueChange={(newValue) => {
                setToggleCheckBox(newValue), setCheckBoxe(!newValue);
              }}
              style={{
                width: 25, // Adjust the width of the checkbox
                height: 25,
                alignSelf: "center", // Adjust the height of the checkbox
              }}
              // size={20}
              tintColors={{
                true: COLORS.BACKGROUNDBTNCOLOR,
                false: COLORS.BACKGROUNDBTNCOLOR,
              }}
              boxType="square"
              onFillColor={COLORS.BACKGROUNDBTNCOLOR}
              tintColor={"#E9E9E9"}
              onTintColor={COLORS.BACKGROUNDBTNCOLOR}
              boxSize={16}
              onCheckColor={"#FFFFFF"}
            />
            <View
              style={{
                width: WIDTH * 0.8,
                alignSelf: "center",
                marginLeft: "4%",
              }}
            >
              <Text allowFontScaling={false} style={styles.textStyle6}>
                {t('By clicking continue, you agree to our')}
                <Text
                  allowFontScaling={false}
                  style={styles.privacyStyle}
                  onPress={() =>
                    props.navigation.navigate("Termsandconditions")
                  }
                >
                  {" "}
                  Terms Of Services
                </Text>
                <Text allowFontScaling={false} >  {t('and')}</Text>{" "}
                <Text
                  allowFontScaling={false}
                  style={styles.privacyStyle}
                  onPress={() => props.navigation.navigate("Privacypolicy")}
                >
                  {" "}
                  {t('Privacy Policy')}
                </Text>
                {/* <Text allowFontScaling={false} style={styles.privacyStyle}  onPress={() => props.navigation.navigate("privacypolicy")}> Privacy Policy</Text>{" "} */}
                <Text allowFontScaling={false}>  {t('apply.')}</Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              width: WIDTH * 0.8,
              alignSelf: "center",
              marginLeft: "4%",
              height: 20,
            }}
          >
            {checkBoxe ? (
              <Text
                allowFontScaling={false}
                style={{
                  color: COLORS.ERRORCOLORRED,
                  fontSize: 13,
                  fontFamily: FONTS.regular,
                  marginTop: Platform.OS === "ios" ? 4 : 2,
                  fontWeight: "400",
                  paddingLeft: Platform.OS === "ios" ? 12 : 10,
                  // backgroundColor:"red"
                }}
              >
                {t('Please select Terms Of Services.')}
              </Text>
            ) : null}
          </View>

          <View>
            <WholeButton
              styles={{
                marginTop: HEIGHT * 0.01,
                backgroundColor: toggleCheckBox
                  ? COLORS.BACKGROUNDBTNCOLOR
                  : COLORS.DISABLED,
                color: COLORS.WHITE,
              }}
              Label={t("CONTINUE")}
              Action={() => {
                EnterName();
              }}
            />
          </View>

          <SpiningLoader loader={Loader} />
        </KeyboardAwareScrollView>
      </View>
      {/* {showToast && (
        <View style={styles.toastContainer}>
          <Text allowFontScaling={false} style={styles.toastText}>{showToast}</Text>
        </View>
      )} */}
      {/* <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView> */}
    </>
  );
};

export default EnterName;

const styles = StyleSheet.create({
  textStyle1: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.BLACKISH,
    marginHorizontal: "4%",
    marginTop: "5%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  textStyle2: {
    fontFamily: FONTS.medium,
    marginHorizontal: "4%",
    marginVertical: "1%",
    fontSize: 14,
    color: COLORS.GRAY,
    marginBottom: "5%",
  },
  textStyle3: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.Name,
    marginVertical: "1%",
    marginHorizontal: "5%",
  },
  // textStyle4:{
  //     fontFamily:FONTS.medium,
  //     fontSize:15,
  //     color:COLORS.Name,
  //     marginVertical:'1%',
  //     marginHorizontal:'5%',
  // },
  // textStyle5:{
  //     fontFamily:FONTS.medium,
  //     fontSize:15,
  //     color:COLORS.Name,
  //     marginVertical:'1%',
  //     marginHorizontal:'5%',
  // },
  viewStyle: {
    //   flexDirection:'row',
    marginVertical: "1%",
    width: WIDTH * 0.9,
    flexDirection: "row",
    alignSelf: "center",
  },
  PHONEErrorstyle: {
    color: COLORS.ERRORCOLORRED,
    fontSize: 13,
    fontFamily: FONTS.regular,
    width: WIDTH * 0.9,
    alignSelf: "center",
  },
  privacyStyle: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.BLUE,
    marginTop: Platform.OS === "ios" ? 5 : 0,
  },
  textStyle6: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.GRAY,
    flexDirection: "row",
  },
  PhoneVIEW: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "1.5%",
    borderWidth: 1,
    borderColor: "rgba(239, 239, 244, 1)",
    borderRadius: 8,
    width: WIDTH * 0.9,
    alignSelf: "center",
  },
  InputStyle: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    // backgroundColor: '#F7F8F9'
  },
  PhoneTextInput: {
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.5,
    paddingVertical: "4.4%",
    borderRadius: 8,
    paddingLeft: "2%",
    color: COLORS.BLACK,
    marginLeft: "8.5%",
    fontSize: 17,
    fontFamily: FONTS.semibold,
  },
  Errorstyle: {
    color: COLORS.ERRORCOLORRED,
    fontSize: 13,
    fontFamily: FONTS.regular,

    marginLeft: "6%",
    marginTop: -3,
    marginBottom: 5,
  },
  countryStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "1.5%",
    borderWidth: 1,
    borderColor: "rgba(239, 239, 244, 1)",
    borderRadius: 8,
    // backgroundColor: '#F7F8F9',
    alignSelf: "center",
    width: WIDTH * 0.9,
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

  toastText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.bold,
    fontSize: 18,
    marginTop: platformType === "ios" ? "11.5%" : "0%",
    textAlign: "center",
    justifyContent: "center",
  },
});
