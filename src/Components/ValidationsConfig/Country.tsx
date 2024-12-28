import {
  Text,
  TouchableOpacity,
  View,
  Platform,
  StyleSheet,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, FONTS, VECTOR_ICONS } from "../../assets/Theme";
import { CountryPicker } from "react-native-country-codes-picker";
import { HEIGHT, WIDTH } from "../Helpers/Dimentions";
const Coutry = (
  { setCountrycode, countryCode1, code, flag1, setFlags }: any,
  props: any
) => {
  const [showCountryCodePicker, setShowCountryCodePicker] = useState(false);
  const [flag, setFlag] = useState(flag1 || "🇦🇴");
  // // console.log("flag----flag---flag", flag);
  const [countryCode, setCountryCode] = useState("+91");

  return (
    <View style={{ width: "40%", flexDirection: "row", }}>
      <CountryPicker
        show={showCountryCodePicker}
        lang={"en"}
        style={{
          // Styles for whole modal [View]
          modal: {
            height: Platform.OS === "ios" ? 600 : 500,
            backgroundColor: "white",
          },
          // Styles for modal backdrop [View]
          backdrop: { backgroundColor: "rgba(0,0,0,0.5)" },
          // Styles for bottom input line [View]
          line: {},
          // Styles for list of countries [FlatList]
          itemsList: {},
          // Styles for input [TextInput]
          textInput: {
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.15)",
            fontFamily: "Poppins-Regular",
            color: "black",
          },
          // Styles for country button [TouchableOpacity]
          countryButtonStyles: {
            height: 50,
          },
          // Styles for search message [Text]
          searchMessageText: {
            color: "black",
          },
          // Styles for search message container [View]
          countryMessageContainer: {},
          // Flag styles [Text]
          flag: { fontSize: 13, color: "black" },
          // Dial code styles [Text]
          dialCode: {
            fontFamily: "Poppins-Regular",
            fontSize: 13,
            color: "black",
          },
          // Country name styles [Text]
          countryName: {
            fontFamily: "Poppins-Regular",
            fontSize: 13,
            color: "black",
          },
        }}
        onBackdropPress={() => {
          // console.log("asd");
          setShowCountryCodePicker(false);
        }}
        pickerButtonOnPress={(item) => {
          setCountrycode(item.dial_code);
          // console.log(item);
          setFlag(item.flag);
          setCountryCode(item.dial_code);
          setFlags(item?.flag);
          setShowCountryCodePicker(false);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setShowCountryCodePicker(true);
        }}
        style={[styles.textStyle, props.styles]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: WIDTH * 0.17,
            justifyContent: "space-evenly",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: FONTS.medium,
              fontSize: 17,
              color: "black",
              paddingLeft: "4%",
            }}
          >
            {flag}{" "}
          </Text>

          <VECTOR_ICONS.AntDesign name="caretdown" color={COLORS.BLACK} />
        </View>
        <View
          style={{
            backgroundColor: "rgba(239, 239, 244, 1)",
            width: WIDTH * 0.001,
            height: "120%",
          }}
        ></View>
        <Text
          allowFontScaling={false}
          style={{
            color: COLORS.BLACK,
            fontFamily: FONTS.light,
            fontSize: 17,
            marginLeft: 10,
            marginRight: 7
          }}
        >
          {countryCode1 ?? countryCode}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Coutry;
const styles = StyleSheet.create({
  textStyle: {
    backgroundColor: "white",
    flexDirection: "row",
    paddingVertical: "11%",
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    // width: WIDTH * 0.34,
    alignItems: "center",
  },
});
