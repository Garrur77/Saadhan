import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import Header from "../../Components/HeaderComponent/Header";
import InputFiled from "../../Components/ValidationsConfig/InputField";
import {
  ValidateEmail,
  ValidateFullname,
  ValidateMobileNumber,
  ValidationMessageBox,
} from "../../Components/ValidationsConfig/Validations";
import { COLORS, FONTS, IMAGEPATH } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import WholeButton from "../../Components/Wholebutton/Wholebutton";
import ModalComponent from "../../Components/ModalComponent/ModalComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { submitQuery } from "../../ApiConfig/Endpoints";
import { callPostApi } from "../../ApiConfig/ApiCall";
import SpiningLoader from "../../assets/SpiningLoader";
import { useTranslation } from "react-i18next";


const SubmitYourQuery = (props: any) => {
  const {t} = useTranslation();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Nameerror, setNameerror] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [msg, setMsg] = useState("");
  const [Loader, setLoader] = useState(false);
  const [msgError, setmsgError] = useState("");
  const [ShowError, setShowError] = useState({
    emailError: false,
    fullNmError: false,
    phoneerror: false,
    messageError: false,
  });

  //submitQuery api 
  const SubmitQuery = async () => {
    setLoader(true);
    try {
      const postData = {
        name: Name,
        email: Email,
        phone: phone,
        message: msg
      }
      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        submitQuery,
        postData,
        SucessDisplay
      );
      setLoader(loading);
      // console.log('querttt', response)
      if (error) {
        console.error("API Error:", error);
        setLoader(false);
      }
      if (response?.responseCode === 200) {
        setLoader(false);
        props.navigation.navigate("HelpAndSupport");
        // props?.navigation
      }
    } catch (error) {
      // console.log('errordfsdfsdfs', error)
      setLoader(false);
    }
  }


  const Submit = () => {
    let emailErr = ValidateEmail(Email , t);
    let nameErr = ValidateFullname(Name , t);
    let phoneErr = ValidateMobileNumber(phone , t);
    let MessageError = ValidationMessageBox(msg , t);
    if (
      emailErr === "" &&
      nameErr === "" &&
      phoneErr === "" &&
      MessageError === ""
    ) {

      SubmitQuery()
    } else {
      setEmailError(emailErr);
      setNameerror(nameErr);
      setPhoneError(phoneErr);
      setmsgError(MessageError);
      setShowError({
        emailError: true,
        fullNmError: true,
        phoneerror: true,
        messageError: true,
      });
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
          Heading={t("Submit Your Query")}
          HeaderStyle={{ marginLeft: "14%" }}
        />

        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <InputFiled
            InputFieldStyle={{
              width: WIDTH * 0.93,
              alignSelf: "center",
              marginTop: "6%",
              borderRadius: 10,
              borderColor: "#ECECEC",
              borderWidth: 1,
            }}
            placeholder={t("Your name")}
            MaxLength={256}
            value={Name}
            onBlur={() => {
              if (Name != "" || Name != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  fullNmError: true,
                }));
              }
            }}
            onEndEditing={() => {
              // Validate the phone number when the TextInput loses focus
              setNameerror(ValidateFullname(Name,t));
            }}
            onChangeText={(text: string) => {
              if (Name != "" || Name != undefined) {
                setName(text);
                // setNameerror(ValidateFullname(text));
              }
            }}
            ShowError={ShowError.fullNmError}
            Error={Nameerror}
            Errorstyle={{ right: "8%" }}
          />
          <InputFiled
            placeholder={t("Your Email")}
            value={Email}
            MaxLength={256}
            InputFieldStyle={{
              width: WIDTH * 0.93,
              alignSelf: "center",
              borderRadius: 10,

              borderColor: "#ECECEC",
              borderWidth: 1,
            }}
            onBlur={() => {
              if (Email != "" || Email != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  emailError: true,
                }));
              }
            }}
            onEndEditing={() => {
              // Validate the phone number when the TextInput loses focus
              setEmailError(ValidateEmail(Email , t));
            }}
            onChangeText={(text: string) => {
              if (Email != "" || Email != undefined) {
                setEmail(text);
                // setEmailError(ValidateEmail(text));
              }
            }}
            ShowError={ShowError.emailError}
            Error={EmailError}
            Errorstyle={{ right: "8%" }}
          />
          <InputFiled
            placeholder={t("Your Phone number")}
            MaxLength={18}
            value={phone}
            keyboardType="number-pad"
            InputFieldStyle={{
              width: WIDTH * 0.93,
              alignSelf: "center",
              borderRadius: 10,

              borderColor: "#ECECEC",
              borderWidth: 1,
            }}
            onBlur={() => {
              if (phone != "" || phone != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  phoneerror: true,
                }));
              }
            }}
            onEndEditing={() => {
              // Validate the phone number when the TextInput loses focus
              setPhoneError(ValidateMobileNumber(phone,t));
            }}
            onChangeText={(num: string) => {
              if (phone != "" || phone != undefined) {
                setPhone(num);
                // setPhoneError(ValidateMobileNumber(num));
              }
            }}
            ShowError={ShowError.phoneerror}
            Error={phoneError}
            Errorstyle={{ right: "8%" }}
          />
          <View style={styles.LargeView}>
            <TextInput
              allowFontScaling={false}
              style={styles.textinput}
              placeholder={t("Message....")}
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              multiline={true}
              value={msg}
              onBlur={() => {
                setmsgError(ValidationMessageBox(msg ,t));
                if (msg != "" || msg != undefined) {
                  setShowError((prevState) => ({
                    ...prevState,
                    messageError: true,
                  }));
                }
              }}
              onEndEditing={() => {
                // Validate the phone number when the TextInput loses focus
                setmsgError(ValidationMessageBox(msg ,t));
              }}
              onChangeText={(Msgid: string) => {
                setMsg(Msgid);
                if (msgError) {
                  setmsgError(ValidationMessageBox(Msgid ,t));
                }
                if (msg != "" || msg != undefined) {
                  setmsgError(ValidationMessageBox(msg,t));
                }
              }}
            />
          </View>
          {msgError && (
            <Text allowFontScaling={false} style={[styles.errorStyle, { marginLeft: "13%" }]}>
              {msgError}
            </Text>
          )}

          <WholeButton
            styles={{
              backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
              color: COLORS.WHITE,
              marginTop: "9%",
            }}
            Label={t("SUBMIT")}
            Action={() => {
              Submit();
            }}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <SpiningLoader loader={Loader} />
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default SubmitYourQuery;

const styles = StyleSheet.create({
  LargeView: {
    backgroundColor: COLORS.WHITE,
    height: HEIGHT / 3.4,
    width: WIDTH * 0.92,
    alignSelf: "center",
    marginTop: "1%",
    borderRadius: 10,
    padding: "2%",
    borderColor: "#ECECEC",
    borderWidth: 1,
    color: "#262626",
  },
  errorStyle: {
    color: COLORS.ERRORCOLORRED,
    fontSize: 13,
    fontFamily: FONTS.medium,
    marginTop: 2,
    fontWeight: "400",
    right: "6%",
    width: WIDTH * 0.9,
    alignSelf: "center",
  },
  textinput: {
    color: "#262626",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15,
    fontFamily: FONTS.regular,
    height: HEIGHT / 3.7,
    textAlignVertical: "top",
  },
});
