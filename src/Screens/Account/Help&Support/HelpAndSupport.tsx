// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
// } from "react-native";
// import Header from "../../../Components/HeaderComponent/Header";
// import { HEIGHT } from "../../../Components/Helpers/Dimentions";
// import { COLORS, FONTS, VECTOR_ICONS } from "../../../assets/Theme";
// import axios from "axios";
// import { fetchhelpSupport } from "../../../ApiConfig/Endpoints";
// import { useIsFocused } from "@react-navigation/native";
// import WholeButton from "../../../Components/Wholebutton/Wholebutton";

// const { height, width } = Dimensions.get("screen");

// export default function Faqs(props) {
//   const [showText, setShowText] = useState([
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//   ]);
//   const isFocused = useIsFocused();
//   const [Loader, setLoader] = useState(false);
//   const [datafaqs, setDataFaqs] = useState([]);

//   // console.log("::::::::::datafaqs::::::::::", datafaqs);

//   const helpNsupport = async () => {
//     try {
//       setLoader(true);
//       const res = await axios({
//         method: "get",
//         url: fetchhelpSupport,
//       });
//       // console.log("faq----->>", res?.data?.result);
//       if (res?.data?.responseCode == 200) {
//         setDataFaqs(res?.data?.result);
//         setLoader(false);
//       }
//     } catch (error) {
//       // console.log("helpNsupport error---->", error?.response);
//       setLoader(false);
//     }
//   };

//   useEffect(() => {
//     helpNsupport();
//   }, [isFocused]);
//   const [openedIndex, setOpenedIndex] = useState(null);
//   // const toggleText = (index) => {
//   //   const updatedState = [...showText];
//   //   updatedState[index] = !updatedState[index];
//   //   setShowText(updatedState);
//   // };
//   const toggleText = (index) => {
//     setOpenedIndex(openedIndex === index ? null : index);
//   };

//   return (
//     <>
//       <SafeAreaView style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }} />
//       <StatusBar
//         backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
//         barStyle={"dark-content"}
//       />
//       <SafeAreaView style={{ flex: 1 }}>
//         <View style={styles.container}>
//           <Header
//             navigation={props?.navigation}
//             Heading={"Help & Support"}
//             HeaderStyle={{ marginLeft: "15%" }}
//           />
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             style={styles.cardContainer}
//           >
//             {(datafaqs && datafaqs?.length === 0) ||
//             datafaqs?.length === undefined ? (
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: HEIGHT / 1.3,
//                 }}
//               >
//                 <Text allowFontScaling={false} style={styles.noDataText}>
//                   No Faqs Found
//                 </Text>
//               </View>
//             ) : (
//               <View style={{ flex: 1 }}>
//                 {datafaqs &&
//                   datafaqs?.map((item, index) => (
//                     <TouchableOpacity
//                       activeOpacity={1}
//                       onPress={() => toggleText(index)}
//                       key={index}
//                       style={styles.card}
//                     >
//                       <View style={styles.cardHeader}>
//                         <Text allowFontScaling={false} style={styles.question}>
//                           {item?.question}
//                         </Text>
//                         <TouchableOpacity
//                           activeOpacity={1}
//                           onPress={() => toggleText(index)}
//                         >
//                           <VECTOR_ICONS.FontAwesome6
//                             name={
//                               openedIndex === index
//                                 ? "chevron-up"
//                                 : "chevron-down"
//                             }
//                             size={20}
//                             color={COLORS.BLACK}
//                             // style={{ position: "absolute" }}
//                           />
//                         </TouchableOpacity>
//                       </View>
//                       {openedIndex === index && (
//                         <View
//                           style={{
//                             backgroundColor: "rgba(255, 255, 255, 1)",
//                             // paddingVertical: 6,
//                           }}
//                         >
//                           <Text
//                             allowFontScaling={false}
//                             style={{
//                               color: "rgba(130, 132, 137, 1)",
//                               fontSize: 14,
//                               lineHeight: 20,
//                               paddingBottom: 10,
//                             }}
//                           >
//                             {item?.answer}
//                           </Text>
//                         </View>
//                       )}
//                     </TouchableOpacity>
//                   ))}
//               </View>
//             )}
//             <View style={styles.bottomButtonContainer}>
//               <WholeButton
//                 styles={{
//                   backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
//                   color: COLORS.WHITE,
//                   alignSelf: "center",
//                 }}
//                 Label={"SUBMIT YOUR QUERY"}
//                 Action={() => {
//                   props.navigation.navigate("SubmitYourQuery");
//                 }}
//               />
//             </View>
//           </ScrollView>
//         </View>
//       </SafeAreaView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   bottomButtonContainer: {
//     paddingVertical: 15,
//   },
//   cardContainer: {
//     gap: 12,
//     marginTop: 25,
//     position: "relative",
//   },
//   card: {
//     paddingHorizontal: 10,
//     // paddingVertical: 10,
//     // height: HEIGHT * 0.07,
//     // marginBottom: 10,
//     alignItems: "center",
//     borderRadius: 8,
//     backgroundColor: "#fff",
//   },
//   noDataText: {
//     alignSelf: "center",
//     marginTop: 20,
//     fontFamily: FONTS.medium,
//     fontSize: 16,
//     color: "#000",
//   },
//   icon: {
//     height: 20,
//     width: 20,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   question: {
//     paddingTop: 5,
//     color: "rgba(36, 46, 66, 1)",
//     fontSize: 17,
//     // marginBottom: 5,
//     width: width * 0.8,
//   },
// });
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  StatusBar,
  SafeAreaView,
} from "react-native";
import WholeButton from "../../../Components/Wholebutton/Wholebutton";
import { COLORS, FONTS, VECTOR_ICONS } from "../../../assets/Theme";
import Header from "../../../Components/HeaderComponent/Header";
import { fetchhelpSupport } from "../../../ApiConfig/Endpoints";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { HEIGHT } from "../../../Components/Helpers/Dimentions";

