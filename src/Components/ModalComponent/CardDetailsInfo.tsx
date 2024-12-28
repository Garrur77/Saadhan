import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox } from "react-native-paper";
import WholeButton from "../Wholebutton/Wholebutton";
import { COLORS, FONTS, VECTOR_ICONS } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../Helpers/Dimentions";
import Cancel from "../SvgComponent/Wallet1/Cancel";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
const { width, height } = Dimensions.get("screen");

interface CardDetailsInfoProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  props: any;
}

export default function CardDetailsInfo({
  isOpen,
  setIsOpen,
}: CardDetailsInfoProps): JSX.Element {
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState("");
  const {t} =useTranslation();

  return (

    <Modal
      transparent
      visible={isOpen}
      animationType="slide"
      onRequestClose={() => setIsOpen(false)}
    >
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.innercontainer}>
            <View
              style={{
                backgroundColor: "#F6F6F6",
                width: WIDTH,
                height: HEIGHT * 0.088,
                alignItems: "center",
                justifyContent: "center",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <View
                style={{
                  marginVertical: "5%",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  // width:Platform.OS==='ios' ?  WIDTH * 0.7 : WIDTH * 0.85,
                  // alignItems: 'center',

                  // marginLeft:Platform.OS==='ios' ? '12%' :'11%'
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: WIDTH * 0.82,
                  }}
                >
                  <Text allowFontScaling={false} style={styles.headText}>
                    {t('Enter Debit or Credit Card Details')}
                  </Text>
                </View>

                <TouchableOpacity
                  // style={{ marginLeft:Platform.OS==='ios' ? '13%' :'10%'}}
                  onPress={() => setIsOpen(!isOpen)}
                >
                  <Cancel />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.inputContainer}>
              <View style={styles.input2}>
                <TextInput
                  allowFontScaling={false}
                  style={styles.input8}
                  placeholder={t("Enter Amount")}
                  placeholderTextColor="#C8C7CC"
                  placeholderStyle={styles.placeholder}
                />
              </View>
              <View style={styles.input2}>
                <TextInput
                  allowFontScaling={false}
                  style={styles.input8}
                  placeholder={t("Card Number")}
                  placeholderTextColor="#C8C7CC"
                  placeholderStyle={styles.placeholder}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: WIDTH * 0.9,
                  alignSelf: "center",
                }}
              >
                <View style={styles.input3}>
                  <TextInput
                    allowFontScaling={false}
                    style={styles.inputStyle}
                    placeholder={t("Expiry/Validity")}
                    placeholderTextColor="#C8C7CC"
                    placeholderStyle={styles.placeholder1}
                  />
                </View>
                <View style={styles.input3}>
                  <TextInput
                    allowFontScaling={false}
                    style={styles.inputStyle}
                    placeholder="CVV"
                    placeholderTextColor="#C8C7CC"
                    placeholderStyle={styles.placeholder1}
                  />
                </View>
              </View>
              <View style={styles.checkboxContainer}>
                {/* <Checkbox
                  status={isChecked ? "checked" : "unchecked"}
                  onPress={() => setIsChecked(!isChecked)}
                  color="#F50"
                /> */}
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                  style={{
                    marginTop: "2.5%",
                    width: 20,
                    height: 20,
                  }}
                  // color="#F50"
                  boxType={"square"}
                  // onFillColor={COLORS.BACKGROUNDBTNCOLOR}
                  // tintColor={"#E9E9E9"}
                  // ontintColor={COLORS.BACKGROUNDBTNCOLOR}
                  tintColors={{
                    true: COLORS.BACKGROUNDBTNCOLOR,
                    false: "#E9E9E9",
                  }}
                  boxSize={14}
                // onCheckColor={"red"}
                />
                <Text allowFontScaling={false} style={styles.checkboxText}>
                  {t('Save card as per latest guidelines')}
                </Text>
              </View>
              <WholeButton
                styles={{
                  backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
                  color: COLORS.WHITE,
                  marginTop: "4%",
                  width: WIDTH * 0.9,
                }}
                Label={t("Continue")}
                Action={() => {
                  setIsOpen(false);
                  navigation.navigate("BankVerification");
                }}
              />

              {/* <View style={{ paddingTop: 20, marginBottom: 20 }}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttontext}>Continue</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>

  );
}

const styles = StyleSheet.create({
  headText: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: "#242E42",
    // marginRight: 20,
    // backgroundColor:'red',
    textAlign: "center",
  },
  placeholder: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.60)",
  },
  placeholder1: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.60)",
  },
  descText: {
    fontFamily: FONTS.light,
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.60)",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  innercontainer: {
    // padding: 10,
    paddingBottom: 45,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: height * 0.5,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  input2: {
    width: width * 0.9,
    borderWidth: 1,
    borderRadius: 8,
    height: height * 0.06,
    borderColor: "#EFEFF4",
    paddingLeft: 16,
    marginTop: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  input3: {
    width: width * 0.42,
    borderWidth: 1,
    borderRadius: 8,
    height: height * 0.06,
    borderColor: "#EFEFF4",
    paddingLeft: 16,
    marginTop: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  inputContainer: {
    alignSelf: "center",
    marginTop: 10,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 8,
    borderWidth: 1,
    width: width * 0.9,
    height: height * 0.07,
    backgroundColor: "#F50",
    borderColor: "#FF5500",
    justifyContent: "center",
    alignItems: "center",
  },
  buttontext: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  // checkboxContainer: {
  //   flexDirection: "row",
  //   marginRight:'30%',
  //  marginVertical:'2%'
  //  , marginTop: "5%",
  // },
  checkboxContainer: {
    flexDirection: "row",
    width: WIDTH * 0.9,
    alignSelf: "center",
    alignItems: "center",
    marginVertical: Platform.OS === "ios" ? "2%" : "1%",
  },
  checkboxText: {
    marginLeft: Platform.OS === "ios" ? 8 : "5%",
    fontSize: 14,
    color: "#212121",
    // marginLeft:"5%",
    marginTop: Platform.OS === "ios" ? "0%" : "1.5%",
  },
  line: {
    backgroundColor: "#ECECEC",
    width: WIDTH * 0.99,
    height: 1,
    alignSelf: "center",
  },
  input8: {
    width: WIDTH * 0.8,
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.60)",
  },
  inputStyle: {
    width: WIDTH * 0.35,
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.60)",
  },
});
