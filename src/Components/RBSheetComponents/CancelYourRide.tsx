
import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import { FONTS, VECTOR_ICONS, COLORS, IMAGEPATH } from '../../assets/Theme'
import { HEIGHT, WIDTH } from '../../Components/Helpers/Dimentions'
import Cross from '../SvgComponent/Account/Cross';
import Crossicon from '../SvgComponent/CarRide/Crossicon';
// import Cross from '../SvgComponent/Notification/Cross';
import WholeButton from '../Wholebutton/Wholebutton';
import { useTranslation } from 'react-i18next';
interface DataItems {
    id: number;
    icon: any;
    title: string;
    notselected: any;
}
const CancelYourRide = (props: any, navigation: any) => {
    const {t} = useTranslation();

    const { setReasonRide } = props;
    // // console.log("setReasonRidesetReasonRide",setReasonRide)

    const [selectedCircle, setselectedCircle] = useState(1)
    const data: DataItems[] = [
        {
            id: 1,
            icon: IMAGEPATH.SelectedCircle,
            notselected: IMAGEPATH.NotSelectedCircle,
            title: t('The waiting period was excessively lengthy.')
        },
        {
            id: 2,
            icon: IMAGEPATH.SelectedCircle,
            notselected: IMAGEPATH.NotSelectedCircle,
            title: t('I chose the incorrect pickup location.')
        },
        {
            id: 3,
            icon: IMAGEPATH.SelectedCircle,
            notselected: IMAGEPATH.NotSelectedCircle,
            title: t("I made the request unintentionally.")
        },
        {
            id: 4,
            icon: IMAGEPATH.SelectedCircle,
            notselected: IMAGEPATH.NotSelectedCircle,
            title: t("I accidentally requested the wrong vehicle.")
        },
        {
            id: 5,
            icon: IMAGEPATH.SelectedCircle,
            notselected: IMAGEPATH.NotSelectedCircle,
            title: t("I mistakenly chose the incorrect drop-off location.")
        },
        {
            id: 6,
            icon: IMAGEPATH.SelectedCircle,
            notselected: IMAGEPATH.NotSelectedCircle,
            title: t("Other")
        },


    ]
    const handleCirclePress = (itemId: number) => {
        setselectedCircle(itemId);
    };

    //   const closeBottomSheet3 = () => {
    //     if (bottomSheetRef3.current) {
    //         bottomSheetRef3.current.close();
    //     }
    // };
    return (
        <View style={styles.mainView}>
            <View style={styles.HeadingView}>
                <View style={styles.cancel}>
                    <Text allowFontScaling={false} style={styles.canceltext}>{t('Cancel Your Ride')}</Text>
                </View>
                <TouchableOpacity onPress={props.Action1}>
                    {/* <VECTOR_ICONS.Entypo name={"cross"} size={28} color={"rgba(74, 74, 74, 1)"} /> */}
                    <Cross />
                </TouchableOpacity>
            </View>
            <View style={styles.lineStyle}></View>
            <Text allowFontScaling={false} style={styles.selecttext}>{t('Select the reason for cancellation.')}</Text>
            <FlatList
                data={data}
                scrollEnabled={false}
                renderItem={({ item }: { item: DataItems }) => {
                    const isSelected = selectedCircle === item.id;
                    return (
                        <View>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center", marginTop: "3%" }}
                                onPress={() => {
                                    handleCirclePress(item.id);
                                    setReasonRide(item?.title);
                                    // console.log("itemitemitemitemitem", item?.title);
                                }}
                            >
                                <Image source={isSelected ? item.icon : item.notselected} />
                                <Text allowFontScaling={false} style={[styles.description]}>
                                    {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            <WholeButton Label={t("Cancel Ride")} styles={styles.backbtn} Action={props.Action} />
        </View>
    )
}

export default CancelYourRide

const styles = StyleSheet.create({
    mainView: {
        width: WIDTH * 0.9,
        alignSelf: "center",

    },
    HeadingView: {
        flexDirection: "row",
        justifyContent: "flex-end",
        // backgroundColor:"rgba(246, 246, 246, 1)",
        marginVertical: "5%"
    },
    cancel: { alignItems: "center", justifyContent: "center", width: WIDTH * 0.82, },
    canceltext: {
        fontFamily: FONTS.bold,
        fontSize: 17,
        color: "rgba(36, 46, 66, 1)",
    },
    lineStyle: {
        borderBottomColor: "rgba(239, 239, 244, 1)",
        borderBottomWidth: 2,
        width: WIDTH,
        alignSelf: "center"
    },
    selecttext: {
        fontFamily: FONTS.bold,
        fontSize: 16,
        color: "rgba(36, 46, 66, 1)",
        marginTop: "4%",
        paddingBottom: 12
    },
    description: {
        fontFamily: FONTS.medium,
        fontSize: 16,
        color: "rgba(36, 46, 66, 1)",
        marginHorizontal: "4%"
    },
    backbtn: {
        backgroundColor: "rgba(36, 46, 66, 1)",
        marginVertical: HEIGHT * 0.04
    }

})