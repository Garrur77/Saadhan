import * as React from "react";
import { View, Text, StatusBar, SafeAreaView } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabBar from "./BottomTabBar";
/* ------------------------ Register Flow --------------------------*/
import Splash from "../Screens/Splash/Splash";
import LocationPermission from "../Screens/Splash/LocationPermission";
import OnboardingScreen from "../Screens/Onboarding_/OnboardingScreen";
import Introduction from "../Screens/Auth/Introduction";
import Register from "../Screens/Auth/SignUp/Register";
import PhoneVerification from "../Screens/Auth/PhoneVerification";
import EmailVerification from "../Screens/Auth/EmailVerification";
import EnterName from "../Screens/Auth/EnterName";
/* ------------------------ Login Flow --------------------------*/
import Login from "../Screens/Auth/LoginFlow/Login";
import VerificationPhEmail from "../Screens/Auth/LoginFlow/VerificationsPhEmail";
{
  /* -----------------------Home Flow-----------------------------  */
}
import SearchScreen from "../Screens/Notification/SearchScreen";
import Notification from "../Screens/Notification/Notification";
{
  /* -----------------------Book Ride Request Flow-----------------------------  */
}
import CancelBooking from "../Screens/BookRide/CancelBooking";
import ConfirmPickuptime from "../Screens/Notification/ConfirmPickuptime";
import ConfirmRide from "../Screens/BookRide/ConfirmRide";
import CancelYourRide from "../Components/RBSheetComponents/CancelYourRide";
import SetupOnMap from "../Screens/BookRide/SetupOnMap";
import ChooseARide from "../Screens/BookRide/ChooseARide";
import ConfirmPickup from "../Screens/BookRide/ConfirmPickup";
import ConfirmVehicle from "../Components/RBSheetComponents/ConfirmVehicle";
import BookConfirmpopup from "../Components/RBSheetComponents/BookConfirmpopup";
import ChatScreen from "../Screens/Account/ChatScreen";
// --------------------------- History ---------------------------------
import HistoryListing from "../Screens/History/HistoryListing";
import BookDetails from "../Screens/History/BookDetails";
import BookedDetailsCompleted from "../Screens/History/BookedDetailsCompleted";
import Receipt from "../Screens/History/Receipt";

const Stack = createNativeStackNavigator();
// ----------------------------Account Flow ----------------------------
import AccountMenu from "../Screens/AccountFlow/AccountMenu";
import AccountEdit from "../Screens/AccountFlow/AccountEdit";
import EnterPasscode from "../Screens/AccountFlow/EnterPasscode";
import EnterNewPasscode from "../Screens/AccountFlow/EnterNewPasscode";
import ReEnterNewPasscode from "../Screens/AccountFlow/ReEnterNewPasscode";
import SubmitYourQuery from "../Screens/Account/SubmitYourQuery";
import HelpAndSupport from "../Screens/Account/Help&Support/HelpAndSupport";
import Security from "../Screens/AccountFlow/Security";
import Wallet from "../Screens/Account/Wallet";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

{
  /* ------------------- Wallet Flow --------------------- */
}
import PaymentOptions from "../Screens/WalletFlow/PaymentOptions";
import BankVerification from "../Screens/WalletFlow/BankVerification";
import AddFunds from "../Screens/WalletFlow/AddFunds";
import OtpVerifywallet from "../Screens/WalletFlow/OtpVerifywallet";
import Promocode from "../Screens/WalletFlow/PromoCode";

