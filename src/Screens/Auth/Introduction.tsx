import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  Platform,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import WholeButton from "../../Components/Wholebutton/Wholebutton";
import RateModalComponent from "../../Components/ModalComponent/RateModalComponent";
import { CommonActions } from "@react-navigation/native";
import DeviceInfo from "react-native-device-info";
import VideoPlayer from "react-native-video-player";
import WebView from "react-native-webview";
import { useTranslation } from "react-i18next";

const platformType = Platform.OS;
const Introduction = (props: any) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [carrierName, setCarrierName] = useState(null);
  // console.log("carrierName---sim", carrierName);

  // setTimeout(() => {
  //     DeviceNumber?.get().then((res : any) => {
  //         // console.log(res,'Number Responce_');
  //       });
  // }, 1000);

  useEffect(() => {
    const getCarrierInfo = async () => {
      try {
        const carrier = await DeviceInfo.getCarrier();
        setCarrierName(carrier);
      } catch (error) {
        console.error("Error fetching carrier info:", error);
      }
    };

    getCarrierInfo();
  }, []);

  const OnStartedPress = () => {
    // props.navigation.navigate("Register");

    setModalVisible(false);
    setTimeout(() => {
      props?.navigation?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    }, 500);
  };

  const openLink = () => {
    Linking.openURL("https://youtu.be/qeStdcy9mng?si=-eDZ6YKEu2nG3lLH");
  };
  useEffect(() => {
    setTimeout(() => {
      // setModalVisible(true);
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <Text allowFontScaling={false} style={styles.Heading}>
        {t('Introduction')}
      </Text>
      <Text allowFontScaling={false} style={styles.HeadingText}>
      {t("Know your driver in advance and view their current location on the map in real time")}
      </Text>
      {modalVisible == false && (
        <View
          style={{
            width: WIDTH * 0.9,
            height: HEIGHT * 0.4,
            alignSelf: "center",
            marginTop: "10%",
          }}
        >
          {/* <TouchableOpacity
            onPress={() => openLink()}
            style={styles.VideoButton}
          >
            <Image style={styles.VideoImage} source={IMAGEPATH.IntroVidio} />
          </TouchableOpacity> */}

          {/* <WebView
            style={{
              width: WIDTH * 0.9,
              height: HEIGHT * 0.4,
              alignSelf: "center",
            }}
            source={{ uri: 'https://www.youtube.com/embed/qeStdcy9mng' }}
          /> */}
          <View
            style={{
              overflow: "hidden",
              borderRadius: 10,
            }}
          >
            <VideoPlayer
              video={require("../../assets/Images/car.mp4")}
              // video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
              videoWidth={45}
              videoHeight={40}
              thumbnail={IMAGEPATH.IntroVidio}
              pauseOnPress={true}
              disableFullscreen={true}
              disableSeek={true}
              seekBarProgress={0.5}
              resizeMode={"cover"}
              autoplay={true}
            />
          </View>
        </View>
      )}

      {modalVisible == false && (
        <View style={{ paddingBottom: Platform.OS === "ios" ? 90 : 80 }}>
          <WholeButton
            Label={t('GET STARTED')}
            styles={styles.StartButton}
            Action={() => OnStartedPress()}
          />
        </View>
      )}

      {modalVisible == true && (
        <View style={{ paddingBottom: Platform.OS === "ios" ? 90 : 80 }}>
          <WholeButton
            Label="GET STARTED"
            styles={styles.StartButton1}
            Action={() => OnStartedPress()}
          />
        </View>
      )}

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text allowFontScaling={false} style={styles.modalText}>
                Continue With
              </Text>

              <TouchableOpacity
                style={[
                  styles.CommonNumberStyle,
                  { marginTop: platformType == "ios" ? "7%" : "2%" },
                ]}
                onPress={() => (setModalVisible(false), OnStartedPress())}
              >
                <View style={styles.commonNumberstyle1}>
                  <VECTOR_ICONS.FontAwesome
                    name="phone"
                    size={25}
                    color={COLORS.BLACKISH}
                  />
                  <Text allowFontScaling={false} style={styles.modalText1}>
                    9934142144
                  </Text>
                </View>
                <Text allowFontScaling={false} style={styles.modalText2}>
                  SIM 1
                </Text>
              </TouchableOpacity>
              <View style={styles.Line}></View>
              <TouchableOpacity
                style={[
                  styles.CommonNumberStyle,
                  { marginTop: platformType == "ios" ? "7%" : "2%" },
                ]}
                onPress={() => (setModalVisible(false), OnStartedPress())}
              >
                <View style={styles.commonNumberstyle1}>
                  <VECTOR_ICONS.FontAwesome
                    name="phone"
                    size={25}
                    color={COLORS.BLACKISH}
                  />
                  <Text allowFontScaling={false} style={styles.modalText1}>
                    9934142144
                  </Text>
                </View>
                <Text allowFontScaling={false} style={styles.modalText2}>
                  SIM 2
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text allowFontScaling={false} style={styles.textStyle}>
                  None of the above
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  Heading: {
    color: "#262628",
    fontSize: 30,
    fontFamily: FONTS.bold,
    textAlign: "center",
    paddingTop: "8%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  HeadingText: {
    color: "#262628",
    fontSize: 16,
    fontFamily: FONTS.medium,
    lineHeight: 20,
    textAlign: "center",
    width: WIDTH * 0.7,
    alignSelf: "center",
    paddingTop: "3%",
  },
  VideoImage: {
    width: WIDTH * 0.9,
    height: HEIGHT * 0.4,
    alignSelf: "center",
    borderRadius: 8,
  },
  VideoButton: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    marginTop: "10%",
  },
  StartButton: {
    alignSelf: "center",
    marginTop: HEIGHT * 0.07,
  },
  StartButton1: {
    alignSelf: "center",
    marginTop: HEIGHT * 0.68,
  },
  btnstyle: {
    marginTop: platformType == "ios" ? "10%" : "8%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginVertical:HEIGHT*0.26,
    // backgroundColor: "rgba(25, 25, 25, 0.3)",
    backgroundColor: "#FFF",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    // paddingVertical:"10%",
    // marginVertical:"15%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: WIDTH * 0.8,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "rgba(0, 148, 255, 1)",
    marginHorizontal: "2%",
    marginVertical: "4%",
    fontFamily: FONTS.semiBold,
    fontWeight: "600",
  },
  modalText: {
    // marginBottom: '8%',
    marginVertical: Platform.OS === "ios" ? "2%" : "5%",
    textAlign: "center",
    color: "#242E42",
    fontFamily: FONTS.bold,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  modalText1: {
    marginBottom: 16,
    color: COLORS.BLACK,
    fontFamily: FONTS.medium,
  },
  modalText2: {
    marginBottom: 14,
    color: "rgba(0, 0, 0, 0.6)",
    fontFamily: FONTS.light,
  },
  Line: {
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    width: platformType == "ios" ? WIDTH * 0.7 : WIDTH * 0.8,
    height: HEIGHT * 0.001,
    marginVertical: "3%",
    borderRadius: 8,
    alignSelf: "center",
  },
  CommonNumberStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: WIDTH * 0.7,
  },
  commonNumberstyle1: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: WIDTH * 0.3,
  },
});
