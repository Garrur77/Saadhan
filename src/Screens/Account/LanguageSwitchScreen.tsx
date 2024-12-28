import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import { COLORS, FONTS } from "../../assets/Theme";
import Header from "../../Components/HeaderComponent/Header";

const LanguageSwitchScreen = (props: any) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = async (languageCode) => {
    if (languageCode !== selectedLanguage) {
      await i18n.changeLanguage(languageCode);
      setSelectedLanguage(languageCode);
      props.navigation.navigate("AccountMenu"); // Navigate to the Account screen
    } else {
      // If the selected language is already active, just navigate to the Account screen
      props.navigation.navigate("AccountMenu");
    }
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
        <Header
          navigation={props?.navigation}
          Heading={"Change Language"}
          HeaderStyle={{ marginLeft: "10%" }}
        />
        <ScrollView
          contentContainerStyle={{ paddingBottom: 145 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ backgroundColor: "#fff" }}>
            <TouchableOpacity
              onPress={() => handleLanguageChange("en")}
              style={styles.touchableopacitystyle}
            >
              <View style={styles.textstyle}>
                <Image
                  source={require("../../assets/Images/en.png")}
                  resizeMode="contain"
                  style={{ width: 35, height: 35 }}
                />
                <Text
                  allowFontScaling={false}
                  style={[styles.email, { marginLeft: "5%" }]}
                >
                  {"English"}
                </Text>
              </View>
              {selectedLanguage === "en" && (
                <Image
                  source={require("../../assets/Images/check.png")}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: COLORS.BACKGROUNDBTNCOLOR,
                  }}
                />
              )}
            </TouchableOpacity>
            <View style={styles.lineStyle}></View>
            <TouchableOpacity
              onPress={() => handleLanguageChange("pt")}
              style={styles.touchableopacitystyle}
            >
              <View style={styles.textstyle}>
                <Image
                  source={require("../../assets/Images/pt.png")}
                  resizeMode="contain"
                  style={{ width: 35, height: 35 }}
                />
                <Text
                  allowFontScaling={false}
                  style={[styles.email, { marginLeft: "5%" }]}
                >
                  {t("Portuguese")}
                </Text>
              </View>
              {selectedLanguage === "pt" && (
                <Image
                  source={require("../../assets/Images/check.png")}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: COLORS.BACKGROUNDBTNCOLOR,
                  }}
                />
              )}
            </TouchableOpacity>
            <View style={styles.lineStyle}></View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  touchableopacitystyle: {
    width: WIDTH * 0.97,
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: "3%",
    alignItems: "center",
  },
  textstyle: { flexDirection: "row", alignItems: "center", width: WIDTH * 0.7 },
  email: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: "#242E42",
  },
  lineStyle: {
    borderBottomColor: "rgba(236, 236, 236, 1)",
    borderBottomWidth: 4,
    width: WIDTH,
    alignSelf: "center",
  },
});

export default LanguageSwitchScreen;
