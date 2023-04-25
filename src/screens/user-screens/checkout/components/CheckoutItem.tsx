import { StyleSheet, Text, View } from "react-native";
import { global } from "../../../../constants/global";
import { colors } from "../../../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const CheckoutItem = (props: { item: any; onRemovePress: Function }) => {
  const { item, onRemovePress } = props;

  const handlePress = () => {
    onRemovePress();
  };

  return (
    <View style={global.styles.container}>
      <View style={styles.item}>
        <Text style={styles.bigFont}>Subtotal </Text>
        <Text style={styles.bigFont}>KES {item.productPrice}</Text>
      </View>
      <Text style={styles.textTitle}>{item.productTitle}</Text>
      <Text style={styles.text}>{item.productDescription}</Text>

      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            ...styles.touch,
            backgroundColor: `${colors.error}22`,
          }}
          onPress={handlePress}
        >
          <Ionicons name="trash" size={28} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutItem;

const styles = StyleSheet.create({
  bigFont: {
    color: "grey",
    marginVertical: 10,
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  textTitle: {
    fontSize: 22,
    fontFamily: "Poppins_600SemiBold",
  },
  touch: {
    width: 50,
    padding: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 15,
  },
});
