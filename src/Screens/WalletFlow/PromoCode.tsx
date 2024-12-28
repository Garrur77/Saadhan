import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView, StatusBar,
    Platform
} from "react-native";
import React from "react";
import Header from "../../Components/HeaderComponent/Header";
import WholeButton from "../../Components/Wholebutton/Wholebutton";
import { COLORS, FONTS } from "../../assets/Theme";
import { WIDTH } from "../../Components/Helpers/Dimentions";


const Promocode = (props: any) => {
    return (
        <>
            <SafeAreaView style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}></SafeAreaView>
            <StatusBar
                backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
                barStyle={"dark-content"}
            />
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
                <Header navigation={props?.navigation} Heading={'Add Promo Code'} />
                <View style={styles.container}>
                    <Text allowFontScaling={false} style={styles.label}>Promo Code</Text>
                    <View style={styles.input}>
                        <TextInput
                            allowFontScaling={false}
                            placeholder="Enter promo code"
                            placeholderTextColor="#BEBEBE"
                            style={{
                                marginHorizontal: '4%', color: '#262626',
                                marginVertical: Platform.OS === 'ios' ? "4%" : 4,
                            }}

                        />
                    </View>

                    <Text allowFontScaling={false} style={styles.description}>
                        Enter the code in order to claim and use your voucher.
                    </Text>

                    {/* <TouchableOpacity style={styles.submitButton}>
            <Text allowFontScaling={false} style={styles.submitButtonText}>SUBMIT</Text>
          </TouchableOpacity> */}

                    <WholeButton
                        styles={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR, color: COLORS.WHITE, marginTop: '6%', width: WIDTH * 0.9 }}
                        Label={'SUBMIT'}
                        Action={() => { props.navigation.navigate('BottomTabBar') }}
                    />
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 14,

        color: "#262626",
        fontFamily: FONTS.bold
    },
    input: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#EFEFF4",
        marginVertical: Platform.OS === 'ios' ? 13 : 10,
        // backgroundColor:'red'
    },
    description: {
        fontSize: 12,
        fontWeight: "400",
        color: "#A0A0A0",
        marginBottom: 25,
    },
    submitButton: {
        backgroundColor: "#FF5500",
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginVertical: 10,
    },
    submitButtonText: {
        fontSize: 17,
        fontWeight: "600",
        color: "#FFFFFF",
    },
});

export default Promocode;
