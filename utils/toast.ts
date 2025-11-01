import { ToastAndroid, Platform, Alert } from "react-native";

type ToastDuration = "short" | "long";

const showToastAndroid = (
  message: string,
  duration: ToastDuration = "short"
) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(
      message,
      duration === "short" ? ToastAndroid.SHORT : ToastAndroid.LONG
    );
  } else {
    Alert.alert("", message);
  }
};

export const showToast = {
  success: (message: string, duration: ToastDuration = "short") => {
    showToastAndroid(message, duration);
  },

  error: (message: string, duration: ToastDuration = "long") => {
    showToastAndroid(message, duration);
  },

  info: (message: string, duration: ToastDuration = "short") => {
    showToastAndroid(message, duration);
  },

  warning: (message: string, duration: ToastDuration = "short") => {
    showToastAndroid(message, duration);
  },
};
