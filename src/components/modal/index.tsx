import { colors } from "../../constants/colors";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

type ModalType = {
  type: "success" | "warning" | "error" | "info";
  messages: string[];
};

const Modal = (props: ModalType) => {
  const { type, messages } = props;
  const setBgColor = (type: string) => {
    switch (type) {
      case "error":
        return colors.error;
      case "warning":
        return colors.warning;
      case "success":
        return colors.success;
      default:
        return colors.info;
    }
  };

  console.log(messages)
  return (
    <View style={{ ...styles.card, backgroundColor: setBgColor(type) }}>
      {messages.map((message, index) => {
        return (
          <Text
            key={index}
            style={{
              color: "black",
              textAlign: "center",
              fontSize: 16,
              marginVertical: messages.length === 1 ? 0 : 10,
            }}
          >
            {message}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  card: {
    alignItems: "center",
    flex: 1,
    width: "100%",
    paddingTop: 75,
    paddingBottom: 20,
    paddingHorizontal: 15,
    position: "absolute",
    zIndex: 9999,
    flexWrap: "wrap",
    flexDirection: "row",
    fontFamily: "Poppins_400Regular",
  },
});

export default Modal;
