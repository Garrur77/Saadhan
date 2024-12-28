import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Done from "../SvgComponent/Wallet1/Done";
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
interface AmountAddModalProps {
  visible: boolean;
  onClose: () => void;
  content: string;
  content1: string;
  props?: any,

}

const AmountAddModal: React.FC<AmountAddModalProps> = ({
  visible,
  onClose,
  content,
  content1,
  props,

}) => {
  const {t} = useTranslation();
  const { height, width } = Dimensions.get("screen");
  const navigation = useNavigation();
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* <Image
            source={require("./images/done.png")}
            style={{ height: 96, width: 96, marginVertical: 5 }}
            resizeMode="contain"
          /> */}
          <Done />
          <Text allowFontScaling={false} style={styles.modaltext}>{content}</Text>
          <Text allowFontScaling={false} style={styles.modaltext1}>{content1}</Text>
          <TouchableOpacity style={styles.buttonstyle} onPress={() => {
            ; navigation.navigate('BottomTabBar');
          }}>
            <Text allowFontScaling={false} style={styles.buttonstyletext}>{t('Okay')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    width: "80%",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: '5%'
  },
  modaltext: {
    fontSize: 20,
    fontWeight: "600",
    color: "#242E42",
    marginVertical: 10,
  },
  modaltext1: {
    fontSize: 15,
    fontWeight: "400",
    color: "#8A8A8F",
    marginBottom: 20,
  },
  buttonstyle: {
    backgroundColor: "#FF5500",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 15,
    width: "85%",
  },
  buttonstyletext: { fontSize: 17, fontWeight: "600", color: "#FFFFFF" },
});

export default AmountAddModal;
