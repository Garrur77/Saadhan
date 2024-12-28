
import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Platform, StatusBar } from 'react-native'
import Header from '../../Components/HeaderComponent/Header'

import { FONTS, VECTOR_ICONS, COLORS, IMAGEPATH } from '../../assets/Theme'
import { WIDTH, HEIGHT } from '../../Components/Helpers/Dimentions'
import Rupees from '../../Components/SvgComponent/History/Rupees'
import moment from 'moment'
import { roundOff } from '../../Utils/RoundOff'
import { useTranslation } from 'react-i18next'
// import Geolocation from 'react-native-geolocation-service';
// import { request, PERMISSIONS } from 'react-native-permissions';
const platformType = Platform.OS;
const Receipt = (props: any) => {
    const {t} = useTranslation();

    const data = props?.route?.params?.data;
    // console.log('recepitDATAAAAAAAA', data)

    return (
        <>
            <SafeAreaView style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}></SafeAreaView>
            <StatusBar
                backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
                barStyle={"dark-content"}
            />
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>

                <View>
                    <Header navigation={props?.navigation} Heading={t('Receipt of Your Ride')}
                        HeaderStyle={{ marginLeft: '14%' }}
                        reset={true}
                        ToScreen={"BottomTabBar"}
                    />

                    <View style={styles.mainview}>
                        <View style={{ marginLeft: "4%", }}>
                            <Text allowFontScaling={false} style={styles.date}>{moment(data?.createdAt).format("LLL")}</Text>
                            <Text allowFontScaling={false} style={styles.thankstext}>{t('Thanks For')} {"\n"}{t('riding with')}, {'\n'}{data?.driverId?.firstName}</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Image source={IMAGEPATH.Car} />
                        </View>
                    </View>

                    <View style={styles.totalview}>
                        <Text allowFontScaling={false} style={styles.totaltext}>{t('Total Fare')}</Text>
                        <Text allowFontScaling={false} style={[styles.totaltext, { color: "rgba(36, 46, 66, 1)" }]}>
                            ${roundOff(parseFloat(data?.fareAmount), 2)}
                        </Text>
                    </View>

                    <View style={styles.lineStyle}></View>
                    <View style={[styles.totalview, { paddingTop: 15 }]}>
                        <Text allowFontScaling={false} style={styles.ridertext}>{t('Rider ID')} :</Text>
                        <Text allowFontScaling={false} style={[styles.ridertext1, { fontFamily: FONTS.medium, fontWeight: Platform.OS === 'ios' ? '500' : '400' }]}>{data?.riderId?._id ?? "NA"}</Text>
                    </View>
                    <View style={[styles.totalview]}>
                        <Text allowFontScaling={false} style={styles.ridertext}>{t('Vehicle Name')} :</Text>
                        <Text allowFontScaling={false} style={[styles.ridertext1, { fontFamily: FONTS.medium, fontWeight: Platform.OS === 'ios' ? '500' : '400', textTransform: "capitalize" }]}>{data?.driverId?.vehicleName ? data?.driverId?.vehicleName?.length > 15 ? data?.driverId?.vehicleName?.slice(0, 15) + "..." : data?.driverId?.vehicleName : "NA"}</Text>
                    </View>
                    <View style={[styles.totalview,]}>
                        <Text allowFontScaling={false} style={styles.ridertext}>{t('Vehicle Number')} :</Text>
                        <Text allowFontScaling={false} style={[styles.ridertext1, { fontFamily: FONTS.medium, fontWeight: Platform.OS === 'ios' ? '500' : '400', textTransform: "capitalize" }]}>{data?.driverId?.vehicleNumber ? data?.driverId?.vehicleNumber?.length > 15 ? data?.driverId?.vehicleNumber?.slice(0, 15) + "..." : data?.driverId?.vehicleNumber : "NA"}</Text>
                    </View>
                    <View style={[styles.totalview,]}>
                        <Text allowFontScaling={false} style={styles.ridertext}>{t('Vehicle Type')} :</Text>
                        <Text allowFontScaling={false} style={[styles.ridertext1, { fontFamily: FONTS.medium, fontWeight: Platform.OS === 'ios' ? '500' : '400', textTransform: "capitalize" }]}>{data?.vehicleType?.length > 15 ? data?.vehicleType?.slice(0, 15) + "..." : data?.vehicleType}</Text>
                    </View>


                    {/* <View style={[styles.lineStyle, { marginVertical: "4%" }]}></View> */}

                    {/* <View style={styles.totalview}>
                        <Text allowFontScaling={false} style={styles.ridertext}>Basic Fare :</Text>
                        <Text allowFontScaling={false} style={[styles.ridertext1, { fontFamily: FONTS.medium, fontWeight: Platform.OS === 'ios' ? '500' : '400' }]}>{data?.basicfare ?? 0.00}</Text>
                    </View> */}
                    {/* <View style={[styles.totalview, { marginVertical: 1 }]}>
                        <Text allowFontScaling={false} style={styles.ridertext}>Platform fee :</Text>
                        <Text allowFontScaling={false} style={[styles.ridertext1, { fontFamily: FONTS.medium, fontWeight: Platform.OS === 'ios' ? '500' : '400' }]}>{data?.platformFee ?? 0.00}</Text>
                    </View> */}
                    {/* <View style={[styles.lineStyle, { marginTop: "4%" }]}></View> */}
                    <View style={styles.lastview}>
                        <Text allowFontScaling={false} style={styles.paymenttext}>{t('Payment Options')}</Text>
                        <View style={{ flexDirection: "row", marginVertical: "7%" }}>
                            <Rupees />
                            <Text allowFontScaling={false} style={[styles.ridertext1, { fontSize: 15, fontFamily: FONTS.medium, marginHorizontal: "3%" }]}>{data?.paymentMethod}</Text>
                        </View>
                    </View>
                </View>

            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
        </>
    )
}

