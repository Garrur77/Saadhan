
import React, { useState, useEffect } from 'react'
import { HEIGHT, WIDTH } from '../../Components/Helpers/Dimentions'
import { StyleSheet, Text, TouchableOpacity, View, Modal, SafeAreaView, StatusBar } from 'react-native'
import Header from '../../Components/HeaderComponent/Header'
import { COLORS, FONTS, IMAGEPATH } from '../../assets/Theme'
import EnterPasscodesvg from '../../Components/SvgComponent/Account/EnterPasscodesvg'
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useTranslation } from 'react-i18next'


const InitialPasscode = (props: any) => {
    const {t} = useTranslation();

    const [code, setcode] = useState(" ")

    useEffect(() => {
        if (code.length === 4) {
            props.navigation.navigate('ConfirmInitialPasscode', { newcode: code });
        }
    }, [code]);

    return (
        <>
            <SafeAreaView style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}></SafeAreaView>
            <StatusBar
                backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
                barStyle={"dark-content"}
            />
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
                <Header navigation={props?.navigation} Heading={t('Set Your Passcode')}
                    HeaderStyle={{ marginLeft: '10%' }} />
                <View style={styles.mainview}>
                    <EnterPasscodesvg />
                    <View style={styles.lineview}>
                        <Text allowFontScaling={false} style={styles.heading}>{t('Enter Passcode')}</Text>

                        <View style={styles.lineview1}>
                            <Text allowFontScaling={false} style={styles.alltextstyle}>{t('Please enter any 4 digit that will you use to unlock your wallet.')}</Text>
                        </View>
                        <OTPInputView
                            style={{ width: WIDTH * 0.8, height: 80 }}
                            pinCount={4}
                            onCodeChanged={(code) => {
                                setcode(code)
                                // console.log('Code changed:', code);
                            }}
                            onCodeFilled={() => {
                                // console.log('Code filled');
                            }}
                            autoFocusOnLoad={false}
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        />

                    </View>


                </View>


            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
        </>
    )
}

export default InitialPasscode

const styles = StyleSheet.create({
    underlineStyleBase: {

        width: 60,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 4,
        color: 'rgba(36, 46, 66, 0.6)',
        borderColor: '#D8D8D8',
        fontSize: 20,
        fontFamily: FONTS.bold
        // borderColor: otpError ? 'red' : '#F6F6F633',
    },
    underlineStyleHighLighted: {
        borderColor: "#242E42",
        borderBottomWidth: 4,

    },
    heading: {
        fontFamily: FONTS.bold,
        fontSize: 18,
        color: "#242E42"
    },
    lineview: { marginVertical: "10%", alignItems: "center", width: WIDTH * 0.9 },
    mainview: { width: WIDTH * 0.9, alignSelf: "center", alignItems: "center", marginVertical: "5%" },
    alltextstyle: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: "#8A8A8F",
        textAlign: "center"
    },
    lineview1:
    {
        width: WIDTH * 0.7,
        alignSelf: "center",
        alignItems: "center",
        marginVertical: "5%"
    },
})