const Faqs = (props: any) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(0));
  const [Loader, setLoader] = useState(false);
  const [datafaqs, setDataFaqs] = useState([]);
  const isFocused = useIsFocused();

  const helpNsupport = async () => {
    try {
      setLoader(true);
      const res = await axios({
        method: "get",
        url: fetchhelpSupport,
      });
      // console.log("faq----->>", res?.data?.result);
      if (res?.data?.responseCode == 200) {
        setDataFaqs(res?.data?.result);
        setLoader(false);
      }
    } catch (error) {
      // console.log("helpNsupport error---->", error?.response);
      setLoader(false);
    }
  };

  useEffect(() => {
    helpNsupport();
  }, [isFocused]);

  const handlePress = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      setActiveIndex(index);
      Animated.timing(animatedHeight, {
        toValue: 100, // Adjust the height according to your content
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }} />
      <StatusBar
        backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
        barStyle={"dark-content"}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header
            navigation={props?.navigation}
            Heading={"Help & Support"}
            HeaderStyle={{ marginLeft: "15%" }}
          />
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {(datafaqs && datafaqs?.length === 0) ||
            datafaqs?.length === undefined ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  height: HEIGHT / 1.3,
                }}
              >
                <Text allowFontScaling={false} style={styles.noDataText}>
                  No Faqs Found
                </Text>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                {datafaqs.map((item, index) => (
                  <View key={index} style={styles.item}>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.questionContainer}
                      onPress={() => handlePress(index)}
                    >
                      <Text style={styles.question}>{item.question}</Text>
                      <VECTOR_ICONS.FontAwesome6
                        name={
                          activeIndex === index ? "chevron-up" : "chevron-down"
                        }
                        size={20}
                        color={COLORS.BLACKISH}
                      />
                    </TouchableOpacity>
                    {activeIndex === index && (
                      <Animated.View
                        style={[
                          styles.answerContainer,
                          { height: animatedHeight },
                        ]}
                      >
                        <Text style={styles.answer}>{item.answer}</Text>
                      </Animated.View>
                    )}
                  </View>
                ))}
              </View>
            )}
            <View style={styles.bottomButtonContainer}>
              <WholeButton
                styles={{
                  backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
                  color: COLORS.WHITE,
                  alignSelf: "center",
                }}
                Label={"SUBMIT YOUR QUERY"}
                Action={() => {
                  props.navigation.navigate("SubmitYourQuery");
                }}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 10,
  },
  item: {
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.BORDERCOLOR,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    fontSize: 16,
    color: COLORS.GRAY,
    fontFamily: FONTS.medium,
  },
  icon: {
    fontSize: 20,
    fontWeight: "bold",
  },
  answerContainer: {
    overflow: "hidden",
  },
  answer: {
    fontSize: 14,
    color: COLORS.LIGHTTEXT,
    fontFamily: FONTS.regular,
  },
  bottomButtonContainer: {
    paddingVertical: 15,
  },
});

export default Faqs;
