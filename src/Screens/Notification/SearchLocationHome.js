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
  } from "react-native";
  import React, { useEffect, useRef, useState, useCallback } from "react";
  
  import { CommonActions, useFocusEffect, useIsFocused } from "@react-navigation/native";
  import { WIDTH, HEIGHT } from "../../Components/Helpers/Dimentions";
  import { COLORS, FONTS, VECTOR_ICONS, IMAGEPATH } from "../../assets/Theme";
  import RBSheet from "react-native-raw-bottom-sheet";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  import Crossicon from "../../Components/SvgComponent/CarRide/Crossicon";
  import Map1 from "../../Components/SvgComponent/Location/Map1";
  import Clock from "../../Components/SvgComponent/Booking/Clock";
  import DropOff from "../../Components/SvgComponent/Booking/DropOff";
  import MapView, { Marker, Polyline } from "react-native-maps";
  import { useDispatch, useSelector } from "react-redux";
  import { RootState } from "../../ReduxConfig/Store";
  import polyline from '@mapbox/polyline';
  import { callGetApi, callPostApi } from "../../ApiConfig/ApiCall";
  import {
    AccountEdit_,
    MAP_KEY,
    ViewProfile,
    uploadFile,
  } from "../../ApiConfig/Endpoints";
  import { setClearData, userData } from "../../ReduxConfig/UserDetails/UserSlice";
  import { showMessage } from "react-native-flash-message";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { setClearToken } from "../../ReduxConfig/Slices";
  import StatusModal from "../../Components/ModalComponent/StatusModal";
  import { selectCoordinates, selectDestination, selectOrigin } from "../../ReduxConfig/Location/navSlice";
  import { ActivityIndicator } from "react-native-paper";
  import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useTranslation } from "react-i18next";
  
  
  const platformType = Platform.OS;
  const SearchScreen = (props: any) => {
    const {t} = useTranslation
    const Data = useSelector(
      (state: RootState) => state.userDetails?.profileData
    );
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const coordinates = useSelector(selectCoordinates);
    const [currentLatlog, setCurrentLatLog] = useState(null);
    const [dropLatLog, setDropLatLog] = useState(null);
  
    // console.log("cureent--lat-log", currentLatlog)
    // console.log("dropLatLog--lat-log", dropLatLog)
  
  
    // console.log("originorigin", origin);
    const [location, setLocation] = useState("");
    const [location2, setLocation2] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [Loader, setLoader] = useState(false);
    const [fname, setfName] = useState("");
    const [lname, setLName] = useState("");
    const [modal, setModal] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    // console.log("recentSearchesrecentSearches",recentSearches);
    
  
    const useFocus = useIsFocused();
    const dispatch = useDispatch();
    // console.log("fadsfhsafsad", fname);
    const RegisterTOKEN = useSelector(
      (state: RootState) => state.REGISTER_TOKEN.RegisterTOKEN
    );
    const UserDate = useSelector(
      (state: RootState) => state.userDetails?.profileData
    );
    useEffect(() => {
      VIEW_PROFILEAPI();
    }, [RegisterTOKEN,useFocus ]);
  
    useEffect(() => {
      if (currentLatlog && dropLatLog && location && location2 ) {
        closeBottomSheet();
        props.navigation.navigate("ConfirmPickuptime", {
          currentLatlog: currentLatlog,
          dropLatLog: dropLatLog,
          pickupAddress:location,
          dropAddress:location2
        });
      }
    }, [currentLatlog, dropLatLog,location,location2]);
  
  
  
  
    // // console.log(ImageSelected, "ImageSelected");
    // **********************VIEWPRFILE API************************
  
    const VIEW_PROFILEAPI = async () => {
      setLoader(true);
      // console.log("asdfkjsdfj", RegisterTOKEN);
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
            setLoader(false);
            // // console.log("GET_ACCOUNT DATA", response?.data?.firstName);
            const responseData = response?.data;
            const firstName_ = responseData.firstName;
            setfName(firstName_);
            const lastName = responseData.lastName;
            setLName(lastName);
            const countryCode = responseData.emergencyCountryCode;
            // setCountryCode(countryCode);
            const phoneNumber = responseData.emergencyContact;
            const profileImage = responseData?.profileImage;
            const statusReason = responseData?.statusReason || false;
            const status = responseData?.status;
            setModal(responseData?.status == 'blocked' ? true : false);
            // console.log("jashda", {
              firstName_,
              lastName,
              countryCode,
              phoneNumber,
              profileImage,
              status,
              statusReason
            })
            if (statusReason) {
              dispatch(
                userData({
                  firstName_,
                  lastName,
                  countryCode,
                  phoneNumber,
                  profileImage,
                  status,
                  statusReason
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
                  status
                })
              );
            }
          }
        }
      } catch (error: any) {
        setLoader(false);
        console.error("Error during MO_verify: search home location", error.response);
      }
    };
  
  
    const [data, setData] = useState([
      {
        id: 1,
        icon: "map-marker-alt",
        Method: VECTOR_ICONS.FontAwesome5,
        txt: "University of Washington",
      },
      {
        id: 2,
        icon: "map-marker-alt",
        Method: VECTOR_ICONS.FontAwesome5,
        txt: "Woodland Park",
      },
      {
        id: 3,
        icon: "map-marker-alt",
        Method: VECTOR_ICONS.FontAwesome5,
        txt: "Husky Stadium",
      },
      {
        id: 4,
        icon: "map-marker-alt",
        Method: VECTOR_ICONS.FontAwesome5,
        txt: "Husky Stadium",
      },
      {
        id: 4,
        icon: "map-marker-alt",
        Method: VECTOR_ICONS.FontAwesome5,
        txt: "Husky Stadium",
      },
      {
        id: 4,
        icon: "map-marker-alt",
        Method: VECTOR_ICONS.FontAwesome5,
        txt: "Husky Stadium",
      },
    ]);
  
    const resetState = () => {
      setCurrentLatLog(null);
      setDropLatLog(null);
      setLocation("");
      setLocation2("");
    };
  
    const bottomSheetRef = useRef<RBSheet | null>(null);
    const openBottomSheet = () => {
      resetState();
      if (bottomSheetRef.current) {
        bottomSheetRef.current.open();
      }
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
  
    // useEffect(()=>{
    //   props?.navigation?.navigate("statusModal")
  
    // },[])
  
  
    const logoutHandler = async () => {
  
      await AsyncStorage.removeItem("TOKEN");
      setModal(false);
      // setTimeout(() => {
      dispatch(setClearData({}))
      dispatch(setClearToken(""))
      Platform.OS === "android" ?
        props?.navigation?.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        ) :
        setTimeout(() => {
          props?.navigation?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          )
        }, 500)
  
    }
  
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    // console.log("routeCoordinatesrouteCoordinates", routeCoordinates)
  
    // const initialRegion = {
    //   latitude: 28.5355,
    //   longitude: 77.3910,
    //   latitudeDelta: 0.02,
    //   longitudeDelta: 0.02,
    // };
  
    const [intialLocation, setIntialLocation] = useState({
      // latitude: lat ?? location?.coords?.latitude,
      // longitude: long ?? location?.coords?.longitude,
      // latitudeDelta: 0.02,
      // longitudeDelta: 0.02,
      latitude: 28.5355,
      longitude: 77.3910,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  
    // console.log("intialLocationintialLocation--", intialLocation)
    const setInitialLocations = (loc, details) => {
      // console.log("agsadgdas", loc)
      // console.log("detailsdetailsdetails", details)
      setIntialLocation({
        latitude: loc?.lat,
        longitude: loc?.lng,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
      // props.navigation.push("MyLocation", {
      //   long: loc?.lng,
      //   lat: loc?.lat,
      //   type: "loc",
      //   datas: details,
      // });
    };
  
  
    const sheetHeight = platformType === "ios" ? 410 : 420;
    return (
      <>
        <SafeAreaView
          style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}
        ></SafeAreaView>
        <StatusBar
          backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
          barStyle={"dark-content"}
        />
        {/* <ImageBackground
          source={IMAGEPATH.searchmap}
          style={{ width: WIDTH, height: HEIGHT }}
          imageStyle={{
            resizeMode: "stretch",
          }}
        > */}
        {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
  
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
                  source={IMAGEPATH.Home}
                  style={{ width: 100, height: 50, resizeMode: "contain" }}
                />
                <View style={{ marginLeft: 20 }}>
                  {UserDate?.firstName_ && (
                    <Text allowFontScaling={false} style={styles.head}>
                      {`Hi! ${UserDate?.firstName_?.length > 12
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
  
  
          <View style={{
            flex: 1,
            position: "absolute",
            top: Platform.OS == "ios" ? 50 : 50,
            zIndex: 1,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
          }}>
  
            <TouchableOpacity
              onPress={() => {
                openBottomSheet();
              }}
              style={styles.searchview}
            >
              <Text
allowFontScaling={false}                 style={{
                  color: "#9B9B9B",
                  fontSize: 17,
                  fontFamily: FONTS.light,
                  marginLeft: "2%",
                  width: WIDTH * 0.67,
                }}
              >
                {" "}
                Search destination
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
          <MapView
            style={{
              flex: 1,
            }}
            initialRegion={intialLocation}
            zoomTapEnabled={true}
            zoomEnabled={true}
            scrollEnabled={true}
            showsScale={true}
            onRegionChange={(region) => {
              
              // console.log("regionss", region);
              setIntialLocation({ ...intialLocation });
            }}
          >
            {/* Marker example */}
            <Marker coordinate={{ latitude: 28.5355, longitude: 77.3910 }} title="Driver Marker" />
            <Marker coordinate={{ latitude: 28.4744, longitude: 77.5039 }} title="User Marker" />
  
          </MapView>
  
         {
            modal &&
  
            <StatusModal logout={logoutHandler} modalVisible={modal}/>
  
            } 
        </SafeAreaView>
        <RBSheet
          ref={bottomSheetRef}
          height={sheetHeight}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: styles.firstView1,
            draggableIcon: { opacity: 1, backgroundColor: "#9B9B9B" },
          }}
        >
          <KeyboardAwareScrollView behavior="padding" style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          
            {/* ************************************************** */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  
            <View style={styles.topview}>
              <View style={{ marginTop: 30, marginLeft: 20 }}>
                <Map1 />
              </View>
              <View style={{ paddingRight: 10, overflow: 'hidden' }}>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text allowFontScaling={false} style={styles.pickup}>PICKUP</Text>
                    <GooglePlacesAutocomplete
                      placeholder="Enter current location"
                      fetchDetails={true}
                      onPress={(data, details = null) => {
                        // console.log('location---->currentcooordinate', details);
                        setLocation(details?.formatted_address);
                        setCurrentLatLog(details?.geometry?.location); // Set the selected origin here
                      }}
                      // onPress={(data, details = null) => {
                      //   // console.log('location---->', details)
                      //   setInitialLocations(details?.geometry?.location, details);
                      // }}
                      query={{
                        key:MAP_KEY,
                        language: "en",
                      }}
                      textInputProps={{
                        autoFocus: false,
                        blurOnSubmit: false,
                        placeholderTextColor: '#757575'
                      }}
                      debounce={500}
                      styles={{
                        textInput: {
                          height: HEIGHT * 0.06,
                          width: WIDTH * 0.9,
                          color: "#191919",
  
                          paddingRight: 16,
                          marginHorizontal: 10,
                          minWidth: 300,
                          fontSize: 16,
  
                        },
  
                      }}
                      listLoaderComponent={() => (
                        <>
                          <ActivityIndicator size={"small"} color={COLORS.darkgrey} />
                        </>
                      )}
                      listEmptyComponent={() => (
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
allowFontScaling={false}                             style={{
                              color: COLORS.darkgrey,
                              fontSize: 16,
                              fontFamily: "Gilroy-SemiBold",
                            }}
                          >
                            No results found
                          </Text>
                        </View>
                      )}
                    />
  
                  </View>
                  {/* <View
                      style={{
                        flexDirection: "row",
                        width: WIDTH * 0.12,
                        justifyContent: "flex-end",
                        marginLeft: "4%",
                        marginTop: "3%",
                      }}
                    >
  
                      <View
                        style={{
                          backgroundColor: "#4252FF",
                          width: WIDTH * 0.085,
                          height: 33,
                          borderRadius: 100,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
  
                        <Clock />
                      </View>
                    </View> */}
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
                    <Text allowFontScaling={false} style={styles.pickup}>DROP-OFF</Text>
                    <GooglePlacesAutocomplete
                      placeholder="Enter your Destination"
                      fetchDetails={true}
                      onPress={(data, details = null) => {
                        // console.log('location---->', details);
                        setLocation2(details?.formatted_address);
                        setDropLatLog(details?.geometry?.location); // Set the selected destination here
                      }}
                      query={{
                      
                        key: MAP_KEY,
                        language: "en",
                      }}
                      textInputProps={{
                        autoFocus: false,
                        blurOnSubmit: false,
                        placeholderTextColor: '#757575'
                      }}
                      debounce={500}
                      styles={{
                        textInput: {
                          height: HEIGHT * 0.06,
                          width: WIDTH * 0.9,
                          color: "#191919",
                          // backgroundColor: "red",
                          // borderRadius: 50,
                          // borderColor: "rgba(0,0,0,0.25)",
                          // borderWidth: 0.5,
                          // elevation: 3,
                          // paddingLeft: 50,
                          paddingRight: 16,
                          marginHorizontal: 10,
                          minWidth: 300,
                          fontSize: 16,
  
                        },
  
                      }}
                      listLoaderComponent={() => (
                        <>
                          <ActivityIndicator size={"small"} color={COLORS.darkgrey} />
                        </>
                      )}
                      listEmptyComponent={() => (
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
allowFontScaling={false}                             style={{
                              color: COLORS.darkgrey,
                              fontSize: 16,
                              fontFamily: "Gilroy-SemiBold",
                            }}
                          >
                            No results found
                          </Text>
                        </View>
                      )}
                    />
  
                  </View>
  
                  <View
                    style={{
                      flexDirection: "row",
                      width: WIDTH * 0.2,
                      justifyContent: "space-between",
                      marginLeft: "1%",
                      marginTop: "3%",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#EFEFEF",
                        width: WIDTH * 0.002,
                        height: 25,
                        marginTop: "3%",
                      }}
                    ></View>
  
  
  
                  </View>
                </View>
              </View>
            </View>
            </TouchableWithoutFeedback>
  
            {/* ************************************************ */}
            {/* <View style={styles.line1}></View> */}
            {/* <Text allowFontScaling={false} style={styles.txt}>RECENT SEARCH</Text>
            <View style={{ marginTop: "2%" }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                data={data}
                renderItem={({ item }) => {
                  const IconMethod = item.Method;
                  return (
                    <View>
                      <TouchableOpacity style={styles.MainView}>
                        <View
                          style={{ flexDirection: "row", marginTop: "2%" }}
                        >
                          <View style={styles.iconview}>
                            <IconMethod
                              name={item.icon}
                              size={20}
                              color={COLORS.BACKGROUNDBTNCOLOR}
                            />
                          </View>
                          <View style={{ width: WIDTH * 0.7 }}>
                            <Text allowFontScaling={false} style={styles.txt1}>{item.txt}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.line}></View>
                    </View>
                  );
                }}
              />
            </View> */}
          </KeyboardAwareScrollView>
        </RBSheet>
        {/* </GestureHandlerRootView > */}
  
        {/* </ImageBackground> */}
        <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
      </>
    );
  };
  
  export default SearchScreen
  
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
      fontSize: 17,
      fontFamily: FONTS.semibold,
      // alignSelf: "center",
      color: "#242E42",
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
      height: 60,
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
  