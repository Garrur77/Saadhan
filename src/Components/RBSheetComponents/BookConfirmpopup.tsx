import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  ImageBackground,
  Image,
  Linking,
  Platform,
  ActivityIndicator,
  DeviceEventEmitter,
} from "react-native";

import React, { useEffect, useRef, useState } from "react";
import { WIDTH, HEIGHT } from "../../Components/Helpers/Dimentions";
import { COLORS, FONTS, VECTOR_ICONS, IMAGEPATH } from "../../assets/Theme";
import WholeButton from "../Wholebutton/Wholebutton";
import ModalComponent from "../ModalComponent/ModalComponent";
import MapBackground from "../GlobalBackground/MapBackground";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import Map1 from "../SvgComponent/Location/Map1";
import Message from "../SvgComponent/CancelRide/Message";
import Call from "../SvgComponent/CancelRide/Call";
import CarSvg from "../SvgComponent/CarRide/CarSvg";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { SOCKET_URL } from "../../ApiConfig/Endpoints";
import SpiningLoader from "../../assets/SpiningLoader";
import RateModalComponent from "../ModalComponent/RateModalComponent";
import socketServcies from "../../Utils/SocketService";
import { RootState } from "../../ReduxConfig/Store";
import { roundOff } from "../../Utils/RoundOff";
import Blink from "../../Utils/Blink";
import { setRideStatus } from "../../ReduxConfig/RideStatusSlice";
import { useTranslation } from "react-i18next";
const platformType = Platform.OS;
const BookConfirmpopup = (props: any) => {
  const { t } = useTranslation();
  const notfound = "Driver not found. Please try again later.";
  const {
    vehicleDetails,
    closedRbSheet3Suceess,
    Ridetails,
    acceptOTP,
    onlineStatus,
    displayText,
    Notifications,
  } = props;
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();
  const [finalAmount, setFinalRideAmount] = useState("");
  const [Loader, setLoader] = useState(false);

  // // console.log("notificationCountnotificationCount", notificationCount)
  const [modalVisibleRate, setModalVisibleRate] = useState(false);
  const Data = useSelector(
    (state: RootState) => state.userDetails?.profileData
  );
  // const rideStatus = useSelector((state: RootState) => state.rideStatusSlice.status);

  // // console.log("current ride status::::", rideStatus)

  const [initialUrl, setInitialUrl] = useState(
    `https://maps.apple.com/?saddr=28.5815,77.3163&daddr=28.5696,77.3128`
  );
  const navigation = useNavigation();
  useEffect(() => {
    if (Ridetails) {
      setLoading(false);
      setLoader(false);
    }
  }, [Ridetails]);

  const notificationCount = useSelector(
    (state: RootState) => state.notificationCountSlice.notificationCount
  );
  // const openCallLog = () => {
  //   if (Platform.OS === "android") {
  //     Linking.openURL("tel:");
  //   } else if (Platform.OS === "ios") {
  //     Linking.openURL("telprompt:");
  //   }
  // };
  const phoneNumber = Ridetails?.driverDetails?.driverPhone; // Replace with the desired phone number

  const openCallLog = () => {
    const phoneNumberWithPrefix = `tel:${phoneNumber}`;

    Linking.openURL(phoneNumberWithPrefix).catch((err) =>
      console.error("An error occurred", err)
    );
  };
  const OpenDirection = () => {
    const iniatialRoute = `https://maps.apple.com/?saddr=${Ridetails?.pickupLocation?.latitude},${Ridetails?.pickupLocation?.longitude}&daddr=${Ridetails?.destinationLocation?.latitude},${Ridetails?.destinationLocation?.longitude}`;

    Linking.openURL(iniatialRoute).catch((err) =>
      console.error("An error occurred", err)
    );
  };
  const bottomSheetRef = useRef(null);
  const Isfocus = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.open();
      }
    }, [bottomSheetRef])
  );
  const sheetHeight = Platform.OS === "ios" ? 425 : 430;
  const dispatch = useDispatch();
  const endRide = () => {
    // const rideId = Ridetails?.rideId;
    socketServcies?.on("rideEnded", (response) => {
      setFinalRideAmount(response?.ride);
      if (response?.ride?.riderId?._id === Data?._id) {
        setTimeout(() => {
          setModalVisibleRate(true);
        }, 300);
        // setModalVisibleRate(true)
        // console.log("setModalVisibleRate")
      }

      // console.log("new ride status", response);
    });
  };

  const getBorderColor = (index) => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1"]; // Add as many colors as needed
    return colors[index % colors?.length]; // Cycle through the colors
  };

  const vehicleData = useSelector(
    (state: RootState) => state.vehicleGifSlice.vehicleGif
  );

  useEffect(() => {
    endRide();
  }, [Isfocus]);

  // useEffect(() => {
  //   setNotificationCount(Number(notificationCount + 1));
  // }, [Notifications, isFocused]);

  return (
    <SafeAreaView>
      <View style={styles.mainView}>
        <View>
          {(Ridetails && Object.keys(Ridetails).length === 0) ||
          Ridetails?.riderDetails?.riderId !== Data?._id ? (
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: WIDTH * 0.9,
                marginVertical: HEIGHT * 0.065,
              }}
            >
              {/* <ActivityIndicator size='large' color={COLORS.YOUR_LOADER_COLOR} /> */}
              <Image
                source={{ uri: vehicleData?.vehicleGif }}
                style={{ width: 250, height: 150 }}
              />
              {/* <Image
                  source={IMAGEPATH.uber}
                  style={{ width: 250, height: 150, }}
                /> */}
              <Text
                allowFontScaling={false}
                style={{
                  color: "#000",
                  fontSize: 16,
                  paddingTop: 15,
                  fontFamily: FONTS.medium,
                }}
              >
                {displayText ?? "..."}
              </Text>
              {notfound === displayText && (
                <TouchableOpacity
                  onPress={props?.goBack}
                  style={{
                    marginTop: 30,
                    backgroundColor: "#799ff2",
                    paddingVertical: 8,
                    paddingHorizontal: 18,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ color: "#fff", fontSize: 17, fontWeight: "700" }}
                  >
                    Go Back
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  width: WIDTH * 0.9,
                  marginVertical: 20,
                }}
              >
                <Image
                  source={
                    Ridetails?.driverDetails?.driverImage
                      ? { uri: Ridetails?.driverDetails?.driverImage }
                      : IMAGEPATH.Man2
                  }
                  style={{ width: 50, height: 50, borderRadius: 100 }}
                />

                <View style={{ width: WIDTH * 0.4, marginLeft: "4%" }}>
                  <Text allowFontScaling={false} style={styles.head}>
                    {Ridetails?.driverDetails?.driverName ?? ""}
                  </Text>
                  {Ridetails?.driverDetails?.rating ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: "3%",
                      }}
                    >
                      <Image source={IMAGEPATH.star} />
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: "#C8C7CC",
                          fontSize: 17,
                          fontFamily: FONTS.semibold,
                          marginLeft: 10,
                        }}
                      >
                        {Ridetails?.driverDetails?.rating}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: WIDTH * 0.35,
                    justifyContent: acceptOTP ? "space-between" : "flex-end",
                  }}
                >
                  {acceptOTP && (
                    <TouchableOpacity
                      onPress={OpenDirection}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                        marginRight: acceptOTP ? 5 : 5,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 0.2,
                        borderColor: COLORS.BLACK,
                      }}
                    >
                      <VECTOR_ICONS.MaterialCommunityIcons
                        name="directions"
                        size={30}
                        color={COLORS.BLACK}
                        style={{}}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={props.Action}
                    style={{
                      backgroundColor: "#4252FF",
                      marginRight: acceptOTP ? 5 : 5,
                      width: 40,
                      height: 40,
                      borderRadius: 100,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 0.2,
                    }}
                  >
                    <Message />
                    {notificationCount > 0 && (
                      <View style={styles.notificationBadge}>
                        <Text allowFontScaling={false} style={styles.badgeText}>
                          {notificationCount}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={openCallLog}
                    style={{
                      backgroundColor: "#FF5500",
                      width: 40,
                      height: 40,
                      borderRadius: 100,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 0.2,
                    }}
                  >
                    <Call />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.line1}></View>
              <View style={styles.topview}>
                <View
                  style={{
                    marginTop: platformType === "ios" ? "10%" : "16%",
                    marginLeft: "4%",
                  }}
                >
                  <Map1 />
                </View>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <View>
                      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: WIDTH * 0.78, paddingVertical: 6 }}>
                        <Text allowFontScaling={false}style={[styles.pickup, { marginTop: '4%' }]}>Pick Up</Text>

                        {
                          Ridetails?.otp ?
                            <Text allowFontScaling={false}style={[styles.pickup, { marginTop: '4%', fontWeight: "800", fontSize: 20, color:'#4252FF' }]}>{Ridetails?.otp}</Text> : null
                        }

                      </View> */}

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        {/* <View style={{ justifyContent: "flex-start", paddingLeft: 10, paddingTop: 10 }}>
                           
                          </View> */}
                        {Ridetails?.otp ? (
                          <View
                            style={{ flexDirection: "row", marginTop: "4%" }}
                          >
                            {Ridetails?.otp
                              ?.toString()
                              ?.split("")
                              ?.map((digit, index) => (
                                <View
                                  key={index}
                                  style={{
                                    borderWidth: Ridetails?.otp == " " ? 0 : 1,
                                    borderColor:
                                      Ridetails?.otp == " " ? null : "#FF5500", // Function to determine the border color
                                    padding: 5,
                                    marginHorizontal: 4,
                                    borderRadius: 4,
                                    paddingHorizontal: 8,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor:
                                      Ridetails?.otp == " " ? null : "#FF5500",
                                  }}
                                >
                                  <Text
                                    allowFontScaling={false}
                                    style={{
                                      fontWeight: "800",
                                      fontSize: 18,
                                      color: "#fff",
                                    }}
                                  >
                                    {digit}
                                  </Text>
                                </View>
                              ))}
                          </View>
                        ) : null}
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: WIDTH * 0.78,
                          paddingVertical: 6,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          allowFontScaling={false}
                          style={[styles.pickup, { fontSize: 16 }]}
                        >
                          {t("Pick Up")}
                        </Text>
                      </View>

                      <Text
                        allowFontScaling={false}
                        numberOfLines={4}
                        style={{
                          color: "#242E42",
                          fontSize: 15,
                          fontFamily: FONTS.medium,
                          marginLeft: "5%",
                          width: WIDTH * 0.72,
                          marginTop: "1%",
                        }}
                      >
                        {Ridetails?.pickupAddress ?? ""}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.line,
                      {
                        marginLeft: "1%",
                        width: WIDTH * 0.8,
                        marginTop: "2.5%",
                      },
                    ]}
                  ></View>
                  <View style={{ marginTop: "2%" }}>
                    <View>
                      <Text
                        allowFontScaling={false}
                        style={[
                          styles.pickup,
                          { fontWeight: "500", fontSize: 16 },
                        ]}
                      >
                        {t("Destination")}
                      </Text>
                      <Text
                        allowFontScaling={false}
                        numberOfLines={4}
                        style={{
                          color: "#242E42",
                          fontSize: 16,
                          fontFamily: FONTS.medium,
                          marginLeft: "5%",
                          width: WIDTH * 0.72,
                          marginTop: "1%",
                        }}
                      >
                        {Ridetails?.destinationAddress ?? ""}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.line, { marginTop: "5%" }]}></View>
              <View style={{ flexDirection: "row" }}>
                <>
                  <View style={{}}>{/* <CarSvg /> */}</View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          flex: 1,
                        }}
                      >
                        <Image
                          source={{ uri: Ridetails?.vehicleIcon }}
                          style={{
                            height: 45,
                            width: 45,
                            resizeMode: "contain",
                            marginTop: 20,
                          }}
                        />
                        {/* <Text allowFontScaling={false} numberOfLines={2} style={{ ...styles.detailsText, textTransform: "capitalize" }}>{Ridetails?.driverDetails?.vehicleType?.length > 6 ? Ridetails?.driverDetails?.vehicleType?.slice(0, 6) + "..." : Ridetails?.driverDetails?.vehicleType}</Text> */}
                        <Text
                          allowFontScaling={false}
                          style={{
                            ...styles.detailsText,
                            textTransform: "capitalize",
                          }}
                        >
                          {Ridetails?.driverDetails?.vehicleName?.length > 12
                            ? Ridetails?.driverDetails?.vehicleName?.slice(
                                0,
                                12
                              ) + "..."
                            : Ridetails?.driverDetails?.vehicleName}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={styles.detailsText}
                        >
                          {Ridetails?.driverDetails?.vehicleNumber?.length > 12
                            ? Ridetails?.driverDetails?.vehicleNumber?.slice(
                                0,
                                12
                              ) + "..."
                            : Ridetails?.driverDetails?.vehicleNumber}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        flex: 1,
                      }}
                    >
                      <View style={styles.detailsView}>
                        <Text
                          allowFontScaling={false}
                          style={styles.detailsTitle}
                        >
                          {t("DISTANCE")}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={styles.detailsText}
                        >
                          {roundOff(parseFloat(Ridetails?.distance), 2)} Km
                        </Text>
                      </View>
                      <View style={styles.detailsView}>
                        <Text
                          allowFontScaling={false}
                          style={styles.detailsTitle}
                        >
                          {t("TIME")}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={styles.detailsText}
                        >
                          {Ridetails?.estimatedTimeInMinutes ?? "0.00"}
                        </Text>
                      </View>
                      <View style={styles.detailsView}>
                        <Text
                          allowFontScaling={false}
                          style={styles.detailsTitle}
                        >
                          {t("PRICE")}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={styles.detailsText}
                        >
                          ${roundOff(parseFloat(Ridetails?.fareAmount), 2)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              </View>
            </>
          )}
          {/* {!acceptOTP && notfound !== displayText &&
            <View style={{ marginTop:loading ? '5%' : '13%', marginBottom:loading ? '12%' : "9%" }}>
              <WholeButton Label={'Cancel Request'} styles={{ backgroundColor: "#242E42", paddingVertical:6 }} Action={props?.Action1} />
            </View>
          }  */}

          {/* {onlineStatus ==="ongoing" &&  */}
          {!acceptOTP && (
            <View
              style={{
                marginTop: loading ? "5%" : "8%",
                marginBottom: loading ? "12%" : "9%",
              }}
            >
              <WholeButton
                Label={t("CancelRequest")}
                styles={{ backgroundColor: "#242E42" }}
                Action={props?.Action1}
              />
            </View>
          )}
          {acceptOTP && (
            <Blink duration={1000}>
              <View
                style={{
                  marginTop: loading ? "5%" : "8%",
                  marginBottom: loading ? "12%" : "9%",
                }}
              >
                <WholeButton Label={t("RideStarted")} disabled={true} />
              </View>
            </Blink>
          )}

          {/* }  */}
        </View>

        {/* </RBSheet> */}
      </View>

      <RateModalComponent
        setModalVisible={setModalVisibleRate}
        modalVisible={modalVisibleRate}
        rate={t("Rate Your Driver")}
        head={t("Ride Finished")}
        // Message={`Cash Paid : $ ${finalAmount?.fareAmount !== undefined ? Number(finalAmount.fareAmount).toFixed(2) : '0.00'}`}
        Message={`${t("Cash Paid")} : $ ${
          finalAmount?.fareAmount !== undefined
            ? Number(roundOff(parseFloat(finalAmount?.fareAmount), 2))
            : "0.00"
        }`}
        img
        Button="Submit"
        Action2={() => {
          setModalVisibleRate(false);
          props.navigation.navigate("BottomTabBar");
        }}
        finalAmount={finalAmount}
        source={IMAGEPATH.success}
        imgstyle={{ width: 48, height: 48, resizeMode: "cover" }}
        modalstyle={{
          width: WIDTH * 0.75,
        }}
        msgstyle={{ fontSize: 16, color: "#242E42" }}
      />

      {/* </MapBackground> */}
    </SafeAreaView>
  );
};

export default BookConfirmpopup;

const styles = StyleSheet.create({
  line1: {
    backgroundColor: "#ECECEC",
    width: WIDTH * 0.9,
    height: 3,
    // marginTop: "5%",
    alignSelf: "center",
  },
  head: {
    fontSize: 17,
    fontFamily: FONTS.bold,
    // alignSelf: "center",
    color: "#242E42",
  },
  pickup: {
    color: "#242E42",
    fontSize: 14,
    fontFamily: FONTS.bold,
    marginLeft: "5%",
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
  firstView1: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.WHITE,
  },
  mainView: { width: WIDTH * 0.9, alignSelf: "center" },
  backIcon: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    width: 46,
    height: 46,
    borderRadius: 23,
    marginVertical: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  detailsView: {
    // justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  detailsText: {
    color: "#242E42",
    fontSize: 15,
    fontFamily: FONTS.bold,
    fontWeight: "600",
  },
  detailsTitle: {
    color: "#C8C7CC",
    fontSize: 15,
    fontFamily: FONTS.bold,
    marginBottom: 15,
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
