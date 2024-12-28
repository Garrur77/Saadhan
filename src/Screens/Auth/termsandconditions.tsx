import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS } from "../../assets/Theme";
import { WIDTH } from "../../Components/Helpers/Dimentions";
import Header from "../../Components/HeaderComponent/Header";
import { callGetApi } from "../../ApiConfig/ApiCall";
import { fetchStaticContent } from "../../ApiConfig/Endpoints";
import { useIsFocused } from "@react-navigation/native";
import HTMLView from "react-native-htmlview";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Termsandconditions = (props: any) => {
  const {t} = useTranslation();
  const [Loader, setLoader] = useState(false);
  const [data, setData] = useState("");
  const isfocus = useIsFocused();

  const TermsConditon = async () => {
    setLoader(true);
    try {
      const response = await axios({
        method: "get",
        url: fetchStaticContent,
      });

      if (response?.data?.responseCode === 200) {
        // console.log("dgfdshgjgfhgd", response?.data);

        const termsData = response?.data?.data?.filter(
          (item) => item?.type === "Terms & conditions"
        );
        // console.log('vasghbvadhbvsa', { termsData })
        setData(termsData);
        setLoader(false);
      }
    } catch (error: any) {
      console.error("Error during register:", error, error.response);
    }
  };
  useEffect(() => {
    TermsConditon();
  }, [isfocus]);

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
        <Header
          navigation={props?.navigation}
          Heading={t("terms_conditions")}
          HeaderStyle={{ marginLeft: "10%" }}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingVertical: 20, paddingHorizontal: 15 }}>
            <HTMLView value={data[0]?.description} stylesheet={styles} />
          </View>
          {/* <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={style.emptyListComponent}>
                <Text style={style.emptyListText}>No data found</Text>
              </View>
            )}
            renderItem={(item: any) => {
              return (
                <View style={style.mainView}>
                  <Text style={style.textStyle}>{data[0]?.title}</Text>
                  <View style={{ flexDirection: "row" }}>
                    {item?.item?.num && (
                      <Text style={style.textStyle1}>{data[0].description}</Text>
                    )}
                    <Text style={style.textStyle1}>{data[0].description}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    {item?.item?.num2 && (
                      <Text style={style.textStyle1}>{item?.item?.num2}</Text>
                    )}
                    <Text style={style.textStyle1}>{item?.item?.text1}</Text>
                  </View>
                  {item?.item?.num3 && (
                    <View style={{ flexDirection: "row" }}>
                      <Text style={style.textStyle1}>{item?.item?.num3}</Text>

                      <Text style={style.textStyle1}>{item?.item?.text1}</Text>
                    </View>
                  )}
                </View>
              );
            }}
          /> */}
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default Termsandconditions;
const styles = StyleSheet.create({
  mainView: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    paddingVertical: "3.5%",
  },
  text: {
    fontSize: 14,
    color: "#242E42",
    marginTop: Platform.OS === "ios" ? 0 : 10,
    // fontFamily: "AirbnbCerealMedium",
  },
  textStyle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.BuleText,
    paddingVertical: "3.5%",
  },
  p: {
    color: "#242E42", // make links coloured pink
    lineHeight: 20,
    fontSize: 15,
  },
  textStyle1: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: "rgba(0, 0, 0, 0.6)",
    paddingVertical: "2%",
    lineHeight: 20,
  },
  emptyListComponent: {
    flex: 1,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 20,
  },
  emptyListText: {
    fontSize: 16,
    color: "#555", // Customize the color
  },
});
