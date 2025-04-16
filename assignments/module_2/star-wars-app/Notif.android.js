import React from "react";
import { ToastAndroid } from "react-native";

export default function Notif({ message, duration }) {
  React.useEffect(() => {
    if (message) {
      ToastAndroid.show(message, duration);
    }
  }, [message]);

  return null;
}

Notif.defaultProps = {
  duration: ToastAndroid.LONG,
};
