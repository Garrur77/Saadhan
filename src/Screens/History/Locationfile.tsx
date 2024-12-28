import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import { FONTS, VECTOR_ICONS, COLORS, IMAGEPATH } from "../../assets/Theme";
import Receipt from "../../Components/SvgComponent/Booking/Receipt";
import Rated from "../../Components/SvgComponent/Booking/Rated";
import { WIDTH } from "../../Components/Helpers/Dimentions";
import RBSheet from "react-native-raw-bottom-sheet";
import BookDetailsCancle from "../../Components/RBSheetComponents/BookDetailsCancle";
import MapBackground from "../../Components/GlobalBackground/MapBackground";
import BookedDetailCompleted from "../../Components/RBSheetComponents/BookedDetailCompleted";
import Map1 from "../../Components/SvgComponent/Location/Map1";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useFocusEffect } from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import { roundOff } from "../../Utils/RoundOff";
import { MAP_KEY } from "../../ApiConfig/Endpoints";
const platformType = Platform.OS;
const Locationfile = (props: any) => {
  const myRef = useRef(null);
  const data = props?.route?.params?.data;
  // console.log("historyy====--===-==", data);

  // console.log("latt", data?.startLocation);
  const bottomSheetRef = useRef(null);

  const [intialLocation, setIntialLocation] = useState({
    // latitude: lat ?? location?.coords?.latitude,
    // longitude: long ?? location?.coords?.longitude,
    // latitudeDelta: 0.02,
    // longitudeDelta: 0.02,
    latitude: data?.startLocation?.latitude,
    longitude: data?.startLocation?.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const [mapRegion, setMapRegion] = useState({
    latitude: data?.startLocation?.latitude,
    longitude: data?.startLocation?.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  useEffect(() => {
    // Make sure bottomSheetRef is not null before calling methods on it
    // console.log("======", bottomSheetRef);

    if (bottomSheetRef.current) {
      setTimeout(() => {
        // console.log("bottomsheet opened");
        bottomSheetRef.current.open();
      }, 1000);
    }
  }, [props]);

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      setTimeout(() => {
        // console.log("bottomsheet opened");
        bottomSheetRef.current.close();
      }, 1000);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
        region={mapRegion}
        zoomEnabled={true}
        initialRegion={intialLocation}
        // style={StyleSheet.absoluteFill}
        ref={myRef}
        scrollEnabled={true}
        showsScale={true}
      >
        <MapViewDirections
          origin={{
            latitude: data?.startLocation?.latitude,
            longitude: data?.startLocation?.longitude,
          }}
          destination={{
            latitude: data?.endLocation?.latitude,
            longitude: data?.endLocation?.longitude,
          }}
          apikey={MAP_KEY}
          strokeWidth={5}
          strokeColor="rgba(255, 85, 0, 1)"
        />
        <Marker
          coordinate={{
            latitude: data?.startLocation?.latitude,
            longitude: data?.startLocation?.longitude,
          }}
        >
          <Image
            source={require("../../assets/Images/current.png")}
            style={{ width: 35, height: 35 }}
          />
        </Marker>
        <Marker
          coordinate={{
            latitude: data?.endLocation?.latitude,
            longitude: data?.endLocation?.longitude,
          }}
        >
          <Image
            source={require("../../assets/Images/ic_Pin.png")}
            style={{ width: 35, height: 45 }}
          />
        </Marker>
      </MapView>
      <View style={styles.mainView}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => props.navigation.navigate("BottomTabBar")}
        >
          <VECTOR_ICONS.Ionicons
            name="chevron-back"
            size={26}
            color={COLORS.WHITE}
            style={{ position: "absolute", top: 30, left: 50 }}
          />
        </TouchableOpacity>

        {/* BookedDetailCompleted */}
        <RBSheet
          ref={bottomSheetRef}
          height={440}
          closeOnDragDown={true}
          closeOnPressMask={true}
          onClose={() => {
            closeBottomSheet();
            // props.navigation.navigate('BottomTabBar')
          }}
          // onClose={() => {
          //     closeBottomSheet()
          //     // props.navigation.navigate('BottomTabBar')
          // }}
          customStyles={{
            container: styles.firstView1,
            draggableIcon: { opacity: 0 },
          }}
        >
          {/* <BookedDetailCompleted CloseSheeet={bottomSheetRef} Action={() => closeBottomSheet()} userHistory={data} /> */}
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: "5%",
                width: WIDTH * 0.5,
                marginHorizontal: "6%",
              }}
            >
              <Image source={IMAGEPATH.Man} />
              <View style={{ width: WIDTH * 0.4, marginLeft: "5%" }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 17,
                    fontFamily: FONTS.bold,
                    // alignSelf: "center",
                    color: "#242E42",
                    fontWeight: Platform.OS === "ios" ? "600" : "400",
                  }}
                >
                  <Text allowFontScaling={false}>
                    {" "}
                    {data?.driverId?.firstName ?? "Unknown"}
                  </Text>
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Image source={IMAGEPATH.star} style={{ marginTop: "3%" }} />
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: "#C8C7CC",
                      fontSize: 17,
                      fontFamily: FONTS.semibold,
                      marginLeft: "3%",
                      marginTop: Platform.OS === "ios" ? "2%" : "0%",
                    }}
                  >
                    4.9
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.line,
                { marginLeft: "1%", width: WIDTH * 0.9, marginTop: "1%" },
              ]}
            ></View>
            <View style={styles.topview}>
              <View
                style={{
                  marginTop: platformType == "ios" ? "13%" : "15%",
                  marginLeft: "8%",
                }}
              >
                <Map1 style={{ width: WIDTH * 0.068, height: 125 }} />
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: WIDTH * 0.85,
                        marginTop: "2%",
                      }}
                    >
                      <Text
                        allowFontScaling={false}
                        style={[styles.pickup, { marginTop: "4%" }]}
                      >
                        Pick Up
                      </Text>
                    </View>

                    <Text
                      allowFontScaling={false}
                      numberOfLines={2}
                      style={{
                        color: "#242E42",
                        fontSize: 15,
                        fontFamily: FONTS.semibold,
                        marginLeft: "5%",
                        width: WIDTH * 0.62,
                        marginTop: "2%",
                      }}
                    >
                      {data?.pickupAddress}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.line,
                    { marginLeft: "1%", width: WIDTH * 0.8, marginTop: "3%" },
                  ]}
                ></View>
                <View style={{ marginTop: "2%" }}>
                  <View>
                    <Text allowFontScaling={false} style={styles.pickup}>
                      Destination
                    </Text>
                    <Text
                      allowFontScaling={false}
                      numberOfLines={2}
                      style={{
                        color: "#242E42",
                        fontSize: 15,
                        fontFamily: FONTS.semibold,
                        marginLeft: "5%",
                        width: WIDTH * 0.62,
                        marginTop: "2%",
                      }}
                    >
                      {data?.destinationAddress}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.line,
                { marginLeft: "1%", width: WIDTH * 0.9, marginTop: "3%" },
              ]}
            ></View>

            <View style={styles.viewStyle}>
              <View style={{ flexDirection: "row" }}>
                <Text allowFontScaling={false} style={styles.price}>
                  PRICE :
                </Text>
                <Text allowFontScaling={false} style={styles.cost}>
                  ${roundOff(parseFloat(data?.fareAmount), 2)}
                </Text>
              </View>
            </View>

            <View style={styles.viewStyle1}>
              <TouchableOpacity
                onPress={() => {
                  closeBottomSheet();
                  props?.navigation.navigate("Receipt", { data: data });
                }}
                style={styles.viewStyle2}
              >
                <Image
                  source={require("../../assets/Images/reeee.png")}
                  style={{ width: 40, height: 40, marginRight: 10 }}
                />
                {/* <Receipt /> */}
                <Text allowFontScaling={false} style={styles.receiptStyle}>
                  Receipt
                </Text>
              </TouchableOpacity>
              <View style={styles.viewStyle2}>
                <Image
                  source={require("../../assets/Images/startt.png")}
                  style={{ width: 40, height: 40, marginRight: 10 }}
                />
                <Text allowFontScaling={false} style={styles.receiptStyle}>
                  {" "}
                  Rated - 5
                </Text>
              </View>
            </View>
          </>
        </RBSheet>
      </View>
    </SafeAreaView>
  );
};

