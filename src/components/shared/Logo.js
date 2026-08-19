import { View, StyleSheet } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import Text from "./Text";
import { colors } from "../../theme/theme";

export default function Logo({ dark = false, size = 30 }) {
  return (
    <View style={styles.row}>
      <Svg width={size} height={size} viewBox="0 0 34 34">
        <Circle cx="17" cy="17" r="17" fill={colors.lime} />
        <Path
          d="M17 6c-.4 3.4-4.5 6.7-4.5 11.2A4.5 4.5 0 0 0 17 21.7a4.5 4.5 0 0 0 4.5-4.5C21.5 12.7 17.4 9.4 17 6Z"
          fill={colors.navy}
        />
        <Circle cx="17" cy="16.5" r="1.6" fill={colors.lightGreen} />
      </Svg>
      <Text weight="extrabold" color={dark ? colors.white : colors.navy} style={{ fontSize: 19, marginLeft: 8 }}>
        FreshFold
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
});
