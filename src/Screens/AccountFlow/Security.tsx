
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, StatusBar } from 'react-native'
import { HEIGHT, WIDTH } from '../../Components/Helpers/Dimentions'
import Header from '../../Components/HeaderComponent/Header'
import { COLORS, FONTS, IMAGEPATH } from '../../assets/Theme'
import SecuritySvg from '../../Components/SvgComponent/Account/SecuritySvg'
import ToggleSwitch from 'toggle-switch-react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../../ReduxConfig/Store";
import { ViewProfile, enableDisablePasscode } from '../../ApiConfig/Endpoints'
import { callPostApi } from '../../ApiConfig/ApiCall'
import SpiningLoader from '../../assets/SpiningLoader'
import axios from 'axios'
import { showMessage } from 'react-native-flash-message'
import { userData } from '../../ReduxConfig/UserDetails/UserSlice'
import { useTranslation } from 'react-i18next'

const Security = (props: any,) => {
  const {t} = useTranslation();

  const [Loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  const Data = useSelector(
    (state: RootState) => state.value
  );

  const UserDate = useSelector(
    (state: RootState) => state.userDetails?.profileData
  );
  // console.log("UserDateUserDate---****+++++", UserDate?.passcodeEnable);

  const token = Data?.RegisterTOKEN;

  const [isSwitchOn, setSwitchOn] = useState(UserDate?.passcodeEnable);
  // console.log("isSwitchOnisSwitchOn", isSwitchOn);


  //api for get user data 
  const userDataViewProfile = async () => {
    try {
      const result = await axios({
        method: 'POST',
        url: ViewProfile,
        headers: {
          token: token
        }
      })
      if (result?.data?.responseCode === 200) {
        // console.log("result?.dataresult?.data", result?.data?.data?.passcodeEnable);
        const passcodeEnable = result?.data?.data?.passcodeEnable;
        //check 
        // console.log("result?.data?.data?.passcode", result?.data?.data?.passcode)
        if (result?.data?.data?.passcodeEnable === true && result?.data?.data?.passcode === undefined) {
          props?.navigation?.navigate("InitialPasscode")
        }
        dispatch(
          userData({
            passcodeEnable,
          })
        );
      }
      // console.log("userData-------", result?.data?.data?.passcodeEnable)
    } catch (error) {
      // console.log("error is", error)
    }
  }

  const handleToggle = () => {
    setSwitchOn(!isSwitchOn);
    EnableDisable();
  };



  //api for enable and disable
  const EnableDisable = async () => {
    try {
      setLoader(true)
      const result = await axios({
        method: 'POST',
        url: enableDisablePasscode,
        headers: {
          token: token
        },
      })
      setLoader(false)
      // console.log('reTTTEnablefffff', result?.data)
      if (result?.data?.responseCode === 200) {
        showMessage({
          message: result?.data?.message,
          type: "success"
        })
        setLoader(false)
        setSwitchOn(result?.data?.passcodeEnable)
        userDataViewProfile()
      }
    } catch (error) {
      // console.log("eroor is ", error)
      setLoader(false)
    }

  }


  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}></SafeAreaView>
      <StatusBar
        backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
        barStyle={"dark-content"}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
        <Header navigation={props?.navigation} Heading={t("Security")} HeaderStyle={{ marginLeft: '12%' }} />
        <View style={styles.maintouchablestyle}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SecuritySvg />
            <Text allowFontScaling={false} style={styles.lockstyle}>{t('Passcode Lock')}</Text>
          </View>
          <TouchableOpacity onPress={() => {
            handleToggle()
          }}>
            <ToggleSwitch
              isOn={isSwitchOn}
              onColor="#FF5500"
              offColor="grey"
              size="small"
              onToggle={handleToggle}

            />
          </TouchableOpacity>
        </View>
        <View style={styles.lineStyle}></View>
      </SafeAreaView>
      <SpiningLoader loader={Loader} />
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  )
}

export default Security

const styles = StyleSheet.create({
  maintouchablestyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: WIDTH * 0.9,
    alignSelf: "center",
    marginVertical: "5%"
  },
  lockstyle: {
    textAlign: "center",
    marginHorizontal: "5%",
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: "#242E42"
  },
  lineStyle: {
    borderBottomColor: "#ECECEC",
    borderBottomWidth: 4,
    width: WIDTH,
    alignSelf: "center"
  },
})