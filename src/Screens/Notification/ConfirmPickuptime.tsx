import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Platform,
  StatusBar
} from "react-native";
import { useState } from "react";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import WholeButton from "../../Components/Wholebutton/Wholebutton";
import { SafeAreaView } from "react-native-safe-area-context";
import Cross from "../../Components/SvgComponent/Notification/Cross";
import moment from "moment";
const platformType = Platform.OS;
const ConfirmPickuptime = (props: any) => {
  const currentLog = props?.route?.params?.currentLatlog;
  const dropLatLog = props?.route?.params?.dropLatLog;
  const pickupAddress = props?.route?.params?.pickupAddress;
  const dropAddress = props?.route?.params?.dropAddress;
  // console.log("ConfirmPickuptime currentLogcurrentLogcurrentLog", currentLog)
  // console.log("ConfirmPickuptime dropLatLogdropLatLog", dropLatLog)
  // console.log("ConfirmPickuptime pickeupAdressss---000", pickupAddress);
  // console.log("ConfirmPickuptime dropAddressss---", dropAddress);
  const date = new Date()
  // console.log("datedatedate", date);



  const [data, setData] = useState([
    {
      id: 1,
      icon: 'information-circle-outline',
      Method: VECTOR_ICONS.Ionicons,
      txt: "Match with a new driver if yours will be late due to slow progress",
    },
    {
      id: 2,
      icon: 'information-circle-outline',
      Method: VECTOR_ICONS.Ionicons,
      txt: "Choose your exact pick-up time up to 90 days in advance",
    },
    {
      id: 3,
      icon: 'information-circle-outline',
      Method: VECTOR_ICONS.Ionicons,
      txt: "Extra wait time included to meet your trip",
    },
    {
      id: 4,
      icon: 'information-circle-outline',
      Method: VECTOR_ICONS.Ionicons,
      txt: "Cancel at no charge up to 60 minutes in advance",
    },
  ]);
  return (
    // <>
    // <SafeAreaView style={{ backgroundColor: COLORS.WHITE }}></SafeAreaView>
    //   <StatusBar
    //     backgroundColor={COLORS.WHITE}
    //     barStyle={"dark-content"}
    //   />
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', backgroundColor: COLORS.WHITE }}>

      <View>
        <TouchableOpacity onPress={() => {
          props.navigation.goBack()
        }}
          style={{ margin: "5%" }}>
          <Cross />
        </TouchableOpacity>

        <Text allowFontScaling={false} style={styles.head}>Confirm Pick-up time</Text>
        <View style={{ marginTop: "15%" }}>
          <Text allowFontScaling={false} style={styles.date}>{moment(date).format("LL")}</Text>
          <View style={styles.line}></View>
          <Text allowFontScaling={false} style={styles.time}>{moment(date).format("LT")}</Text>

          <View style={{ marginTop: "10%" }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              data={data}
              renderItem={({ item }) => {
                const IconMethod = item.Method;
                return (
                  <View>
                    <View style={styles.MainView}>
                      <View style={{
                        flexDirection: "row", marginTop: "2%", justifyContent: 'space-between', marginHorizontal: '4%',
                        width: WIDTH * 0.85
                      }}>

                        <IconMethod
                          name={item.icon}
                          size={24}
                          color={COLORS.BACKGROUNDBTNCOLOR}
                        />

                        <View style={{ width: WIDTH * 0.75, }}>
                          <Text allowFontScaling={false} style={styles.txt1}>{item.txt}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>

      </View>
      <View style={{ justifyContent: 'flex-end', marginTop: platformType === 'ios' ? '5%' : '0%', marginBottom: platformType === 'ios' ? '6%' : '5%' }}>
        <WholeButton
          styles={{
            backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
            color: COLORS.WHITE
          }}
          Label={'Confirm Pick-up time'}
          Action={() => {
            props.navigation.navigate("SetupOnMap", {
              currentLatlog: currentLog,
              dropLatLog: dropLatLog,
              pickupAddress: pickupAddress,
              dropAddress: dropAddress
            });
          }}
        />
      </View>
    </SafeAreaView>
    //<SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    //</> 
  );
};

export default ConfirmPickuptime;

const styles = StyleSheet.create({
  head: {
    fontSize: 30,
    color: "#242E42",
    fontFamily: FONTS.bold,
    marginTop: platformType === 'ios' ? "2%" : '0%',
    alignItems: "center",
    alignSelf: "center",
  },
  date: {
    fontSize: 16,
    fontFamily: FONTS.semibold,
    alignSelf: "center",
    color: "#242E42",
  },
  time: {
    fontSize: 16,
    fontFamily: FONTS.semibold,
    alignSelf: "center",
    color: "#242E42",
    marginTop: "5%",
  },
  line: {
    backgroundColor: "#ECECEC",
    width: WIDTH * 0.9,
    height: 3,
    marginTop: "5%",
    alignSelf: "center",
  },

  MainView: {
    borderColor: "rgba(142, 142, 147, 1)",
    borderRadius: 8,
    width: WIDTH,

    alignSelf: "center",
    padding: "2%",
  },
  txt1: {
    fontSize: 14,
    fontFamily: FONTS.semibold,
    color: "#242E42",

  },
});
