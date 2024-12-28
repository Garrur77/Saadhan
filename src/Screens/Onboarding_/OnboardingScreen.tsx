import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState, useCallback } from "react";
import OnBoarding1 from "../../Components/SvgComponent/OnBoarding1";
import OnBoarding2 from "../../Components/SvgComponent/OnBoarding2";
import OnBoarding3 from "../../Components/SvgComponent/OnBoarding3";
import { WIDTH, HEIGHT } from "../../Components/Helpers/Dimentions";
import { COLORS, FONTS } from "../../assets/Theme";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { CommonActions } from "@react-navigation/native";

import { t } from "i18next";
const platformType = Platform.OS;
const OnboardingScreen = (props: any) => {
  const [currentIndex, setCurrentIndex] = useState(true);

  const data = [
    {
      key: 1,
      image: "OnBoarding1",
      text: t("Request Ride"),
      text1: t("Request a ride get picked up by a nearby\ncommunity driver"),
    },
    {
      key: 2,
      image: "OnBoarding2",
      text: t("Confirm Your Driver"),
      text1:
        t("Huge drivers network helps you find \ncomforable, safe and cheap ride"),
    },
    {
      key: 3,
      image: "OnBoarding3",
      text: t("Track your ride"),
      text1:
        t("Know your driver in advance and view their current location on the map in real time"),
    },
  ];

  const renderTutorialComponent = useCallback((imageName) => {
    switch (imageName) {
      case "OnBoarding1":
        return <OnBoarding1 style={styles.imageStyle} />;
      case "OnBoarding2":
        return <OnBoarding2 style={styles.imageStyle} />;
      case "OnBoarding3":
        return <OnBoarding3 style={styles.imageStyle2} />;
      default:
        return null;
    }
  }, []);

  const getStartedHandler = () => {
    props?.navigation?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Introduction" }],
      })
    );
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.WHITE} barStyle={"dark-content"} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <SwiperFlatList
          keyExtractor={(item, index) => `${index}`}
          paginationStyleItem={{ height: 6, width: 22, marginRight: 15 }}
          paginationActiveColor="rgb(4, 61, 40)"
          paginationStyleItemActive={{ height: 6, width: 26 }}
          paginationDefaultColor="rgba(239, 239, 244, 1)"
          data={data}
          showPagination
          paginationStyle={{
            gap: -18.6,
            marginBottom: "3%",
            position: "absolute",
          }}
          renderItem={({ item, index }) => (
            <View style={styles.Viewstyle}>
              {renderTutorialComponent(item.image)}
              <View style={{ marginTop: "15%" }}>
                <Text allowFontScaling={false} style={styles.Textstyle}>
                  {item.text}
                </Text>
                <Text
                  numberOfLines={3}
                  allowFontScaling={false}
                  style={{
                    ...styles.hederText,
                    paddingHorizontal: index === 2 ? 22 : 0,
                  }}
                >
                  {item.text1}
                </Text>
              </View>
              {index === 2 && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={getStartedHandler}
                >
                  <Text allowFontScaling={false} style={styles.Textstyle1}>{t('GET STARTED')}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  Textstyle1: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  Viewstyle: {
    width: WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  hederText: {
    marginVertical: "6%",
    alignSelf: "center",
    fontFamily: FONTS.medium,
    fontSize: 17,
    color: COLORS.GRAY,
    textAlign: "center",
  },
  button: {
    marginTop: platformType === "ios" ? "10%" : "8%",
    width: platformType === "ios" ? WIDTH * 0.5 : WIDTH * 0.45,
    borderRadius: 7,
    padding: "3%",
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
  },
  Textstyle: {
    color: COLORS.BOARDBLACK,
    fontSize: 30,
    fontFamily: FONTS.bold,
    textAlign: "center",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  imageStyle: {
    alignSelf: "center",
  },
  imageStyle2: {
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? "15%" : "0%",
  },
});
