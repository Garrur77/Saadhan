import React, { useContext, useState, useEffect } from "react";
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
  ScrollView,
} from "react-native";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import PonttualSvg from "../../Components/SvgComponent/Account/PonttualSvg";
import ModalComponent from "../../Components/ModalComponent/ModalComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import { CommonActions } from "@react-navigation/native";
import {
  setClearData,
  setOpenModal,
  userData,
} from "../../ReduxConfig/UserDetails/UserSlice";
import { callPostApi } from "../../ApiConfig/ApiCall";
import { ViewProfile } from "../../ApiConfig/Endpoints";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { setClearToken } from "../../ReduxConfig/Slices";
import Share from "react-native-share";
import { RiderLogOut } from "../../ApiConfig/Endpoints";
import axios from "axios";
import { setClearRideData } from "../../ReduxConfig/Location/locationSlice";
import { showMessage } from "react-native-flash-message";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../../Components/LanguageSwitcher";
import i18n from '../../locales/i18n';
const platformType = Platform.OS;

const AccountMenu = (props: any) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [passlock, setpasslock] = useState("");
  // // console.log("passss", passlock);
  const dispatch = useDispatch();

  const UserDate = useSelector(
    (state: RootState) => state.userDetails?.profileData
  );
  // // console.log("datttttaaaa", UserDate);

  const RegisterTOKEN = useSelector(
    (state: RootState) => state.REGISTER_TOKEN.RegisterTOKEN
  );

  const VIEW_PROFILEAPI = async () => {
    // setLoader(true);

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
        // setLoader(false);
        console.error("API Error:", error);
      } else {
        if (response?.responseCode === 200) {
          // setLoader(false);
          // // console.log("GET_ACCOUNT DATA", response?.data);

          const responseData = response?.data;
          // // console.log("responseData*****", responseData);

          setpasslock(responseData?.passcodeEnable);
          const firstName_ = responseData?.firstName;
          // setfName(firstName_);
          const lastName = responseData?.lastName;
          // setLName(lastName);
          const countryCode = responseData?.emergencyCountryCode;
          // setCountryCode(countryCode);
          const phoneNumber = responseData?.emergencyContact;
          const profileImage = responseData?.profileImage;
          const emergencyContactFlag = responseData?.emergencyContactFlag;
          const passcodeEnable = responseData?.passcodeEnable;
          const _id = responseData?._id;
          // setPhone(phoneNumber);
          dispatch(
            userData({
              firstName_,
              lastName,
              countryCode,
              phoneNumber,
              profileImage,
              emergencyContactFlag,
              passcodeEnable,
              _id,
            })
          );
          // // console.log("First Name:", firstName_);
          // // console.log("Last Name:", lastName);
          // // console.log("emergencyCountryCode :", countryCode);
          // // console.log("Phone Number:", phoneNumber);
          // // console.log("Phone _id:", _id);
        }
        // setLoader(false);
      }
    } catch (error: any) {
      // setLoader(false);
      console.error(
        "Error during MO_verify: account menu",
        error,
        error.response
      );
    }
  };

  useEffect(() => {
    const usere = props.navigation.addListener("focus", () => {
      VIEW_PROFILEAPI();
    });
    return usere;
  }, [RegisterTOKEN, props.navigation]);

  // const OnActionPress = async () => {
  //   await GoogleSignin.signOut();
  //   await AsyncStorage.removeItem("TOKEN");
  //   await AsyncStorage.getItem('recentSearches');

  //   setModalVisible(false);
  //   setTimeout(() => {
  //     dispatch(setClearData({}));
  //     dispatch(setClearToken(""));
  //     dispatch(setOpenModal(false));
  //     props?.navigation?.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{ name: "Login" }],
  //       })
  //     );
  //   }, 500);
  // };

  const OnActionPress = async () => {
    const deviceToken = await AsyncStorage.getItem("fcm");
    try {
      const response = await axios({
        method: "put",
        url: RiderLogOut,
        headers: {
          token: RegisterTOKEN,
        },
        data: {
          deviceToken: deviceToken?.toString(),
        },
      });
      // // console.log("Logoutt response", response?.data);
      if (response?.data?.responseCode === 200) {
        setModalVisible(false);
        await GoogleSignin.signOut();
        // await AsyncStorage.removeItem("TOKEN");
        // await AsyncStorage.getItem("recentSearches");
        setTimeout(() => {
          dispatch(setClearData({}));
          dispatch(setClearToken(""));
          dispatch(setOpenModal(false));
          props?.navigation?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          );
        }, 500);
        showMessage({
          message: response?.data?.responseMessage,
          icon: "success",
          type: "success",
        });
      }
    } catch (error) {
      console.log("Logout error", error?.response);
      if (error?.response?.data?.responseCode === 400) {
        showMessage({
          message: error?.response?.data?.responseMessage,
          type: "warning",
          icon: "warning",
        });
      }
      if (error?.response?.data?.responseCode === 404) {
        showMessage({
          message: error?.response?.data?.responseMessage,
          type: "danger",
          icon: "danger",
        });
      }
    }
  };

  //handle wallet
  const handleWallet = () => {
    passlock
      ? props?.navigation?.navigate("EnterPasscode")
      : props?.navigation?.navigate("Wallet");
  };

  //share to become Driver
  const handleShare = async () => {
    const link =
      Platform.OS === "android"
        ? "https://play.google.com/store/apps"
        : "https://www.apple.com/app-store/";

    await Share.open({ url: link });
  };

  //share to become Driver
  const handleSuggestFriend = async () => {
    const link =
      Platform.OS === "android"
        ? "https://play.google.com/store/apps"
        : "https://www.apple.com/app-store/";
    const message = `Hey! I've been using this Ponttual app to travel in my city by car , bike etc ...., and I think you'll love it too. Check it out: ${
      Platform.OS === "android" ? "Google Play" : "the App Store"
    }: ${link}`;

    await Share.open({ message: message });
  };
  
  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}
      ></SafeAreaView>
      <StatusBar
        backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
        barStyle={"dark-content"}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
        <View style={styles.headerview}>
          <View style={styles.innerhead}>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                width: WIDTH * 0.54,
              }}
            >
              <Image
                source={require("../../assets/Images/BookRide/homep.png")}
                style={{ width: 100, height: 50, resizeMode: "contain" }}
                onError={(error) => console.log("Image loading error:", error)}
              />
              < Text allowFontScaling={false} style={styles.head}>{t('account')}</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Notification");
              }}
              // style={{ marginLeft: platformType == 'ios' ? '38%' : "12%" }}
            >
              <VECTOR_ICONS.FontAwesome
                name={"bell"}
                size={18}
                style={{ color: COLORS.WHITE }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileStyle}>
          <Image
            style={styles.profileImgStyle}
            //android
            source={
              UserDate?.profileImage &&
              typeof UserDate?.profileImage === "string"
                ? { uri: UserDate?.profileImage }
                : IMAGEPATH.dummyProfile
            }
            // source={
            //   // UserDate?.profileImage
            //   //   ? { uri: UserDate?.profileImage }
            //   //   :
            //   require("../../assets/Images/Account/DummyProfile.jpeg")
            // }
            resizeMode="cover"
          />
          <View style={{ paddingVertical: 5, paddingBottom: 20 }}>
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              style={styles.username}
            >
              {UserDate?.firstName_}
              <Text allowFontScaling={false} style={styles.username}>
                {" "}
                {UserDate?.lastName}{" "}
              </Text>
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={{ paddingBottom: 145 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ backgroundColor: "#fff" }}>
              <View style={[styles.lineStyle, { marginTop: "0%" }]}></View>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("AccountEdit");
                }}
                style={styles.touchableopacitystyle}
              >
                <View style={styles.textstyle}>
                  <Image
                    source={require("../../assets/Images/mdi_account.png")}
                    onError={(error) =>
                      console.log("Image loading error:", error)
                    }
                    resizeMode="contain"
                    style={{ width: 28, height: 28 }}
                    tintColor={"#C1C0C9"}
                  />
                  {/* <VECTOR_ICONS.MaterialCommunityIcons
                    name={"account"}
                    size={27}
                    color={"rgba(193, 192, 201, 1)"}
                  /> */}
                  <Text allowFontScaling={false} style={[styles.email, { marginLeft: "5%" }]}>
                  {t('account')}
                  </Text>
                </View>
                <VECTOR_ICONS.AntDesign
                  name={"right"}
                  size={Platform.OS === "ios" ? 14 : 18}
                  color={"rgba(38, 38, 38, 1)"}
                />
              </TouchableOpacity>
              <View style={styles.lineStyle}></View>
              {/* <TouchableOpacity
                onPress={handleWallet}
                style={styles.touchableopacitystyle}
              >
                <View style={styles.textstyle}>
                  <Image
                    source={require("../../assets/Images/solar_wallet-bold.png")}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                    tintColor={"#C1C0C9"}
                  />

                
                  <Text style={[styles.email, { marginLeft: "5%" }]}>
                    Wallet
                  </Text>
                </View>
                <VECTOR_ICONS.AntDesign
                  name={"right"}
                  size={Platform.OS === "ios" ? 14 : 18}
                  color={"rgba(38, 38, 38, 1)"}
                />
              </TouchableOpacity>
              <View style={styles.lineStyle}></View>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Security");
                }}
                style={styles.touchableopacitystyle}
              >
                <View style={styles.textstyle}>
                  <Image
                    source={require("../../assets/Images/mdi_security-off.png")}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                    tintColor={"#C1C0C9"}
                  />

              
                  <Text style={[styles.email, { marginLeft: "5%" }]}>
                    Security
                  </Text>
                </View>
                <VECTOR_ICONS.AntDesign
                  name={"right"}
                  size={Platform.OS === "ios" ? 14 : 18}
                  color={"rgba(38, 38, 38, 1)"}
                />
              </TouchableOpacity> 
              <View style={styles.lineStyle}></View>*/}
              <TouchableOpacity
                onPress={handleSuggestFriend}
                style={styles.touchableopacitystyle}
              >
                <View style={styles.textstyle}>
                  <Image
                    source={require("../../assets/Images/fa-solid_user-friends.png")}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                    tintColor={"#C1C0C9"}
                  />

                  {/* <VECTOR_ICONS.MaterialIcons
                    name={"support-agent"}
                    size={27}
                    color={"rgba(193, 192, 201, 1)"}
                  /> */}
                  <Text allowFontScaling={false} style={[styles.email, { marginLeft: "5%" }]}>
                    {t('suggest_friend')}
                  </Text>
                </View>
                <VECTOR_ICONS.AntDesign
                  name={"right"}
                  size={Platform.OS === "ios" ? 14 : 18}
                  color={"rgba(38, 38, 38, 1)"}
                />
              </TouchableOpacity>
              <View style={styles.lineStyle}></View>
              <TouchableOpacity
                onPress={() => {
                  // props.navigation.navigate("DemoChat");
                  props.navigation.navigate("ChatSocket");
                }}
                style={styles.touchableopacitystyle}
              >
                <View style={styles.textstyle}>
                  <Image
                    source={require("../../assets/Images/icon-park-solid_message.png")}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                    tintColor={"#C1C0C9"}
                  />

                  {/* <VECTOR_ICONS.MaterialIcons
                    name={"support-agent"}
                    size={27}
                    color={"rgba(193, 192, 201, 1)"}
                  /> */}
                  <Text allowFontScaling={false} style={[styles.email, { marginLeft: "5%" }]}>
                   
                    {t('messages')}
                  </Text>
                </View>
                <VECTOR_ICONS.AntDesign
                  name={"right"}
                  size={Platform.OS === "ios" ? 14 : 18}
                  color={"rgba(38, 38, 38, 1)"}
                />
              </TouchableOpacity>
              <View style={styles.lineStyle}></View>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("HelpAndSupport");
                }}
                style={styles.touchableopacitystyle}
              >
                <View style={styles.textstyle}>
                  <Image
                    source={require("../../assets/Images/helpnsupp.png")}
                    resizeMode="contain"
                    style={{ width: 26, height: 26 }}
                    tintColor={"#C1C0C9"}
                  />

                  {/* <VECTOR_ICONS.MaterialIcons
                    name={"support-agent"}
                    size={27}
                    color={"rgba(193, 192, 201, 1)"}
                  /> */}
                  <Text allowFontScaling={false} style={[styles.email, { marginLeft: "5%" }]}>
                  
                    {t('help_support')}
                  </Text>
                </View>
                <VECTOR_ICONS.AntDesign
                  name={"right"}
                  size={Platform.OS === "ios" ? 14 : 18}
                  color={"rgba(38, 38, 38, 1)"}
                />
              </TouchableOpacity>
              <View style={styles.lineStyle}></View>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Termsandconditions");
                }}
                style={styles.touchableopacitystyle}
              >
                <View style={styles.textstyle}>
                  <Image
                    source={require("../../assets/Images/terrr.png")}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                    tintColor={"#C1C0C9"}
                  />

                  {/* <VECTOR_ICONS.MaterialIcons
                    name={"support-agent"}
                    size={27}
                    color={"rgba(193, 192, 201, 1)"}
                  /> */}
                  <Text allowFontScaling={false} style={[styles.email, { marginLeft: "5%" }]}>
                    
                    {t('terms_conditions')}
                  </Text>
                </View>
                <VECTOR_ICONS.AntDesign
                  name={"right"}
                  size={Platform.OS === "ios" ? 14 : 18}
                  color={"rgba(38, 38, 38, 1)"}
                />
              </TouchableOpacity>
              <View style={styles.lineStyle}></View>
              <TouchableOpacity
                onPress={handleShare}
                style={styles.touchableopacitystyle}
              >
                <View style={styles.textstyle}>
                  <Image
                    source={require("../../assets/Images/drivvvve.png")}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                    tintColor={"#C1C0C9"}
                  />

                  {/* <VECTOR_ICONS.MaterialIcons
                    name={"support-agent"}
                    size={27}
                    color={"rgba(193, 192, 201, 1)"}
                  /> */}
                  <Text allowFontScaling={false} style={[styles.email, { marginLeft: "5%" }]}>
                 
                    {t('become_driver')}
                  </Text>
                </View>
                <VECTOR_ICONS.AntDesign
                  name={"right"}
                  size={Platform.OS === "ios" ? 14 : 18}
                  color={"rgba(38, 38, 38, 1)"}
                />
              </TouchableOpacity>
              <View style={styles.lineStyle}></View>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("LanguageSwitchScreen");
                }}
                style={styles.touchableopacitystyle}
              >
                <View style={styles.textstyle}>
                  <Image
                    source={require("../../assets/Images/Language.png")}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                    tintColor={"#C1C0C9"}
                  />

                  {/* <VECTOR_ICONS.MaterialIcons
                    name={"support-agent"}
                    size={27}
                    color={"rgba(193, 192, 201, 1)"}
                  /> */}
                  <Text allowFontScaling={false} style={[styles.email, { marginLeft: "5%" }]}>
                    {t('Change Language')}
                  </Text>
                </View>
                <VECTOR_ICONS.AntDesign
                  name={"right"}
                  size={Platform.OS === "ios" ? 14 : 18}
                  color={"rgba(38, 38, 38, 1)"}
                />
              </TouchableOpacity>
              <View style={styles.lineStyle}></View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
                style={styles.touchableopacitystyle}
              >
                <View style={styles.textstyle}>
                  {/* <VECTOR_ICONS.MaterialCommunityIcons
                    name={"login"}
                    size={27}
                    color={"rgba(193, 192, 201, 1)"}
                  /> */}
                  <Image
                    source={require("../../assets/Images/solar_logout-2-bold.png")}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                    tintColor={"#C1C0C9"}
                  />

                  <Text allowFontScaling={false} style={[styles.email, { marginLeft: "5%" }]}>
                   {t('logout')}
                  </Text>
                </View>
                <VECTOR_ICONS.AntDesign
                  name={"right"}
                  size={Platform.OS === "ios" ? 14 : 18}
                  color={"#4a4946"}
                />
              </TouchableOpacity>
              <View style={styles.lineStyle}></View>
            </View>
          </ScrollView>
          <ModalComponent
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            Message={t("Are you sure do you want to Logout ?")}
            modalstyle={{}}
            head={t("Logout")}
            Button12
            btn1={t("No")}
            btn2={t("Yes")}
            Action={() => {
              OnActionPress();
            }}
            source={IMAGEPATH.Logout}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default AccountMenu;

