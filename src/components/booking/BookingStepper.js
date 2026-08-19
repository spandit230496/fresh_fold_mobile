import { View, StyleSheet } from "react-native";
import { Check } from "lucide-react-native";
import Text from "../shared/Text";
import { colors } from "../../theme/theme";

const steps = ["Details", "Address", "Services", "Pickup", "Review"];

export default function BookingStepper({ current }) {
  return (
    <View style={styles.row}>
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const done = stepNum < current;
        const active = stepNum === current;
        return (
          <View key={label} style={styles.stepWrap}>
            <View
              style={[
                styles.dot,
                done && { backgroundColor: colors.lime },
                active && { backgroundColor: colors.navy },
                !done && !active && { backgroundColor: colors.lightGray },
              ]}
            >
              {done ? (
                <Check size={13} color={colors.navy} strokeWidth={3} />
              ) : (
                <Text weight="extrabold" color={active ? colors.white : "rgba(16,35,63,0.4)"} style={{ fontSize: 12 }}>
                  {stepNum}
                </Text>
              )}
            </View>
            {stepNum < steps.length && (
              <View style={[styles.line, { backgroundColor: done ? colors.lime : colors.lightGray }]} />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  stepWrap: { flexDirection: "row", alignItems: "center", flex: 1 },
  dot: { width: 30, height: 30, borderRadius: 999, alignItems: "center", justifyContent: "center" },
  line: { height: 2, flex: 1, marginHorizontal: 4 },
});