import { NavigationContainer } from "@react-navigation/native";
import { COLORS } from "../assets/Theme";
import AfterStartingRide from "../Screens/BookRide/AfterStartingRide";
import RateRidepopup from "../Screens/BookRide/RateRidepopup";
import StatusModal from "../Components/ModalComponent/StatusModal";
import Privacypolicy from "../Screens/Auth/Privacypolicy";
import Message from "../Components/SvgComponent/Account/Message";
import Message1 from "../Screens/Account/Message1";
import DemoChat from "../Screens/Account/DemoChat";
import VerificationScreen from "../Screens/AccountFlow/VerificationScreen";
import BookDetailsCancle from "../Components/RBSheetComponents/BookDetailsCancle";
import ChatSocket from "../Screens/Account/ChatSocket";
import InitialPasscode from "../Screens/AccountFlow/InitialPasscode";
import ConfirmInitialPasscode from "../Screens/AccountFlow/ConfirmInitialPasscode";
import ChatDrivertoUser from "../Screens/Account/ChatDrivertoUser";
import RideCompletedComp from "../Screens/BookRide/RideCompletedComp";
import Locationfile from "../Screens/History/Locationfile";
import Termsandconditions from "../Screens/Auth/termsandconditions";
import LanguageSwitchScreen from "../Screens/Account/LanguageSwitchScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AccountMenu" component={AccountMenu} />
      <Tab.Screen name="AccountEdit" component={AccountEdit} />
      <Tab.Screen name="Receipt" component={Receipt} />
    </Tab.Navigator>
  );
}
const RouteNavigation = (props: any) => {
  return (
    // {/* <>
    // <SafeAreaView style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}></SafeAreaView>
    //       <StatusBar backgroundColor={COLORS.BACKGROUNDBTNCOLOR} animated={true} barStyle={'dark-content'} />
    //   <SafeAreaView>*/}

    // {/* <StatusBar
    //   backgroundColor={COLORS.LIGHTBLUE}
    //   animated={true}
    //   barStyle={'dark-content'}
    // /> */}
    <NavigationContainer
      navigationBarAppearance={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}
    >
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="BottomTabBar" component={BottomTabBar} />
        {/* -----------------------Register Flow-----------------------------  */}
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen
          name="LocationPermission"
          component={LocationPermission}
        />
        <Stack.Screen name="Introduction" component={Introduction} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
        <Stack.Screen name="EmailVerification" component={EmailVerification} />
        <Stack.Screen name="EnterName" component={EnterName} />
        <Stack.Screen name="RideCompletedComp" component={RideCompletedComp} />

        {/* -----------------------Login Flow-----------------------------  */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="VerificationPhEmail"
          component={VerificationPhEmail}
        />
        {/* -----------------------Home Flow-----------------------------  */}
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="Notification" component={Notification} />

        {/* -----------------------Book Ride Request Flow-----------------------------  */}
        <Stack.Screen name="ConfirmPickuptime" component={ConfirmPickuptime} />
        <Stack.Screen name="SetupOnMap" component={SetupOnMap} />
        <Stack.Screen name="ChooseARide" component={ChooseARide} />
        <Stack.Screen name="ConfirmVehicle" component={ConfirmVehicle} />
        <Stack.Screen name="ConfirmPickup" component={ConfirmPickup} />
        <Stack.Screen name="BookConfirmpopup" component={BookConfirmpopup} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="CancelBooking" component={CancelBooking} />
        <Stack.Screen name="AfterStartingRide" component={AfterStartingRide} />
        <Stack.Screen name="ConfirmRide" component={ConfirmRide} />
        <Stack.Screen name="CancelYourRide" component={CancelYourRide} />
        <Stack.Screen name="RateRidepopup" component={RateRidepopup} />

        {/* ------------------- History Flow --------------------- */}

        <Stack.Screen name="Receipt" component={Receipt} />
        <Stack.Screen name="HistoryListing" component={HistoryListing} />
        <Stack.Screen name="BookDetails" component={BookDetails} />
        <Stack.Screen
          name="BookedDetailsCompleted"
          component={BookedDetailsCompleted}
        />
        <Stack.Screen name="BookDetailsCancle" component={BookDetailsCancle} />
        <Stack.Screen name="Locationfile" component={Locationfile} />

        {/* ------------------- Account Flow --------------------- */}
        <Stack.Screen name="AccountMenu" component={AccountMenu} />
        <Stack.Screen name="AccountEdit" component={AccountEdit} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="Security" component={Security} />
        <Stack.Screen name="InitialPasscode" component={InitialPasscode} />
        <Stack.Screen
          name="ConfirmInitialPasscode"
          component={ConfirmInitialPasscode}
        />
        <Stack.Screen name="EnterPasscode" component={EnterPasscode} />
        <Stack.Screen name="EnterNewPasscode" component={EnterNewPasscode} />
        <Stack.Screen
          name="VerificationScreen"
          component={VerificationScreen}
        />
        <Stack.Screen
          name="ReEnterNewPasscode"
          component={ReEnterNewPasscode}
        />
        <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
        <Stack.Screen name="SubmitYourQuery" component={SubmitYourQuery} />
        <Stack.Screen name="Message1" component={Message1} />
        <Stack.Screen name="DemoChat" component={DemoChat} />
        <Stack.Screen
          name="LanguageSwitchScreen"
          component={LanguageSwitchScreen}
        />

        {/* ------------------- Wallet Flow --------------------- */}
        <Stack.Screen name="PaymentOptions" component={PaymentOptions} />
        <Stack.Screen name="BankVerification" component={BankVerification} />
        <Stack.Screen name="AddFunds" component={AddFunds} />
        <Stack.Screen name="OtpVerifywallet" component={OtpVerifywallet} />
        <Stack.Screen name="Promocode" component={Promocode} />
        <Stack.Screen
          name="Termsandconditions"
          component={Termsandconditions}
        />
        <Stack.Screen name="Privacypolicy" component={Privacypolicy} />
        <Stack.Screen name="ChatSocket" component={ChatSocket} />
        <Stack.Screen name="ChatDrivertoUser" component={ChatDrivertoUser} />
        <Stack.Screen
          name="statusModal"
          component={StatusModal}
          options={{
            // You can set your options here
            title: "Modal Screen",
            headerStyle: {
              backgroundColor: "blue",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
      {/* <StatusBar/> */}
    </NavigationContainer>
  );
};

export default RouteNavigation;
