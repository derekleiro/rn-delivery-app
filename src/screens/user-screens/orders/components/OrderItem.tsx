import { StyleSheet, Text, View } from "react-native";
import { global } from "../../../../constants/global";
import { colors } from "../../../../constants/colors";
import waterTruckImg from "../../../../assets/imgs/water-truck.png";
import waterBottleImg from "../../../../assets/imgs/water-bottle.png";
import water20lBottleImg from "../../../../assets/imgs/water-bottle-20l.png";

const OrderItem = (props: { item: any; onPress: Function }) => {
  const { item, onPress } = props;

  const orderContents = JSON.parse(item.orderItems);
  const totalOrderPrice = orderContents.reduce(
    (total: number, curr: any) => total + curr.productPrice,
    0
  );

  const RenderItem = (i: any) => {
    const item = i.item;
    return (
      <View style={styles.renderItem}>
        <Text style={styles.smallText}>Category: {item.productCategory}</Text>
        <Text style={styles.textTitle}>{item.productTitle}</Text>
        <Text style={styles.text}>{item.productDescription}</Text>
        <Text style={{ color: "grey", fontSize: 22, marginBottom: 10 }}>{item.productPrice}</Text>
        <Text style={styles.status}>{item.orderStatus}</Text>
      </View>
    );
  };

  return (
    <View style={global.styles.container}>
      <View style={styles.item}>
        <Text style={styles.bigFont}>Order Total</Text>
        <Text style={styles.bigFont}>KES {totalOrderPrice}</Text>
      </View>
      <View>
        <Text style={{ fontSize: 18 }}>{item.orderDetails}</Text>
        <Text style={{ color: colors.secondary, fontSize: 16 }}>{item.orderStatus}</Text>
      </View>

      {orderContents.map((item: any, index: number) => {
        return <RenderItem key={index} item={item} />;
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
  renderItem: {
    paddingLeft: "10%",
    marginTop: 25,
  },
  smallText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    marginVertical: 5,
    textTransform: "uppercase",
    color: "grey",
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  status: {
    color: colors.primary
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
