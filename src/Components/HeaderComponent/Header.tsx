import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, Platform } from 'react-native';
import React, { useState } from 'react';
import { WIDTH, HEIGHT } from '../Helpers/Dimentions';
import { COLORS, FONTS, VECTOR_ICONS, IMAGEPATH } from '../../assets/Theme';
import PonttualSvg from '../SvgComponent/Account/PonttualSvg';
import { CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';


interface ModalComponentProps {
  setModalVisible(arg0: boolean): unknown;
  modalVisible: boolean;
  Message: string;
  Message1: string;
  head: string;
  btn1: string;
  btn2: string;
  Action: any;
  onYesPress: () => void;
}
const platformType = Platform.OS;
const Header: React.FC<ModalComponentProps> = (props: any) => {
  const{t} = useTranslation();
  const [selectedMeditationType1, setSelectedMeditationType1] = useState(false);
  const [NotificationData, setNotificationData] = useState([])
  const [value, setValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false)
  // const Action = () => {
  //   props?.ToScreen
  //     ? props?.navigation?.navigate(props?.ToScreen)
  //     : props?.navigation?.goBack();
  // };

  const Action = () => {
    props?.reset
      ? props?.navigation?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: props?.ToScreen }],
        })
      )
      : props?.ToScreen
        ? props?.navigation?.navigate(props?.ToScreen)
        : props?.navigation?.goBack();
  };

  const ClearAll = () => {
    setModalVisible(false);
    props.setNotificationData([])
  }
  return (
    <View style={styles.MainContainer}>



      {props?.hideleft == undefined && <TouchableOpacity
        style={[styles.BackHeader]}
        onPress={() => {
          Action();
        }}>
        <VECTOR_ICONS.Ionicons name="chevron-back" size={26} color={'#fff'} />
      </TouchableOpacity>}

      {props?.Heading && (
        <View style={{ width: props?.hideleft == undefined ? WIDTH * 0.69 : WIDTH * 0.8, alignSelf: 'center', }}>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={[styles.HeaderText, props.HeaderStyle]}>
            {props?.Heading}
          </Text>
        </View>
      )}

      {props?.Prefix && (
        <TouchableOpacity
          style={styles.BackHeader}
          onPress={() => {
            props.navigation.navigate('AddCategory');
          }}>
          <VECTOR_ICONS.Feather name="plus" size={29} color={'#FFC002'} />
        </TouchableOpacity>
      )}
      {props?.filter && (
        <TouchableOpacity
          style={[styles.BackHeader, { transform: [{ scaleX: -1 }] }]}
          onPress={() => {
            props.navigation.navigate('AddCategory');
          }}>
          <VECTOR_ICONS.AntDesign name="filter" size={27} color={'#FFC002'} />
        </TouchableOpacity>
      )}
      {props?.filter1 && (
        <TouchableOpacity
          style={[styles.BackHeader, { transform: [{ scaleX: -1 }] }]}
          onPress={() => {
            setSelectedMeditationType1(true);
          }}>
          <VECTOR_ICONS.AntDesign name="filter" size={27} color={'#FFC002'} />
        </TouchableOpacity>
      )}
      {props?.Heading1 && (
        <TouchableOpacity onPress={() => { setModalVisible(true) }}>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={[styles.HeaderText1, props.HeaderStyle1,]}>
            {props?.Heading1}
          </Text>
        </TouchableOpacity>
      )}

      <Modal visible={modalVisible}
        animationType="slide"
        transparent={true}>
        <View style={{
          backgroundColor: "rgba(0,0,0,0.65)",
          flex: 1,


          justifyContent: "center",
          //   alignItems: "center",
        }}>
          <View style={styles.modal}>
            <Image source={IMAGEPATH.delete} style={{ marginTop: '4%' }} />
            <Text allowFontScaling={false} style={styles.head}>{t('ClearAll')}</Text>
            <Text allowFontScaling={false} style={styles.text1}>{t('Are you sure want to clear all')}</Text>
            <Text allowFontScaling={false} style={styles.text2}> {t('notifications?')}</Text>
            <View style={styles.line}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: platformType == 'ios' ? WIDTH * 0.45 : WIDTH * 0.45, alignItems: 'center', }}>
              <TouchableOpacity onPress={() => { setModalVisible(false) }}
                style={{ alignSelf: 'center', }}>
                <Text allowFontScaling={false} style={styles.btn}>{t('No')}</Text>
              </TouchableOpacity>
              <View style={styles.line2}></View>
              <TouchableOpacity onPress={() => { props.onYesPress(), setModalVisible(false) }}>
                <Text allowFontScaling={false} style={[styles.btn, { color: COLORS.BACKGROUNDBTNCOLOR }]}>{t('Yes')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


    </View>

  );
};

export default Header;

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: 'row',
    width: WIDTH,
    alignSelf: 'center',
    height: HEIGHT * 0.07,
    backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 5 : 0


  },
  BackHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 41,
    width: 47,
  },
  HeaderText: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontFamily: FONTS.bold,
    fontWeight: '600',
    fontSize: 18,
    width: '80%',
    alignSelf: 'center',
    fontWeight: Platform.OS === 'ios' ? '600' : '400',
  },
  HeaderText1: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontFamily: FONTS.bold,
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '700' : '400',
    alignSelf: "flex-end",
    right: '4%',


  },
  modal: {
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.8,
    // height:platformType=='ios'? 244: HEIGHT * 0.3,
    // justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: "60%",
    borderRadius: 30,
    paddingVertical: Platform.OS === 'ios' ? '4%' : '1%'
  },
  line2: {
    backgroundColor: '#ECECEC',
    // backgroundColor:'red',
    width: "0.5%",
    height: platformType == 'ios' ? 58 : 48,
    // marginTop:'4%'
  },
  btn: {
    fontSize: 17,
    color: '#C8C7CC',
    fontFamily: FONTS.bold,

  },
  text1: {
    fontSize: 14,
    color: '#8A8A8F',
    fontFamily: FONTS.light,
    marginTop: '2%'
  },
  text2: {
    fontSize: 14,
    color: '#8A8A8F',
    fontFamily: FONTS.light,
  },
  line: {
    backgroundColor: '#ECECEC',
    width: WIDTH * 0.8,
    height: 1,
    marginTop: '8%'
  },
  head: {
    fontSize: 20,
    color: '#242E42',
    fontFamily: FONTS.bold,
    marginTop: '4%',
    fontWeight: Platform.OS === 'ios' ? '600' : '400',
  },
});
