import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, IMAGEPATH } from "../../assets/Theme";
import Header from "../../Components/HeaderComponent/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import WholeButton from "../../Components/Wholebutton/Wholebutton";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import CheckBox from "@react-native-community/checkbox";
import InputFiled from "../../Components/ValidationsConfig/InputField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Coutry from "../../Components/ValidationsConfig/Country";
import { useDispatch, useSelector } from "react-redux";

import {
  ValidateFirstname,
  ValidateLastname,
  ValidateMobileNo,
} from "../../Components/ValidationsConfig/Validations";
import ImagePicker from "react-native-image-crop-picker";
import EditIcon from "../../Components/SvgComponent/Account/EditIcon";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../../ReduxConfig/Store";
import {
  AccountEdit_,
  ViewProfile,
  uploadFile,
} from "../../ApiConfig/Endpoints";
import { callGetApi, callPostApi } from "../../ApiConfig/ApiCall";
import SpiningLoader from "../../assets/SpiningLoader";
import { userDataInfo } from "../../ReduxConfig/Slices";
import {
  userData,
  updateProfileImage,
} from "../../ReduxConfig/UserDetails/UserSlice";
import instance from "../../ApiConfig/APiIntercept";
import { showMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";

const AccountEdit = (props: any) => {
  const {t} = useTranslation();
  const [toggleCheckBox, setToggleCheckBox] = useState("");
  const [fname, setfName] = useState("");
  const dispatch = useDispatch();
  const [fnameError, setfnameError] = useState("");

  const [lname, setLName] = useState("");
  const [LNameError, setLNameError] = useState("");

  const [phone, setPhone] = useState("");
  const [PhoneNumberError, setphoneError] = useState("");

  const [countryCode, setCountryCode] = useState("+244");

  const [ShowError, setShowError] = useState({
    firstnameError: false,
    lastnameError: false,
    phoneNumberError: false,
  });

  const RegisterTOKEN = useSelector(
    (state: RootState) => state.REGISTER_TOKEN.RegisterTOKEN
  );
  const UserDate = useSelector(
    (state: RootState) => state.userDetails?.profileData
  );

  // // console.log("UserDate--->55555", UserDate);

  const defaultFlag = "🇦🇴"; // Set your default flag here

  const flagValue =
    UserDate && UserDate?.emergencyContactFlag
      ? UserDate?.emergencyContactFlag
      : defaultFlag;

  const [flag1, setFlag1] = useState(UserDate?.emergencyContactFlag || "🇦🇴");
  // console.log(flag1, "flag1flag1flag1flag1");
  const [ImageSelected, setImageSelected] = useState("");

  const [Loader, setLoader] = useState(false);
  let retries = 0;
  const maxRetries = 1;

  const onSelectImage = () => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      Alert.alert("Upload Image", "Choose an option", [
        {
          text: "Camera",
          onPress: () => {
            SelectFromCamera();
          },
        },
        {
          text: "Photo",
          onPress: () => {
            SelectFromGallery();
          },
        },
        { text: "Cancel", onPress: () => {} },
      ]);
    }
  };
  const SelectFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      // borderRadius: 40,
      cropping: true,
      // resizemode: "cover",
      quality: "high",
      marginTop: "8%",
    }).then((image) => {
      // console.log(image, "imageimage");
      uploadImage(image);
      // setImageSelected(image?.path);
      // // console.log("setImageSelected", ImageSelected);
    });
  };

  const SelectFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      // borderRadius: 40,
      cropping: true,
      // resizemode: "cover",
      mediaType: "photo",
      quality: "high",
      marginTop: "8%",
      includeBase64: true,
    })
      .then((image) => {
        // console.log(image, "PPPPPPPPPP");
        uploadImage(image);
        // setImageSelected(image?.path);
      })
      .catch((error) => {
        console.error("Image selection error:", error);
      });
  };

  const EnterName = () => {
    let firstnameError = ValidateFirstname(fname , t);
    let lastnameError = ValidateLastname(lname, t);
    let phoneNumberError = ValidateMobileNo(
      countryCode,
      `${countryCode}${phone}`,t
    );

    if (
      phoneNumberError === "" &&
      firstnameError === "" &&
      lastnameError === ""
    ) {
      POST_UPDATE_DETAILSAPI();
      // props.navigation.navigate('BottomTabBar');
    } else {
      setfnameError(firstnameError);
      setLNameError(lastnameError);
      setphoneError(phoneNumberError);
      setShowError({
        firstnameError: true,
        lastnameError: true,
        phoneNumberError: true,
      });
    }
  };

  // const GET_USERID = useSelector((state: RootState) => state.user_ID.user_ID);

  // // console.log(GET_USERID,'GET_USERID');
  useEffect(() => {
    VIEW_PROFILEAPI();
  }, [RegisterTOKEN]);

  useEffect(() => {
    if (UserDate?.emergencyContactFlag) {
      setFlag1(UserDate?.emergencyContactFlag);
    }
  }, [UserDate]);

  // // console.log(ImageSelected, "ImageSelected");
  // **********************VIEWPRFILE API************************

  const VIEW_PROFILEAPI = async () => {
    setLoader(true);

    // // console.log('token',token)
    try {
      var postData = {
        token: RegisterTOKEN,
      };

      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        ViewProfile,
        postData,
        false
      );

      if (error) {
        setLoader(false);
        console.error("API Error:", error);
      } else {
        if (response?.responseCode === 200) {
          setLoader(false);
          // // console.log("GET_ACCOUNT DATA", response?.data);

          const responseData = response?.data;

          const firstName_ = responseData.firstName;
          setfName(firstName_);
          const lastName = responseData.lastName;
          setLName(lastName);
          const countryCode = responseData.emergencyCountryCode;
          setCountryCode(countryCode);
          const phoneNumber = responseData.emergencyContact;
          const profileImage = responseData?.profileImage;
          const emergencyContactFlag = responseData?.emergencyContactFlag;
          const _id = responseData?._id;
          setPhone(phoneNumber);
          dispatch(
            userData({
              firstName_,
              lastName,
              countryCode,
              phoneNumber,
              profileImage,
              emergencyContactFlag,
              _id,
            })
          );
          // // console.log("First Name:", firstName_);
          // // console.log("Last Name:", lastName);
          // // console.log("emergencyCountryCode :", countryCode);
          // // console.log("Phone Number:", phoneNumber);
          // // console.log("Phone _id:", _id);
        }
        setLoader(false);
      }
    } catch (error: any) {
      setLoader(false);
      console.error(
        "Error during MO_verify: account edit",
        error,
        error.response
      );
    }
  };
  // **********************VIEWPRFILE API************************

  const POST_UPDATE_DETAILSAPI = async () => {
    // const token = await AsyncStorage.getItem("TOKEN");
    // // console.log("token", token);
    setLoader(true);
    try {
      var postData = {
        firstName: fname,
        lastName: lname,
        emergencyContact: phone,
        emergencyCountryCode: countryCode,
        emergencyContactFlag: flag1,
        token: RegisterTOKEN,
      };
      if (UserDate?.profileImage) {
        postData["profileImage"] = UserDate?.profileImage;
      }
      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        AccountEdit_,
        postData,
        SucessDisplay
      );

      setLoader(loading);
      if (error) {
        console.error("API Error:", error.response);
      } else {
        // console.log("Successssss---->", response);
        if (response?.responseCode === 200) {
          await VIEW_PROFILEAPI();
          setLoader(false);
          // console.log("UPDATE RESPONSE", response);
          props.navigation.navigate("BottomTabBar");
        }
      }
    } catch (error: any) {
      console.error("Error during update:", error, error.response);
    }
  };

  const uploadImage = async (image: { path: any; mime: any }) => {
    // console.log("heloo", image);
    try {
      setLoader(true);
      // var postData = {
      //   token: RegisterTOKEN,
      // };
      const formData = new FormData();
      formData.append("file", {
        uri: image.path,
        name: "image.jpg",
        type: image.mime,
      });
      {
        // const response = await callPostApi(uploadFile, formData, false);
        const response = await instance.post(uploadFile, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // console.log("res", response);
        if (response?.data?.responseCode === 200) {
          // // console.log(
          //   "response?.response?.resultresponse?.response?.result",
          //   response?.data?.result
          // );
          dispatch(updateProfileImage(response?.data?.result));
        }
        // console.log("response---->", response?.data?.responseMessage);
        setLoader(false);
      }
    } catch (error) {
      if (retries < maxRetries) {
        retries++;

        await uploadImage(image);
      } else {
        showMessage({
          message: "Something went wrong please try again.",
          duration: 1000,
          type: "danger",
          icon: "danger",
        });
        setLoader(false);
      }
      setLoader(false);
      // console.log("Errorerrorerror:", error?.message);
    }
  };

  const handleFirstNameChange = (text: string) => {
    const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
    setfName(text); (capitalizedText);
    setfnameError(ValidateFirstname(capitalizedText , t));

    if (capitalizedText != "" || capitalizedText != undefined) {
      setfName(capitalizedText);
      setfnameError(ValidateFirstname(capitalizedText , t));
    }
  };

  const handleLastNameChange = (text: string) => {
    const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
    setLName(capitalizedText);
    setLNameError(ValidateLastname(capitalizedText , t));
    if (capitalizedText !== "" && capitalizedText !== undefined) {
      setLName(capitalizedText);
      setLNameError(ValidateLastname(capitalizedText , t));
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
          height: Platform.OS === "ios" ? HEIGHT * 0.12 : HEIGHT * 0.065,
        }}
      >
        <Header
          navigation={props?.navigation}
          Heading={t("Account Edit")}
          HeaderStyle={{ marginLeft: "10%" }}
        />
      </SafeAreaView>

      <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          {/* ImageSelected ? HEIGHT * 0.2 : */}
          <View style={[styles.imagemainview, { height: HEIGHT * 0.16 }]}>
            <Image
              style={styles.profileImgStyle}
              // source={
              //   UserDate?.profileImage == ""
              //     ? null
              //     : { uri: UserDate?.profileImage }
              // }
              // resizeMethod="cover"

              source={
                UserDate?.profileImage
                  ? { uri: UserDate?.profileImage }
                  : IMAGEPATH.dummyProfile
              }
            />

            {/* {!ImageSelected &&( */}
            <View style={[styles.EditIconView, { marginLeft: -20 }]}>
              <TouchableOpacity
                style={styles.iconbackStyle}
                onPress={() => onSelectImage()}
              >
                <EditIcon />
              </TouchableOpacity>
            </View>
            {/* )
                        } */}
          </View>
          <Text allowFontScaling={false} style={[styles.textStyle3, { marginTop: "7%" }]}>
            {t('First Name')}
          </Text>
          <InputFiled
            InputFieldStyle={styles.InputStyle}
            placeholder={t("Enter first name")}
            placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
            maxLength={50}
            value={fname}
            onBlur={() => {
              if (fname != "" || fname != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  firstnameError: true,
                }));
              }
            }}
            // onChangeText={(text: string) => {
            //   if (fname != "" || fname != undefined) {
            //     setfName(text);
            //     // setfnameError(ValidateFirstname(text));
            //   }
            // }}
            onEndEditing={() => {
              // Validate the phone number when the TextInput loses focus
              setfnameError(ValidateFirstname(fname , t));
            }}
            onChangeText={(text: string) => handleFirstNameChange(text)}
            ShowError={ShowError.firstnameError}
            Error={fnameError}
            Errorstyle={{ right: "6%" }}
          />
          <Text allowFontScaling={false} style={styles.textStyle3}>{t('Last Name')}</Text>
          <InputFiled
            InputFieldStyle={styles.InputStyle}
            placeholder={t("Enter last name")}
            placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
            maxLength={50}
            value={lname}
            onBlur={() => {
              if (lname != "" || lname != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  lastnameError: true,
                }));
              }
            }}
            // onChangeText={(text: string) => {
            //   if (lname != "" || lname != undefined) {
            //     setLName(text);
            //     // setLNameError(ValidateLastname(text));
            //   }
            // }}
            onChangeText={(text: string) => handleLastNameChange(text)}
            onEndEditing={() => {
              // Validate the phone number when the TextInput loses focus
              setLNameError(ValidateLastname(lname , t));
            }}
            ShowError={ShowError.lastnameError}
            Error={LNameError}
            Errorstyle={{ right: "6%" }}
          />

          <Text allowFontScaling={false} style={styles.textStyle3}>{t('Emergency Contact Number')}</Text>
          <View style={[styles.countryStyle]}>
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
              placeholder={t("Enter contact number")}
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType={t("number-pad")}
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
              //       phoneNumberError: true,
              //     }));
              //   }
              // }}
              style={{
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
          <View style={{ marginLeft: "6%" }}>
            <Text allowFontScaling={false}>
              {PhoneNumberError && (
                <Text allowFontScaling={false} style={[styles.Errorstyle]}>
                  {PhoneNumberError}
                </Text>
              )}
            </Text>
          </View>

          <WholeButton
            styles={{
              marginTop: HEIGHT * 0.03,
              backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
              color: COLORS.WHITE,
            }}
            Label={<Text allowFontScaling={false}>{t('UPDATE PROFILE')}</Text>}
            Action={() => {
              EnterName();
            }}
          />
          <SpiningLoader loader={Loader} />
        </KeyboardAwareScrollView>
      </View>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};
export default AccountEdit;

const styles = StyleSheet.create({
  textStyle1: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.BLACKISH,
    marginHorizontal: "4%",
    marginTop: "5%",
  },
  textStyle2: {
    fontFamily: FONTS.medium,
    marginHorizontal: "4%",
    marginVertical: "1%",
    fontSize: 14,
    color: COLORS.GRAY,
  },
  textStyle3: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: "#262626",
    marginVertical: "1%",
    marginHorizontal: "4%",
  },

  viewStyle: {
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
    marginTop: 5,
  },
  textStyle6: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.GRAY,
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
    fontSize: 14,
    fontFamily: FONTS.bold,
    fontWeight: "600",
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
    fontWeight: "600",
  },
  Errorstyle: {
    color: COLORS.ERRORCOLORRED,
    fontSize: 13,
    fontFamily: FONTS.regular,
    marginTop: Platform.OS === "ios" ? 4 : 2,
    fontWeight: "400",
    paddingLeft: 7,
  },
  countryStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "1.5%",
    borderWidth: 1,
    borderColor: "rgba(239, 239, 244, 1)",
    borderRadius: 8,

    alignSelf: "center",
    width: WIDTH * 0.9,
  },
  profileImgStyle: {
    height: 140,
    width: 140,
    borderRadius: 100,
    resizeMode: "cover",
    marginTop: "8%",
    justifyContent: "center",
    alignSelf: "center",
    // backgroundColor: "#D8D8D8",
  },
  EditIconView: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    // height: '18%',
  },
  iconbackStyle: {
    height: 25,
    width: 25,
    // backgroundColor: '#685314',
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  imagemainview: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