const styles = StyleSheet.create({
  headerview: {
    width: WIDTH,
    height: HEIGHT * 0.07,
    backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
    justifyContent: "center",
  },
  innerhead: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
  },
  head: {
    textAlign: "center",
    color: COLORS.WHITE,
    fontFamily: FONTS.bold,
    fontSize: 18,
    fontWeight: Platform.OS === "ios" ? "700" : "400",
    // width: "65%",
    // alignSelf: "center",
    // marginLeft:'10%'
  },
  firstView1: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  profileImgStyle: {
    height: 140,
    width: 140,
    borderRadius: 100,
    resizeMode: "cover",
    marginTop: 20,
  },
  profileStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  email: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: "#242E42",
  },
  username: {
    width: WIDTH * 0.9,
    color: "rgba(36, 46, 66, 1)",
    fontSize: 18,
    fontFamily: FONTS.bold,
    // marginTop: '4%',
    // fontWeight: "700",
    textAlign: "center",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  lineStyle: {
    borderBottomColor: "rgba(236, 236, 236, 1)",
    borderBottomWidth: 4,
    width: WIDTH,
    alignSelf: "center",
  },
  touchableopacitystyle: {
    width: WIDTH * 0.97,
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: "3%",
    alignItems: "center",
  },
  textstyle: { flexDirection: "row", alignItems: "center", width: WIDTH * 0.7 },
});
