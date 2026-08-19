import { View, StyleSheet } from "react-native";
import { Star, BadgeCheck } from "lucide-react-native";
import Text from "./Text";
import Card from "./Card";
import { colors } from "../../theme/theme";

export default function TestimonialCard({ testimonial, style }) {
  return (
    <Card style={[styles.card, style]}>
      <View style={{ flexDirection: "row" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            color={i < testimonial.rating ? colors.softYellow : colors.navyFaint}
            fill={i < testimonial.rating ? colors.softYellow : "transparent"}
            style={{ marginRight: 2 }}
          />
        ))}
      </View>
      <Text color="rgba(16,35,63,0.75)" style={{ fontSize: 13.5, lineHeight: 20, marginTop: 12, flex: 1 }}>
        "{testimonial.quote}"
      </Text>
      <View style={styles.footer}>
        <View style={styles.avatar}>
          <Text weight="extrabold" style={{ fontSize: 14 }}>{testimonial.name.charAt(0)}</Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text weight="bold" style={{ fontSize: 13 }}>{testimonial.name}</Text>
            {testimonial.verified && <BadgeCheck size={13} color={colors.limeDark} style={{ marginLeft: 4 }} />}
          </View>
          <Text color="rgba(16,35,63,0.5)" style={{ fontSize: 11.5 }}>{testimonial.city} · Verified</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 18, width: 260 },
  footer: { flexDirection: "row", alignItems: "center", marginTop: 16 },
  avatar: {
    width: 36, height: 36, borderRadius: 999, backgroundColor: colors.lightGreen,
    alignItems: "center", justifyContent: "center",
  },
});
