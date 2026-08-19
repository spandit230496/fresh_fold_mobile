import { Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import { colors, radius } from "../../theme/theme";

const VARIANTS = {
  primary: { bg: colors.lime, fg: colors.navy },
  dark: { bg: colors.navy, fg: colors.white },
  outline: { bg: colors.white, fg: colors.navy, border: colors.navyFaint },
  ghost: { bg: "transparent", fg: colors.navy },
};

const SIZES = {
  sm: { paddingVertical: 10, paddingHorizontal: 16, fontSize: 13 },
  md: { paddingVertical: 13, paddingHorizontal: 22, fontSize: 14 },
  lg: { paddingVertical: 16, paddingHorizontal: 28, fontSize: 15 },
};

export default function Button({
  children,
  onPress,
  variant = "primary",
  size = "md",
  icon: Icon,
  style,
  fullWidth,
  disabled,
}) {
  const v = VARIANTS[variant];
  const s = SIZES[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: v.bg,
          paddingVertical: s.paddingVertical,
          paddingHorizontal: s.paddingHorizontal,
          borderWidth: v.border ? 2 : 0,
          borderColor: v.border,
          opacity: pressed ? 0.85 : disabled ? 0.5 : 1,
          alignSelf: fullWidth ? "stretch" : "flex-start",
        },
        style,
      ]}
    >
      <View style={styles.row}>
        <Text weight="bold" color={v.fg} style={{ fontSize: s.fontSize }}>
          {children}
        </Text>
        {Icon && <Icon size={16} color={v.fg} strokeWidth={2.5} style={{ marginLeft: 8 }} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.btn,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
