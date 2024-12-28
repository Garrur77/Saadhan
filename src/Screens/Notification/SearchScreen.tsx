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
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  BackHandler,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  ActivityIndicator,
  PermissionsAndroid,
  AppState,
} from "react-native";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";

import {
  CommonActions,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
import { WIDTH, HEIGHT } from "../../Components/Helpers/Dimentions";
import { COLORS, FONTS, VECTOR_ICONS, IMAGEPATH } from "../../assets/Theme";
import RBSheet from "react-native-raw-bottom-sheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Crossicon from "../../Components/SvgComponent/CarRide/Crossicon";
import Map1 from "../../Components/SvgComponent/Location/Map1";
import Clock from "../../Components/SvgComponent/Booking/Clock";
import DropOff from "../../Components/SvgComponent/Booking/DropOff";
import MapView, { AnimatedRegion, Marker, Polyline } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import polyline from "@mapbox/polyline";
import { callGetApi, callPostApi } from "../../ApiConfig/ApiCall";
navigator.geolocation = require("@react-native-community/geolocation");
import {
  AccountEdit_,
  MAP_KEY,
  SOCKET_URL,
  ViewProfile,
  cancelRide,
  uploadFile,
} from "../../ApiConfig/Endpoints";
import {
  setClearData,
  updateProfileImage,
  userData,
} from "../../ReduxConfig/UserDetails/UserSlice";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setClearToken } from "../../ReduxConfig/Slices";
import StatusModal from "../../Components/ModalComponent/StatusModal";
import {
  selectCoordinates,
  selectDestination,
  selectOrigin,
} from "../../ReduxConfig/Location/navSlice";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";
import {
  setSaveAddress,
  setSavedCordinated,
} from "../../ReduxConfig/Location/locationSlice";
import { io } from "socket.io-client";
import WholeButton from "../../Components/Wholebutton/Wholebutton";
import BookConfirmpopup from "../../Components/RBSheetComponents/BookConfirmpopup";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapViewDirections from "react-native-maps-directions";
import RateModalComponent from "../../Components/ModalComponent/RateModalComponent";
import { setSaveRideData } from "../../ReduxConfig/Location/locationSlice";
import CancelYourRide from "../../Components/RBSheetComponents/CancelYourRide";
import ModalComponent from "../../Components/ModalComponent/ModalComponent";
import socketServcies from "../../Utils/SocketService";
import { setLocation } from "../../ReduxConfig/UserLocationSlice";
import Geolocation from "@react-native-community/geolocation";
import { PERMISSIONS, request } from "react-native-permissions";
import BackgroundTimer from "react-native-background-timer";
import { setRideStatus } from "../../ReduxConfig/RideStatusSlice";
import { setRideId } from "../../ReduxConfig/RideIdSlice";
import { useTranslation } from "react-i18next";

