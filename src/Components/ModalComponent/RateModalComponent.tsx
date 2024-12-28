import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import { useState } from "react";
import { HEIGHT, WIDTH } from "../Helpers/Dimentions";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import RateDriver from "../SvgComponent/CarRide/RateDriver";
import { useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import { Rating } from "react-native-ratings";
import StarRating from "react-native-star-rating-widget";
import axios from "axios";
import { giveReviewAndRating, rateDriver } from "../../ApiConfig/Endpoints";
import { showMessage } from "react-native-flash-message";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpiningLoader from "../../assets/SpiningLoader";
import { useTranslation } from "react-i18next";

interface ModalComponentProps {
  setModalVisible(arg0: boolean): unknown;
  modalVisible: boolean;
  Message: string;
  Message1?: string;
  head: string;
  btn1?: string;
  btn2?: string;
  Action?: any;
  Action2?: any;
  source: any;
  Button?: string;
  imgstyle?: any;
  Button12?: any;
  // setSelectStar: any;
  // SelectStar: any;
}

const RateModalComponent: React.FC<ModalComponentProps> = (props: any) => {
  const {t} =useTranslation();
  const [modalVisible, setmodalVisible] = useState(false);

  const Ridetails = useSelector(
    (state: RootState) => state?.rideDetailsSelector?.RideDetails
  );
  const RegisterTOKEN = useSelector(
    (state: RootState) => state.REGISTER_TOKEN.RegisterTOKEN
  );

  const navigation = useNavigation();

  const [SelectStar, setStarSelected] = useState(5);
  const [review, setReview] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [Loader, setLoader] = useState(false);

  //api for rating driver
  const RatingDriver = async () => {
    try {
      setReviewError("");
      if (SelectStar < 5 && !review) {
        setReviewError(t("Please provide review for driver."));
        setLoader(false);
        return;
      }
      setLoader(true);
      const res = await axios({
        method: "POST",
        url: giveReviewAndRating,
        headers: {
          token: RegisterTOKEN,
        },
        data: {
          userId: Ridetails?.driverDetails?.driverId,
          rating: SelectStar,
          rideId: Ridetails?.rideId,
          review: review ? review : "Excellent",
        },
      });
      // // console.log("ratinggg--------", res?.data)
      if (res?.data?.responseCode === 200) {
        props.setModalVisible(false);
        setLoader(false);
        showMessage({
          message: res?.data?.responseMessage,
          type: "success",
          icon: "success",
          duration: 3000,
        });
        setTimeout(() => {
          navigation?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "BottomTabBar" }],
            })
          );
        }, 300);
      }
    } catch (error) {
      // console.log("RatingDriver error121212", error?.response);
      setLoader(false);
    }
  };

  return (
    <Modal
      visible={props.modalVisible}
      transparent={true}
      // onRequestClose={() => {
      //   props.setModalVisible(false);
      //   navigation?.dispatch(
      //     CommonActions.reset({
      //       index: 0,
      //       routes: [{ name: "BottomTabBar" }],
      //     })
      //   )
      // }}
    >
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.65)",
          flex: 1,
        }}
      >
        <View
          style={[
            styles.modal,
            props.modalstyle,
            { marginTop: SelectStar < 5 ? "15%" : "50%" },
          ]}
        >
          <TouchableOpacity
            style={{ alignSelf: "flex-end", paddingRight: 10 }}
            onPress={() => {
              props.setModalVisible(false);
              setTimeout(() => {
                navigation?.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "BottomTabBar" }],
                  })
                );
              }, 300);
            }}
          >
            <Image
              source={require("../../assets/Images/cross.png")}
              style={{ height: 30, width: 30 }}
            />
          </TouchableOpacity>

          <Image
            source={props.source}
            style={[styles.img, props.imgstyle, { width: 60, height: 60 }]}
          />
          <Text allowFontScaling={false} style={styles.head}>
            {props?.head}
          </Text>
          <Text allowFontScaling={false} style={[styles.text1, props.msgstyle]}>
            {props?.Message}
            {/* Cash Paid - ${parseFloat(finalAmount?.fareAmount ?? Ridetails?.fareAmount).toFixed(2)} */}
          </Text>

          {props?.img && (
            <View style={{ alignSelf: "center", width: WIDTH * 0.7 }}>
              <View style={styles.line}></View>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  marginVertical: "5%",
                  width: WIDTH * 0.6,
                  marginHorizontal: "4%",
                }}
              >
                <Image
                  source={
                    Ridetails?.driverDetails?.driverImage
                      ? { uri: Ridetails?.driverDetails?.driverImage }
                      : IMAGEPATH.Man
                  }
                  style={{ width: 50, height: 50, borderRadius: 100 }}
                />
                <View style={{ width: WIDTH * 0.4, marginLeft: "4%" }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 17,
                      fontFamily: FONTS.bold,
                      fontWeight: "600",
                      color: "#242E42",
                    }}
                  >
                    {Ridetails?.driverDetails?.driverName ?? "Unknown"}
                  </Text>
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
                        marginLeft: "3%",
                      }}
                    >
                      {Ridetails?.driverDetails?.rating}
                    </Text>
                  </View>
                </View>
              </View>
              <Text allowFontScaling={false} style={styles.text4}>
                {props.rate}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  width: WIDTH * 0.5,
                  justifyContent: "space-between",
                  alignSelf: "center",
                  marginTop: "8%",
                }}
              >
                <StarRating
                  rating={SelectStar}
                  onChange={(rating) => {
                    setStarSelected(rating);
                    // console.log("setStarSelected(rating)", rating)
                  }}
                  enableSwiping={true}
                  emptyColor="#000"
                />
              </View>
              {SelectStar < 5 && (
                <TextInput
                  allowFontScaling={false}
                  value={review}
                  onChangeText={(text) => setReview(text)}
                  style={styles.inputBox}
                />
              )}
              {reviewError && (
                <Text allowFontScaling={false} style={styles.erroText}>
                  {reviewError}
                </Text>
              )}

              <TouchableOpacity
                onPress={() => {
                  RatingDriver();
                }}
                style={[styles.WholeButtonStyle, props.btnstyle]}
              >
                <Text allowFontScaling={false} style={styles.buttonText}>
                  {props?.Button}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <SpiningLoader loader={Loader} />
    </Modal>
  );
};

