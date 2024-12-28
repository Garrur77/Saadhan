import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Image,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, IMAGEPATH } from "../../assets/Theme";
import { WIDTH, HEIGHT } from "../../Components/Helpers/Dimentions";

import LocationBackground from "../../Components/GlobalBackground/LocationBackground";
import SplashComp from "../../Components/SvgComponent/Splash/SplashComp";
const platformType = Platform.OS;
const LocationPermission = (props: any) => {
  const OnAllowAction = () => {
    props.navigation.navigate("OnboardingScreen");
  };

  return (
    <>

      <ImageBackground
        source={require("../../assets/Images/Splash/SplashScreens.png")}
        style={{ flex: 1 }}
      >
        <View style={styles.ImageVIEW}>
          <SplashComp />
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginVertical: platformType === "ios" ? "43%" : "42%",
          }}
        >
          <View style={styles.MainView}>
            <Text allowFontScaling={false} style={styles.popupTextOne}>
              Allow “Pnottual” to use you location?
            </Text>
            <Text allowFontScaling={false} style={styles.popupTextTwo}>
              For a reliable ride, Ponttual collects Location data form the time
              you open the app until a trip ends. this improves pikups, support,
              and more.
            </Text>

            <View>
              <Image
                source={require("../../assets/Images/Map.png")}
                style={{
                  width: platformType === "ios" ? WIDTH * 0.7 : WIDTH * 0.7,
                  height:
                    platformType === "ios" ? HEIGHT * 0.22 : HEIGHT * 0.23,
                  resizeMode: "contain",
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                OnAllowAction();
              }}
              style={styles.AllowButton}
            >
              <Text allowFontScaling={false} style={styles.AllowText}>Allow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.AllowButton}>
              <Text allowFontScaling={false} style={styles.AllowText}>Don’t Allow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.AllowButton1]}
              onPress={() => {
                OnAllowAction();
              }}
            >
              <Text allowFontScaling={false} style={styles.AllowText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={styles.ImageVIEW}>
       <ImageBackground source={IMAGEPATH.Plogo}
      style={styles.LOGOImage}
      /> */}

        {/* </View> */}


      </ImageBackground>
    </>
  );
};

export default LocationPermission;

const styles = StyleSheet.create({
  // LOGOImage:{

  //     // height:platformType=="ios"?140:135,
  //     // width:platformType=="ios"?115:110,
  //     // resizeMode:"contain"
  //     width:90,
  //     height:110,
  //     resizeMode:"contain",

  // },
  // ImageVIEW:{

  //     alignItems:"center",
  //     marginTop:platformType=="ios"?'25%':"10%",
  //     position:'absolute',
  //     alignSelf:'center',
  // },
  ImageVIEW: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%",
    position: "absolute",
    alignSelf: "center",
    // backgroundColor:'blue',
  },
  MainView: {
    alignItems: "center",
    // height: HEIGHT * 0.6,
    width: WIDTH * 0.7,
    alignSelf: "center",
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
  },
  popupTextOne: {
    color: COLORS.BLACK,
    fontSize: 17,
    fontFamily: FONTS.bold,
    textAlign: "center",
    lineHeight: 22,
    paddingTop: "4%",
    width: WIDTH * 0.65,
  },
  popupTextTwo: {
    color: COLORS.BLACK,
    fontSize: 13,
    fontFamily: FONTS.medium,
    textAlign: "center",
    paddingHorizontal: "4%",
    paddingVertical: "2.5%",
    width: WIDTH * 0.65,
  },
  AllowText: {
    color: COLORS.BLUE,
    fontSize: 16,
    fontFamily: FONTS.semibold,
    textAlign: "center",
  },
  AllowButton: {
    borderBottomWidth: 0.5,
    borderBlockColor: "rgba(0, 0, 0, 0.24)",
    width: WIDTH * 0.7,
    paddingVertical: "3%",
    alignItems: "center",
  },
  EntireScreenView: {
    // backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
    flex: 1,
  },
  AllowButton1: {
    width: WIDTH * 0.7,
    paddingVertical: platformType == "ios" ? "3.4%" : "3%",
    alignItems: "center",
    justifyContent: "center",
  },
});
