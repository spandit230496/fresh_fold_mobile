import { View, TextInput, StyleSheet } from "react-native";
import Text from "./Text";
import { colors, radius } from "../../theme/theme";

export default function FormField({ label, value, onChangeText, placeholder, keyboardType, multiline, style }) {
  return (
    <View style={style}>
      <Text weight="bold" color="rgba(16,35,63,0.45)" style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(16,35,63,0.35)"
        keyboardType={keyboardType}
        multiline={multiline}
        style={[
          styles.input,
          { fontFamily: "NunitoSans_600SemiBold" },
          multiline && { height: 100, textAlignVertical: "top", paddingTop: 12 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 11, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 6 },
  input: {
    backgroundColor: colors.lightGray,
    borderRadius: radius.input,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 14,
    color: colors.navy,
  },
});
