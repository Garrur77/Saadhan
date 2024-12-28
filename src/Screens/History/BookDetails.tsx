import React, { useRef, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Platform } from 'react-native'
import { FONTS, VECTOR_ICONS, COLORS, IMAGEPATH } from '../../assets/Theme'
import { useFocusEffect } from '@react-navigation/native';
import { WIDTH } from '../../Components/Helpers/Dimentions'
import RBSheet from "react-native-raw-bottom-sheet";
import BookDetailsCancle from '../../Components/RBSheetComponents/BookDetailsCancle';
import MapBackground from '../../Components/GlobalBackground/MapBackground';

const BookDetails = (props: any) => {
    const bottomSheetRef = useRef(null);

    useEffect(() => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.open(); // Open the RBSheet when the component is mounted
        }
    }, []);
    const openBottomSheet = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.open();
        }
    };
    const closeBottomSheet = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.close()
            props.navigation.navigate('BottomTabBar')
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            if (bottomSheetRef.current) {
                bottomSheetRef.current.open();
            }

        }, [bottomSheetRef])
    );
    const sheetheight = Platform.OS === 'ios' ? 310 : 320;
    return (
        <SafeAreaView>
            <MapBackground>

                <View>
                    <TouchableOpacity style={styles.backIcon} onPress={() => { props.navigation.goBack() }}>
                        <VECTOR_ICONS.Ionicons name="chevron-back" size={26} color={COLORS.WHITE} style={{ alignSelf: "center" }} />
                    </TouchableOpacity>
                    <RBSheet
                        ref={bottomSheetRef}
                        onClose={() => { closeBottomSheet() }}
                        height={sheetheight}
                        closeOnPressMask={false}
                        customStyles={{
                            container: styles.firstView1,
                            draggableIcon: { opacity: 0 },
                        }}
                    >
                        <BookDetailsCancle CloseSheeet={bottomSheetRef} Action={() => { closeBottomSheet() }} />
                    </RBSheet>
                </View>
            </MapBackground>
        </SafeAreaView>
    )
}

export default BookDetails

const styles = StyleSheet.create({
    firstView1: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE,
    },
    mainView: { width: WIDTH * 0.9, alignSelf: "center" },
    backIcon: {
        backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
        width: 46,
        height: 46,
        borderRadius: 23,
        marginVertical: "5%",
        alignItems: "center",
        justifyContent: "center"
    },

})