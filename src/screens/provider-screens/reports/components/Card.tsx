import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../constants/colors";

const Card = (props: {
  title: string;
  description: string,
  data: string | number,
  color?: string;
  customStyle?: object;
}) => {
  const { title, description, color, data, customStyle } = props;

  return (
    <View
      style={{
        ...styles.card,
        backgroundColor: color ? `${color}22` : colors.highlight,
        ...customStyle,
      }}
    >
      <Text style={styles.textTitle}>{title}</Text>
      <Text style={styles.orderHighlight}> {data}</Text>
      <Text style={styles.text}>{description}</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 10
  },
  textTitle: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
  },
  orderHighlight: {
    fontSize: 28,
    fontFamily: "Poppins_600SemiBold",
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    marginVertical: 5,
  },
});
