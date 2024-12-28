import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import Header from "../../Components/HeaderComponent/Header";
import { COLORS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import InputFiled from "../../Components/ValidationsConfig/InputField";
import WholeButton from "../../Components/Wholebutton/Wholebutton";
import Map2 from "../../Components/SvgComponent/Location/Map2";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { io } from "socket.io-client";
import { MAP_KEY, SOCKET_URL } from "../../ApiConfig/Endpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import { useIsFocused } from "@react-navigation/native";
import socketServcies from "../../Utils/SocketService";

const platformType = Platform.OS;
const SetupOnMap = (props: any) => {
  const myRef = useRef(null);
  const currentLog = props?.route?.params?.currentLatlog;
  const dropLatLog = props?.route?.params?.dropLatLog;
  const pickupAddress = props?.route?.params?.pickupAddress;
  const dropAddress = props?.route?.params?.dropAddress;

  const [pickdrop, setPickDrop] = useState({
    pickupAddres: {
      latitude: currentLog?.lat,
      longitude: currentLog?.lng,
    },
    dropAddresData: {
      latitude: currentLog?.lat,
      longitude: currentLog?.lng,
    },
  });

  const { pickupAddres, dropAddresData } = pickdrop;

  const [pickup, setPickup] = useState({
    latitude: currentLog?.lat,
    longitude: currentLog?.lng,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const [dropUp, setDropup] = useState({
    latitude: dropLatLog?.lat,
    longitude: dropLatLog?.lng,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const [intialLocation, setIntialLocation] = useState({
    latitude: dropLatLog?.lat,
    longitude: dropLatLog?.lng,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const [nearbyDrivers, setNearByDrivers] = useState([]);
  const isfocus = useIsFocused();
  const loctionData = useSelector(
    (state: RootState) => state?.locationSelector?.userCoordinated
  );

  const handleNearbyDrivers = () => {
    setTimeout(() => {
      NearbyDrivers();
    }, 10000);
  };

  //SOCKET for near by drivers
  const NearbyDrivers = () => {
    const lat = loctionData?.coords?.latitude;
    const lng = loctionData?.coords?.longitude;
    // console.log("cureent latttt---", lat);
    // console.log("current long", lng);
    // socketServcies.emit("checkNearbyDriver", { lat, lng }, (response) => {
    //     // console.log("socket emited for nearby Drivers", response)
    // })
    socketServcies.emit("checkNearbyDriver", { lat, lng });
    socketServcies.on("nearbyDriver", (response) => {
      // console.log("Response for near by drivers-11--->>", response?.[0]?.location?.coordinates[0])
      // console.log("Response for near by drivers-11--->>", response?.[0]?.location?.coordinates[1])
      // console.log("Response for near by drivers-11--->>", response?.[1]?.location?.coordinates[0])
      // console.log("Response for near by drivers-11--->>", response?.[1]?.location?.coordinates[1])
      // console.log("11-------NearBy Drivers--->>", response)
      if (response) {
        setNearByDrivers(response);
      }
    });
  };

  useEffect(() => {
    handleNearbyDrivers();
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
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          navigation={props?.navigation}
          Heading={"Plan Your Ride"}
          HeaderStyle={{ marginLeft: "10%" }}
        />

        <View style={styles.viewStyle}>
          <View style={styles.viewStyle}>
            <View style={{ marginTop: "10%", marginLeft: "10%" }}>
              <Map2 />
            </View>

            <View style={{ marginLeft: "5%" }}>
              <View style={styles.viewStyle1}>
                <InputFiled
                  InputFieldStyle={styles.InputStyle}
                  placeholder={"Live Location"}
                  placeholderTextColor={"#A2A4A8"}
                  maxLength={256}
                  value={pickupAddress}
                  editable={false}
                />
              </View>

              <View style={styles.viewStyle2}>
                <InputFiled
                  InputFieldStyle={styles.InputStyle}
                  placeholder={"Drop destination"}
                  placeholderTextColor={"#A2A4A8"}
                  maxLength={256}
                  value={dropAddress}
                  editable={false}
                />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{ backgroundColor: "#fffff", flex: 1, position: "relative" }}
        >
          <MapView
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
              origin={{ latitude: currentLog?.lat, longitude: currentLog?.lng }}
              destination={{
                latitude: dropLatLog?.lat,
                longitude: dropLatLog?.lng,
              }}
              apikey={MAP_KEY}
              strokeWidth={5}
              strokeColor="rgb(2, 73, 9)"
            />
            <Marker
              coordinate={{
                latitude: currentLog?.lat,
                longitude: currentLog?.lng,
              }}
            >
              <Image
                source={require("../../assets/Images/pt.png")}
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
            {nearbyDrivers.map((driver) => (
              <Marker
                key={driver?.driverId}
                coordinate={{
                  latitude: driver.location.coordinates[0],
                  longitude: driver.location.coordinates[1],
                }}
              >
                <Image
                  source={IMAGEPATH.newCar}
                  style={{ width: 35, height: 35 }}
                />
              </Marker>
            ))}
          </MapView>

          <WholeButton
            styles={{
              marginTop: platformType == "ios" ? HEIGHT * 0.1 : HEIGHT * 0.63,
              backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
              color: COLORS.WHITE,
              position: "absolute",
              bottom: 20,
            }}
            Label={"DONE"}
            Action={() => {
              props.navigation.navigate("ChooseARide", {
                currentLatlog: currentLog,
                dropLatLog: dropLatLog,
                pickupAddress: pickupAddress,
                dropAddress: dropAddress,
              });
            }}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default SetupOnMap;

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: "#fff",
    flexDirection: "row",
    width: WIDTH,
    alignSelf: "center",
    justifyContent: "center",
  },
  viewStyle1: {
    width: WIDTH * 0.9,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "6%",
  },
  firstView1: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.WHITE,
  },
  viewStyle2: {
    width: WIDTH * 0.9,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: "1%",
    marginBottom: "4%",
  },
  InputStyle: {
    width: WIDTH * 0.75,
    alignSelf: "center",
  },
  viewStyle3: {
    justifyContent: "space-between",
  },
});
