import React, { useState, useEffect } from "react";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  SafeAreaView, StatusBar
} from "react-native";
import Header from "../../Components/HeaderComponent/Header";
import { COLORS, FONTS, IMAGEPATH } from "../../assets/Theme";
import EnterPasscodesvg from "../../Components/SvgComponent/Account/EnterPasscodesvg";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import { newPasscode } from "../../ApiConfig/Endpoints";
import SpiningLoader from "../../assets/SpiningLoader";
import { callPostApi } from "../../ApiConfig/ApiCall";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";


const ConfirmInitialPasscode = (props: any) => {
  const {t} = useTranslation();

  const newpasscode = props?.route?.params?.newcode;
  // console.log('hsfbgds', newpasscode)
  const isfocus = useIsFocused();

  const [code, setcode] = useState(" ");
  const [Loader, setLoader] = useState(false)
  const RegisterTOKEN = useSelector((state: RootState) => state.REGISTER_TOKEN.RegisterTOKEN)
  // console.log('tokeennn', RegisterTOKEN)


  ///new Passcode
  const newPsscode = async () => {
    setLoader(true);
    try {
      const postData = {
        token: RegisterTOKEN,
        passcode: newpasscode,
        confirmPasscode: code
      }
      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        newPasscode,
        postData,
        SucessDisplay
      );
      setLoader(loading);
      // console.log('forgot', response)
      if (error) {
        console.error("API Error:", error);
        setLoader(false);
      }
      if (response?.responseCode === 200) {
        setLoader(false);
        props?.navigation?.navigate("Security")
      }

    } catch (error) {
      // console.log('errordfsdfsdfs', error)
      setLoader(false);
    }
  }

  useEffect(() => {
    if (code.length === 4) {
      newPsscode()

    }
  }, [code, isfocus]);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}></SafeAreaView>
      <StatusBar
        backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
        barStyle={"dark-content"}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
        <Header navigation={props?.navigation} Heading={t("Re-enter New Passcode")} HeaderStyle={{ marginLeft: Platform.OS == "ios" ? WIDTH * 0.1 : WIDTH * 0.1 }} />
        <View style={styles.mainview}>
          <EnterPasscodesvg />
          <View style={styles.lineview}>
            <Text allowFontScaling={false} style={styles.heading}>{t('Re-enter New Passcode')}</Text>

            <View
              style={{
                width: WIDTH * 0.7,
                alignSelf: "center",
                alignItems: "center",
                marginVertical: "5%",
              }}
            >
              <Text allowFontScaling={false} style={styles.alltextstyle}>
                {t('ifforgetpassword')} 
                {t('reinstall')}
              </Text>
            </View>
            <OTPInputView
              style={{ width: WIDTH * 0.8, height: 80 }}
              pinCount={4}
              onCodeChanged={(code) => {
                setcode(code);
                // console.log("re-Code changed:", code);
              }}
              onCodeFilled={() => {
                // console.log("Code filled");
              }}
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
            />
          </View>
        </View>
      </SafeAreaView>
      <SpiningLoader loader={Loader} />
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default ConfirmInitialPasscode;

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 60,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 4,
    color: "rgba(36, 46, 66, 0.6)",
    borderColor: "#D8D8D8",
    fontSize: 20,
    fontFamily: FONTS.bold,
    // borderColor: otpError ? 'red' : '#F6F6F633',
  },
  underlineStyleHighLighted: {
    borderColor: "#242E42",
    borderBottomWidth: 4,
  },
  heading: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: "#242E42",
  },
  lineview: { marginVertical: "10%", alignItems: "center", width: WIDTH * 0.9 },
  mainview: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    alignItems: "center",
    marginVertical: "5%",
  },
  alltextstyle: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: "#8A8A8F",
    textAlign: "center",
  },
});