export default Receipt

const styles = StyleSheet.create({
    mainview: {
        flexDirection: "row", marginVertical: "10%", justifyContent: 'space-between'
    },
    date: { fontFamily: FONTS.medium, fontSize: 14, color: "rgba(38, 38, 38, 1)", fontWeight: Platform.OS === 'ios' ? '500' : '400' },
    thankstext: { fontFamily: FONTS.bold, fontSize: 26, color: "rgba(38, 38, 38, 1)", marginVertical: "5%", fontWeight: Platform.OS === 'ios' ? '600' : '400' },
    lineStyle: {
        borderBottomColor: "rgba(224, 224, 224, 1)",
        borderBottomWidth: 2,
        width: WIDTH * 0.9,
        alignSelf: "center"
    },
    totalview: { flexDirection: "row", width: WIDTH * 0.9, alignSelf: "center", justifyContent: "space-between", marginVertical: "1%" },
    totaltext: {
        fontFamily: FONTS.bold,
        fontSize: 18,
        color: "rgba(38, 38, 38, 1)",
        fontWeight: Platform.OS === 'ios' ? '600' : '400'
    },
    ridertext: {
        fontFamily: FONTS.bold,
        fontSize: 16,
        color: "rgba(36, 46, 66, 1)",
        fontWeight: Platform.OS === 'ios' ? '600' : '400'
    },
    ridertext1: {
        fontFamily: FONTS.bold,
        fontSize: 15,
        color: "rgba(36, 46, 66, 1)",
        fontWeight: Platform.OS === 'ios' ? '600' : '400'
    },
    paymenttext: {
        fontFamily: FONTS.medium,
        fontSize: 12,
        color: "rgba(138, 138, 143, 1)"
    },
    lastview: {
        width: WIDTH * 0.9,
        alignSelf: "center",
        marginVertical: "5%"

    },


})