import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Platform,
  StatusBar,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import Header from "../../Components/HeaderComponent/Header";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import Swipeout from "react-native-swipeout";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  clearAllNotification,
  deleteNotification,
  listNotification,
} from "../../ApiConfig/Endpoints";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import { useIsFocused } from "@react-navigation/native";
import SpiningLoader from "../../assets/SpiningLoader";
import { showMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";
const platformType = Platform.OS;
const Notification = (props: any) => {
  const {t}=useTranslation();
    const isFocus = useIsFocused();

  interface DataItem {
    _id: any;
    index: number;
    description: string;
    createdAt: any;
  }
  const [modalVisible, setmodalVisible] = useState(false);
  const [NotificatioList, setNotificatioList] = useState([]);
  // console.log("fghdghgfdhg", NotificatioList);

  const [loader, setLoader] = useState(false);
  const [NotificationData, setNotificationData] = useState([]);

  const Data = useSelector((state: RootState) => state.value);
  // console.log("tokenuser", Data?.RegisterTOKEN)
  //api for notification list
  const NotificationList = async () => {
    const token = Data?.RegisterTOKEN;
    try {
      setLoader(true);
      const result = await axios({
        method: "POST",
        url: listNotification,
        data: {
          token: token,
        },
      });
      // console.log("NotificationnnnnnList====", result)
      if (result?.data?.responseCode === 200) {
        setLoader(false);
        // console.log("----------------->>>>565656", result?.data?.notification)
        setNotificatioList(result?.data?.notification);
      }
    } catch (error) {
      // console.log("error is ", error)
      setLoader(false);
    }
  };
  //api for delete notification
  const DeleteNotification = async (id) => {
    const token = Data?.RegisterTOKEN;
    try {
      setLoader(true);
      const res = await axios({
        method: "DELETE",
        url: deleteNotification,
        headers: {
          token: token,
        },
        params: {
          notificationId: id,
        },
      });
      // // console.log("delll", res?.data)
      if (res?.data?.responseCode === 200) {
        setLoader(false);
        showMessage({
          type: "success",
          message: res?.data?.responseMessage,
          icon: "success",
        });
        await NotificationList();
      }
    } catch (error) {
      // console.log("error is ", error)
      setLoader(false);
    }
  };

  const ClearAllNotification = async () => {
    const token = Data?.RegisterTOKEN;
    try {
      // setLoader(true)
      const res = await axios({
        method: "DELETE",
        url: clearAllNotification,
        headers: {
          token: token,
        },
      });
      // // console.log("delll", res?.data)
      if (res?.data?.responseCode === 200) {
        // setLoader(false)
        showMessage({
          type: "success",
          message: res?.data?.responseMessage,
          icon: "success",
        });
        // setLoader(false)
        NotificationList();
      }
    } catch (error) {
      // console.log("error is ", error)
      // setLoader(false)
    }
  };

  useEffect(() => {
    NotificationList();
  }, [isFocus, props?.navigation]);

  const handlelr = () => {
    // console.log("ctetststststs");
  };

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
          height: Platform.OS === "ios" ? HEIGHT * 0.12 : HEIGHT * 0.065,
        }}
      >
        <Header
          navigation={props?.navigation}
          Heading={t("Notifications")}
          Heading1={NotificatioList?.length > 0 ? t("Clear All") : null}
          HeaderStyle={{ marginLeft: platformType === "ios" ? "12%" : "4%" }}
          Heading1Style={{ textAlign: 'left', marginRight: 20 }}
          setNotificationData={setNotificatioList}
          onYesPress={() => {
            ClearAllNotification();
          }}
        />
      </SafeAreaView>

      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          // style={{ marginBottom: '6%' }}
          // contentContainerStyle={{height:HEIGHT * 1}}
          data={NotificatioList}
          renderItem={({ item, index }) => {
            // console.log('Rendering item:', item);

            const swipeoutButtons = [
              {
                text: (
                  <Image
                    source={IMAGEPATH.delete}
                    style={{ width: 20, height: 20 }}
                  />
                ),
                backgroundColor: "#FFFFFF",
                onPress: () => DeleteNotification(item?._id),
              },
            ];
            return (
              <View>
                <Swipeout
                  right={swipeoutButtons}
                  autoClose={true}
                  style={styles.MainView1}
                >
                  <View>
                    <TouchableOpacity style={styles.MainView}>
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: "2%",
                          alignItems: "center",
                        }}
                      >
                        <View style={styles.iconview}>
                          <Image
                            source={IMAGEPATH.bellimg}
                            style={{
                              width: 20,
                              height: 24,
                              alignSelf: "center",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          />
                        </View>
                        <View style={{ width: WIDTH * 0.7, marginLeft: "2%" }}>
                          <Text allowFontScaling={false} style={styles.txt1}>
                            {item?.description}
                          </Text>
                        </View>
                      </View>

                      <Text allowFontScaling={false} style={styles.txt2}>
                        {moment(item?.createdAt).format(" Do MMMM YYYY, h:mm ")}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                  </View>
                </Swipeout>
              </View>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View style={styles.view1}>
                <Image
                  style={{ resizeMode: "contain" }}
                  source={IMAGEPATH.Bell}
                />
                <Text allowFontScaling={false} style={styles.text1}>
                  {t('No Notification Received Yet!')}
                </Text>
              </View>
            );
          }}
        />
      </View>
      {/* {Loader &&  <SpiningLoader loader={Loader} />} */}
      {/* </SafeAreaView> */}
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({
  text1: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: "#BEBEBE",
    marginTop: "6%",
  },
  view1: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "35%",
  },
  iconview: {
    backgroundColor: "rgba(255, 85, 0, 0.1)",
    borderColor: "#383221",

    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 45,
    marginLeft: "3%",
  },
  MainView: {
    backgroundColor: "rgba(247, 248, 249, 1)",
    borderColor: "rgba(142, 142, 147, 1)",
    borderRadius: 8,
    marginTop: "2%",
    width: WIDTH,
  },
  MainView1: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(247, 248, 249, 1)",

    width: WIDTH,

    alignSelf: "center",
  },
  txt1: {
    fontSize: 16,
    fontFamily: FONTS.light,
    // alignSelf: "center",
    color: "#242E42",
    marginLeft: "1%",
  },
  txt2: {
    fontSize: 13,
    fontFamily: FONTS.light,
    color: "#868686",
    marginRight: "4%",
    // marginTop: "1%",
    textAlign: "right",
    marginBottom: "2%",
  },
  line: {
    backgroundColor: "#ECECEC",
    width: WIDTH,
    height: 5,
  },
});
