import { Text as RNText } from "react-native";
import { colors, typography } from "../../theme/theme";

const WEIGHT_MAP = {
  regular: typography.fontFamily.regular,
  medium: typography.fontFamily.medium,
  semibold: typography.fontFamily.semibold,
  bold: typography.fontFamily.bold,
  extrabold: typography.fontFamily.extrabold,
};

export default function Text({ weight = "regular", color = colors.navy, style, children, ...props }) {
  return (
    <RNText
      style={[{ fontFamily: WEIGHT_MAP[weight], color }, style]}
      {...props}
    >
      {children}
    </RNText>
  );
}
