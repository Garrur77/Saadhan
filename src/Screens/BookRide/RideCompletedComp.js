import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Image,
  Animated,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
  StatusBar,
  PermissionsAndroid,
  Platform,
  AppState,
} from "react-native";
import MapView, { AnimatedRegion, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import RateModalComponent from "../../Components/ModalComponent/RateModalComponent";
import ModalComponent from "../../Components/ModalComponent/ModalComponent";
import CancelYourRide from "../../Components/RBSheetComponents/CancelYourRide";
import BookConfirmpopup from "../../Components/RBSheetComponents/BookConfirmpopup";
import io from "socket.io-client";
import { MAP_KEY, SOCKET_URL, createSOS } from "../../ApiConfig/Endpoints";
import { showMessage } from "react-native-flash-message";
import axios from "axios";
import { setLocation } from "../../ReduxConfig/UserLocationSlice";
import Geolocation from "@react-native-community/geolocation";
import BackgroundTimer from "react-native-background-timer";
import {
  setSavedCordinated,
  setUserLocation,
} from "../../ReduxConfig/Location/locationSlice";
import socketServcies from "../../Utils/SocketService";
import { DeviceEventEmitter } from "react-native";
import {
  incrementNotificationCount,
  resetNotificationCount,
} from "../../ReduxConfig/NotificationCountSlice";
import { useTranslation } from "react-i18next";
const YourComponent = (props: any) => {
  const { t } = useTranslation();
  const myRef = useRef(null);
  const markerRef = useRef();
  const destinationRef = useRef();
  const dropLatLog = props?.route?.params?.dropLatLog;
  const currentLog = props?.route?.params?.currentLog;
  const RideID = props?.route?.params?.data;

  const rideId = useSelector(
    (state: RootState) => state.rideIdSliceToCancel.rideId
  );

  const [driverLatLog, setDriverLatLog] = useState("");

  const loctionData = useSelector(
    (state: RootState) => state?.locationSelector?.userCoordinated
  );
  const [finalAmount, setFinalRideAmount] = useState("");

  const [loader, setLoader] = useState(false);
  const [acceptOTP, setAcceptOTP] = useState(false);

  const [myRideId, setMyRideId] = useState("");
  const [headingTowards, setHeadingTowards] = useState(0);
  // console.log("setHeadingTowardssetHeadingTowards111", headingTowards);
  const bottomSheetRef = useRef(null);
  const [modalVisibleRate, setModalVisibleRate] = useState(false);
  const dispatch = useDispatch();

  // const Data = useSelector((state: RootState) => state.USERID_);
  const Data = useSelector(
    (state: RootState) => state.userDetails?.profileData
  );

  const Tokens = useSelector((state: RootState) => state.value);
  const Location = useSelector((state: RootState) => state.userLocationSlice);
  const token = Tokens?.RegisterTOKEN;
  const Isfocus = useIsFocused();
  const navigation = useNavigation();
  const [SelectStar, setSelectStar] = useState(0);
  const [selectedReasonRide, setReasonRide] = useState(
    "The waiting period was excessively lengthy."
  );
  const [modalVisibleReson, setModalVisibleReson] = useState(false);
  const [fetchDetails, setFetchDetails] = useState([]);
  const snapPoints = useMemo(
    () => (acceptOTP ? ["17%", "65%"] : ["17%", "68%"]),
    []
  );
  const Ridetails = useSelector(
    (state: RootState) => state?.rideDetailsSelector?.RideDetails
  );
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRef1 = useRef(null);
  const bottomSheetModalRef2 = useRef(null);

  const [mapRegion, setMapRegion] = useState({
    latitude: loctionData?.coords?.latitude,
    longitude: loctionData?.coords?.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const markerRotation = useRef(new Animated.Value(0)).current;
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCancleFunction = useCallback(() => {
    bottomSheetModalRef1.current?.present();
  }, []);
  const RateModalFunctionOpen = useCallback(() => {
    setModalVisibleRate(true);
    bottomSheetModalRef2.current?.present();
  }, []);

  const handlePresentModalPressClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const caoncleHandlerModal = useCallback(() => {
    bottomSheetModalRef1.current?.close();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {}, []);
  const handleSheetChanges1 = useCallback((index: number) => {}, []);

  const closeTheModalCancelRider = () => {
    caoncleHandlerModal();
    handleCancleFunction();
  };

  const closeDataChat = () => {
    navigation?.navigate("ChatDrivertoUser", { data: Ridetails });
    handleResetNotificationCount();
  };

  useEffect(() => {
    handlePresentModalPress();
  }, [Isfocus]);

  const callEmergencyServices = () => {
    SOSHandlerAPI();
  };

  const SOSHandlerAPI = async () => {
    setLoader(true);
    axios({
      method: "POST",
      url: createSOS,
      headers: {
        token: token,
      },
      data: {
        rideId: rideId,
        lastLat: loctionData?.coords?.latitude.toString(),
        lastLng: loctionData?.coords?.longitude.toString(),
      },
    })
      .then((response) => {
        if (response.data.responseCode === 200) {
          setLoader(false);
          showMessage({
            message: response?.data?.responseMessage,
            type: "success",
            icon: "success",
          });
        } else {
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const CancelRiderRequestHandler = async () => {
    setLoader(true);
    console.log("rideId", rideId);
    console.log("Data?._id", Data?._id);
    console.log("selectedReasonRide", selectedReasonRide);
    socketServcies?.emit("cancelRide", {
      rideId: rideId ?? myRideId,
      userType: "rider",
      userId: Data?._id,
      reason: selectedReasonRide,
    });
    socketServcies?.on("cancelRideResponse", (response) => {
      console.log("cancelRideResponse response--->>", response);
      if (response?.responseCode === 200) {
        setLoader(false);
        setModalVisibleReson(false);
        showMessage({
          message: response?.responseMessage,
          type: "success",
          icon: "success",
          duration: 1000,
        });
        setTimeout(() => {
          props?.navigation?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "BottomTabBar" }],
            })
          );
        }, 500);
      } else if (response?.responseCode === 404) {
        setLoader(false);
        setModalVisibleReson(false);
        showMessage({
          message: response?.responseMessage,
          type: "success",
          icon: "success",
          duration: 1000,
        });
        setTimeout(() => {
          props?.navigation?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "BottomTabBar" }],
            })
          );
        }, 500);
      }
      setLoader(false);
    });
  };

  const CancelReasonModal = () => {
    // handlePresentModalPressClose();
    setModalVisibleReson(true);
  };

  // Effect to update map region when marker position changes
  useEffect(() => {
    setMapRegion((prevRegion) => ({
      ...prevRegion,
      // latitude: currentLog.lat,
      // longitude: currentLog.lng,
      latitude: loctionData?.coords?.latitude,
      longitude: loctionData?.coords?.longitude,
    }));
  }, [currentLog]);

  const userId = Data?._id;
  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true, // Enable reconnection
      reconnectionAttempts: 5, // Number of reconnection attempts before giving up
      reconnectionDelay: 1000, // Initial delay before attempting to reconnect (in milliseconds)
      reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts
      randomizationFactor: 0.5,
      auth: {
        _id: Data?._id,
      },
    });

    newSocket.on("connect", () => {});

    newSocket.on("newRide", (response) => {
      if (response) {
        setFetchDetails(response?.nearbyDrivers);
        newSocket.on("rideDetails", (response) => {
          if (response?.riderDetails?.riderId === Data?._id) {
            console.log("rideDetails on 1 >>>>>>", response);
            dispatch(setSaveRideData(response));
            setRideDetails(response);
          }
        });
        newSocket.on("driverLocationUpdated", (response) => {
          if (response) {
            // Modal open ride completed
          }
        });
      }

      newSocket.on("rideEnded", (response) => {
        if (response?.ride?.riderId?._id === Data?._id) {
          // Modal open ride completed
          RateModalFunctionOpen();
        }
      });
    });

    newSocket.on("disconnect", (reason) => {});

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (Ridetails) {
      setLoader(false);
    }
  }, [Ridetails]);

  //-----------------------Location Modal ------------------//
  async function requestPermissionLocation() {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Allow Ponttual to use your location?",
            message:
              "Pontual App needs access to your device's location to provide accurate information.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      } else if (Platform.OS === "ios") {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === "granted") {
          return true;
        } else if (result === "blocked") {
          return false;
        } else {
          // ExitApp.exitApp();

          return false;
        }
      }
    } catch (err) {
      // console.log(err);
      return false;
    }
  }

  const getLocation = async () => {
    const result = requestPermissionLocation();
    result.then((res) => {
      // // console.log("res is:-------1698", res);
      if (res) {
        Geolocation.watchPosition(
          (position) => {
            // // console.log("position-------", position);
            dispatch(setSavedCordinated(position));
            getLiveLocation(
              position?.coords?.latitude,
              position?.coords?.longitude
            );
            setHeadingTowards(position?.coords?.heading);
          },
          (error) => {},
          { enableHighAccuracy: false, timeout: 15000 }
        );
      } else {
        // console.log("location permission decline");
      }
    });
    // // console.log(location);
  };

  const getLiveLocation = async (latitude, longitude) => {
    const locPermissionDenied = await requestPermissionLocation();
    if (locPermissionDenied) {
      // // console.log("get live location after 4 second", heading);
      animate(latitude, longitude);
      dispatch(setLocation({ latitude, longitude }));
    }
  };
  const animatedCoordinate = new AnimatedRegion({
    latitude: loctionData?.coords?.latitude,
    longitude: loctionData?.coords?.longitude,
  });
  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == "android") {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      // coordinate.timing(newCoordinate).start();
      animatedCoordinate.timing(newCoordinate).start();
    }
  };
  const destinationRefanimate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == "android") {
      if (destinationRef.current) {
        destinationRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      // coordinate.timing(newCoordinate).start();
      animatedCoordinate.timing(newCoordinate).start();
    }
  };
  const [nearbyDrivers, setNearByDrivers] = useState([]);

  // useEffect(() => {
  //   AppState.addEventListener("change", (nextAppState) => {});
  //   const intervalId = BackgroundTimer.setInterval(() => {
  //     getLocation();
  //   }, 15000);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [Isfocus]);
  useEffect(() => {
    getLocation();
  }, [loctionData, Isfocus, AppState]);

  useEffect(() => {
    socketServcies?.on("rideStarted", (response) => {
      if (
        response?.rideId === Ridetails?.rideId &&
        response?.status === "rideStart"
      ) {
        setTimeout(() => {
          // console.log("Ride Verified");
          setAcceptOTP(true);
          // showMessage({
          //   message: "Your ride has been verified",
          //   type: "success",
          //   duration: 5000,
          // });
        }, 500);
      }
    });

    socketServcies?.on("rideEnded", (response) => {
      if (response?.ride?.riderId?._id === Data?._id) {
        setFinalRideAmount(response?.ride);
      }

      // console.log("new ride status", response);
    });
    socketServcies.on("createdRideStatus", (response) => {
      if (response && response?.riderId === Data?._id) {
        setMyRideId(response?._id);
        // setAcceptOTP(true);
      }
    });
    socketServcies.on("ongoingRideStatus", (response) => {
      // // console.log("ongoingRideStatus response", response);
      if (
        response &&
        response?.riderDetails?.riderId === Data?._id &&
        response?.status === "ongoing" &&
        response?.otpVerify
      ) {
        setAcceptOTP(true);
      }
    });

    socketServcies.emit("checkAcceptedRide", { userId: userId }, (res) => {});
    socketServcies.on("acceptedRideStatus", (response) => {
      // console.log("acceptedRideStatusacceptedRideStatus", response);
    });
    socketServcies?.on("driverCoordinates", (response) => {
      // console.log(
      //   "driverCoordinates----2020",
      //   response,
      //   response?.rideId,
      //   Ridetails
      // );
      if (response?.rideId === Ridetails?.rideId) {
        setDriverLatLog(response);
        if (!acceptOTP) {
          destinationRefanimate(response?.latitude, response?.longitude);
        }
      }
    });
  }, [Isfocus, Ridetails]);

  // useEffect(() => {
  //   console.log(":::::::::[Ridetails]:::::::::::", Ridetails);
  // }, [Ridetails]);
  //SOCKET to verify ride
  const rideVerify = (Ridetails) => {
    socketServcies?.on("rideStarted", (response) => {
      if (
        response?.rideId === Ridetails?.rideId &&
        response?.status === "rideStart"
      ) {
        setTimeout(() => {
          setAcceptOTP(true);
          // showMessage({
          //   message: "Your ride has been verified",
          //   type: "success",
          //   duration: 5000,
          // });
        }, 500);
      }
    });
  };

  const CancleRideSocket = (RideId, Data) => {
    const rideId = Ridetails?.rideId;
    const userId = Data?._id;
    socketServcies.emit(
      "rideCancelled",
      { rideId: rideId, type: "rider" },
      (res) => {
        // console.log("rideCancelled response:", res);
      }
    );
  };

  const CancleRideSocketResponse = () => {
    socketServcies.on("rideCancelled", (response) => {
      console.log("rideCancelled response", response);
      if (response?.riderId === Data?._id) {
        showMessage({
          message: response?.message,
          type: "danger",
          icon: "danger",
          duration: 2000,
        });
        bottomSheetModalRef?.current?.close();
        bottomSheetModalRef1?.current?.close();
        setTimeout(() => {
          props?.navigation?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "BottomTabBar" }],
            })
          );
        }, 200);
      }
    });
  };

  const handleNearbyDrivers = () => {
    setTimeout(() => {
      NearbyDrivers();
    }, 10000);
  };

  //SOCKET for near by drivers
  const NearbyDrivers = () => {
    const lat = loctionData?.coords?.latitude;
    const lng = loctionData?.coords?.longitude;

    socketServcies.emit("checkNearbyDriver", { lat, lng }, (response) => {});
    socketServcies.on("nearbyDriver", (response) => {
      if (response) {
        setNearByDrivers(response);
      }
    });
  };

  useEffect(() => {
    rideVerify(Ridetails);
    handleNearbyDrivers();
    CancleRideSocketResponse();
  }, [Isfocus, Ridetails]);

  useEffect(() => {
    if (myRef?.current && currentLog?.latitude && dropLatLog?.latitude) {
      myRef?.current.fitToCoordinates(
        [
          {
            latitude: currentLog?.latitude,
            longitude: currentLog?.longitude,
          },
          {
            latitude: dropLatLog?.latitude,
            longitude: dropLatLog?.longitude,
          },
        ],
        {
          edgePadding: {
            top: 20,
            right: 300,
            bottom: 200,
            left: 300,
          },
          animated: true,
        }
      );
    }
  }, [Isfocus]);
  const [timeoutId, setTimeoutId] = useState(null);
  const [displayText, setDisplayText] = useState(t("findDriver"));

  useEffect(() => {
    // Function to call after 3 minutes (180,000 milliseconds)
    const callFunctionAfterDelay = () => {
      // Here you can place the function you want to call after 3 minutes
      // For demonstration, let's change the display text after a delay
      setTimeout(() => {
        setDisplayText(t("Driver not found. Please try again later."));
      }, 3000); // 180000 milliseconds = 3 minutes
    };

    // Check if rideDetails is empty (null, undefined, or empty object/array)
    if (!Ridetails || Object?.entries(Ridetails)?.length === 0) {
      // Call the function to start the timer
      const id = setTimeout(callFunctionAfterDelay, 180000);
      setTimeoutId(id);
    } else {
      // Clear the timeout if rideDetails becomes available
      clearTimeout(timeoutId);
      setTimeoutId(null);
      // setDisplayText('Ride details available, not calling the function.');
    }

    // Cleanup function to clear the timeout on component unmount or when rideDetails changes
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [Ridetails]);

  const [driverLatLng, setDriverLatLng] = useState("");

  const RideDataEmpty = useMemo(() => {
    // return Object?.keys(Ridetails)?.length == 0;
    return (
      Ridetails &&
      typeof Ridetails === "object" &&
      Object.keys(Ridetails).length === 0
    );
  }, [Ridetails]);

  // const UserLatitude = loctionData?.coords?.latitude;
  // const UserLogitude = loctionData?.coords?.longitude;

  const UserLatitude = loctionData?.coords?.latitude || null;
  const UserLogitude = loctionData?.coords?.longitude || null;

  // console.log();
  // useEffect(() => {
  //   socketServcies.socket.on("driver_message", (messageData) => {
  //     // console.log("driver_messagedriver_messagedriver_message", messageData);
  //   });
  // }, [isFocused]);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      "recived_new_message",
      (eventData) => {
        if (
          eventData &&
          eventData.count &&
          eventData.type === "driver_message"
        ) {
          const count = parseInt(eventData.count, 10);
          // console.log("Parsed count:::", count);
          if (!isNaN(count)) {
            dispatch(incrementNotificationCount(count));
          }
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, [dispatch, Isfocus]);
  const handleResetNotificationCount = () => {
    dispatch(resetNotificationCount());
  };
  const notificationCount = useSelector(
    (state: RootState) => state.notificationCountSlice.notificationCount
  );

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <StatusBar backgroundColor={COLORS.WHITE} barStyle={"dark-content"} />

        <GestureHandlerRootView style={{ flex: 1 }}>
          <MapView
            ref={myRef}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              height: HEIGHT,
            }}
            region={mapRegion}
            zoomEnabled={true}
            scrollEnabled={true}
          >
            <MapViewDirections
              origin={{
                latitude:
                  RideDataEmpty || !acceptOTP
                    ? currentLog?.latitude
                    : UserLatitude,
                longitude:
                  RideDataEmpty || !acceptOTP
                    ? currentLog?.longitude
                    : UserLogitude,
              }}
              // origin={{
              //   latitude: UserLatitude,
              //   longitude: UserLogitude,
              // }}
              destination={{
                latitude: RideDataEmpty
                  ? dropLatLog?.latitude
                  : !acceptOTP
                  ? driverLatLog?.latitude ??
                    Ridetails?.driverDetails?.driverLocation?.latitude
                  : dropLatLog?.latitude,
                longitude: RideDataEmpty
                  ? dropLatLog?.longitude
                  : !acceptOTP
                  ? driverLatLog?.longitude ??
                    Ridetails?.driverDetails?.driverLocation?.longitude
                  : dropLatLog?.longitude,
              }}
              apikey={MAP_KEY}
              strokeWidth={5}
              strokeColor="rgba(255, 85, 0, 1)"
            />
            <Marker.Animated
              ref={markerRef}
              coordinate={{
                latitude:
                  RideDataEmpty || !acceptOTP
                    ? currentLog?.latitude
                    : UserLatitude,
                longitude:
                  RideDataEmpty || !acceptOTP
                    ? currentLog?.longitude
                    : UserLogitude,
              }}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              {/* <Image
                source={require("../../assets/Images/track.png")}
                style={{ width: 35, height: 35 }}
              /> */}
              <Image
                // source={
                //   !driverLatLog && !acceptOTP
                //     ? require("../../assets/Images/rker.png")
                //     : driverLatLog?.vehicleType === "bike"
                //     ? IMAGEPATH?.uberMoto
                //     : IMAGEPATH.newCar
                // }
                source={require("../../assets/Images/pt.png")}
                style={{
                  // width: !driverLatLog && !acceptOTP ? 30 : 30,
                  // height: !driverLatLog && !acceptOTP ? 30 : 35,
                  // transform: [{ rotate: `${headingTowards}deg` }],
                  width: 35,
                  height: 35,
                }}
                resizeMode="contain"
              />
            </Marker.Animated>
            <Marker.Animated
              ref={destinationRef}
              coordinate={{
                latitude: RideDataEmpty
                  ? dropLatLog?.latitude
                  : !acceptOTP
                  ? driverLatLog?.latitude ??
                    Ridetails?.driverDetails?.driverLocation?.latitude
                  : dropLatLog?.latitude,
                longitude: RideDataEmpty
                  ? dropLatLog?.longitude
                  : !acceptOTP
                  ? driverLatLog?.longitude ??
                    Ridetails?.driverDetails?.driverLocation?.longitude
                  : dropLatLog?.longitude,
              }}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              {/* <Image
                source={require("../../assets/Images/ic_Pin.png")}
                style={{ width: 35, height: 45 }}
                resizeMode="contain"
              /> */}
              <Image
                // source={
                //   !driverLatLog && !acceptOTP
                //     ? require("../../assets/Images/homeMarker.png")
                //     : driverLatLog?.vehicleType === "bike"
                //     ? IMAGEPATH?.uberMoto
                //     : IMAGEPATH.newCar
                // }
                source={require("../../assets/Images/homeMarker.png")}
                style={{
                  width: !driverLatLog && !acceptOTP ? 30 : 30,
                  height: !driverLatLog && !acceptOTP ? 30 : 35,
                  transform: [{ rotate: `${headingTowards}deg` }],
                }}
                resizeMode="contain"
              />
            </Marker.Animated>
          </MapView>
          <View style={styles.mainView}>
            {/* <TouchableOpacity
              style={styles.backIcon}
              onPress={() => navigation.navigate("BottomTabBar")}
            >
              <VECTOR_ICONS.Ionicons
                name="chevron-back"
                size={26}
                color={COLORS.WHITE}
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity> */}

            {acceptOTP && (
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 100,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  position: "relative",
                }}
                onPress={callEmergencyServices}
              >
                <Image
                  source={require("../../assets/Images/NOtification/DengerIocn.png")}
                  style={{
                    width: 100,
                    height: 100,
                    position: "absolute",
                    bottom: 15,
                    // left: 0,
                    // top: 0,
                    // right: 30,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
          <BottomSheetModalProvider>
            <View style={styles.container}>
              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                enableOverDrag={false}
                enablePanDownToClose={false}
                handleIndicatorStyle={{
                  backgroundColor: "rgba(155, 155, 155, 1)",
                  width: 70,
                  height: 6,
                }}
                onChange={handleSheetChanges}
              >
                <View style={styles.contentContainer}>
                  <BookConfirmpopup
                    Action1={() => closeTheModalCancelRider()}
                    Action2={() => {
                      RateModalFunctionOpen();
                    }}
                    displayText={displayText}
                    acceptOTP={acceptOTP}
                    Ridetails={Ridetails}
                    Action={() => {
                      closeDataChat();
                    }}
                    // Notifications={notifications}
                    goBack={() => {
                      bottomSheetModalRef1.current?.close();
                      navigation.navigate("BottomTabBar");
                      // navigation.navigate("BottomTabBar", {
                      //   screen: "SearchScreen",
                      //   params: { from: "driverRequest" },
                      // });
                    }}
                  />
                </View>
              </BottomSheetModal>
            </View>
          </BottomSheetModalProvider>
          <BottomSheetModalProvider>
            <View style={styles.container}>
              <BottomSheetModal
                ref={bottomSheetModalRef1}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges1}
              >
                <View style={styles.contentContainer}>
                  <CancelYourRide
                    setReasonRide={setReasonRide}
                    selectedReasonRide={selectedReasonRide}
                    Action1={() => {
                      handlePresentModalPressClose();
                      bottomSheetModalRef1?.current?.close();
                      setTimeout(() => {
                        props?.navigation?.dispatch(
                          CommonActions.reset({
                            index: 0,
                            routes: [{ name: "BottomTabBar" }],
                          })
                        );
                      }, 200);
                    }}
                    Action={() => {
                      CancelReasonModal();
                    }}
                  />
                </View>
              </BottomSheetModal>
            </View>
          </BottomSheetModalProvider>
          <ModalComponent
            setModalVisible={setModalVisibleReson}
            modalVisible={modalVisibleReson}
            Message={t("Are you sure, you want to cancel your")}
            Message1={t("ride?")}
            head={t("Cancel Your Ride")}
            Button12
            btn1={t("Back")}
            btn2={t("Confirm")}
            // navigated={()=>{setModalVisible(false);}}
            navigated={() => {
              setModalVisibleReson(false),
                setTimeout(() => {
                  props?.navigation?.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: "BottomTabBar" }],
                    })
                  );
                }, 500);
            }}
            Action={() => {
              CancelRiderRequestHandler();
            }}
            source={IMAGEPATH.cancle}
            imgstyle={{}}
            modalstyle={
              {
                // height:platformType==='ios'? 284:  HEIGHT*0.38,
              }
            }
          />
        </GestureHandlerRootView>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default YourComponent;

const styles = StyleSheet.create({
  mainView: { width: WIDTH * 0.9 },
  backIcon: {
    backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
    width: 46,
    height: 46,
    borderRadius: 23,
    marginVertical: "5%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
  handmainview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  lineStyle: {
    borderBottomColor: "rgba(239, 239, 244, 1)",
    borderBottomWidth: 2,
    width: WIDTH,
    alignSelf: "center",
    marginVertical: "2%",
  },
  dotsstyle: { alignItems: "center", justifyContent: "center" },

  firstView1: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.WHITE,
  },
  locationview: {
    flexDirection: "row",
    // marginVertical: HEIGHT * 0.01,
    width: WIDTH * 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backbtn: {
    marginVertical: "1%",
    width: WIDTH * 0.9,
  },
  mobiloitte: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: "#C8C7CC",
  },
  canceltext: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: "rgba(36, 46, 66, 1)",
  },
});
