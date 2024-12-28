import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { RootState } from "../../ReduxConfig/Store";

export default function App() {
  const [userId, setUserId] = useState("65af8b669885a09c5d9977ef");
  const [chatRoomId, setChatRoomId] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminChatRoomId, setAdminChatRoomId] = useState("");
  const [socket, setSocket] = useState(null);
  const isfocus = useIsFocused();

  const Data = useSelector((state: RootState) => state.value);

  useEffect(() => {
    const newSocket = io("http://172.16.6.128:2031");
    newSocket.on("receiveMessage", (data) => {
      // console.log("receiveMessagereceiveMessage66", data);
      appendMessage(`${data.from}: ${data.message}`);
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [isfocus]);

  useEffect(() => {
    if (isfocus && socket) {
      // Call initiateChat only when the page is focused
      initiateChat();
    }
  }, [isfocus, socket]);

  const initiateChat = () => {
    if (socket) {
      socket.emit("initiateChat", "65af8b669885a09c5d9977ef");
      socket.on("userNotFound", () => {
        console.error("User not found. Please check your User ID.");
        alert("User not found. Please check your User ID.");
      });

      socket.on("adminNotFound", () => {
        console.error("Admin not found. Please try again later.");
        alert("Admin not found. Please try again later.");
      });

      socket.on("chatInitiated", (data) => {
        // console.log("chatInitiatedchatInitiated", data?.chatRoomId);
        setIsAdmin(false);
        setAdminChatRoomId(data?.chatRoomId);
        setMessages(data?.messages);
        alert(`Chat initiated. Your RoomId is ${data?.chatRoomId}.`);
      });

      socket.on("receiveMessage", (data) => {
        appendMessage(`${data?.from}: ${data?.message}`);
      });
    }
  };

  const joinChatRoom = () => {
    if (socket) {
      const data = { userId, adminChatRoomId };
      socket.emit("joinChatRoom", data);

      socket.on("userNotFound", () => {
        console.error("User not found. Please check your User ID.");
        alert("User not found. Please check your User ID.");
      });

      socket.on("chatRoomNotFound", () => {
        console.error("Chat room not found. Please check the Chat Room ID.");
        alert("Chat room not found. Please check the Chat Room ID.");
      });

      socket.on("chatJoined", (data) => {
        setIsAdmin(data.isAdmin);
        setAdminChatRoomId(chatRoomId);
        setMessages(data.messages);
        alert("Chat joined.");
      });

      socket.on("receiveMessage", (data) => {
        appendMessage(`${data.from}: ${data.message}`);
      });
    }
  };

  const sendMessage = () => {
    if (socket) {
      const message = messageInput.trim();

      if (message !== "") {
        socket.emit("sendMessage", {
          message,
          chatRoomId: adminChatRoomId,
          from: isAdmin ? "Admin" : "User",
        });
        appendMessage(`You: ${message}`);
        setMessageInput("");
      }
    }
  };

  const appendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (data) => {
        // console.log("reeeeeeeeeee", data);
        appendMessage(`${data.from}: ${data?.message}`);
      });
    }

    return () => {
      if (socket) {
        socket.off("receiveMessage"); // Remove the listener when the component unmounts
      }
    };
  }, [socket]);

  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.title}>
        {t('Socket.io Chat App')}
      </Text>

      {/* <ScrollView style={styles.messagesContainer}>
        {// console.log("messagesmessagesmessages", messages)}
        {messages &&
          messages?.map((msg, index) => {
            if (typeof msg === 'string' && msg?.includes(':')) {
              const [from, messageContent] = msg?.split(':');
              return (
                <Text key={index} style={styles.message}>
                  {// console.log("fdafsadfgsadffsa", msg)}
                  {from.trim()}: {messageContent.trim()}
                </Text>
              );
            }
            return null; // Skip rendering if msg is not a string or doesn't contain ':'
          })}
      </ScrollView> */}
      <ScrollView style={styles.messagesContainer}>
        {messages &&
          messages?.map((msg, index) => {
            if (typeof msg === "string" && msg?.includes(":")) {
              const [from, messageContent] = msg?.split(":");
              return (
                <Text
                  allowFontScaling={false}
                  key={index}
                  style={styles.message}
                >
                  {from.trim()}: {messageContent.trim()}
                </Text>
              );
            } else if (msg?.from && msg?.message) {
              // If it's an object with 'from' and 'message' properties
              return (
                <Text
                  allowFontScaling={false}
                  key={index}
                  style={styles.message}
                >
                  {msg.from.trim()}: {msg.message.trim()}
                </Text>
              );
            }
            return null; // Skip rendering if msg is not a string or object with necessary properties
          })}
      </ScrollView>

      <View>
        <TextInput
          allowFontScaling={false}
          style={styles.input}
          placeholder={t("Type your message...")}
          value={messageInput}
          onChangeText={setMessageInput}
        />
        <Button title={t("Send")} onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  messagesContainer: {
    maxHeight: 200,
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    marginBottom: 8,
  },
});
