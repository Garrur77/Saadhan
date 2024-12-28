import {
  View,
  Text,
  Animated,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';

import { Bodytoggleanimation } from '../HelpComponent/BodytoggleAnimation'
import { COLORS, FONTS, VECTOR_ICONS } from '../../assets/Theme';
import { HEIGHT, WIDTH } from '../Helpers/Dimentions';
import WholeButton from '../Wholebutton/Wholebutton';
const HelpSupportComp = (props: any) => {
  const [showContent, setshowContent] = useState(false);

  const animationController = useRef(new Animated.Value(0)).current;

  const toggleListItem = () => {
    setshowContent(!showContent);
    if (props.Index == props.ActiveInd) {
      props.SetActiveInd(-1);
    } else {
      props.SetActiveInd(props.Index);
    }
  };

  useEffect(() => {
    const config = {
      duration: 300,
      toValue: props.Index == props.ActiveInd ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(Bodytoggleanimation);
  }, [props.ActiveInd]);

  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (

    <View style={styles.Viewstyle}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text allowFontScaling={false} style={styles.HeaderText}>{props.Tit}</Text>
        <TouchableOpacity
          style={styles.BackHeader}
          onPress={() => {
            toggleListItem();
          }}>

          <Animated.View
            style={{
              transform: [{ rotateZ: arrowTransform }],
            }}>
            <VECTOR_ICONS.Ionicons name="chevron-up" size={21} color={'#262626'} />
          </Animated.View>
        </TouchableOpacity>
      </View>
      {showContent && <View style={styles.line}></View>}

      {props.Index == props.ActiveInd && (
        <Text allowFontScaling={false} style={styles.Description}>{props.Bod}</Text>
      )}

      <View style={styles.line}></View>

    </View>


  );
};

export default HelpSupportComp;

const styles = StyleSheet.create({
  BackHeader: {

    // borderWidth: 1.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 26,
    width: 27,
  },
  Viewstyle: {

    paddingHorizontal: 15,

    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#F8F8F8',


  },
  HeaderText: {
    fontSize: 18,
    fontFamily: FONTS.semibold,
    color: COLORS.GRAY,
    marginTop: 5,
  },
  Description: {
    color: '#828489',
    fontSize: 14,
    fontFamily: FONTS.medium,
    paddingTop: 20,
  },
  line: {
    backgroundColor: "#ECECEC",

    width: WIDTH * 0.99,
    height: 4,
    marginTop: "4%",
    alignSelf: "center",
  },
});