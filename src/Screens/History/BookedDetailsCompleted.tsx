import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
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
import {} from "react-native-svg";
import MapViewDirections from "react-native-maps-directions";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { roundOff } from "../../Utils/RoundOff";
import { MAP_KEY } from "../../ApiConfig/Endpoints";
import { useTranslation } from "react-i18next";

const platformType = Platform.OS;
const BookedDetailsCompleted = (props: any) => {
  const {t} = useTranslation();
  const myRef = useRef(null);
  const data = props?.route?.params?.data;
  // console.log("historyy====--===-==56599999", data);

  // console.log("latt", data?.startLocation);
  const bottomSheetRef = useRef(null);
  const bottomSheetModalRef1 = useRef(null);
  const snapPoints = useMemo(() => ["15%", "54%"], []);

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
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);

  const [mapRegion, setMapRegion] = useState({
    latitude: data?.startLocation?.latitude,
    longitude: data?.startLocation?.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  useEffect(() => {
    // console.log("======", bottomSheetRef);
    bottomSheetModalRef1.current?.present();
    // if (bottomSheetRef.current) {
    //   setTimeout(() => {
    //     // console.log("bottomsheet opened");
    //     bottomSheetRef.current.open();
    //   }, 1000);
    // }
  }, []);

  useEffect(() => {
    if (myRef.current && data?.startLocation && data?.endLocation) {
      myRef.current.fitToCoordinates(
        [
          {
            latitude: data.startLocation.latitude,
            longitude: data.startLocation.longitude,
          },
          {
            latitude: data.endLocation.latitude,
            longitude: data.endLocation.longitude,
          },
        ],
        {
          edgePadding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
          },
          animated: true,
        }
      );
    }
  }, [data]);

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MapView
          style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
          region={mapRegion}
          zoomEnabled={true}
          initialRegion={intialLocation}
          style={StyleSheet.absoluteFill}
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
              style={{ position: "absolute" }}
            />
          </TouchableOpacity>
        </View>

        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef1}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <View style={styles.firstView1}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: "5%",
                  width: WIDTH * 0.5,
                  marginHorizontal: "6%",
                }}
              >
                <Image
                  style={{ width: 55, height: 55, borderRadius: 100 }}
                  source={
                    data?.driverId?.profileImage
                      ? { uri: data?.driverId?.profileImage }
                      : IMAGEPATH.Man2
                  }
                  // source={ data?.driverId?.profileImage ? { uri: data?.driverId?.profileImage }
                  //     : IMAGEPATH.Man
                  // }
                />
                <View style={{ width: WIDTH * 0.4, marginLeft: "5%" }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 17,
                      fontFamily: FONTS.bold,
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
                    <Image
                      source={IMAGEPATH.star}
                      style={{ marginTop: "3%" }}
                    />
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
                      {data?.driverId?.reviewsAndRating?.rating ?? "2.2"}
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
                    marginTop: platformType == "ios" ? "13%" : "6%",
                    marginLeft: "8%",
                  }}
                >
                  <Map1 style={{ width: WIDTH * 0.068 }} />
                </View>
                <View style={{ flex: 1 }}>
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
                          {t('Pick Up')}
                        </Text>
                      </View>

                      <Text
                        allowFontScaling={false}
                        numberOfLines={3}
                        style={{
                          color: "#242E42",
                          fontSize: 15,
                          fontFamily: FONTS.semibold,
                          marginLeft: "5%",
                          // width: WIDTH * 0.62,
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
                      {
                        marginLeft: "1%",
                        width: WIDTH * 0.8,
                        marginTop: "3%",
                      },
                    ]}
                  ></View>
                  <View style={{ marginTop: "2%" }}>
                    <View>
                      <Text allowFontScaling={false} style={styles.pickup}>
                        {t('Destination')}
                      </Text>
                      <Text
                        allowFontScaling={false}
                        numberOfLines={3}
                        style={{
                          color: "#242E42",
                          fontSize: 15,
                          fontFamily: FONTS.semibold,
                          marginLeft: "5%",
                          // width: WIDTH * 0.62,
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
                    {t('PRICE')} :{" "}
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

                  <Text allowFontScaling={false} style={styles.receiptStyle}>
                    {t('Receipt')}
                  </Text>
                </TouchableOpacity>
                <View style={styles.viewStyle2}>
                  <Image
                    source={require("../../assets/Images/startt.png")}
                    style={{ width: 40, height: 40, marginRight: 12 }}
                  />
                  <Text allowFontScaling={false} style={styles.receiptStyle}>
                    {" "}
                    {t('Rated')} : {data?.reviewandrating?.rating ?? "0"}
                  </Text>
                </View>
              </View>
            </View>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default BookedDetailsCompleted;

const styles = StyleSheet.create({
  firstView1: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
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
    // marginLeft: platformType == "ios" ? "5%" : "4%",
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
    justifyContent: "space-evenly",
    alignSelf: "center",
    alignItems: "center",
  },
  receiptStyle: {
    color: "rgba(36, 46, 66, 1)",
    fontSize: 15,
    fontFamily: FONTS.medium,
  },
});
