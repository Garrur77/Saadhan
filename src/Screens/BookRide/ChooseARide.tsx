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
  Platform,
  StatusBar,
  FlatList,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { FONTS, VECTOR_ICONS, COLORS, IMAGEPATH } from "../../assets/Theme";
import MapBackground from "../../Components/GlobalBackground/MapBackground";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  CommonActions,
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import {
  MAP_KEY,
  cancelRide,
  createRide,
  fetchVehiclefares,
} from "../../ApiConfig/Endpoints";
import CarSvg from "../../Components/SvgComponent/CarRide/CarSvg";
import Limousine from "../../Components/SvgComponent/ChooseARide/Limousine";
import ConfirmPickupSpot1 from "../../Components/RBSheetComponents/ConfirmPickupSpot1";
import ModalComponent from "../../Components/ModalComponent/ModalComponent";
import WholeButton from "../../Components/Wholebutton/Wholebutton";
import HandSvg from "../../Components/SvgComponent/CarRide/HandSvg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import SpiningLoader from "../../assets/SpiningLoader";
import BookConfirmpopup from "../../Components/RBSheetComponents/BookConfirmpopup";
import CancelYourRide from "../../Components/RBSheetComponents/CancelYourRide";
import { SOCKET_URL } from "../../ApiConfig/Endpoints";
import io from "socket.io-client";
import MapView, { Marker, Polyline } from "react-native-maps";
import BikeSvg from "../../Components/SvgComponent/CarRide/BikeSvg";
import RateModalComponent from "../../Components/ModalComponent/RateModalComponent";
import {
  setClearRideData,
  setSaveRideData,
} from "../../ReduxConfig/Location/locationSlice";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapViewDirections from "react-native-maps-directions";
import socketServcies from "../../Utils/SocketService";
import { setOpenModal } from "../../ReduxConfig/UserDetails/UserSlice";
import { setRideId } from "../../ReduxConfig/RideIdSlice";
import { setVehicleGif } from "../../ReduxConfig/VehicleGifSlice";
import { setRideStatus } from "../../ReduxConfig/RideStatusSlice";
import { useTranslation } from "react-i18next";

