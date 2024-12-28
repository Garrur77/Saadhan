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
  Keyboard,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import Header from "../../Components/HeaderComponent/Header";
import { HEIGHT, WIDTH } from "../../Components/Helpers/Dimentions";
import { COLORS, IMAGEPATH } from "../../assets/Theme";
import { RootState } from "../../ReduxConfig/Store";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { SOCKET_URL } from "../../ApiConfig/Endpoints";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("screen");

const ChatSocket = (props) => {
  const {t} = useTranslation();
  const Data = useSelector(
    (state: RootState) => state.userDetails?.profileData
  );
  const [userId, setUserId] = useState(Data?._id);

  useEffect(() => {
    setUserId(Data?._id);
  }, [Data]);
  const [chatRoomId, setChatRoomId] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminChatRoomId, setAdminChatRoomId] = useState("");
  const [socketId, setSocketId] = useState("");
  const [socket, setSocket] = useState("");
  // console.log("socketttttttttttt-----?>>>", socket);
  const [types, setType] = useState("");
  const [typing, setTyping] = useState(false);

  // console.log("is user typing---->>>>", typing);
  // console.log("typestypes", types);
  const isfocus = useIsFocused();

  const scrollViewRef = useRef();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        scrollToBottom();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    initiateChat();
  }, [isfocus, socket]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ["polling"],
      auth: { _id: userId },
    });
    newSocket.on("connect", () => {
      // console.log("Socket connected");
      setSocketId(newSocket);
    });

    newSocket.on("disconnect", (reason) => {
      // console.log("Socket disconnected:", reason);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [isfocus]);

  const initiateChat = () => {
    if (socket) {
      socket.emit("initiateChat", userId);
      socket.on("userNotFound", () => {
        console.error("User not found. Please check your User ID.");
      });

      socket.on("adminNotFound", () => {
        console.error("Admin not found. Please try again later.");
      });

      socket.on("chatInitiated", (data) => {
        // console.log("chatInitiatedchatInitiated", data?.chatRoomId);
        setIsAdmin(false);
        setAdminChatRoomId(data?.chatRoomId);
        setMessages(data?.messages);
      });
    }
  };

  // console.log("SocketID---->", socketId?.id);
  const sendMessage = () => {
    if (socket) {
      const message = messageInput.trim();

      if (message !== "") {
        socket.emit("sendMessage", {
          message,
          chatRoomId: adminChatRoomId,
          from: "User",
        });
        appendMessage(`User: ${message}`);

        setMessageInput("");
      }
    }
  };

  const appendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };
  const typingHandler = (status) => {
    if (socket) {
      socket.emit("typing", {
        typer: socketId?.id,
        status: status,
        userId: userId,
        roomId: adminChatRoomId,
      });
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (data) => {
        appendMessage(`${data?.from}: ${data?.message}`);
        setType(data?.from);
      });
    }

    return () => {
      if (socket) {
        socket.off("receiveMessage"); // Remove the listener when the component unmounts
      }
    };
  }, [socket, messages, types]);

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
            props.navigation.goBack();
          }}
          HeaderStyle={{ marginLeft: "10%" }}
          Heading={t("Customer Support")}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flexGrow: 1 }}
          keyboardVerticalOffset={60}
          // keyboardVerticalOffset={keyboardHeight}
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
                {messages &&
                  messages?.map((msg, index) => {
                    const isUserMessage =
                      typeof msg === "string" && msg?.includes(":");
                    const sender = isUserMessage
                      ? msg.split(":")[0]
                      : msg?.from;
                    const messageStyle = {
                      alignSelf: sender === "Admin" ? "flex-start" : "flex-end",
                      backgroundColor:
                        sender === "Admin"
                          ? "rgba(239, 239, 244, 1)"
                          : "rgba(255, 85, 0, 1)",
                      borderTopLeftRadius: sender === "Admin" ? 0 : 10,
                      borderTopRightRadius: sender === "Admin" ? 10 : 10,
                      borderBottomLeftRadius: 10,
                      padding: 10,
                      maxWidth: 250,
                      // width: 200,
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
                                sender === "Admin"
                                  ? "rgba(38, 38, 40, 1)"
                                  : "#fff",
                              fontSize: 16,
                              lineHeight: 20,
                              paddingRight: 6,
                            }}
                          >
                            {isUserMessage
                              ? msg.split(":")[1].trim()
                              : msg?.message.trim()}
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
                  placeholder={t("Type a message...")}
                  placeholderTextColor={"#C8C7CC"}
                  value={messageInput}
                  onChangeText={(text) => setMessageInput(text)}
                  onFocus={() => {
                    typingHandler(true);
                  }}
                  onBlur={() => {
                    typingHandler(false);
                  }}
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
                  style={{ width: 30, height: 30 }}
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

export default ChatSocket;

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
    paddingVertical: height * 0.02,
  },
});
