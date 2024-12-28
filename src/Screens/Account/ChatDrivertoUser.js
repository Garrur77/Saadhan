import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  StatusBar,
  Alert,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import Header from "../../Components/HeaderComponent/Header";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import { COLORS, IMAGEPATH } from "../../assets/Theme";
import { RootState } from "../../ReduxConfig/Store";

import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { SOCKET_URL, getChatbyRideId } from "../../ApiConfig/Endpoints";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import socketServcies from "../../Utils/SocketService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { resetNotificationCount } from "../../ReduxConfig/NotificationCountSlice";

const { width, height } = Dimensions.get("screen");

const ChatDrivertoUser = (props) => {
  const driveName = props?.route?.params?.data;
  const rideId = props?.route?.params?.data?.rideId;
  const [socket, setSocket] = useState(null);
  // const [allMessages, setAllMessages] = useState([]);

  // // console.log("asdfaasdfsdsdfasdfasdfasdffasdf", allMessages);

  // // console.log(
  //   "socketServciessocketServciessocketServcies777888",
  //   socketServcies
  // );
  const Data = useSelector(
    (state: RootState) => state.userDetails?.profileData
  );
  const navigation = useNavigation();
  const [userId, setUserId] = useState(Data?._id);
  const [rideIdChat, setRideIdChat] = useState("");
  useEffect(() => {
    setUserId(Data?._id);
  }, [Data]);
  const [messages, setMessages] = useState([]);

  // // console.log("messages------>>>>>>", messages);
  const [messageInput, setMessageInput] = useState("");
  const [types, setType] = useState("");
  // console.log("typestypes", types);
  const isFocused = useIsFocused();

  const scrollViewRef = useRef();

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  // useEffect(() => {
  //   initiateChat();
  // }, [isfocus, socketServcies, rideId]);

  // const initiateChat = () => {
  //   const rideIds = { rideId };
  //   if (socketServcies) {
  //     socketServcies.emit("ridechat", rideIds);

  //     socketServcies.on("ridechatInitiated", (data) => {
  //       // console.log("ridechatInitiated********22", data);
  //       setRideRoom(data?.rideRoom);
  //       setRideIdChat(data?.rideId);
  //       setRideRoom(data?.rideRoom);
  //       // setMessages(data?.messages);
  //     });
  //   }
  // };
  const RegisterTOKEN = useSelector(
    (state: RootState) => state.REGISTER_TOKEN.RegisterTOKEN
  );
  const sendMessage = () => {
    if (socketServcies) {
      const message = messageInput.trim();
      if (message !== "") {
        socketServcies.socket.emit("sendRideMessage", {
          message,
          rideId: rideId,
          from: "rider",
        });
        const newMessage = { message, from: "rider" };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessageInput("");
      }
    } else {
      console.warn("Socket is not initialized yet.");
    }
  };
  const appendMessage = (message) => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      if (lastMessage && lastMessage.message === message.message) {
        return prevMessages;
      }
      return [...prevMessages, message];
    });
  };

  useEffect(() => {
    const allMessageData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: getChatbyRideId,
          headers: {
            token: RegisterTOKEN,
          },
          params: {
            rideId: rideId,
          },
        });
        // console.log("asdfasdfasdfasdfasdfasdf success", response);
        setMessages(response?.data?.result?.messages || []);
      } catch (error) {
        // console.log("sdfsdfasdfasdfasdfasdf error123", error.message);
      }
    };
    allMessageData();
  }, [isFocused, messages]);
  const dispatch = useDispatch();
  const handleResetNotificationCount = () => {
    dispatch(resetNotificationCount());
  };
  useEffect(() => {
    if (socketServcies) {
      socketServcies.socket.on("receiveRideMessage", (data) => {
        // console.log("fsfgsdagsagd---", data);
        appendMessage(data);
      });
    }
  }, [isFocused, messages]);

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: COLORS.BACKGROUNDBTNCOLOR }}
      ></SafeAreaView>
      <StatusBar
        backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
        barStyle={"dark-content"}
      />
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <Header
          navigation={props?.navigation}
          Action={() => {
            navigation.goBack();
            handleResetNotificationCount();
          }}
          // Heading={"Driver Support"}
        />
        <View style={styles.viewStyle}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: WIDTH * 0.9,
              alignSelf: "center",
              marginBottom: "4%",
              marginLeft: 16,
            }}
          >
            <Text allowFontScaling={false} style={styles.textStyle}>
              {driveName?.driverDetails?.driverName ?? "UnKnown"}
            </Text>
            <Image
              source={
                driveName?.driverDetails?.driverImage
                  ? { uri: driveName?.driverDetails?.driverImage }
                  : IMAGEPATH.Man
              }
              style={{ width: 60, height: 60, borderRadius: 100 }}
              // source={IMAGEPATH.Man}
            />
            {/* <Image source={IMAGEPATH.Man} /> */}
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flexGrow: 1 }}
          keyboardVerticalOffset={60}
        >
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View
              style={{
                backgroundColor: "#fff",
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={scrollToBottom}
                style={styles.messagesContainer}
                showsVerticalScrollIndicator={false}
              >
                {/* {messages &&
                  messages?.map((msgObject, index) => {
                    // console.log("msgObjectmsgObjectmsgObject", msgObject);
                    const msg = msgObject.message;
                    // console.log("fmsgmsgmsgmsgmsgirst", msg);
                    const isUserMessage =
                      typeof msg === "string" && msg.includes(":");
                    const sender = isUserMessage ? msg.split(":")[0] : msg.from;
                    const messageStyle = {
                      alignSelf:
                        msg?.from !== "driver" ? "flex-end" : "flex-start",
                      backgroundColor:
                        msg?.from !== "driver"
                          ? "rgba(255, 85, 0, 1)"
                          : "rgba(239, 239, 244, 1)",

                      borderTopLeftRadius: msg?.from !== "rider" ? 10 : 10,
                      borderTopRightRadius: msg?.from !== "rider" ? 10 : 10,
                      borderBottomLeftRadius: msg?.from !== "rider" ? 0 : 10,
                      borderBottomRightRadius: msg?.from !== "rider" ? 10 : 0,
                      padding: 10,
                      maxWidth: 250,
                      
                    };

                    return (
                      <View
                        key={index}
                        style={{ marginBottom: 15, marginHorizontal: 5 }}
                      >
                        <View style={messageStyle}>
                          <Text
                            style={{
                              color:
                                msg?.from !== "driver"
                                  ? "#fff"
                                  : "rgba(38, 38, 40, 1)",
                              fontSize: 14,
                              lineHeight: 20,
                              paddingRight: 6,
                            }}
                          >
                            {msg?.message}{" "}
                          </Text>
                        </View>
                      </View>
                    );
                  })} */}
                {messages &&
                  messages?.map((msgObject, index) => {
                    // console.log("msgObjectmsgObjectmsgObject2222", msgObject);
                    {
                      /* const msg = msgObject.message;
                    // console.log("fmsgmsgmsgmsgmsgirst", msg);
                    const isUserMessage =
                      typeof msg === "string" && msg.includes(":");
                    const sender = isUserMessage ? msg.split(":")[0] : msg.from; */
                    }
                    const messageStyle = {
                      alignSelf:
                        msgObject?.from !== "driver"
                          ? "flex-end"
                          : "flex-start",
                      backgroundColor:
                        msgObject?.from !== "driver"
                          ? "rgba(255, 85, 0, 1)"
                          : "rgba(239, 239, 244, 1)",

                      borderTopLeftRadius:
                        msgObject?.from !== "rider" ? 10 : 10,
                      borderTopRightRadius:
                        msgObject?.from !== "rider" ? 10 : 10,
                      borderBottomLeftRadius:
                        msgObject?.from !== "rider" ? 0 : 10,
                      borderBottomRightRadius:
                        msgObject?.from !== "rider" ? 10 : 0,
                      padding: 10,
                      maxWidth: 250,
                    };

                    return (
                      <View
                        key={index}
                        style={{ marginBottom: 15, marginHorizontal: 5 }}
                      >
                        <View style={messageStyle}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              color:
                                msgObject?.from !== "driver"
                                  ? "#fff"
                                  : "rgba(38, 38, 40, 1)",
                              fontSize: 14,
                              lineHeight: 20,
                              paddingRight: 6,
                            }}
                          >
                            {msgObject?.message}{" "}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
              </ScrollView>
            </View>
            <View style={styles.lastview}>
              <View style={styles.search}>
                <TextInput
                  allowFontScaling={false}
                  placeholder={"Type a message..."}
                  placeholderTextColor={"#C8C7CC"}
                  value={messageInput}
                  onChangeText={(e) => setMessageInput(e)}
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>
              <TouchableOpacity
                onPress={sendMessage}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 40,
                  marginRight: 10,
                }}
              >
                <Image
                  source={require("../../assets/Images/Account/sendButton.png")}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: "rgba(255, 85, 0, 1)",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default ChatDrivertoUser;

const styles = StyleSheet.create({
  search: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    columnGap: 12,
    flex: 1,
  },
  viewStyle: {
    backgroundColor: "#FF5500",
    flexDirection: "row",
  },
  input: {
    width: WIDTH * 0.8,
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "#EFEFF4",
    borderWidth: 1,
    paddingLeft: "5%",
    height: 40,
    color: "#000",
    backgroundColor: "#FFFFFF",
  },
  chatbutton: {
    backgroundColor: "red",
    padding: 18,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  lastview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: 5,
    // marginHorizontal: 16,
    columnGap: 10,
    paddingBottom: Platform.OS === "android" ? 22 : 0,
    backgroundColor: "rgba(239, 239, 244, 0.4)",
    width: WIDTH * 1,
  },
  text: {
    fontSize: 16,
    // color: COLORS.heading,
    lineHeight: 20,
    color: "#212121",
  },
  textStyle: {
    // fontFamily: FONTS.bold,
    fontSize: 30,
    color: "#fff",
    fontWeight: "600",
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderTopWidth: 1,
    borderColor: "#EDEDED",
  },
  blocktext: {
    fontSize: 16,
    color: "#212121",
    lineHeight: 22,
    textAlign: "center",
    // paddingHorizontal: height * 0.1,
    paddingVertical: height * 0.02,
  },
});
