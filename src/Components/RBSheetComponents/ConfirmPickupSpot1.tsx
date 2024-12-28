
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import { FONTS, VECTOR_ICONS, COLORS, IMAGEPATH } from '../../assets/Theme'
import { HEIGHT, WIDTH } from '../Helpers/Dimentions'
import WholeButton from '../Wholebutton/Wholebutton';
import LocationSvg from '../SvgComponent/CarRide/LocationSvg';
import ModalComponent from "../../Components/ModalComponent/ModalComponent";
import Cross from '../SvgComponent/Account/Cross';
import { useTranslation } from 'react-i18next';

const ConfirmPickupSpot1 = (props: any) => {
    const {t} = useTranslation();

    const { pickupAddress } = props;

    return (
        <View style={styles.mainView}>
            <View style={styles.HeadingView}>
                <View style={styles.cancel}>
                    <Text allowFontScaling={false} style={styles.canceltext}>{t('pickupslot')}</Text>
                </View>
                <TouchableOpacity onPress={props.Action1} style={{ alignItems: "center", justifyContent: "center", }}>
                    {/* <VECTOR_ICONS.Entypo name={"cross"} size={28} color={"rgba(74, 74, 74, 1)"} /> */}
                    <Cross />
                </TouchableOpacity>
            </View>
            <View style={styles.lineStyle}></View>
            {/* <View style={{ paddingVertical: 8 ,flex:1}}>

                <LocationSvg />
            </View> */}
            <View style={styles.locationview}>
                <LocationSvg />
                <Text allowFontScaling={false} numberOfLines={3} style={styles.mobiloitte}>{pickupAddress}</Text>
            </View>

            <WholeButton Label={t('Confirmpickup')} styles={styles.backbtn} Action={props.Action} />
            <WholeButton Label={t('cancel')} styles={{ width: WIDTH * 0.9, backgroundColor: "#242E42", marginTop: 10 }} Action={props.Action2} />
        </View>
    )
}

export default ConfirmPickupSpot1

const styles = StyleSheet.create({
    mainView: {
        width: WIDTH * 0.9,
        alignSelf: "center",


    },
    HeadingView: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginVertical: "4%",
        // backgroundColor:"red"
        // backgroundColor:'rgba(246, 246, 246, 1)'
    },
    cancel: {
        alignItems: "center", justifyContent: "center", width: WIDTH * 0.85,
    },
    canceltext: {
        fontFamily: FONTS.bold,
        fontSize: 17,
        color: "rgba(36, 46, 66, 1)",
        fontWeight: '600'
    },
    lineStyle: {
        borderBottomColor: "rgba(239, 239, 244, 1)",
        borderBottomWidth: 2,
        width: WIDTH,
        alignSelf: "center"
    },
    locationview:
    {
        flexDirection: "row",
        paddingVertical: 10,
        marginBottom: 15,
        width: WIDTH * 0.9,
        alignSelf: "center",
        alignItems: "center",
        // justifyContent: "center",
    },
    backbtn: {
        width: WIDTH * 0.9
    },
    mobiloitte: {
        fontFamily: FONTS.medium,
        fontSize: 15,
        color: "rgba(36, 46, 66, 1)",
        marginLeft: 10,
        flex: 1,
    }
})