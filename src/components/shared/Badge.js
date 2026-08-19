import { View, StyleSheet } from "react-native";
import Text from "./Text";
import { colors } from "../../theme/theme";

const TONES = {
  lime: { bg: colors.lime, fg: colors.navy },
  navy: { bg: colors.navy, fg: colors.white },
  light: { bg: colors.lightGreen, fg: colors.navy },
  yellow: { bg: colors.softYellow, fg: colors.navy },
  white: { bg: colors.white, fg: colors.navy },
};

export default function Badge({ children, tone = "lime", style }) {
  const t = TONES[tone];
  return (
    <View style={[styles.badge, { backgroundColor: t.bg }, style]}>
      <Text weight="bold" color={t.fg} style={styles.text}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  text: {
    fontSize: 11,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
});
