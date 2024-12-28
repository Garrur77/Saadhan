import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from "react-native";
import React, { useState } from "react";

import Amountaddmodal from "../../Components/ModalComponent/AmountAddModal";
import Header from "../../Components/HeaderComponent/Header";
import { COLORS, FONTS, IMAGEPATH } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import WholeButton from "../../Components/Wholebutton/Wholebutton";

const { height, width } = Dimensions.get("screen");
const options = [" $200", "$500", "$1000", "$2000", "$2500"];

const AddFunds = (props: any) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    // props.navigation.navigate('BottomTabBar')
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Header
          navigation={props?.navigation}
          Heading={"Add Funds"}
          Action={() => {
            props.navigation.goBack();
          }}
          HeaderStyle={{ marginLeft: "10%" }}
        />
        <View style={styles.container}>
          {/* <View
            style={{
              backgroundColor: "#242E42",
              height: height * 0.135,
              borderRadius: 5,
            }}
          > */}
          {/* <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Image
                source={require("./images/img.png")}
                style={{ height: 41, width: 44.5 }}
              />
            </View> */}

          <ImageBackground
            source={IMAGEPATH.Wallet}
            style={{
              width: WIDTH * 0.9,
              height: HEIGHT * 0.15,
              alignSelf: "center",
            }}
            imageStyle={{
              resizeMode: "stretch",
            }}
          >
            <View style={styles.viewStyle}>
              <Text allowFontScaling={false} style={styles.currentStyle}>Current Balance</Text>
              <TouchableOpacity>
                <Text allowFontScaling={false} style={styles.currentStyle1}>$7890</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "600", color: "#FFF" }}>
                Current Balance
              </Text>
              <Text allowFontScaling={false} style={{ fontSize: 20, fontWeight: "700", color: "#FFF" }}>
                $7890
              </Text>
            </View> */}
          {/* </View> */}

          {/* <View style={styles.amountInputContainer}>  */}
          <Text allowFontScaling={false} style={styles.amountInputLabel}>Enter Amount</Text>
          <View style={styles.amountInput}>
            <TextInput
              allowFontScaling={false}
              placeholder="Amount"
              placeholderTextColor="#BEBEBE"
              style={{ marginHorizontal: "4%", color: "#262626" }}
            />
          </View>
          {/* </View> */}

          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              width: WIDTH * 0.9,
            }}
          >
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.option,
                  selectedOption === option && styles.selectedOption,
                ]}
                onPress={() => handleOptionSelect(option)}
              >
                <Text
                  allowFontScaling={false} style={[
                    styles.optionText,
                    selectedOption === option && styles.selectedOptionText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text allowFontScaling={false} style={styles.minBalanceText}>
            The advised minimum wallet balance to maintain is $200.
          </Text>

          <WholeButton
            styles={{
              backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
              color: COLORS.WHITE,
              marginTop: "8%",
              width: WIDTH * 0.9,
            }}
            Action={() => {
              props.navigation.navigate("OtpVerifywallet");
            }}
            Label={"ADD FUNDS"}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  // amountInputContainer: {
  //   marginTop: 40,
  // },
  amountInputLabel: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: "#262626",
    marginTop: 20,
  },
  amountInput: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#EFEFF4",
    marginVertical: 10,
    // backgroundColor:'red',
    height: 50,
    textAlign: "center",
    justifyContent: "center",
  },
  option: {
    backgroundColor: "rgba(36, 46, 66, 0.1)",
    borderRadius: 20,
    paddingHorizontal: 9,
    marginHorizontal: 2,
    padding: 4,
    marginVertical: "5%",
    alignItems: "center",
    textAlign: "center",
    // height:HEIGHT*0.042,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#242E42",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: "10%",
    marginHorizontal: 2.5,
  },
  selectedOption: {
    backgroundColor: "#FF5500",
  },
  selectedOptionText: {
    //   color: "#your-selected-text-color",
    color: "#FFFFFF",
  },
  minBalanceText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#A0A0A0",
  },
  addButton: {
    backgroundColor: "#FF5500",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 10,
  },
  addButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewStyle: {
    alignSelf: "center",
    width: WIDTH * 0.68,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: "12%",
    alignItems: "center",
  },
  currentStyle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.WHITE,
  },
  currentStyle1: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.WHITE,
  },
});

export default AddFunds;
