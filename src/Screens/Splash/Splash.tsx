import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  ImageBackground,
  Dimensions,
  Alert,
  Linking,
  Platform,
  PermissionsAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, FONTS, IMAGEPATH } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import SplashComp from "../../Components/SvgComponent/Splash/SplashComp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import { CommonActions, useIsFocused } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen");
import Geolocation from "@react-native-community/geolocation";
import messaging from "@react-native-firebase/messaging";
import {
  setSaveAddress,
  setSavedCordinated,
} from "../../ReduxConfig/Location/locationSlice";
import { PERMISSIONS, request } from "react-native-permissions";
import axios from "axios";
import { setOpenModal } from "../../ReduxConfig/UserDetails/UserSlice";
import { MAP_KEY } from "../../ApiConfig/Endpoints";

const Splash = (props: any) => {
  const [showPopup, setShowPopup] = useState(false);
  const [addressLocation, setAddressLocation] = useState("");
  const isFocus = useIsFocused();
  const dispatch = useDispatch();

  const visitType = useSelector(
    (state: RootState) => state.userDetails.visitType
  );
  const RegisterTOKEN = useSelector(
    (state: RootState) => state.REGISTER_TOKEN.RegisterTOKEN
  );

  // console.log("RegisterTOKEN----check", RegisterTOKEN);

  const HandleNavigation = async () => {
    const token = await AsyncStorage.getItem("TOKEN");
    // console.log("tokkkkkkkkken---uber", token);

    if (RegisterTOKEN) {
      props?.navigation?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "BottomTabBar" }],
        })
      );
      // props.navigation.replace("BottomTabBar");
    } else {
      props?.navigation?.dispatch(
        CommonActions.reset({
          index: 0,
          // routes: [{ name: "Login" }],
          routes: [{ name: "OnboardingScreen" }],
        })
      );

      // props.navigation.replace("Login");
    }
  };

  const fetchLocationAddress = async (latitude, longitude) => {
    try {
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAP_KEY}`;

      axios
        .get(apiUrl)
        .then((response) => {
          const data = response.data;
          if (data.results && data.results.length > 0) {
            const address = data.results[0].formatted_address;
            dispatch(setSaveAddress(address));
            // setAddressLocation(address);
            // console.log("Address:", address);
          } else {
            // console.log("No results found");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {}
  };

  useEffect(() => {
    setTimeout(() => {
      HandleNavigation();
      setShowPopup(true);
    }, 3000);
  }, []);

  const requestCallPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          title: "Call Permission",
          message: "This app needs access to make emergency calls.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('Call permission granted');
      } else {
        // console.log('Call permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function requestPermissionLocation() {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Allow Ponttual to use your location?",
            message:
              "Ponttual App needs access to your device's location to provide accurate information.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else if (Platform.OS === "ios") {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        return result === "granted";
      } else {
        // Handle other platforms gracefully
        return false;
      }
    } catch (error) {
      // console.log('Error requesting location permission:', error);
      // Handle error gracefully, perhaps show an error message to the user
      return false;
    }
  }

  const getLocation = async () => {
    const result = requestPermissionLocation();
    result.then((res) => {
      if (res) {
        Geolocation.getCurrentPosition(
          (position) => {
            // // console.log("position-------appp.txn", position);
            dispatch(setSavedCordinated(position));
            // setLocation(position);
            fetchLocationAddress(
              position?.coords?.latitude,
              position?.coords?.longitude
            );
          },
          (error) => {
            // ExitApp.exitApp();
            // console.log("sdgdsfhdsh----198", error);
          },
          { enableHighAccuracy: false, timeout: 15000 }
        );
      } else {
        // ExitApp.exitApp();
        // console.log("location permission decline");
      }
    });
    // // console.log(location);
  };

  useEffect(() => {
    // console.log("check location calling");
    getLocation();
    dispatch(setOpenModal(false));
    requestCallPermission();
  }, [isFocus]);

  return (
    <>
      <ImageBackground
        source={require("../../assets/Images/Splash/SplashScreens.png")}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={require("../../assets/Images/Splash/Logo.png")}
          resizeMode="contain"
          style={styles.LOGOImage}
        />
        <Text allowFontScaling={false} style={styles.FirstText}>
          SAADHAN
        </Text>
        <Text allowFontScaling={false} style={styles.SecondText}>
        आपका SAFAR,HUMARI ज़िम्मेदारी 
        </Text>
        {/* <PermitionPopUp showPopup={showPopup} setShowPopup={setShowPopup} props={props}/> */}
        {/* </SafeAreaView> */}
      </ImageBackground>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
  },
  FirstText: {
    color: COLORS.WHITE,
    fontSize: 45,
    fontFamily: FONTS.bold,
    paddingTop: "3%",
    fontWeight: "600",
    fontStyle: "italic",
  },
  SecondText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontFamily: FONTS.bold,
    paddingTop: "1%",
  },
  LOGOImage: {
    height: HEIGHT * 0.15,
    width: WIDTH * 0.235,
  },
});
