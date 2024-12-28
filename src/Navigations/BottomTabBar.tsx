import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { WIDTH, HEIGHT } from "../Components/Helpers/Dimentions";
import SearchScreen from "../Screens/Notification/SearchScreen";
import AccountMenu from "../Screens/AccountFlow/AccountMenu";
import Receipt from "../Screens/History/Receipt";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../assets/Theme";
import Historybottomsvg from "../Components/SvgComponent/History/Historybottomsvg";
import SelectedHistorybottomsvg from "../Components/SvgComponent/History/SelectedHistorybottomsvg";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import HistoryListing from "../Screens/History/HistoryListing";
import socketServcies from "../Utils/SocketService";
import { useSelector } from "react-redux";
import { RootState } from "../ReduxConfig/Store";
import { useTranslation } from 'react-i18next';
import i18n from '../locales/i18n'
const platformType = Platform.OS;
const BottomTabBar = (props: any) => {
  const { t , i18n } = useTranslation();

  const navigation = useNavigation();
  const [selected, setselected] = useState(false);
  const Data = useSelector(
    (state: RootState) => state.userDetails?.profileData
  );

  const Tab = createBottomTabNavigator();

  useEffect(()=>{
    socketServcies.initializeSocket(Data?._id);
  },[useIsFocused()])

  return (
    <Tab.Navigator
      initialRouteName="SearchScreen"
      screenOptions={{
        tabBarActiveTintColor: "#FF5500",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12, // Adjust the font size of the tabBarLabel
          fontFamily: FONTS.medium, // Adjust the font family if needed
          marginBottom: platformType == "ios" ? 10 : "10%",
          // marginBottom:platformType=="ios"?"": "3%"
        },
        tabBarStyle: {
          borderTopLeftRadius: platformType == "ios" ? 20 : 15,
          borderTopRightRadius: platformType == "ios" ? 20 : 15,

          // backgroundColor: '#ffffff',
          alignItems: "center",
          justifyContent: "center",
          height: HEIGHT * 0.1,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={SearchScreen}
        options={{
          tabBarLabel: t('Home'),
          // tabBarLabelStyle:{textAlign:"center"},
          tabBarIcon: ({ color, size }) => (
            // <VECTOR_ICONS.MaterialIcons
            //   name="home-filled"
            //   color={color}
            //   size={size}
            //   style={{ marginTop: "4%" }}
            // />
            <Image
              source={IMAGEPATH.home}
              tintColor={color}
              style={{ marginTop: "4%", height: 20, width: 20 }}
              resizeMode='contain'
            />
          ),
        }}
      />

      <Tab.Screen
        name="History"
        component={HistoryListing}
        options={{
          tabBarLabel: t("History"),
          tabBarIcon: ({ color, size }) =>
            // !selected ? (
            <Image
              source={IMAGEPATH.history}
              tintColor={color}
              style={{ marginTop: "4%", height: 20, width: 20 }}
              resizeMode='contain'
            />
          // ) : (
          //   <Image
          //     source={IMAGEPATH.SelectedCircle}
          //     style={{ marginTop: "4%" }}
          //   />
          // ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AccountMenu}
        options={{
          tabBarLabel: t("Account"),
          tabBarIcon: ({ color, size }) => (
            // <VECTOR_ICONS.MaterialCommunityIcons
            //   name="account"
            //   color={color}
            //   size={size}
            //   style={{ marginTop: "4%" }}
            // />
            <Image
              source={IMAGEPATH.account}
              tintColor={color}
              style={{ marginTop: "4%", height: 20, width: 20 }}
              resizeMode='contain'
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
