import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { WIDTH, HEIGHT } from "../../Components/Helpers/Dimentions";
import { COLORS, FONTS, VECTOR_ICONS, IMAGEPATH } from "../../assets/Theme";
import WholeButton from "../Wholebutton/Wholebutton";
import Receipt from "../SvgComponent/Booking/Receipt";
import Rated from "../SvgComponent/Booking/Rated";
import Map1 from "../SvgComponent/Location/Map1";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
const platformType = Platform.OS;

const BookedDetailCompleted = (props: any) => {
  const {t} = useTranslation();

  const { userHistory } = props;

  // console.log("fiuserHistory555userHistoryuserHistoryrst", userHistory)

  const [reciecpt, setReciept] = useState('')
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const navigation = useNavigation()

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: "5%",
          width: WIDTH * 0.5,
          marginHorizontal: "6%",
        }}
      >
        <Image source={IMAGEPATH.Man} />
        <View style={{ width: WIDTH * 0.4, marginLeft: "5%" }}>
          <Text
            allowFontScaling={false} style={{
              fontSize: 17,
              fontFamily: FONTS.bold,
              // alignSelf: "center",
              color: "#242E42",
              fontWeight: Platform.OS === 'ios' ? '600' : '400'
            }}
          >
            {userHistory?.driverId?.firstName} {userHistory?.driverId?.lastName}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Image source={IMAGEPATH.star} style={{ marginTop: "3%" }} />
            <Text
              allowFontScaling={false} style={{
                color: "#C8C7CC",
                fontSize: 17,
                fontFamily: FONTS.semibold,
                marginLeft: "3%",
                marginTop: Platform.OS === 'ios' ? '2%' : '0%'
              }}
            >
              {userHistory?.driverId?.rating ?? "3.2"}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.line,
          { marginLeft: "1%", width: WIDTH * 0.9, marginTop: "1%" },
        ]}
      ></View>
      <View style={styles.topview}>
        <View
          style={{
            marginTop: platformType == "ios" ? "13%" : "15%",
            marginLeft: "8%",
          }}
        >
          <Map1 style={{ width: WIDTH * 0.068, height: 125 }} />
        </View>
        <View>
          <View style={{ flexDirection: "row" }}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: WIDTH * 0.85,
                  marginTop: "2%",
                }}
              >
                <Text allowFontScaling={false} style={[styles.pickup, { marginTop: "4%" }]}>{t('Pick Up')}</Text>
              </View>

              <Text
                allowFontScaling={false} style={{
                  color: "#242E42",
                  fontSize: 14,
                  fontFamily: FONTS.semibold,
                  marginLeft: "5%",
                  width: WIDTH * 0.62,
                  marginTop: "2%",
                }}
              >
                {userHistory?.pickupAddress}

                {/* JK Bata chauk 3 , Govind Puri Delhi Metro , Delhi */}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.line,
              { marginLeft: "1%", width: WIDTH * 0.8, marginTop: "3%" },
            ]}
          ></View>
          <View style={{ marginTop: "2%" }}>
            <View>
              <Text allowFontScaling={false} style={styles.pickup}>{t('Destination')}</Text>
              <Text
                allowFontScaling={false} style={{
                  color: "#242E42",
                  fontSize: 14,
                  fontFamily: FONTS.semibold,
                  marginLeft: "5%",
                  width: WIDTH * 0.62,
                  marginTop: "2%",
                }}
              >
                {userHistory?.destinationAddress}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.line,
          { marginLeft: "1%", width: WIDTH * 0.9, marginTop: "3%" },
        ]}
      ></View>

      <View style={styles.viewStyle}>
        <Text allowFontScaling={false} style={styles.price}>{t('PRICE')}</Text>
        <Text allowFontScaling={false} style={styles.cost}> {userHistory?.fareAmount}</Text>
      </View>

      <View style={styles.viewStyle1}>
        <TouchableOpacity onPress={() => {
          setReciept(userHistory)

          navigation.navigate("Receipt", { data: reciecpt })
        }
        }

          style={styles.viewStyle2}>
          <Receipt />
          <Text allowFontScaling={false} style={styles.receiptStyle}>{t('Receipt')}</Text>
        </TouchableOpacity>
        <View style={styles.viewStyle2}>
          <Rated />
          <Text allowFontScaling={false} style={styles.receiptStyle}> {t('Rated - 5')}</Text>
        </View>
      </View >
    </>
  );
};

export default BookedDetailCompleted;

const styles = StyleSheet.create({
  pickup: {
    color: "#242E42",
    fontSize: 14,
    fontFamily: FONTS.bold,
    marginLeft: "5%",
    fontWeight: Platform.OS === 'ios' ? '600' : '400'
  },
  line: {
    backgroundColor: "#ECECEC",

    width: WIDTH * 0.9,
    height: 1,
    // marginTop: "5%",
    alignSelf: "center",
  },
  topview: {
    flexDirection: "row",
    width: WIDTH * 0.9,
    justifyContent: "space-between",
  },
  price: {
    color: "#AAAEB6",
    fontSize: 12,
    fontFamily: FONTS.medium,
  },
  cost: {
    color: COLORS.GRAY,
    fontSize: 14,
    fontFamily: FONTS.bold,
    fontWeight: Platform.OS === 'ios' ? '600' : '400'
  },
  viewStyle: {
    flexDirection: "row",
    width: WIDTH * 0.2,
    justifyContent: "space-between",
    marginHorizontal: "6%",
    marginVertical: "4%",
    alignItems: "center",
  },
  viewStyle1: {
    flexDirection: "row",
    width: WIDTH * 0.54,
    justifyContent: "space-between",
    marginHorizontal: "9%",
    marginVertical: platformType == "ios" ? "2%" : "4%",
    marginBottom: "4%",
  },
  viewStyle2: {
    flexDirection: "row",
    width: WIDTH * 0.23,
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
  },
  receiptStyle: {
    color: COLORS.GRAY,
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
});
