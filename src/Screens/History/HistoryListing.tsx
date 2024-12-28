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
  StatusBar,
  Platform,
  RefreshControl,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { WIDTH, HEIGHT } from "../../Components/Helpers/Dimentions";
import { COLORS, FONTS, VECTOR_ICONS, IMAGEPATH } from "../../assets/Theme";
import { useIsFocused } from "@react-navigation/native";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import Map1 from "../../Components/SvgComponent/Location/Map1";
import Map2 from "../../Components/SvgComponent/Location/Map2";
import Map3 from "../../Components/SvgComponent/Location/Map3";
import { useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import { callPostApi } from "../../ApiConfig/ApiCall";
import { UserHistory } from "../../ApiConfig/Endpoints";
import SpiningLoader from "../../assets/SpiningLoader";
import { Line, Svg } from "react-native-svg";
import axios from "axios";
import useDebounce from "../../Utils/useDebounce";
import { ActivityIndicator } from "react-native-paper";
import { roundOff } from "../../Utils/RoundOff";
import { useTranslation } from "react-i18next";

const platformType = Platform.OS;
const HistoryListing = (props: any) => {
  const {t}=useTranslation();
  const [search, setsearch] = useState("");
  const [FormDate1, setFormDate1] = useState(null);
  const [FormDateModal1, setFormDateModal1] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [userDataHistory, setUserHistory] = useState("");

  const [refreshing, setRefreshing] = useState(false);
  const isfocus = useIsFocused();
  const [manualRefresh, setManualRefresh] = useState(false);
  const deb = useDebounce(search, 2000);

  const Data = useSelector((state: RootState) => state.value);
  const token = Data?.RegisterTOKEN;
  const userId = { userId: Data?.UserID };

  useEffect(() => {
    setFormDateModal1(false);
  }, [useIsFocused()]);

  useEffect(() => {
    userHistoryHandler();
  }, [isfocus, FormDate1]);

  useEffect(() => {
    userHistoryHandler();
  }, [isfocus]);

  const resetFilters = () => {
    setsearch("");
    setFormDate1(null);
  };

  //API FOR USER History and filter
  const userHistoryHandler = async () => {
    setRefreshing(true);
    try {
      setLoader(true);
      const response = await axios({
        method: "GET",
        url: UserHistory,
        headers: {
          token: token,
        },
        params: {
          search: search ? search : null,
          fromDate: FormDate1 ? moment(FormDate1).format("YYYY-MM-DD") : null,
          page: 1,
          limit: 400,
        },
      });
      if (response?.data?.responseCode === 200) {
        const filteredRides = response?.data?.rides?.filter(
          (ride) => ride?.status !== "created"
        );
        setUserHistory(filteredRides);
        setRefreshing(false);
      }
    } catch (error) {
      // console.log("AHSGDJKA", error?.response?.data)
      if (error?.response?.data?.responseMessage == "Data not found") {
        setUserHistory([]);
      }
      setRefreshing(false);
    } finally {
      setLoader(false);
      setRefreshing(false);
      setManualRefresh(false);
    }
  };

  useEffect(() => {
    if (deb) {
      userHistoryHandler(deb);
    }
  }, [deb]);

  useEffect(() => {
    if (manualRefresh) {
      setFormDate1(null);
      userHistoryHandler();
    }
  }, [manualRefresh]);

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}
      ></SafeAreaView>
      <StatusBar
        backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
        barStyle={"dark-content"}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: FONTS.WHITE }}>
        <View style={styles.headerview}>
          <View style={styles.innerhead}>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                width: platformType === "ios" ? WIDTH * 0.52 : WIDTH * 0.54,
              }}
            >
              <Image
                source={IMAGEPATH.Home}
                style={{ width: 100, height: 50, resizeMode: "contain" }}
              />
              <Text allowFontScaling={false} style={styles.head}>{t('History')}</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Notification");
              }}
              // style={{ marginLeft: platformType == 'ios' ? '38%' : "12%" }}
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
            flexDirection: "row",
            width: WIDTH * 0.93,
            justifyContent: "space-between",
            marginTop: "2.5%",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: platformType == "ios" ? HEIGHT * 0.055 : HEIGHT * 0.055,
              width: WIDTH * 0.54,
              borderRadius: 8,
              borderWidth: 1.5,
              borderColor: "#EAEAEA",
              // backgroundColor: 'red',
              alignItems: "center",
            }}
          >
            <TextInput
              allowFontScaling={false}

              placeholder={t("Search by location")}
              // maxLength={16}
              value={search}
              style={{
                // color: '#C4C6CA',
                color: "black",
                fontSize: 15,
                fontFamily: FONTS.medium,
                marginLeft: platformType == "ios" ? "2.5%" : "2%",
                width: WIDTH * 0.44,
                // backgroundColor:'red'
              }}
              placeholderTextColor={COLORS.GRAY6}
              onChangeText={(text) => {
                setsearch(text);
              }}
            />
            <TouchableOpacity style={{}}>
              <VECTOR_ICONS.Feather
                name={"search"}
                color={"#C8C5C5"}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: WIDTH * 0.37,
              borderRadius: 8,
              borderWidth: 1.5,
              borderColor: "#EAEAEA",
              alignItems: "center",
            }}
            onPress={() => setFormDateModal1(true)}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: COLORS.GRAY6,
                  fontSize: 14,
                  fontFamily: FONTS.medium,
                  marginLeft: "6%",
                  width: WIDTH * 0.26,
                }}
              >
                {FormDate1
                  ? moment(FormDate1).format("YYYY-MM-DD")
                  : "YYYY-MM-DD"}
              </Text>

              <TouchableOpacity
                onPress={() => setFormDateModal1(true)}
                style={{ alignItems: "center" }}
              >
                <VECTOR_ICONS.Entypo
                  color={"#C8C5C5"}
                  name="calendar"
                  size={18}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.line}></View>

        <FlatList
          data={userDataHistory}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Platform.OS === "ios" ? 30 : 70,
          }}
          renderItem={({ item }) => {
            return (
              <View>
                <View style={{}}>
                  <View style={[styles.CreatedAtVIEW]}>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={[
                        styles.CreatedAtVIEW2,

                        {
                          backgroundColor:
                            item?.status === "accepted"
                              ? "#0DBA7F"
                              : item?.status === "cancelled"
                              ? "#737373"
                              : "#242E42",
                        },
                      ]}
                      onPress={() => {
                        if (
                          item?.status === "created" ||
                          item?.status === "accepted" ||
                          item?.status === "completed"
                        ) {
                          props?.navigation.navigate("BookedDetailsCompleted", {
                            data: item,
                          });
                        } else {
                          props?.navigation.navigate("BookDetailsCancle", {
                            data: item,
                          });
                        }
                      }}
                    >
                      <Text
                        allowFontScaling={false}
                        style={styles.CreatedAtTEXT}
                      >
                        {" "}
                        {moment(item?.createdAt).format(
                          " Do MMMM YYYY : h:mm A"
                        )}
                      </Text>
                      <Text
                        style={[
                          styles.CreatedAtTEXT,
                          { textTransform: "capitalize" },
                        ]}
                      >
                        {item?.status + " >"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.MainView_}>
                    <View
                      style={{
                        flexDirection: "row",
                        columnGap: 14,
                        flex: 1,
                      }}
                    >
                      <View>
                        <VECTOR_ICONS.FontAwesome6
                          name="location-dot"
                          size={25}
                          color={"#F50"}
                        />
                        <View style={{ height: 30 }}>
                          <Svg
                            width={2}
                            height="100%"
                            style={styles.dashedLine}
                          >
                            <Line
                              x1="1"
                              y1="0"
                              x2="1"
                              y2="100%"
                              stroke="gray"
                              strokeWidth={1}
                              strokeDasharray="5 4"
                            />
                          </Svg>
                        </View>
                        <VECTOR_ICONS.FontAwesome6
                          name="location-dot"
                          size={25}
                          color={"#F50"}
                        />
                      </View>
                      <View
                        style={{
                          justifyContent: "space-between",
                          flex: 1,
                        }}
                      >
                        <Text
                          allowFontScaling={false}
                          numberOfLines={2}
                          style={[styles.LocationTEXT]}
                        >
                          {item?.pickupAddress}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          numberOfLines={2}
                          style={styles.LocationTEXT1}
                        >
                          {item?.destinationAddress}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20, paddingTop: 10 }}>
                          <Text allowFontScaling={false} style={[styles.LocationTEXT, { fontWeight: '500', fontSize: 14 }]}>
                            {t('Ride Amount')}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={styles.NameTEXT}
                          >
                            ${roundOff(parseFloat(item?.fareAmount), 2)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* <Text allowFontScaling={false} style={styles.NameTEXT}>
                      ${parseFloat(item?.fareAmount).toFixed(2)}
                    </Text> */}
                  </View>
                </View>
              </View>
            );
          }}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={refreshing}
          //     onRefresh={() => {
          //       setManualRefresh(true); // Set manualRefresh to true when the user manually refreshes
          //       userHistoryHandler();
          //     }}
          //     colors={["#FF0000", "#00FF00", "#0000FF"]} // Android colors
          //     tintColor="grey" // iOS color
          //   />
          // }
          ItemSeparatorComponent={
            <>
              <View
                style={{
                  borderBottomColor: "#ECECEC",
                  borderBottomWidth: 6,
                }}
              />
            </>
          }
          ListEmptyComponent={
            <>
              <View
                style={{
                  height: HEIGHT * 0.8,
                  backgroundColor: "#ffff",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text allowFontScaling={false} style={{ color: "#000", fontSize: 14 }}>
                  {t('No data found')}
                </Text>
              </View>
            </>
          }
        />

        <DatePicker
          modal
          open={FormDateModal1}
          date={FormDate1 ? FormDate1 : new Date()}
          onConfirm={(date) => {
            // console.log("datevg---------r", date);
            setFormDate1(date);
            setFormDateModal1(false);
          }}
          onCancel={() => setFormDateModal1(false)}
          mode="date"
          textColor="#000"
        />
        {/* <SpiningLoader loader={Loader} /> */}
        {Loader && (
          <View
            style={{
              width: WIDTH,
              height: HEIGHT,
              zIndex: 12,
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <ActivityIndicator size={30} />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default HistoryListing;

const styles = StyleSheet.create({
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
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  line: {
    backgroundColor: "#ECECEC",
    width: WIDTH,
    height: 2,
    marginTop: "3%",
    alignSelf: "center",
  },
  CreatedAtVIEW: {
    flexDirection: "row",

    // justifyContent: "center",
    // alignItems: "center",
  },
  CreatedAtVIEW2: {
    width: WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,

    backgroundColor: "#242E42",
  },
  CreatedAtTEXT: {
    color: COLORS.WHITE,
    fontSize: 15,
    fontFamily: FONTS.light,
    fontWeight: Platform.OS === "ios" ? "500" : "400",
  },
  MainView_: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: "#ffff",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  LocationTEXT: {
    color: "rgba(36, 46, 66, 1)",
    fontSize: 14,
    fontFamily: FONTS.medium,
    paddingBottom: 10,
  },
  LocationTEXT1: {
    color: "rgba(36, 46, 66, 1)",
    fontSize: 14,
    fontFamily: FONTS.medium,
    paddingTop: 10,
  },
  AmountTEXT: {
    color: COLORS.GRAY4,
    fontSize: 16,
    fontFamily: FONTS.bold,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  NameID_View: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "2%",
    width: WIDTH * 0.9,
    alignSelf: "center",
  },
  NameTEXT: {
    color: "rgba(36, 46, 66, 1)",
    fontSize: 14,
    fontFamily: FONTS.light,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  dashedLine: {
    marginTop: 5,
    alignSelf: "center",
  },
});
