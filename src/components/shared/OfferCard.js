import { View, StyleSheet } from "react-native";
import { Ticket, Copy } from "lucide-react-native";
import Text from "./Text";
import Card from "./Card";
import Badge from "./Badge";
import { colors } from "../../theme/theme";

const TONES = {
  "first-order": "lime",
  delivery: "light",
  referral: "yellow",
  express: "navy",
  membership: "light",
  seasonal: "yellow",
};

export default function OfferCard({ offer, style }) {
  return (
    <Card style={[styles.card, style]}>
      <View style={styles.top}>
        <View style={styles.iconWrap}>
          <Ticket size={18} color={colors.navy} />
        </View>
        <Badge tone={TONES[offer.kind] || "lime"}>{offer.expiry}</Badge>
      </View>
      <Text weight="extrabold" style={{ fontSize: 16, marginTop: 12 }}>{offer.title}</Text>
      <Text color="rgba(16,35,63,0.6)" style={{ fontSize: 13, marginTop: 6, lineHeight: 19 }}>
        {offer.description}
      </Text>
      <View style={styles.codeRow}>
        <Text weight="bold" style={{ fontSize: 13, letterSpacing: 1 }}>{offer.code}</Text>
        <Copy size={15} color="rgba(16,35,63,0.4)" />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 18 },
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  iconWrap: {
    width: 40, height: 40, borderRadius: 14,
    backgroundColor: colors.lightGreen, alignItems: "center", justifyContent: "center",
  },
  codeRow: {
    marginTop: 16,
    borderWidth: 1.5,
    borderColor: colors.navyFaint,
    borderStyle: "dashed",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
