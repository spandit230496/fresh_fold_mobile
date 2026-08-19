import { View, StyleSheet } from "react-native";
import { colors, radius, shadow } from "../../theme/theme";

export default function Card({ children, style, elevated = false }) {
  return (
    <View
      style={[
        styles.card,
        elevated ? shadow.sm : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.cardLg,
    borderWidth: 1,
    borderColor: colors.navyFaint,
  },
});
