import { View } from "react-native";
import Text from "./Text";
import Badge from "./Badge";
import { colors } from "../../theme/theme";

export default function SectionHeading({ eyebrow, title, highlight, description, style }) {
  return (
    <View style={style}>
      {eyebrow && <Badge tone="light" style={{ marginBottom: 12 }}>{eyebrow}</Badge>}
      <Text weight="extrabold" style={{ fontSize: 26, lineHeight: 32 }}>
        {title}
        {highlight ? <Text weight="extrabold" color={colors.lime} style={{ fontSize: 26 }}> {highlight}</Text> : null}
      </Text>
      {description && (
        <Text color="rgba(16,35,63,0.6)" style={{ fontSize: 15, lineHeight: 22, marginTop: 8 }}>
          {description}
        </Text>
      )}
    </View>
  );
}