export default Locationfile;
const styles = StyleSheet.create({
  firstView1: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.WHITE,
  },
  mainView: { width: WIDTH * 0.9, alignSelf: "center", position: "relative" },
  backIcon: {
    backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
    width: 46,
    height: 46,
    borderRadius: 23,
    marginVertical: "5%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: platformType == "ios" ? "5%" : "4%",
  },
  pickup: {
    color: "#242E42",
    fontSize: 16,
    fontFamily: FONTS.bold,
    marginLeft: "5%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  line: {
    backgroundColor: "#ECECEC",

    width: WIDTH * 0.9,
    height: 1,
    // marginTop: "5%",
    alignSelf: "center",
  },
  topview: {
    flexDirection: "row",
    width: WIDTH * 0.9,
    justifyContent: "space-between",
  },
  price: {
    color: "#8A8A8F",
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  cost: {
    color: COLORS.GRAY,
    fontSize: 16,
    fontFamily: FONTS.bold,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  viewStyle: {
    flexDirection: "row",
    // width: WIDTH * 0.2,
    justifyContent: "space-between",
    marginHorizontal: "6%",
    marginVertical: "4%",
    alignItems: "center",
  },
  viewStyle1: {
    flexDirection: "row",
    width: WIDTH * 0.54,
    justifyContent: "space-between",
    marginHorizontal: "9%",
    marginVertical: platformType == "ios" ? "2%" : "4%",
    marginBottom: "4%",
  },
  viewStyle2: {
    flexDirection: "row",
    width: WIDTH * 0.23,
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
  },
  receiptStyle: {
    color: "rgba(36, 46, 66, 1)",
    fontSize: 15,
    fontFamily: FONTS.medium,
  },
});