const platformType = Platform.OS;
const SearchScreen = (props: any) => {
  const { t } = useTranslation();
  const Data = useSelector(
    (state: RootState) => state.userDetails?.profileData
  );
  const loctionData = useSelector(
    (state: RootState) => state?.locationSelector?.userCoordinated
  );
  const addressLocation = useSelector(
    (state: RootState) => state?.locationSelectorAddress?.addressLocation
  );

  //console.log(loctionData, "usfuafaufahfgafjtasyfgahfgafgayfgas");

  const [defaultLocation, setDefaultLocation] = useState({
    lat: loctionData?.coords?.latitude,
    lng: loctionData?.coords?.longitude,
  });
  const [acceptOTP, setAcceptOTP] = useState(false);

  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const coordinates = useSelector(selectCoordinates);
  const [currentLatlog, setCurrentLatLog] = useState({
    lat: loctionData?.coords?.latitude,
    lng: loctionData?.coords?.longitude,
  });

  const [recentSearches, setRecentSearches] = useState([]);
  const firstThreeItems = recentSearches?.slice(0, 3);

  const isFocused = useIsFocused();
  // const socket = useRef(io(SOCKET_URL,{
  //   auth:{
  //     _id:Data?._id
  //   }
  // }));
  useEffect(() => {
    setCurrentLatLog({
      lat: loctionData?.coords?.latitude,
      lng: loctionData?.coords?.longitude,
    });
    loadRecentSearches();
  }, [loctionData, isFocused]);

  const loadRecentSearches = async () => {
    try {
      const storedSearches = await AsyncStorage.getItem("recentSearches");
      if (storedSearches) {
        setRecentSearches(JSON.parse(storedSearches));
      }
    } catch (error) {}
  };

  const saveRecentSearch = async (location) => {
    try {
      const updatedSearches = [location, ...recentSearches.slice(0, 4)]; // Limit to 5 recent searches
      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedSearches)
      );
    } catch (error) {}
  };

  const [dropLatLog, setDropLatLog] = useState(null);
  const [locationReal, setLocationReal] = useState("");
  const ref = useRef();

  const [location, setLocations] = useState();
  const [location2, setLocation2] = useState();
  const [refresh, setRefresh] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [fname, setfName] = useState("");
  const [lname, setLName] = useState("");
  const [modal, setModal] = useState(false);
  const [onGoingRide, setOngoingRide] = useState(0);
  const [createdRide, setCreatedRide] = useState(0);
  const [RideDetails, setOngoingDetails] = useState([]);
  const [finalAmount, setFinalRideAmount] = useState("");

  const bottomSheetRef = useRef<RBSheet | null>(null);
  const bottomSheetRef2 = useRef<RBSheet | null>(null);
  const bottomSheetRef3 = useRef<RBSheet | null>(null);

  // const [RideId, setRideId] = useState("");
  const [onlineStatus, setOnine] = useState("");

  const [riderID_ID, setRideStatusID] = useState("");
  // // console.log("RideDetailsRideDetailsRideDetails****", RideDetails);
  const [address, setAddress] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const mapRef = useRef(null);

  const useFocus = useIsFocused();
  const dispatch = useDispatch();
  // // console.log("fadsfhsafsad", fname);
  const RegisterTOKEN = useSelector(
    (state: RootState) => state.REGISTER_TOKEN.RegisterTOKEN
  );
  const UserDate = useSelector(
    (state: RootState) => state.userDetails?.profileData
  );

  const rideId = useSelector(
    (state: RootState) => state.rideIdSliceToCancel.rideId
  );

  const fetchLocationAddress = async () => {
    try {
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loctionData?.coords?.latitude},${loctionData?.coords?.longitude}&key=${MAP_KEY}`;
      axios
        .get(apiUrl)
        .then((response) => {
          const data = response.data;
          if (data.results && data?.results?.length > 0) {
            const address =
              data?.results[1]?.formatted_address ??
              data?.results[0]?.formatted_address;

            ref.current?.setAddressText(address);
            setLocations(address);
            dispatch(setSaveAddress(address));
            // setAddressLocation(address);
            // // console.log("Address:", address);
          } else {
            // // console.log("No results found");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {}
  };

  //SOCKET to check ongoing ride
  const OngoingRideCheck = () => {
    // // console.log("checcccckk---->>>", Data);
    const userId = Data?._id;
    socketServcies.emit("checkOngoingRide", userId, (res) => {
      // console.log("Acknowledgment from server:", res);
    });
    socketServcies.emit("checkAcceptedRide", userId, (res) => {});
    socketServcies.on("acceptedRideStatus", (response) => {
      if (
        response &&
        response?.riderDetails?.riderId === Data?._id &&
        response?.status === "accepted"
      ) {
        dispatch(setRideId(response.rideId));
        props?.navigation?.navigate("RideCompletedComp", {
          data: response?.riderDetails?.riderId,
          currentLog: {
            latitude: response?.pickupLocation?.latitude,
            longitude: response?.pickupLocation?.longitude,
          },
          dropLatLog: {
            latitude: response?.destinationLocation?.latitude,
            longitude: response?.destinationLocation?.longitude,
          },
        });
      }
    });
    socketServcies.on("ongoingRideStatus", (response) => {
      // console.log("ongoingRideStatus response11111", response);
      if (
        response &&
        response?.riderDetails?.riderId === Data?._id &&
        response?.status === "ongoing"
      ) {
        dispatch(setRideId(response._id));
        props?.navigation?.navigate("RideCompletedComp", {
          data: response?.riderDetails?.riderId,
          currentLog: {
            latitude: response?.pickupLocation?.latitude,
            longitude: response?.pickupLocation?.longitude,
          },
          dropLatLog: {
            latitude: response?.destinationLocation?.latitude,
            longitude: response?.destinationLocation?.longitude,
          },
        });
      }
    });
  };

  //SOCKET to check created ride
  const CreatedRideCheck = () => {
    const userId = Data?._id;
    socketServcies.emit("checkCreatedRide", userId, (res) => {});
    socketServcies.on("createdRideStatus", (response) => {
      // // console.log("createdRideStatus 1212response", response)
      //first check this ride is belong with you (rider._id === Data?._id)
      //if riderDriverMeetVerify is true navigate to page with is show driver pickup loadtion to desination else show waiting to driver modal
      /*************************************************************************************************/
      if (response && response?.riderId === Data?._id) {
        // console.log("createdRideStatus response", response)
        dispatch(setRideId(response._id));

        // props?.navigation?.navigate("RideCompletedComp", {
        //   data: response?.rideId ?? response?._id,
        //   currentLog: {
        //     latitude: response?.startLocation?.latitude,
        //     longitude: response?.startLocation?.longitude
        //   },
        //   dropLatLog: {
        //     latitude: response?.endLocation?.latitude,
        //     longitude: response?.endLocation?.longitude
        //   },
        // });
      }
    });
  };

  const CancleRideSocket = (RideId, Data) => {
    const rideId = rideId ?? riderID_ID;
    const userId = Data?._id;
    console.log("CancleRideSocket rideId--->>", rideId);
    socketServcies.emit(
      "rideCancelled",
      { rideId: rideId, type: "rider" },
      (res) => {
        console.log("rideCancelled", res);
      }
    );
  };

  // const CancleRideSocket = () => {
  //   const rideId = RideId;
  //   const userId = Data?._id;
  //  socketServcies.emit("rideCancled", {rideId:rideId,userId:userId}, (res) => {
  //     // console.log("rideCancled----rideCancled", res)
  //   })
  // }
  const CancleRideSocketResponse = () => {
    socketServcies.on("yourRideCancled", (response) => {
      // // console.log("jjjjjjfjfjfjfjfjfjfjf====888",response,Data?._id)
      if (response?.riderId === Data?._id) {
        showMessage({
          message: "Your ride is cancelled by driver !!!!",
          type: "danger",
          duration: 5000,
        });
        closeTheModalCancelRiderHandler();
      }
    });
  };

  //SOCKET to fetch rideDetails

  const fetchRide = () => {
    socketServcies.on("rideDetails", (response) => {
      // console.log("rideDetails---->>>", response);
      if (response?.riderDetails?.riderId === Data?._id) {
        // // console.log("8888888888810===1-S",response?.riderDetails?.riderId);
        // // console.log("99999999910===-1-S",Data?._id);
        setOngoingDetails(response);
        dispatch(setSaveRideData(response));
      }
    });
  };

  //SOCKET to check ride has ended
  const endRide = () => {
    socketServcies?.on("rideEnded", (response) => {
      // // console.log("tttetetetetetetete4",response)
      // // console.log("new ride status======>>>123", response?.ridedata?.status);
      if (response?.ride?.riderId?._id === Data?._id) {
        setFinalRideAmount(response?.ride);
        bottomSheetRef2.current.close();
        setTimeout(() => {
          setModalVisibleRate(true);
          dispatch(setRideStatus("Ride Finished"));
        }, 300);
        // bottomSheetRef2.current.close();

        // console.log("setModalVisibleRate")
      }
    });
  };

  const checkNearbyDrivers = () => {
    const lat = loctionData?.coords?.latitude;
    const lng = loctionData?.coords?.longitude;
    console.log("called");
    socketServcies.emit("checkNearbyDriver", { lat, lng }, (response) => {});
    socketServcies.on("nearbyDriver", (response) => {
      if (response) {
        // // console.log("checkNearbyDrivers response:::::::-----", response)
        setAllNearByDrivers(response);
      }
    });
  };
  useEffect(() => {
    checkNearbyDrivers();
  }, [useFocus, allNearByDrivers]);
  useEffect(() => {
    fetchLocationAddress();
    VIEW_PROFILEAPI();
    OngoingRideCheck();
    CreatedRideCheck();
    CancleRideSocketResponse();
    fetchRide();
    // checkNearbyDrivers();
    // endRide();
  }, [RegisterTOKEN, useFocus, bottomSheetRef, addressLocation]);

  // **********************VIEWPRFILE API************************

  const VIEW_PROFILEAPI = async () => {
    setLoader(true);
    // // console.log("asdfkjsdfj", RegisterTOKEN);
    try {
      var postData = {
        token: RegisterTOKEN,
      };

      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        ViewProfile,
        postData,
        false
      );
      setLoader(loading);
      if (error) {
        setLoader(false);
        if (error.response.data?.responseCode == 500) {
          showMessage({
            message: error.response.data.responseMessage,
            type: "danger",
            icon: "danger",
            duration: 1000,
          });
          // console.log("ERROR-Response 404:", error?.response?.data?.message);
          // Alert.alert(error?.response?.data?.responseMessage);
        }
      } else {
        if (response?.responseCode === 200) {
          dispatch(updateProfileImage(response?.data));
          setLoader(false);
          const responseData = response?.data;
          const firstName_ = responseData.firstName;
          setfName(firstName_);
          const lastName = responseData.lastName;
          setLName(lastName);
          const countryCode = responseData.emergencyCountryCode;
          // setCountryCode(countryCode);
          const phoneNumber = responseData.emergencyContact;
          const profileImage = responseData?.profileImage;
          const _id = responseData?._id;
          const statusReason = responseData?.statusReason || false;
          const status = responseData?.status;
          setModal(responseData?.status == "blocked" ? true : false);

          if (statusReason) {
            dispatch(
              userData({
                firstName_,
                lastName,
                countryCode,
                phoneNumber,
                profileImage,
                status,
                statusReason,
                _id,
              })
            );
          } else {
            dispatch(
              userData({
                firstName_,
                lastName,
                countryCode,
                phoneNumber,
                profileImage,
                status,
                _id,
              })
            );
          }
        }
      }
    } catch (error: any) {
      setLoader(false);
      console.error("Error during MO_verify: search", error.response);
    }
  };

  const resetState = () => {
    setCurrentLatLog(defaultLocation);
    setDropLatLog(null);
    setLocations("");
    setLocation2("");
  };
  //API to cancel ride
  const CancelRiderRequestHandler = async () => {
    console.log("CancelRiderRequestHandler");
    setLoader(true);

    axios({
      method: "POST",
      url: cancelRide,
      data: {
        userId: Data?._id,
        rideId: rideId,
        reason: selectedReasonRide ?? "I made the request unintentionally.",
      },
    })
      .then((response) => {
        console.log("Search Screen response", response);
        if (response.data.responseCode === 200) {
          if (!acceptOTP) {
            CancleRideSocket();
          }
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
        // console.log("Search Screen err", err?.response)
        setLoader(false);
      });
  };

  const openBottomSheet = () => {
    resetState();
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
  };
  const openBottomSheet2 = () => {
    // if(onGoingRide == 1){
    props?.navigation?.navigate("RideCompletedComp", {
      data: RideDetails?.rideId,
      currentLog: RideDetails?.pickupLocation,
      dropLatLog: RideDetails?.destinationLocation,
    });
    // }else{

    //   if (bottomSheetRef2.current) {
    //    bottomSheetRef2.current.open();
    //  }
    // }
  };
  const CancelReasonModal = () => {
    if (bottomSheetRef3.current) {
      bottomSheetRef3.current.close();
      // console.log("asdadasd bottomSheetRef1")
    }
    setTimeout(() => {
      setModalVisibleReson(true);
    }, 300);
  };

  // Chat socket data

  const closeDataChat = () => {
    if (bottomSheetRef2.current) {
      setTimeout(() => {
        bottomSheetRef2.current.close();
        props?.navigation?.navigate("ChatDrivertoUser", { data: RideDetails });
      }, 300);
    }
  };

  const closeTheModalCancelRider = () => {
    if (bottomSheetRef2.current) {
      bottomSheetRef2.current.close();
    }
    setTimeout(() => {
      bottomSheetRef3.current.open();
    }, 300);
  };

  const closeTheModalCancelRiderHandler = () => {
    if (bottomSheetRef2.current) {
      bottomSheetRef2.current.close();
    }
  };

  const asfasdfasdf = () => {
    bottomSheetRef.current?.close();
    setTimeout(() => {
      setShowLocationModal(true);
    }, 200);
  };
  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  const backButtonHandler = () => {
    Alert.alert(
      "Exit App",
      "Are you sure you want to exit the app?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Exit",
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      }
    );
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backButtonHandler);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
      };
    }, [])
  );

  const logoutHandler = async () => {
    await AsyncStorage.removeItem("TOKEN");
    setModal(false);
    // setTimeout(() => {
    dispatch(setClearData({}));
    dispatch(setClearToken(""));
    Platform.OS === "android"
      ? props?.navigation?.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        )
      : setTimeout(() => {
          props?.navigation?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          );
        }, 500);
  };

  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const [intialLocation, setIntialLocation] = useState({
    latitude: loctionData?.coords?.latitude,
    longitude: loctionData?.coords?.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const focusOnCurrentLocation = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: loctionData?.coords?.latitude,
        longitude: loctionData?.coords?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const markerRef = useRef();
  const [modalVisibleRate, setModalVisibleRate] = useState(false);
  const [modalVisibleReson, setModalVisibleReson] = useState(false);
  const [selectedReasonRide, setReasonRide] = useState(
    "I made the request unintentionally."
  );
  const [allNearByDrivers, setAllNearByDrivers] = useState([]);
  const sheetHeight = platformType === "ios" ? 520 : 420;

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
        // // console.log("result----location", result);
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
  const [picklatlong, setPickLatLong] = useState("");
  const [pickLocation, setPickLocation] = useState("");

  useEffect(() => {
    setPickLatLong("");
    setPickLocation("");
    AppState.addEventListener("change", (nextAppState) => {});
    const intervalId = BackgroundTimer.setInterval(() => {
      getLocation();
    }, 15000);
    return () => {
      clearInterval(intervalId);
    };
  }, [useFocus]);
  const getLocation = async () => {
    const result = requestPermissionLocation();
    result.then((res) => {
      // // console.log("res is:-------1698", res);
      if (res) {
        Geolocation.getCurrentPosition(
          (position) => {
            // // console.log("position-------", position);
            dispatch(setSavedCordinated(position));
            console.log(position, "Abhihfashfgahfgahsjas");
            getLiveLocation(
              position?.coords?.latitude,
              position?.coords?.longitude
            );
          },
          (error) => {
            // console.log("sdgdsfhdsh----198", error);
          },
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
    //console.log(newCoordinate, "dshjvghjvdgshvgshjghjgshsdghghjdsgdfsds");
    if (Platform.OS == "android") {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      // coordinate.timing(newCoordinate).start();
      animatedCoordinate.timing(newCoordinate).start();
    }
  };
  const openModal = useSelector(
    (state: RootState) => state.userDetails?.openModal
  );

  useEffect(() => {
    if (bottomSheetRef.current && openModal && useFocus) {
      bottomSheetRef.current.open();
    }
  }, [useIsFocused()]);

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}
      ></SafeAreaView>
      <StatusBar
        backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
        barStyle={"dark-content"}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerview}>
          <View style={styles.innerhead}>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                width: platformType === "ios" ? WIDTH * 0.55 : WIDTH * 0.58,
              }}
            >
              <Image
                source={require("../../assets/Images/BookRide/homep.png")}
                style={{ width: 100, height: 50, resizeMode: "contain",marginLeft: 1 }}
              />
              <View style={{ marginLeft: 10 }}>
                {UserDate?.firstName_ && (
                  <Text allowFontScaling={false} style={styles.head}>
                    {`${t("Hi")}! ${
                      UserDate?.firstName_?.length > 12
                        ? `${UserDate?.firstName_?.substring(0, 12)}...`
                        : UserDate?.firstName_
                    }`}
                  </Text>
                )}
              </View>

              {/* {UserDate?.firstName_ && <Text allowFontScaling={false} style={styles.head}> {`Hi! ${UserDate?.firstName_}`}</Text>} */}
            </View>

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Notification");
              }}
            >
              <VECTOR_ICONS.FontAwesome
                name={"bell"}
                size={18}
                style={{ color: COLORS.WHITE }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            position: "absolute",
            top: Platform.OS == "ios" ? 50 : 50,
            zIndex: 1,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              fetchLocationAddress(), openBottomSheet();
            }}
            style={styles.searchview}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: "#9B9B9B",
                fontSize: 17,
                fontFamily: FONTS.light,
                // marginLeft: "2%",
                width: WIDTH * 0.67,
              }}
            >
              {" "}
              {t("Search Destination")}
            </Text>
            <TouchableOpacity style={{ marginLeft: "3%" }}>
              <VECTOR_ICONS.Feather
                name={"search"}
                color={"#B5B5B5"}
                size={25}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ position: "absolute", right: 20, bottom: 20, zIndex: 1 }}
          onPress={focusOnCurrentLocation}
        >
          <Image
            source={require("../../assets/Images/cccccc.png")}
            style={{ width: 40, height: 40, tintColor: "orange" }}
          />
        </TouchableOpacity>
        {/* {RideDetails.length > 0 ? ( */}
        <View style={{ position: "absolute", left: 20, bottom: 20, zIndex: 1 }}>
          {onGoingRide == 1 ? (
            <WholeButton
              Label={onGoingRide ? "Ongoing Ride" : "Current Ride"}
              styles={{ width: WIDTH * 0.35 }}
              Action={() => {
                openBottomSheet2();
              }}
            />
          ) : null}
        </View>

        <MapView
          style={{
            flex: 1,
          }}
          ref={mapRef}
          initialRegion={intialLocation}
          zoomTapEnabled={true}
          zoomEnabled={true}
          scrollEnabled={true}
          showsScale={true}
          region={{
            latitude: intialLocation?.latitude ?? "37.785834",
            longitude: intialLocation?.longitude ?? "-122.406417",
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {(onGoingRide === 0 || createdRide === 0) && (
            <Marker
              coordinate={{
                latitude: loctionData?.coords?.latitude
                  ? loctionData?.coords?.latitude
                  : 0,
                longitude: loctionData?.coords?.longitude
                  ? loctionData?.coords?.longitude
                  : 0,
              }}
              title="Current Location"
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../assets/Images/current.png")}
              />
            </Marker>
          )}
          {allNearByDrivers?.map((vehicle) => {
            return (
              <Marker
                key={vehicle?._id}
                coordinate={{
                  latitude: vehicle?.location?.coordinates[0],
                  longitude: vehicle?.location?.coordinates[1],
                  // latitude: 37.4220936,
                  // longitude: -122.083922,
                }}
              >
                <Image
                  source={{ uri: vehicle?.vehicleIcon }}
                  style={{ width: 25, height: 25, resizeMode: "contain" }}
                />
              </Marker>
            );
          })}

          {(onGoingRide === 1 || createdRide === 1) && (
            <>
              <MapViewDirections
                origin={{
                  latitude: loctionData?.coords?.latitude
                    ? loctionData?.coords?.latitude
                    : 0,
                  longitude: loctionData?.coords?.longitude
                    ? loctionData?.coords?.longitude
                    : 0,
                }}
                destination={{
                  latitude: RideDetails?.destinationLocation?.latitude
                    ? RideDetails?.destinationLocation?.latitude
                    : 0,
                  longitude: RideDetails?.destinationLocation?.longitude
                    ? RideDetails?.destinationLocation?.longitude
                    : 0,
                }}
                apikey="AIzaSyCzU4XQ6D43-mEnHWZ5l3vobePxE6p2GRw"
                strokeWidth={5}
                strokeColor="rgba(255, 85, 0, 1)"
              />

              <Marker.Animated
                ref={markerRef}
                coordinate={{
                  latitude: loctionData?.coords?.latitude,
                  longitude: loctionData?.coords?.longitude,
                }}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <Image
                  source={require("../../assets/Images/track.png")}
                  style={{ width: 45, height: 45, resizeMode: "contain" }}
                />
              </Marker.Animated>
              <Marker
                coordinate={{
                  latitude: RideDetails?.destinationLocation?.latitude
                    ? RideDetails?.destinationLocation?.latitude
                    : 0,
                  longitude: RideDetails?.destinationLocation?.longitude
                    ? RideDetails?.destinationLocation?.longitude
                    : 0,
                }}
              >
                <Image
                  source={require("../../assets/Images/ic_Pin.png")}
                  style={{ width: 35, height: 45 }}
                />
              </Marker>
            </>
          )}
        </MapView>

        {modal && <StatusModal logout={logoutHandler} modalVisible={modal} />}
      </SafeAreaView>
      <RBSheet
        ref={bottomSheetRef}
        height={sheetHeight}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: styles.firstView1,
          draggableIcon: {
            opacity: 1,
            backgroundColor: "#9B9B9B",
            width: 70,
            height: 7,
            marginTop: 15,
          },
        }}
      >
        <KeyboardAwareScrollView
          behavior="padding"
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          {/* ************************************************** */}
          <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={() => Keyboard.dismiss()}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.topview}>
                <View style={{ marginTop: 30, marginLeft: 20 }}>
                  <Map1 />
                </View>
                <View style={{ paddingRight: 10, overflow: "hidden" }}>
                  <View style={{ flexDirection: "row" }}>
                    <View>
                      <Text allowFontScaling={false} style={styles.pickup}>
                        {t("PICKUP")}{" "}
                      </Text>
                      <GooglePlacesAutocomplete
                        ref={ref}
                        numberOfLines={3}
                        defaultValue={addressLocation}
                        onPress={(data, details = null) => {
                          if (details) {
                            setPickLocation(details.formatted_address);
                            setPickLatLong(details.geometry.location);
                            Keyboard.dismiss(); // Dismiss the keyboard after selection
                          }
                        }}
                        fetchDetails={true}
                        query={{
                          key: MAP_KEY,
                          language: "en",
                          radius: 500,
                          location: `${loctionData?.coords?.latitude},${loctionData?.coords?.longitude}`,
                        }}
                        textInputProps={{
                          autoFocus: false,
                          blurOnSubmit: false,
                          placeholderTextColor: "#757575",
                          numberOfLines: 2,
                          multiline: true,
                          allowFontScaling: false,
                        }}
                        enablePoweredByContainer={false}
                        keyboardShouldPersistTaps="always"
                        currentLocation={false}
                        debounce={500}
                        styles={{
                          container: {
                            flex: 1,
                          },
                          textInput: {
                            height: HEIGHT * 0.09,
                            width: WIDTH * 0.9,
                            color: "#191919",
                            paddingRight: 16,
                            marginHorizontal: 10,
                            minWidth: 300,
                            fontSize: 16,
                            fontFamily: FONTS.medium,
                          },
                          description: {
                            fontSize: 16,
                            color: "#757575",
                          },
                        }}
                        listEmptyComponent={
                          <View
                            style={{
                              width: WIDTH * 0.84,
                              backgroundColor: "white",
                              height: 100,
                              alignSelf: "center",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 10,
                            }}
                          >
                            <Text
                              allowFontScaling={false}
                              style={{
                                color: "#757575",
                                fontSize: 16,
                                fontFamily: "Gilroy-SemiBold",
                              }}
                            >
                              No results found
                            </Text>
                          </View>
                        }
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      styles.line,
                      {
                        marginLeft: "5%",
                        width: WIDTH * 0.82,
                        marginTop: platformType === "ios" ? "4%" : "1%",
                      },
                    ]}
                  ></View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: platformType === "ios" ? "4%" : "5%",
                    }}
                  >
                    <View>
                      <Text allowFontScaling={false} style={styles.pickup}>
                        {t("DROPOFF")}
                      </Text>
                      <GooglePlacesAutocomplete
                        placeholder={t("Enterdestination")}
                        fetchDetails={true}
                        numberOfLines={3}
                        onPress={(data, details = null) => {
                          // Keyboard.dismiss()
                          // if (pickLocation && details.formatted_address) {
                          closeBottomSheet();
                          saveRecentSearch({
                            LatLog: details?.geometry?.location,
                            address: details?.formatted_address,
                          });
                          setTimeout(() => {
                            props.navigation.navigate("ChooseARide", {
                              currentLatlog:
                                picklatlong != "" ? picklatlong : currentLatlog,
                              dropLatLog: details?.geometry?.location,
                              pickupAddress:
                                pickLocation != "" ? pickLocation : location,
                              dropAddress: details?.formatted_address,
                            });
                          }, 500);
                          // }
                        }}
                        query={{
                          key: MAP_KEY,
                          language: "en",
                          // components: 'country:IN',
                          radius: 50,
                          rankby: "distance",
                          location: `${loctionData?.coords?.latitude},${loctionData?.coords?.longitude}`,
                        }}
                        textInputProps={{
                          autoFocus: false,
                          blurOnSubmit: false,
                          placeholderTextColor: "#757575",
                          numberOfLines: 3, // Adjusting the number of lines may help in some cases
                          // multiline: true, // Enable multiline input if needed
                          allowFontScaling: false,
                        }}
                        debounce={500}
                        enablePoweredByContainer={false}
                        currentLocation={false}
                        styles={{
                          textInput: {
                            height: HEIGHT * 0.09,
                            width: WIDTH * 0.9,
                            color: "#191919",
                            paddingRight: 16,
                            marginHorizontal: 10,
                            minWidth: 300,
                            fontSize: 16,
                            fontFamily: FONTS.medium,
                          },
                          description: { fontSize: 16, color: "#757575" },
                        }}
                        // listLoaderComponent={() => (
                        //   <>
                        //     <ActivityIndicator
                        //       size={"small"}
                        //       color={COLORS.darkgrey}
                        //     />
                        //   </>
                        // )}
                        listEmptyComponent={
                          <View
                            style={{
                              width: WIDTH * 0.84,
                              backgroundColor: "white",
                              height: 100,
                              alignSelf: "center",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 10,
                            }}
                          >
                            <Text
                              allowFontScaling={false}
                              style={{
                                color: COLORS.darkgrey,
                                fontSize: 16,
                                fontFamily: FONTS.medium,
                              }}
                            >
                              No results found
                            </Text>
                          </View>
                        }
                        keyboardShouldPersistTaps="handled"
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/* ************************************************ */}
              {/* <View style={styles.line1}></View> */}
              <Text allowFontScaling={false} style={styles.txt}>
                {t("Recent search")}
              </Text>
              <TouchableWithoutFeedback style={{ marginTop: "2%" }}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={true}
                  data={firstThreeItems}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => {
                    // const IconMethod = item.Method;
                    return (
                      <TouchableWithoutFeedback
                        style={styles.MainView}
                        onPress={() => {
                          closeBottomSheet();
                          setTimeout(() => {
                            props.navigation.navigate("ChooseARide", {
                              currentLatlog:
                                picklatlong !== ""
                                  ? picklatlong
                                  : currentLatlog,
                              dropLatLog: item?.LatLog,
                              pickupAddress:
                                pickLocation !== "" ? pickLocation : location,
                              dropAddress: item?.address,
                            });
                          }, 500);
                        }}
                      >
                        {/* <TouchableOpacity style={styles.MainView}
                    onPress={()=> 
                      setTimeout(() => {
                        props.navigation.navigate("ChooseARide", {
                          currentLatlog:picklatlong !=""? picklatlong :  currentLatlog,
                          dropLatLog: details?.geometry?.location,
                          pickupAddress:pickLocation !=""? pickLocation : location,
                          dropAddress: details?.formatted_address,
                        });
                      }, 500);
                    }
                    > */}
                        <View style={{ flexDirection: "row", marginTop: "2%" }}>
                          <View style={styles.iconview}>
                            {/* <IconMethod
                            name={item.icon}
                            size={20}
                            color={COLORS.BACKGROUNDBTNCOLOR}
                          /> */}
                          </View>
                          <View style={{ width: WIDTH * 0.9 }}>
                            <Text allowFontScaling={false} style={styles.txt1}>
                              {item?.address}
                            </Text>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  }}
                />
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </RBSheet>

      <RBSheet
        ref={bottomSheetRef2}
        height={sheetHeight}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: styles.firstView1,
          draggableIcon: {
            opacity: 1,
            backgroundColor: "#9B9B9B",
            width: 70,
            height: 7,
            marginTop: 15,
          },
        }}
      >
        <BookConfirmpopup
          Ridetails={RideDetails}
          onlineStatus={onlineStatus}
          Action={() => {
            closeDataChat();
          }}
          acceptOTP={acceptOTP}
          Action1={() => closeTheModalCancelRider()}
        />
      </RBSheet>

      <RBSheet
        ref={bottomSheetRef3}
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
          Action1={() => bottomSheetRef3.current.close()}
          Action={() => CancelReasonModal()}
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
        Action={
          () => CancelRiderRequestHandler()
          // setModalVisibleReson(false);
          // props.navigation.navigate('AfterStartingRide');
        }
        source={IMAGEPATH.cancle}
        imgstyle={{}}
        modalstyle={
          {
            // height:platformType==='ios'? 284:  HEIGHT*0.38,
          }
        }
      />

      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  topview: {
    flexDirection: "row",
    width: WIDTH * 0.9,
    justifyContent: "space-between",
  },
  headerview: {
    width: WIDTH,
    height: HEIGHT * 0.07,
    backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
    justifyContent: "center",
  },
  innerhead: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
  },
  head: {
    textAlign: "center",
    color: COLORS.WHITE,
    fontFamily: FONTS.bold,
    fontSize: 18,
    marginTop: -5,
    fontWeight: "600",

    // paddingRight: 10
    // marginLeft: -10
    // width: "65%",
    // alignSelf: "center",
    // marginLeft:'10%'
  },

  firstView1: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  line: {
    backgroundColor: "#ECECEC",
    width: WIDTH * 0.9,
    height: 1,
    // marginTop: "5%",
    alignSelf: "center",
  },
  line1: {
    backgroundColor: "#ECECEC",
    width: WIDTH,
    height: 15,
    marginTop: platformType === "ios" ? "5%" : "0%",
    alignSelf: "center",
  },
  iconview: {
    // borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "3%",
  },
  MainView: {
    borderColor: "rgba(142, 142, 147, 1)",
    borderRadius: 8,
    // marginTop: '3%',
    width: WIDTH,
    // alignSelf: "center",
    padding: "2%",
  },
  txt: {
    fontSize: 13,
    fontFamily: FONTS.bold,
    // alignSelf: "center",
    color: "#C8C7CC",
    marginLeft: "5%",
    marginTop: "5%",
  },
  txt1: {
    fontSize: 16,
    fontFamily: FONTS.semibold,
    // alignSelf: "center",
    color: "grey",
    marginLeft: "5%",
  },
  pickup: {
    color: "#C8C7CC",
    fontSize: 13,
    fontFamily: FONTS.light,
    marginLeft: "5%",
  },
  searchview: {
    flexDirection: "row",
    justifyContent: "center",
    width: WIDTH * 0.9,
    borderRadius: 30,
    height: 58,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    marginTop: "4%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
});
