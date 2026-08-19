import { View, StyleSheet } from "react-native";
import { Phone } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import Text from "./Text";
import Button from "./Button";
import { colors, radius } from "../../theme/theme";

export default function CTASection({
  title = "Ready for Fresh Clothes?",
  description = "Book your first pickup today.",
  primaryLabel = "Schedule Pickup",
  primaryScreen = "Book",
  secondaryLabel = "Talk to Us",
  secondaryScreen = "Contact",
  style,
}) {
  const navigation = useNavigation();

  return (
    <View style={[styles.wrap, style]}>
      <Text weight="extrabold" style={styles.title}>{title}</Text>
      <Text color="rgba(16,35,63,0.7)" style={{ fontSize: 14, marginTop: 8, textAlign: "center" }}>
        {description}
      </Text>
      <View style={styles.actions}>
        <Button variant="dark" onPress={() => navigation.navigate(primaryScreen)}>
          {primaryLabel}
        </Button>
        <Button variant="outline" icon={Phone} onPress={() => navigation.navigate(secondaryScreen)}>
          {secondaryLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.lime,
    borderRadius: radius.cardLg,
    padding: 28,
    alignItems: "center",
  },
  title: { fontSize: 24, textAlign: "center", lineHeight: 30 },
  actions: { flexDirection: "row", gap: 12, marginTop: 20 },
});
