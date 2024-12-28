import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { WIDTH, HEIGHT } from "../../Components/Helpers/Dimentions";
import { COLORS, FONTS, VECTOR_ICONS, IMAGEPATH } from "../../assets/Theme";
import WholeButton from "../Wholebutton/Wholebutton";
import RBSheet from "react-native-raw-bottom-sheet";
import MapView, { Marker, Polyline } from "react-native-maps";
import Map1 from "../SvgComponent/Location/Map1";
import MapViewDirections from "react-native-maps-directions";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import moment from "moment";
import { roundOff } from "../../Utils/RoundOff";
import { MAP_KEY } from "../../ApiConfig/Endpoints";
import { useTranslation } from "react-i18next";

const platformType = Platform.OS;

const BookDetailsCancle = (props: any) => {
  const {t} = useTranslation();
  const bottomSheetRef = useRef(null);
  const data = props?.route?.params?.data;
  // console.log("historyy", data);

  // console.log("latt", data?.startLocation);
  const myRef = useRef(null);

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
  const bottomSheetModalRef1 = useRef(null);
  const snapPoints = useMemo(() => ["15%", "50%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);

  const [mapRegion, setMapRegion] = useState({
    latitude: data?.startLocation?.latitude ?? "37.785834",
    longitude: data?.startLocation?.longitude ?? "-122.406417",
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  useEffect(() => {
    // Calculate dynamic delta values based on the difference between start and end locations
    const latDelta =
      Math.abs(data?.endLocation?.latitude - data?.startLocation?.latitude) *
      0.00001;
    const lonDelta =
      Math.abs(data?.endLocation?.longitude - data?.startLocation?.longitude) *
      0.00001;

    // Set the new region with dynamic delta values
    setMapRegion({
      latitude: data?.startLocation?.latitude,
      longitude: data?.startLocation?.longitude,
      latitudeDelta: latDelta,
      longitudeDelta: lonDelta,
    });
  }, [data]);

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      setTimeout(() => {
        bottomSheetRef.current.close();
      }, 1000);
    }
  };

  useEffect(() => {
    bottomSheetModalRef1.current?.present();
    // if (bottomSheetRef.current) {
    //   setTimeout(() => {
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MapView
          style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
          // region={mapRegion}
          // zoomEnabled={true}
          // scrollEnabled={true}
          // showsScale={true}
          ref={myRef}
          style={StyleSheet.absoluteFill}
          initialRegion={intialLocation}
          zoomTapEnabled={true}
          zoomEnabled={true}
          scrollEnabled={true}
          showsScale={true}
          onRegionChange={(region) => {
            // console.log("regionss", region);
            // setIntialLocation({ ...intialLocation });
          }}
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
            <ScrollView
              style={{ paddingHorizontal: 15 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.topview}>
                <View style={{ marginTop: platformType == "ios" ? 28 : null }}>
                  <Map1 style={{ width: WIDTH * 0.068 }} />
                </View>
                <View>
                  <View style={{ flexDirection: "row", marginLeft: 10 }}>
                    <View>
                      <View style={{ rowGap: 10, marginRight: 20 }}>
                        <Text allowFontScaling={false} style={[styles.pickup]}>
                          {t('Pick Up')}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          numberOfLines={1}
                          style={{
                            color: "#242E42",
                            fontSize: 15,
                            fontFamily: FONTS.semibold,
                          }}
                        >
                          {data?.pickupAddress}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderBottomColor: "#ECECEC",
                          borderBottomWidth: 1,
                          width: WIDTH * 0.8,
                          paddingTop: 10,
                        }}
                      />

                      <View
                        style={{ rowGap: 10, marginRight: 20, marginTop: 15 }}
                      >
                        <Text
                          allowFontScaling={false}
                          style={[styles.pickup, { paddingTop: 10 }]}
                        >
                          {t('Destination')}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          numberOfLines={1}
                          style={{
                            color: "#242E42",
                            fontSize: 15,
                            fontFamily: FONTS.semibold,
                          }}
                        >
                          {data?.destinationAddress}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: "#ECECEC",
                  borderBottomWidth: 1,
                  paddingVertical: 10,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: WIDTH * 0.88,
                  justifyContent: "space-between",
                  alignSelf: "center",
                  marginTop: "4%",
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    color: "#242E42",
                    fontSize: 14,
                    fontFamily: FONTS.bold,
                    fontWeight: Platform.OS === "ios" ? "600" : "400",
                  }}
                >
                  ${roundOff(parseFloat(data?.fareAmount), 2)}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    color: "#F52D56",
                    fontSize: 15,
                    textTransform: "capitalize",
                    fontFamily: FONTS.bold,
                    fontWeight: Platform.OS === "ios" ? "600" : "400",
                  }}
                >
                  {data?.status}
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 10,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  paddingRight: 10,
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    color: "#242E42",
                    fontSize: 14,
                    fontFamily: FONTS.bold,
                    fontWeight: Platform.OS === "ios" ? "600" : "400",
                  }}
                >
                  {moment(data?.createdAt).format("LL")}
                </Text>
              </View>

              <WholeButton
                Label={t("Re-Booking")}
                // Action={() => props.navigation.navigate("BottomTabBar")}
                Action={() =>
                  props.navigation.navigate("BottomTabBar", {
                    screen: "Home",
                  })
                }
                styles={{ backgroundColor: "#FF5500", marginTop: "5%" }}
              />
            </ScrollView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default BookDetailsCancle;

const styles = StyleSheet.create({
  line1: {
    backgroundColor: "#ECECEC",
    width: WIDTH * 0.9,
    height: 3,
    // marginTop: "5%",
    alignSelf: "center",
  },
  mainView: { width: WIDTH * 0.9, alignSelf: "center", position: "relative" },

  head: {
    fontSize: 17,
    fontFamily: FONTS.bold,
    // alignSelf: "center",
    color: "#242E42",
  },
  pickup: {
    color: "#242E42",
    fontSize: 16,
    fontFamily: FONTS.bold,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  line: {
    backgroundColor: "#ECECEC",

    width: WIDTH * 0.9,
    height: 1.5,
    // marginTop: "5%",
    alignSelf: "center",
  },
  topview: {
    flexDirection: "row",
    width: WIDTH * 0.9,
    justifyContent: "space-between",
    marginTop: 5,
  },
  firstView1: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.WHITE,
  },
  backIcon: {
    backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
    width: 46,
    height: 46,
    borderRadius: 23,
    marginVertical: "5%",

    alignItems: "center",
    justifyContent: "center",
    // marginLeft: platformType == 'ios' ? '5%' : "4%",
  },
});
