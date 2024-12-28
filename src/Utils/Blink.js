import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

const Blink = (props) => {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnimation, {
          toValue: 0,
          duration: props.duration,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: props.duration,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: props.repeatation,
      }
    ).start();
  }, [fadeAnimation, props.duration]);

  return (
    <View style={{ ...props.style }}>
      <Animated.View style={{ opacity: fadeAnimation }}>
        {props.children}
      </Animated.View>
    </View>
  );
};

export default Blink;
