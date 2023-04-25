import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../../constants/colors";
import { global } from "../../../../constants/global";
import { Ionicons } from "@expo/vector-icons";
import RenderItem from "./RenderItem";
import { Linking } from "react-native";

const OrderItem = (props: { item: any; onPress: Function }) => {
  const { item, onPress } = props;

  const orderContents = item.orderItems;

  return (
    <View style={global.styles.container}>
      <View>
        <Text style={styles.bigFont}>{item.customerName} </Text>
        <Text style={{ fontSize: 18 }}>{item.orderDetails}</Text>
        <TouchableOpacity
          style={{
            ...styles.touch,
            backgroundColor: `${colors.highlight}`,
          }}
          onPress={() => {
            Linking.openURL(`tel:${item.customerContact}`);
          }}
        >
          <Ionicons name="call" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <Text style={styles.bigFont}>Order total </Text>
        <Text style={styles.bigFont}>KES {item.orderTotal}</Text>
      </View>

      {orderContents.map((item: any, index: number) => {
        return (
          <RenderItem
            key={index}
            item={item}
            onStatusChange={(itemIndex: number, newStatus: string) => {
              onPress(itemIndex, newStatus)
            }}
          />
        );
      })}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  bigFont: {
    color: "grey",
    marginVertical: 10,
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  touch: {
    width: 50,
    padding: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 15,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