export default RateModalComponent;

const styles = StyleSheet.create({
  img: {
    // marginTop: '4%',
  },
  text3: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: "#242E42",
  },
  WholeButtonStyle: {
    width: "88%",
    alignSelf: "center",
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
    marginTop: "6%",
    marginBottom: "2%",
  },
  buttonText: {
    fontSize: 17,
    color: COLORS.WHITE,
    textAlign: "center",
    fontFamily: FONTS.bold,
    margin: "2%",
  },
  modal: {
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.9,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: "6%",
    borderRadius: 20,
    marginTop: "50%",
  },
  head: {
    fontSize: 20,
    color: "#242E42",
    fontFamily: FONTS.bold,
    marginTop: "4%",
    fontWeight: "600",
  },
  text1: {
    fontSize: 14,
    color: "#8A8A8F",
    fontFamily: FONTS.light,
    marginTop: "2%",
  },

  line: {
    backgroundColor: "#ECECEC",
    width: WIDTH * 0.66,
    height: 1,
    marginTop: "4%",
    alignSelf: "center",
  },
  line2: {
    backgroundColor: "#ECECEC",
    width: "0.3%",
    height: 58,
    // alignItems:'center'
    // marginTop:'4%'
  },
  btn: {
    fontSize: 17,
    color: "#C8C7CC",
    fontFamily: FONTS.bold,
  },
  text4: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: "#242E42",
    marginTop: "5%",
    marginHorizontal: "5%",
    fontWeight: "600",
  },
  inputBox: {
    width: "88%",
    height: HEIGHT * 0.05,
    // backgroundColor: "red",
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.Name,
    borderWidth: 1,
    marginTop: "6%",
    fontFamily: FONTS.medium,
    paddingHorizontal: 16,
  },
  erroText: {
    width: "88%",
    color: COLORS.ERRORCOLORRED,
    fontSize: 14,
    fontFamily: FONTS.medium,
    alignSelf: "center",
  },
});
