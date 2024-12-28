import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
} from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../assets/Theme";
import { WIDTH } from "../../Components/Helpers/Dimentions";
import Header from "../../Components/HeaderComponent/Header";
const Privacypolicy = (props: any) => {
  const AboutUsDATA = [
    {
      id: 1,
      heder: "In publishing and graphic design?",
      text: "In publishing and graphic design, Lorem ipsum is a pla ce holder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
      text1:
        "In publishing and graphic design, Lorem ipsum is a pla ce holder text commonly used to demonstrate.",
    },
    {
      id: 2,
      heder: "In publishing and graphic design?",
      text: "In publishing and graphic design, or a typeface with out relying on meaningful content.",
      text1:
        "Various versions have evolved over the years, sometimes by accident,Various versions have evolved over the years, sometimes by accident,",
      text2:
        "In publishing and graphic design, or a typeface with out relying on meaningful content.",
      num: "1. ",
      num2: "2. ",
      num3: "3. ",
    },
    {
      id: 3,
      heder: "In publishing and graphic design?",
      text: "In publishing and graphic design, Lorem ipsum is a pla ce holder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.In publishing and graphic design.",
      text1:
        "In publishing and graphic design, Lorem ipsum is a pla ce holder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.In publishing holder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.In publishing and graphic design.",
    },
  ];
  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}
      ></SafeAreaView>
      <StatusBar
        backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
        barStyle={"dark-content"}
      />
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <Header navigation={props?.navigation} Heading={"Privacy Policy"} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={AboutUsDATA}
            showsVerticalScrollIndicator={false}
            renderItem={(item: any) => {
              return (
                <View style={style.mainView}>
                  <Text allowFontScaling={false} style={style.textStyle}>{item?.item?.heder}</Text>
                  <View style={{ flexDirection: "row" }}>
                    {item?.item?.num && (
                      <Text allowFontScaling={false} style={style.textStyle1}>{item?.item?.num}</Text>
                    )}
                    <Text allowFontScaling={false} style={style.textStyle1}>{item?.item?.text}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    {item?.item?.num2 && (
                      <Text allowFontScaling={false} style={style.textStyle1}>{item?.item?.num2}</Text>
                    )}
                    <Text allowFontScaling={false} style={style.textStyle1}>{item?.item?.text1}</Text>
                  </View>
                  {item?.item?.num3 && (
                    <View style={{ flexDirection: "row" }}>
                      <Text allowFontScaling={false} style={style.textStyle1}>{item?.item?.num3}</Text>

                      <Text allowFontScaling={false} style={style.textStyle1}>{item?.item?.text1}</Text>
                    </View>
                  )}
                </View>
              );
            }}
          />
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default Privacypolicy;
const style = StyleSheet.create({
  mainView: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    paddingVertical: "3.5%",
  },
  textStyle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.BuleText,
    paddingVertical: "3.5%",
  },
  textStyle1: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: "rgba(0, 0, 0, 0.6)",
    paddingVertical: "2%",
    lineHeight: 20,
  },
});
