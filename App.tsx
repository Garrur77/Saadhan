import * as React from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
} from "react-native";
import RouteNavigation from "./src/Navigations/RouteNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./src/ReduxConfig/Store";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { COLORS, FONTS } from "./src/assets/Theme";
import NetInfo from "@react-native-community/netinfo";
import messaging from "@react-native-firebase/messaging";
import Geolocation from "@react-native-community/geolocation";
import { HEIGHT } from "./src/Components/Helpers/Dimentions";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { onDisplayNotification } from "./src/Utils/NotificationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nextProvider } from 'react-i18next';
import i18n from './src/locales/i18n';
import { LanguageProvider } from './src/locales/LanguageContext';
// experiment debbug
// import "react-native-devsettings/withAsyncStorage";

function App() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [location, setLocation] = React.useState("");
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        showMessage({
          message: "You are offline",
          type: "danger",
          position: "top",
          backgroundColor: "red", // Customize background color
          color: "#fff", // Customize text color
          duration: 3000,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
      getDeviceToken();
    }
  };

  // React.useEffect(() => {
  //   if (isConnected) {
  //     showMessage({
  //       message: "You are online",
  //       type: "success",
  //       position: "top",
  //       backgroundColor: "green",
  //       color: "#fff",
  //       duration: 3000,
  //     });
  //   }
  // }, [isConnected]);

  // React.useEffect(() => {
  //   requestUserPermission();
  //   getDeviceToken();
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     // onDisplayNotification(
  //     //   remoteMessage?.notification?.title,
  //     //   remoteMessage?.notification?.body,
  //     // );
  //   });
  //   return unsubscribe;
  // }, []);

  React.useEffect(() => {
    getDeviceToken();
    if (Platform.OS === "ios") {
      requestUserPermission();
      notifee.requestPermission();
    }

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // console.log(
      //   "new FCM message recieved....",
      //   JSON.stringify(remoteMessage)
      // );
      onDisplayNotification(
        remoteMessage?.notification?.title,
        remoteMessage?.notification?.body
      );
    });
    return unsubscribe;
  }, []);

  const getDeviceToken = async () => {
    const data = await AsyncStorage.getItem("fcm");
    if (!data) {
      const fcm = await messaging().getToken();
      await AsyncStorage.setItem("fcm", fcm);
    }
    console.log("fcmTokenfcmTokenfcmTokenfcmTokenfcmTokenfcmToken", data);
  };

  return (
    <>
      {/* for android */}
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <StatusBar backgroundColor={COLORS.WHITE} barStyle={"dark-content"} />
        <FlashMessage position="bottom" />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
      <LanguageProvider>
            <RouteNavigation />
            </LanguageProvider>
    </I18nextProvider>
          </PersistGate>
        </Provider>
      </SafeAreaView>

      {/* for ios */}

      {/* <StatusBar backgroundColor={COLORS.WHITE} barStyle={"dark-content"} />
      <FlashMessage
        position="bottom"
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouteNavigation />
        </PersistGate>
      </Provider> */}
    </>
  );
}

export default App;