const ChooseARide = (props: any) => {
  const { t } = useTranslation();
  const [modalType, setModalType] = useState("vehicleFetch");
  // let modalType = "vehicleFetch"
  // ["vehicleFetch", "comfirmVehicle","confirmPickUp"]
  const loctionData = useSelector(
    (state: RootState) => state?.locationSelector?.userCoordinated
  );
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef(null);
  const bottomSheetRef1 = useRef(null);
  const bottomSheetRef3 = useRef(null);
  const bottomSheetRef4 = useRef(null);
  const bottomSheetRef5 = useRef(null);
  const [vehicles, setVechileType] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [selectedData, setSelectData] = useState("");

  // // console.log("selectedDataselectedData", selectedData)
  const [drivers, setDrivers] = useState([]);
  const [rideCreateID, setRideCReateID] = useState("");
  const [rideID, setIDRide] = useState("");
  const RideID = useRef("");
  const [driversNear, setDriversNear] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleReson, setModalVisibleReson] = useState(false);
  const [modalVisibleRate, setModalVisibleRate] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState("");
  const [rideDetails, setRideDetails] = useState("");
  const [estimate, setEstimate] = useState("");
  const [selectedReasonRide, setReasonRide] = useState(
    "The waiting period was excessively lengthy."
  );
  const [fetchDetails, setFetchDetails] = useState([]);
  const dispatch = useDispatch();
  const Data = useSelector(
    (state: RootState) => state.userDetails?.profileData
  );
  const [finalAmount, setFinalRideAmount] = useState("");

  const Isfocus = useIsFocused();

  const snapPoints = useMemo(() => ["14%", "60%"], []);
  const snapPoints3 = useMemo(() => ["14%", "40%"], []);
  const bottomSheetModalRef2 = useRef(null);
  const bottomSheetModalRef3 = useRef(null);

  useEffect(() => {
    // Function to open the modal when the screen is focused
    handlePresentModalPress();
  }, []);

  // useEffect(() => {
  //     // console.log("call fetch123555");

  //     const intervalId = setInterval(FetchVichelesTypes, 5000); // Call every 3 seconds

  //     return () => clearInterval(intervalId); // Cleanup interval on component unmount
  // });
  useEffect(() => {
    FetchVichelesTypes();
  }, [Isfocus]);

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      // // console.log("call rhe krehej");

      await FetchVichelesTypes();
    };

    const startInterval = () => {
      intervalId = setInterval(fetchData, 10000); // Call FetchVichelesTypes every 3 seconds
    };

    const stopInterval = () => {
      clearInterval(intervalId);
    };

    if (Isfocus) {
      startInterval();
    } else {
      stopInterval();
    }

    return () => {
      stopInterval();
    };
  }, [Isfocus]);

  // useEffect(() => {
  //     FetchVichelesTypes();
  // }, [Isfocus]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef2.current?.present();
  }, []);
  const handlePresentModalPress1 = useCallback(() => {
    bottomSheetModalRef2.current?.close();
  }, []);
  const handlePresentModalPress3 = useCallback(() => {
    handlePresentModalPress1();
    setModalType("comfirmVehicle");
    // modalType = "comfirmVehicle";
    bottomSheetModalRef3.current?.present();
  }, []);
  const handlePresentModalPress3Close = useCallback(() => {
    bottomSheetModalRef3.current?.close();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {}, []);
  const handleSheetChanges3 = useCallback((index: number) => {}, []);

  const myRef = useRef(null);

  const currentLog = props?.route?.params?.currentLatlog;
  const dropLatLog = props?.route?.params?.dropLatLog;

  const pickupAddress = props?.route?.params?.pickupAddress;
  const dropAddress = props?.route?.params?.dropAddress;
  const navigation = useNavigation();

  const [nearbyDrivers, setNearByDrivers] = useState([]);
  const [intialLocation, setIntialLocation] = useState({
    latitude: loctionData?.coords?.latitude ?? "28.5355",
    longitude: loctionData?.coords?.longitude ?? "77.3910",
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (myRef.current && currentLog?.lat && dropLatLog?.lat) {
      myRef.current.fitToCoordinates(
        [
          {
            latitude: currentLog?.lat,
            longitude: currentLog?.lng,
          },
          {
            latitude: dropLatLog?.lat,
            longitude: dropLatLog?.lng,
          },
        ],
        {
          edgePadding: {
            top: 20,
            right: 100,
            bottom: 200,
            left: 100,
          },
          animated: true,
        }
      );
    }
  }, [Isfocus]);

  useEffect(() => {
    // Connect to the socket when the component mounts
    socketServcies.on("newRide", (response) => {
      if (response) {
        setFetchDetails(response?.nearbyDrivers);
      } else {
      }
    });
  }, []);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true, // Enable reconnection
      reconnectionAttempts: 5, // Number of reconnection attempts before giving up
      reconnectionDelay: 1000, // Initial delay before attempting to reconnect (in milliseconds)
      reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts
      randomizationFactor: 0.5,
    });

    newSocket.on("connect", () => {
      // console.log("Socket connected");
    });
    newSocket.on("newRide", (response) => {
      setRideCReateID(response?.rideId); // Assuming rideId is received from response
      if (response) {
        setFetchDetails(response?.nearbyDrivers);
        newSocket.on("rideDetails", (response) => {
          if (response?.riderDetails?.riderId === Data?._id) {
            // console.log("rideDetails on >>>>>>>>>>>>>", response);
            dispatch(setSaveRideData(response));
            setRideDetails(response);
          }
        });
      }
    });

    newSocket.on("disconnect", (reason) => {
      // console.log("Socket disconnected:", reason);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const CreateRiderBookingHandler = async () => {
    try {
      setLoader(true);
      const data = {
        userId: Data?._id,
        startLocation: currentLog,
        endLocation: dropLatLog,
        pickupAddress: pickupAddress,
        destinationAddress: dropAddress,
        vehicleType: selectedData?.vehicleType,
        fareAmount: selectedData?.fare,
        vehicleIcon: selectedData?.vehicleIcon,
        paymentMethod: "cash",
      };
      socketServcies.emit("createRide", data);
      // Listen for the response
      socketServcies.on("createRideResponse", (response) => {
        console.log("createRideResponsecreateRideResponse", response);
        if (response?.responseCode === 200) {
          dispatch(setClearRideData({}));
          setVehicleDetails(response?.resp);
          setIDRide(response?.rideId);
          dispatch(setRideId(response.rideId));
          closedRbSheet3();
          setLoader(false);
          if (response?.rideId) {
            const data = {
              rideId: response?.rideId,
              pickupLocation: response?.pickupLocation,
              vehicleType: response?.vehicleType,
              destinationLocation: response?.destinationLocation,
              pickupAddress: response?.resp?.pickupAddress,
              destinationAddress: response?.resp?.destinationAddress,
            };
            socketServcies.emit("rideCreated", {
              rideId: response?.rideId,
              pickupLocation: response?.pickupLocation,
              vehicleType: response?.vehicleType,
              destinationLocation: response?.destinationLocation,
              pickupAddress: response?.resp?.pickupAddress,
              destinationAddress: response?.resp?.destinationAddress,
              vehicleIcon: response?.resp?.vehicleIcon,
              fareAmount: response?.resp?.fareAmount,
            });
          } else {
          }
          // ... other actions you want to perform on success
        } else {
          // ... handle other cases
        }
      });
    } catch (error) {
      // console.log("CreateRiderBookingHandler", error?.response)
      setLoader(false);
    }
  };

  function getEstimatedTimes(value) {
    return value || 0;
  }

  function toFixedOrDefault(number) {
    // Parse the input as a float, or use 0 if it's not a valid number
    const parsedNumber = parseFloat(number);

    // Check if the parsedNumber is a valid number
    if (!isNaN(parsedNumber)) {
      // If it's a valid number, format it to two decimal places
      return parsedNumber.toFixed(2);
    } else {
      // If it's not a valid number or blank, return '0.0'
      return "0.0";
    }
  }

  const closeTheModalCancelRiderHandler = () => {
    if (bottomSheetRef4.current) {
      bottomSheetRef4.current.close();
    }
    setTimeout(() => {
      try {
        props?.navigation?.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "BottomTabBar" }],
          })
        );
      } catch (error) {
        console.error("Navigation error: ", error);
      }
    }, 500);
  };

  const CancleRideSocketResponse = () => {
    socketServcies.on("yourRideCancled", (response) => {
      if (response?.riderId === Data?._id) {
        showMessage({
          message: "Your ride is cancelled by driver !!!!",
          type: "danger",
          duration: 3000,
        });
        closeTheModalCancelRiderHandler();
      }
    });
  };

  const CancelRiderRequestHandler = async () => {
    setLoader(true);
    axios({
      method: "POST",
      url: cancelRide,
      data: {
        userId: Data?._id,
        rideId: rideID,
        reason: selectedReasonRide ?? "I made the request unintentionally.",
      },
    })
      .then((response) => {
        // // console.log("CHoose a ride response", response);
        if (response.data.responseCode === 200) {
          setModalVisibleReson(false);
          setLoader(false);
          showMessage({
            message: response?.data?.responseMessage,
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
        } else {
        }
      })
      .catch((err) => {
        // console.log("CHoose a ride err", err?.response);
        setLoader(false);
      });
  };

  const closeBottomSheet1 = () => {
    handlePresentModalPress1();
    // modalType = "confirmPickUp";
    if (bottomSheetRef3.current) {
      setTimeout(() => {
        bottomSheetRef3.current.open();
      }, 300);
    }
  };

  const closeBottomSheet1Sucss = () => {
    // console.log("bottomSheetRef3.current outside")
    if (bottomSheetRef3.current) {
      // console.log("bottomSheetRef3.current inside")
      // Close the bottom sheet if the reference is available
      bottomSheetRef3.current.close();
      // Set a timeout to delay navigation
      setTimeout(() => {
        // console.log("bottomSheetRef3.current mostinside")
        // Navigate to the "RideCompletedComp" screen with required parameters
        navigation?.navigate("RideCompletedComp", {
          data: RideID,
          currentLog: {
            latitude: currentLog?.lat,
            longitude: currentLog?.lng,
          },
          dropLatLog: {
            latitude: dropLatLog?.lat,
            longitude: dropLatLog?.lng,
          },
        });
      }, 300); // Delay in milliseconds (300ms = 0.3 seconds)
    }
  };
  // const closeBottomSheet1Sucss = () => {
  //     if (bottomSheetRef3.current) {
  //         bottomSheetRef3.current.close();
  //         setTimeout(() => {
  //             navigation?.navigate("RideCompletedComp", {
  //                 data: rideID,
  //                 currentLog: {
  //                     latitude: currentLog?.lat,
  //                     longitude: currentLog?.lng
  //                 },
  //                 dropLatLog: {
  //                     latitude: dropLatLog?.lat,
  //                     longitude: dropLatLog?.lng
  //                 },
  //             });
  //           }, 300)

  //     }

  // }
  const closeTheModalCancelRider = () => {
    if (bottomSheetRef4.current) {
      bottomSheetRef4.current.close();
      setTimeout(() => {
        bottomSheetRef5.current.open();
      }, 300);
    }
  };

  const closeDataChat = () => {
    if (bottomSheetRef4.current) {
      setTimeout(() => {
        bottomSheetRef4.current.close();
        props?.navigation?.navigate("ChatDrivertoUser", { data: rideDetails });
      }, 300);
    }
  };

  const CancelReasonModal = () => {
    if (bottomSheetRef5.current) {
      bottomSheetRef5.current.close();
    }
    setTimeout(() => {
      setModalVisibleReson(true);
    }, 300);
  };

  const closedRbSheet3 = () => {
    // Check if the bottom sheet reference exists
    if (bottomSheetRef3.current) {
      // Close the bottom sheet
      bottomSheetRef3.current.close();
    }

    // Navigate to the "RideCompletedComp" screen after a delay of 300 milliseconds
    setTimeout(() => {
      navigation?.navigate("RideCompletedComp", {
        data: rideID, // Pass the rideID as part of the data
        currentLog: {
          latitude: currentLog?.lat, // Pass the current latitude
          longitude: currentLog?.lng, // Pass the current longitude
        },
        dropLatLog: {
          latitude: dropLatLog?.lat, // Pass the drop-off latitude
          longitude: dropLatLog?.lng, // Pass the drop-off longitude
        },
      });
    }, 300);

    // Optionally, you might want to show a modal after the same delay
    // setTimeout(() => {
    //     setModalVisible(true)
    // }, 300)
  };

  // const closedRbSheet3 = () => {
  //     if (bottomSheetRef3.current) {
  //         bottomSheetRef3.current.close();

  //     }
  //     setTimeout(() => {
  //         navigation?.navigate("RideCompletedComp", {
  //             data: rideID,
  //             currentLog: {
  //                 latitude: currentLog?.lat,
  //                 longitude: currentLog?.lng
  //             },
  //             dropLatLog: {
  //                 latitude: dropLatLog?.lat,
  //                 longitude: dropLatLog?.lng
  //             },
  //         });
  //     }, 300);
  //     // setTimeout(() => {
  //     //     setModalVisible(true)
  //     // }, 300)
  // }

  const FetchVichelesTypes = async () => {
    setLoading(true);
    axios({
      method: "POST",
      url: fetchVehiclefares,
      data: {
        startLocation: currentLog,
        endLocation: dropLatLog,
      },
    })
      .then((response) => {
        if (response.data.responseCode === 200) {
          // console.log("response.data::::::::::", response.data)
          const sortedData = response?.data?.allFares?.sort((a, b) => {
            if (a?.vehicleType === "bike" && b?.vehicleType !== "bike") {
              return -1;
            } else if (a?.vehicleType !== "bike" && b?.vehicleType === "bike") {
              return 1;
            } else {
              return 0;
            }
          });
          setVechileType(sortedData);
          setLoading(false);
        } else {
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  interface DataItem {
    vehicle: any;
    text1: string;
    text2: string;
    price: string;
    time: any;
  }

  const getVehicleSvg = (vehicleType) => {
    switch (vehicleType) {
      case "sedan":
        return <CarSvg />;
      case "Uber Go":
        return <Limousine />;
      case "Uber Moto":
        return <Limousine />;
      case "car":
        return <CarSvg />;
      case "CAR":
        return <CarSvg />;
      case "car1":
        return <CarSvg />;
      case "premium":
        return <CarSvg />;
      case "New Car 2":
        return <CarSvg />;
      case "Car":
        return <CarSvg />;
      case "Car 3":
        return <CarSvg />;
      case "New Car":
        return <CarSvg />;
      case "Auto":
        return <Limousine />;
      case "Uber Go Sedan":
        return <Limousine />;
      case "Uber Premier":
        return <Limousine />;
      case "Car":
        return <Limousine />;
      case "Bike":
        return <BikeSvg />;
      case "bike":
        return <BikeSvg />;
      case "auto":
        return <Limousine />;
      // Add cases for other vehicle types
      default:
        return <CarSvg />;
    }
  };

  // const DATA: DataItem[] = (vehicles?.nearestVehicleTypes
  //     ? Object.keys(vehicles.nearestVehicleTypes).map((key) => ({
  //         vehicleType: key,
  //         count: vehicles.nearestVehicleTypes[key].count,
  //         count: vehicles.nearestVehicleTypes[key].mappedNearestDrivers,
  //         estimatedTimes: vehicles.nearestVehicleTypes[key].estimatedTimes,
  //         distancekms: vehicles.nearestVehicleTypes[key].distancekms,
  //         fare: vehicles.allFares[key] ? vehicles.allFares[key].fare : null,
  //         vehicleIcon: getVehicleSvg(key)
  //     }))
  //     : []);

  const Ridetails = useSelector(
    (state: RootState) => state?.rideDetailsSelector?.RideDetails
  );

  //SOCKET to end ride
  const endRide = () => {
    socketServcies?.on("rideEnded", (response) => {
      if (response?.ride?.riderId?._id === Data?._id) {
        setFinalRideAmount(response?.ride);
        bottomSheetRef4.current.close();
        setTimeout(() => {
          dispatch(setRideStatus("Ride Finished"));
          setModalVisibleRate(true);
        }, 300);
        // setModalVisibleRate(true)
      }
    });
  };

  const [isRequestPending, setIsRequestPending] = useState(false);

  //SOCKET to fetch nearby drivers
  // const NearByDrivers = () => {
  //     const lat = loctionData?.coords?.latitude;
  //     const lng = loctionData?.coords?.longitude;
  //     // console.log("cureent latttt---", lat);
  //     // console.log("current long", lng);
  //     socketServcies.emit("checkNearbyDriver", { lat, lng }, (response) => {
  //         // console.log("socket emited for nearby Drivers", response)
  //     })
  //     socketServcies.on("nearbyDriver", (response) => {
  //         // console.log("NearBy----Drivers--->>", response)
  //         if (response) {
  //             // Filter the response to include only bikes
  //             // const bikeDrivers = response?.filter(driver => driver?.vehicleType === selectedData?.vehicleType);
  //             setNearByDrivers(response);
  //         }
  //         // if (response) {
  //         //     setNearByDrivers(response)
  //         // }
  //     })
  // }

  const NearByDrivers = () => {
    const lat = loctionData?.coords?.latitude;
    const lng = loctionData?.coords?.longitude;
    if (!isRequestPending) {
      setIsRequestPending(true);
      socketServcies.emit("checkNearbyDriver", { lat, lng }, (response) => {});

      socketServcies.on("nearbyDriver", (response) => {
        if (response) {
          // Filter the response to include only bikes
          const bikeDrivers = response?.filter(
            (driver) => driver?.vehicleType === selectedData?.vehicleType
          );

          setNearByDrivers(bikeDrivers);
        }
        setIsRequestPending(false); // Reset the flag after processing the response
      });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(NearByDrivers, 10000); // Call NearByDrivers every 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [nearbyDrivers, selectedData]);

  useEffect(() => {
    endRide();
    CancleRideSocketResponse();
    NearByDrivers();
    // FetchVichelesTypes();
  }, [Isfocus]);

  useFocusEffect(
    React.useCallback(() => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.open();
      }
      return () => {
        // any cleanup operations if necessary
      };
    }, [bottomSheetRef])
  );
  const sheetheight = Platform.OS === "ios" ? 400 : 400;

  // let modalType = "vehicleFetch"
  // ["vehicleFetch", "comfirmVehicle","confirmPickUp"]
  const backHandler = () => {
    if (modalType === "comfirmVehicle") {
      handlePresentModalPress3Close();
      if (bottomSheetModalRef2?.current) {
        setModalType("vehicleFetch");
        setTimeout(() => {
          bottomSheetModalRef2.current?.present();
        }, 500);
      }
    } else if (modalType === "vehicleFetch") {
      dispatch(setOpenModal(true));
      props.navigation.navigate("BottomTabBar");
    } else {
      dispatch(setOpenModal(true));
      props.navigation.navigate("BottomTabBar");
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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
              // height: HEIGHT,
            }}
            // style={StyleSheet.absoluteFill}
            initialRegion={intialLocation}
            zoomTapEnabled={true}
            zoomEnabled={true}
            scrollEnabled={true}
          >
            <MapViewDirections
              origin={{ latitude: currentLog?.lat, longitude: currentLog?.lng }}
              destination={{
                latitude: dropLatLog?.lat,
                longitude: dropLatLog?.lng,
              }}
              apikey={MAP_KEY}
              strokeWidth={5}
              strokeColor="rgba(255, 85, 0, 1)"
            />
            <Marker
              coordinate={{
                latitude: currentLog?.lat,
                longitude: currentLog?.lng,
              }}
            >
              <Image
                source={require("../../assets/Images/homeMarker.png")}
                style={{ width: 35, height: 35 }}
              />
            </Marker>

            <Marker
              coordinate={{
                latitude: dropLatLog?.lat,
                longitude: dropLatLog?.lng,
              }}
            >
              <Image
                source={require("../../assets/Images/ic_Pin.png")}
                style={{ width: 35, height: 45 }}
              />
            </Marker>
            {nearbyDrivers?.map((driver) => (
              <Marker
                key={driver?._id}
                coordinate={{
                  latitude: driver?.location?.coordinates[0],
                  longitude: driver?.location?.coordinates[1],
                }}
              >
                <Image
                  source={
                    driver?.vehicleType === "bike"
                      ? IMAGEPATH?.uberMoto
                      : IMAGEPATH.newCar
                  }
                  style={{ width: 35, height: 35 }}
                />
              </Marker>
            ))}
          </MapView>

          <View style={styles.mainView}>
            <TouchableOpacity style={styles.backIcon} onPress={backHandler}>
              <VECTOR_ICONS.Ionicons
                name="chevron-back"
                size={26}
                color={COLORS.WHITE}
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
            {/* --------------------------  Fetch Vehicle -------------------------*/}

            {/* Confirm pickup Addresss modal */}
          </View>
          <BottomSheetModalProvider>
            <BottomSheetModal
              ref={bottomSheetModalRef2}
              index={1}
              enableDynamicSizing={false}
              handleIndicatorStyle={{
                backgroundColor: "rgba(155, 155, 155, 1)",
                width: 70,
                height: 6,
              }}
              backgroundStyle={{
                backgroundColor: "#fff",
              }}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              enablePanDownToClose={false}
              enableContentPanningGesture={false}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  paddingBottom: 20,
                }}
              >
                <FlatList
                  scrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  // style={{ backgroundColor:'red' }}
                  data={vehicles}
                  contentContainerStyle={{ paddingBottom: 10 }}
                  ListEmptyComponent={() => (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: HEIGHT * 0.2,
                      }}
                    >
                      {loading && (
                        <ActivityIndicator
                          size="large"
                          color={COLORS.YOUR_LOADER_COLOR}
                        />
                      )}

                      {/* <Text allowFontScaling={false} style={{ fontSize: 16, color: '#000' }}>No Vehicle found</Text> */}
                    </View>
                  )}
                  ItemSeparatorComponent={() => (
                    <View
                      style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#CED0CE", // You can customize the separator color
                      }}
                    />
                  )}
                  renderItem={({
                    item,
                    index,
                  }: {
                    item: DataItem;
                    index: number;
                  }) => {
                    return (
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.locationview,
                            {
                              backgroundColor:
                                selectedItemIndex === index ? "#F50" : "white",
                              paddingVertical: 15,
                              paddingHorizontal: 10,
                            },
                          ]}
                          // onPress={() => {
                          //     setSelectedItemIndex(index);
                          //     setSelectData(item)
                          //     handlePresentModalPress3()
                          //     // openBottomSheet1();
                          // }}
                          onPress={() => {
                            if (
                              item?.estimatedDistance === "Driver not in range"
                            ) {
                              // Handle the case when the driver is not in range
                              return; // Exit the function to disable further action
                            } else {
                              // Original onPress logic
                              setSelectedItemIndex(index);
                              setSelectData(item);
                              dispatch(setVehicleGif(item));
                              // handlePresentModalPress3();
                              // openBottomSheet1();
                            }
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              marginHorizontal: 10,
                            }}
                          >
                            <View>
                              <Image
                                source={{ uri: item?.vehicleIcon }}
                                style={{
                                  width: 50,
                                  height: 50,
                                  resizeMode: "contain",
                                }}
                              />
                            </View>

                            <View
                              style={{ width: WIDTH * 0.4, marginLeft: "7%" }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <Text
                                  allowFontScaling={false}
                                  numberOfLines={1}
                                  style={[
                                    styles.canceltext,
                                    {
                                      color:
                                        selectedItemIndex === index
                                          ? "#fff"
                                          : "rgba(36, 46, 66, 1)",
                                      textTransform: "capitalize",
                                    },
                                  ]}
                                >
                                  {item?.vehicleType}{" "}
                                </Text>
                                <VECTOR_ICONS.Ionicons
                                  name="person"
                                  size={16}
                                  color={
                                    selectedItemIndex === index
                                      ? "#fff"
                                      : "#000"
                                  }
                                  style={{ alignSelf: "center" }}
                                />
                                <Text
                                  allowFontScaling={false}
                                  style={[
                                    styles.mobiloitte,
                                    {
                                      color:
                                        selectedItemIndex === index
                                          ? "#fff"
                                          : "#C8C7CC",
                                      paddingLeft: 5,
                                      fontSize: 16,
                                    },
                                  ]}
                                >
                                  {item?.seatingCapacity}
                                </Text>
                              </View>
                              <Text
                                allowFontScaling={false}
                                style={[
                                  styles.mobiloitte,
                                  {
                                    color:
                                      selectedItemIndex === index
                                        ? "#fff"
                                        : "#C8C7CC",
                                    paddingTop: 6,
                                    fontSize: 16,
                                  },
                                ]}
                              >
                                {item?.estimatedDistance}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                              marginRight: 15,
                            }}
                          >
                            <Text
                              allowFontScaling={false}
                              style={[
                                styles.canceltext,
                                {
                                  fontWeight: "600",
                                  color:
                                    selectedItemIndex === index
                                      ? "#fff"
                                      : "rgba(36, 46, 66, 1)",
                                },
                              ]}
                            >
                              ${toFixedOrDefault(item?.fare)}
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={[
                                styles.mobiloitte,
                                {
                                  fontSize: 16,
                                  color:
                                    selectedItemIndex === index
                                      ? "#fff"
                                      : "#C8C7CC",
                                  paddingTop: 6,
                                  fontWeight: "400",
                                },
                              ]}
                            >
                              {item?.estimatedArrivalTime}
                              {/* {getEstimatedTimes(item?.estimatedTimes)} */}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
                {!selectedData && (
                  <View>
                    <View
                      style={[
                        styles.locationview,
                        { paddingTop: 10, position: "relative" },
                      ]}
                    >
                      <View style={styles.handmainview22}>
                        <Text
                          allowFontScaling={false}
                          style={[
                            styles.mobiloitte,
                            {
                              paddingLeft: 25,
                              fontWeight: "600",
                              fontSize: 16,
                              color: "rgba(36, 46, 66, 1)",
                              paddingBottom: 12,
                            },
                          ]}
                        >
                          {t("paymentoption")}
                        </Text>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <HandSvg />
                          <Text
                            allowFontScaling={false}
                            style={[
                              styles.mobiloitte,
                              {
                                marginLeft: "10%",
                                color: "rgba(36, 46, 66, 1)",
                                fontWeight: "500",
                              },
                            ]}
                          >
                            {t("cash")}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        paddingVertical: 5,
                        backgroundColor: "white",
                      }}
                    >
                      <WholeButton
                        activeOpacity={!selectedData ? 1 : 0}
                        disabled={!selectedData ? false : true}
                        Label={t("chooseAVehicle")}
                        styles={styles.backbtn}
                      />
                    </View>
                  </View>
                )}
                {selectedData && (
                  <View>
                    <View
                      style={[
                        styles.locationview,
                        { paddingTop: 10, position: "relative" },
                      ]}
                    >
                      <View style={styles.handmainview22}>
                        <Text
                          allowFontScaling={false}
                          style={[
                            styles.mobiloitte,
                            {
                              paddingLeft: 25,
                              fontWeight: "600",
                              fontSize: 16,
                              color: "rgba(36, 46, 66, 1)",
                              paddingBottom: 12,
                            },
                          ]}
                        >
                          {t("paymentoption")}
                        </Text>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <HandSvg />
                          <Text
                            allowFontScaling={false}
                            style={[
                              styles.mobiloitte,
                              {
                                marginLeft: "10%",
                                color: "rgba(36, 46, 66, 1)",
                                fontWeight: "500",
                              },
                            ]}
                          >
                            {t("cash")}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        paddingVertical: 5,
                        backgroundColor: "white",
                      }}
                    >
                      <WholeButton
                        Label={`Ponttual ${selectedData?.vehicleType}`}
                        styles={styles.backbtn}
                        Action={() => closeBottomSheet1()}
                      />
                    </View>
                  </View>
                )}
              </View>
            </BottomSheetModal>
          </BottomSheetModalProvider>
          <BottomSheetModalProvider>
            <BottomSheetModal
              ref={bottomSheetModalRef3}
              index={1}
              handleIndicatorStyle={{
                backgroundColor: "rgba(155, 155, 155, 1)",
                width: 70,
                height: 6,
              }}
              //   backgroundStyle={{
              //     backgroundColor:"transparent"
              //   }}
              snapPoints={snapPoints3}
              onChange={handleSheetChanges3}
              enablePanDownToClose={false}
              enableContentPanningGesture={false}
            >
              <View style={[styles.mainView2, {}]}>
                <View
                  style={[
                    styles.locationview,
                    { paddingHorizontal: 20, paddingTop: 15 },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {getVehicleSvg(selectedData?.vehicleType)}
                    <View style={{ width: WIDTH * 0.3, marginLeft: "7%" }}>
                      <Text allowFontScaling={false} style={styles.canceltext}>
                        {selectedData?.vehicleType}
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={[styles.mobiloitte, { paddingTop: 6 }]}
                      >
                        {selectedData?.estimatedDistance}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text
                      allowFontScaling={false}
                      numberOfLines={1}
                      style={[
                        styles.canceltext,
                        { color: COLORS.BACKGROUNDBTNCOLOR, fontSize: 17 },
                      ]}
                    >
                      ${toFixedOrDefault(selectedData?.fare)}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={[styles.mobiloitte, { fontSize: 15 }]}
                    >
                      {selectedData?.estimatedArrivalTime}
                      {/* {getEstimatedTimes(selectedData?.estimatedTimes)} */}
                    </Text>
                  </View>
                </View>
                <View style={styles.lineStyle}></View>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.mobiloitte,
                    {
                      fontSize: 14,
                      color: "#8A8A8F",
                      paddingVertical: 5,
                      paddingLeft: 20,
                    },
                  ]}
                >
                  {t("paymentoption")}
                </Text>
                <View
                  style={[
                    styles.locationview,
                    { paddingTop: 10, paddingLeft: 10 },
                  ]}
                >
                  <View style={styles.handmainview}>
                    <HandSvg />
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.mobiloitte,
                        { marginLeft: "10%", color: "rgba(36, 46, 66, 1)" },
                      ]}
                    >
                      {t("cash")}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={props.cashAction}
                    style={styles.dotsstyle}
                  >
                    {/* <VECTOR_ICONS.Entypo name={"dots-three-vertical"} size={25} color={"rgba(218, 218, 218, 1)"} /> */}
                  </TouchableOpacity>
                </View>
                <View style={{ paddingVertical: 25 }}>
                  <WholeButton
                    Label={"Confirm"}
                    styles={styles.backbtn}
                    Action={() => closeBottomSheet1()}
                  />
                </View>
              </View>
            </BottomSheetModal>
          </BottomSheetModalProvider>
          {/* --------------------------  Confirm Vehicle -------------------------*/}

          {/* --------------------------  Confirm Pick up Location -------------------------*/}
          <RBSheet
            ref={bottomSheetRef3}
            height={290}
            closeOnPressMask={false}
            customStyles={{
              container: styles.firstView1,
              draggableIcon: { opacity: 0 },
            }}
          >
            <ConfirmPickupSpot1
              Action1={() => {
                bottomSheetRef3.current.close();
                if (bottomSheetModalRef2?.current) {
                  setTimeout(() => {
                    bottomSheetModalRef2?.current?.present();
                  }, 300);
                }
              }}
              pickupAddress={pickupAddress}
              Action={() => {
                CreateRiderBookingHandler();
              }}
              Action2={() => {
                bottomSheetRef3.current.close();
                if (bottomSheetModalRef2?.current) {
                  setTimeout(() => {
                    bottomSheetModalRef2?.current?.present();
                  }, 300);
                }
              }}
            />
          </RBSheet>
          {/* {getEstimatedTimes(item?.estimatedTimes)} min */}

          <ModalComponent
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            Message={"Your Ride has been waiting for drivers."}
            Message1={`Driver will pickup you in ${selectedData?.estimatedTimes}.`}
            head={"Ride Created Successfully"}
            Button={"Okay"}
            Action2={() => {
              setModalVisible(false);
              closeBottomSheet1Sucss();
            }}
            source={IMAGEPATH.success}
            imgstyle={{ marginTop: "0%" }}
            modalstyle={{
              paddingVertical: "6%",
            }}
          />

          <RBSheet
            ref={bottomSheetRef4}
            // onClose={()=>{openModal()}}
            height={340}
            closeOnPressMask={false}
            customStyles={{
              container: styles.firstView1,
              draggableIcon: { opacity: 0 },
            }}
          >
            <BookConfirmpopup
              Action1={() => closeTheModalCancelRider()}
              vehicleDetails={vehicleDetails}
              // Action2={() => {
              //     RateModalFunctionOpen();
              //   }}
              // rideDetails={rideDetails}
              Ridetails={rideDetails}
              Action={() => {
                closeDataChat();
              }}
            />
          </RBSheet>

          <RBSheet
            ref={bottomSheetRef5}
            // onClose={()=>{openModal()}}
            height={430}
            closeOnPressMask={false}
            customStyles={{
              container: styles.firstView1,
              draggableIcon: { opacity: 0 },
            }}
          >
            <CancelYourRide
              setReasonRide={(e) => setReasonRide(e)}
              selectedReasonRide={selectedReasonRide}
              Action1={() => bottomSheetRef5.current.close()}
              vehicleDetails={vehicleDetails}
              Action={() => {
                CancelReasonModal();
              }}
            />
          </RBSheet>

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
              // setModalVisibleReson(false);
              // props.navigation.navigate('AfterStartingRide');
            }}
            source={IMAGEPATH.cancle}
            imgstyle={{}}
            modalstyle={
              {
                // height:platformType==='ios'? 284:  HEIGHT*0.38,
              }
            }
          />

          {/* <RateModalComponent
                        setModalVisible={setModalVisibleRate}
                        modalVisible={modalVisibleRate}
                        rate={'Rate Your Driver'}
                        head={'Ride Finished'}
                        Message={`Cash Paid - ${finalAmount?.fareAmount}`}
                        img
                        Button="Submit"
                        Action2={() => {
                            setModalVisibleRate(false);
                            props.navigation.navigate('BottomTabBar')
                        }}
                        source={IMAGEPATH.success}
                        imgstyle={{ width: 48, height: 48, resizeMode: 'cover' }}
                        modalstyle={{
                            width: WIDTH * 0.75,
                        }}
                        msgstyle={{ fontSize: 16, color: '#242E42' }}
                    /> */}
        </GestureHandlerRootView>
        {/* {loading && <SpiningLoader loader={loading} />} */}
      </SafeAreaView>

      {/* <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>    */}
    </>
  );
};

export default ChooseARide;

const styles = StyleSheet.create({
  mainView: { width: WIDTH * 1, alignSelf: "center", position: "relative" },
  backIcon: {
    backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
    width: 46,
    height: 46,
    borderRadius: 23,
    marginVertical: "5%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  handmainview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  handmainview22: { alignItems: "center", justifyContent: "center" },

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
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: "rgba(36, 46, 66, 1)",
    textTransform: "capitalize",
  },
});
