
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import { FONTS, VECTOR_ICONS, COLORS, IMAGEPATH } from '../../assets/Theme'
import { HEIGHT, WIDTH } from '../../Components/Helpers/Dimentions'
import WholeButton from '../Wholebutton/Wholebutton';
import LocationSvg from '../SvgComponent/CarRide/LocationSvg';
import CarSvg from '../SvgComponent/CarRide/CarSvg';
import HandSvg from '../SvgComponent/CarRide/HandSvg';
import { useTranslation } from 'react-i18next';
const ConfirmVehicle = (props: any) => {
    const {t} = useTranslation();

    const { selectedData } = props;

    return (
        <View style={styles.mainView}>

            <View style={styles.locationview}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    {selectedData?.vehicle}
                    <View style={{ width: WIDTH * 0.3, marginLeft: "7%" }}>
                        <Text allowFontScaling={false} style={styles.canceltext}>{selectedData?.text1}</Text>
                        <Text allowFontScaling={false} style={styles.mobiloitte}>{t('Near by you')}</Text>
                    </View>
                </View>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text allowFontScaling={false} style={[styles.canceltext, { color: COLORS.BACKGROUNDBTNCOLOR, fontSize: 20 }]}>{selectedData?.text2}</Text>
                    <Text allowFontScaling={false} style={[styles.mobiloitte, { fontSize: 15 }]}>{selectedData?.time ?? "2 min"}</Text>
                </View>
            </View>
            <View style={styles.lineStyle}></View>
            <Text allowFontScaling={false} style={[styles.mobiloitte, { fontSize: 10 }]}>{t('Payment Options')}</Text>
            <View style={styles.locationview}>
                <View style={styles.handmainview}>
                    <HandSvg />
                    <Text allowFontScaling={false} style={[styles.mobiloitte, { marginLeft: "10%", color: "rgba(36, 46, 66, 1)" }]}>{t('Cash')}</Text>
                </View>
                <TouchableOpacity onPress={props.cashAction}
                    style={styles.dotsstyle}>
                    <VECTOR_ICONS.Entypo name={"dots-three-vertical"} size={25} color={"rgba(218, 218, 218, 1)"} />
                </TouchableOpacity>
            </View>
            <WholeButton Label={"Confirm"} styles={styles.backbtn} Action={props.Action} />
        </View>
    )
}

export default ConfirmVehicle

const styles = StyleSheet.create({
    mainView: {
        width: WIDTH * 0.9,
        alignSelf: "center",
    },
    HeadingView: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginVertical: "4%"
    },

    lineStyle: {
        borderBottomColor: "rgba(239, 239, 244, 1)",
        borderBottomWidth: 2,
        width: WIDTH,
        alignSelf: "center",
        marginVertical: "2%"
    },
    locationview:
    {
        flexDirection: "row",
        marginVertical: HEIGHT * 0.012,
        width: WIDTH * 0.9,
        alignSelf: "center",

        alignItems: "center",
        justifyContent: "space-between"
    },
    backbtn: {
        marginVertical: "5%",
        width: WIDTH * 0.9
    },
    mobiloitte: {
        fontFamily: FONTS.medium,
        fontSize: 15,
        color: "rgba(200, 199, 204, 1)"
    },
    canceltext: {
        fontFamily: FONTS.bold,
        fontSize: 17,
        color: "rgba(36, 46, 66, 1)",
    },
    handmainview: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
    dotsstyle: { alignItems: "center", justifyContent: "center" }

})