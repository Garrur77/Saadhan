import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions, StatusBar
} from "react-native";

import CardDetails from "../../Components/ModalComponent/CardDetailsInfo";
import Header from "../../Components/HeaderComponent/Header";
import CardSvg from "../../Components/SvgComponent/Wallet/CardSvg";
import Walletsvg from "../../Components/SvgComponent/Wallet/Walletsvg";
import { WIDTH } from "../../Components/Helpers/Dimentions";
import { FONTS, COLORS } from "../../assets/Theme";

const { width } = Dimensions.get("window");

const CustomRadioButton = ({
  isSelected,
  onPress,
}: {
  isSelected: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: "row", alignItems: "center", }}
    >
      <View
        style={[{
          height: 16,
          width: 16,
          borderRadius: 12,
          borderWidth: 1.5,
          alignItems: "center",
          justifyContent: "center",

        }, { borderColor: isSelected ? "#FF5500" : "grey" }]}
      >
        {isSelected ? (
          <View
            style={{
              height: 11,
              width: 11,
              borderWidth: 1.5,
              borderRadius: 6,
              backgroundColor: "#FF5500",
              borderColor: "#FF5500",
            }}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const PaymentOptions = (props: any) => {
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}></SafeAreaView>
      <StatusBar
        backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
        barStyle={"dark-content"}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <Header navigation={props?.navigation} Heading={'Payment Options'}
          HeaderStyle={{ marginLeft: '14%' }} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.heading}>Payment Method</Text>
          </View>
          <View style={styles.line}></View>


          <View style={styles.radioButton}>
            <View style={styles.cashStyle}>
              <Walletsvg />
              <Text allowFontScaling={false} style={styles.genderTxt}>Cash</Text>
            </View>
            <CustomRadioButton
              isSelected={selectedGender === "Cash"}
              onPress={() => {
                setSelectedGender("Cash");
                setModalVisible(!isModalVisible);
              }}
            />
          </View>



          <View style={styles.radioButton1}>
            <View style={styles.cashStyle1}>
              <CardSvg />
              <View>
                <Text allowFontScaling={false} style={styles.genderTxt}>Ponttual Wallet</Text>
                <Text allowFontScaling={false} style={styles.curent}>Current Balance $ 80</Text>
              </View>
            </View>


            <CustomRadioButton
              isSelected={selectedGender === "Ponttual Wallet"}
              onPress={() => {
                setSelectedGender("Ponttual Wallet");
                setModalVisible(!isModalVisible);
              }}
            />

          </View>

          <CardDetails isOpen={isModalVisible} setIsOpen={setModalVisible} />
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  )
}

export default PaymentOptions


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  heading: {
    color: "#212121",
    fontFamily: FONTS.bold,
    fontSize: 16,


  },
  radioButton: {

    flexDirection: "row",
    marginVertical: '3%',
    alignSelf: 'center',
    width: WIDTH * 0.9,
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  radioButton1: {
    alignItems: 'center',
    flexDirection: "row",
    marginVertical: '1%',
    alignSelf: 'center',
    width: WIDTH * 0.9,
    justifyContent: 'space-between',

  },
  genderTxt: {

    color: '#262626',
    fontFamily: FONTS.medium,
    fontSize: 14,
  },
  line: {
    backgroundColor: "#ECECEC",
    width: WIDTH * 0.99,
    height: 2,
    marginTop: "4%",
    alignSelf: "center",
  },
  cashStyle: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: WIDTH * 0.19,
    flexDirection: 'row'
  },
  cashStyle1: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: WIDTH * 0.35,
    flexDirection: 'row'
  },
  curent: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: '#818181',
  }
});
