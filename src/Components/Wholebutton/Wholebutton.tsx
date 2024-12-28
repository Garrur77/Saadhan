import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { COLORS, FONTS, VECTOR_ICONS } from "../../assets/Theme";
import GoogleSvg from "../../Components/SvgComponent/Login/GoogleSvg";
import { HEIGHT } from "../Helpers/Dimentions";

const WholeButton = (props: any) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.Action}
      style={[
        styles.WholeButtonStyle,
        props.styles,
        {
          flexDirection: props?.Facebook || props?.Google ? "row" : "",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
      ]}
      {...props}
    >
      {props?.Facebook && (
        <VECTOR_ICONS.EvilIcons
          name={"sc-facebook"}
          size={45}
          color={"white"}
          style={{ marginBottom: "1%" }}
        />
      )}
      {props?.Google && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1%",
          }}
        >
          <GoogleSvg />
        </View>
      )}
      <Text
        allowFontScaling={false}
        style={[
          styles.buttonText,
          {
            color: props?.Google ? "#262626" : COLORS.WHITE,
            fontWeight: Platform.OS === "ios" ? "600" : "400",
          },
          props.headingstyle,
        ]}
      >
        {props.Label}
      </Text>
    </TouchableOpacity>
  );
};

export default WholeButton;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 17,
    // textTransform: "capitalize",
    textAlign: "center",
    fontFamily: FONTS.bold,
    // margin: 7,
  },
  WholeButtonStyle: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical: 6,
    borderRadius: 8,
    height: HEIGHT * 0.06,
    backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
  },
});
