import { View, StyleSheet, Pressable, Linking } from "react-native";
import { Star, Clock, MapPin, Navigation } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import Text from "./Text";
import Card from "./Card";
import Badge from "./Badge";
import { colors } from "../../theme/theme";

export default function StoreCard({ store }) {
  const navigation = useNavigation();

  return (
    <Card style={styles.card}>
      <View style={styles.top}>
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text weight="extrabold" style={{ fontSize: 15 }}>{store.name}</Text>
          <View style={styles.addrRow}>
            <MapPin size={14} color="rgba(16,35,63,0.4)" style={{ marginTop: 2 }} />
            <Text color="rgba(16,35,63,0.55)" style={{ fontSize: 12.5, marginLeft: 5, flex: 1, lineHeight: 17 }}>
              {store.address}
            </Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <Star size={14} color={colors.softYellow} fill={colors.softYellow} />
          <Text weight="bold" style={{ fontSize: 13, marginLeft: 3 }}>{store.rating}</Text>
        </View>
      </View>

      <View style={styles.hoursRow}>
        <Clock size={13} color="rgba(16,35,63,0.5)" />
        <Text color="rgba(16,35,63,0.55)" style={{ fontSize: 12.5, marginLeft: 5 }}>{store.hoursLabel}</Text>
      </View>

      <View style={styles.badgeRow}>
        {store.services.map((s) => (
          <Badge key={s} tone="light" style={{ marginRight: 6, marginBottom: 6 }}>{s}</Badge>
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={() => navigation.navigate("StoreDetail", { slug: store.slug })}
          style={styles.viewBtn}
        >
          <Text weight="bold" color={colors.white} style={{ fontSize: 13 }}>View Store</Text>
        </Pressable>
        <Pressable
          onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}`)}
          style={styles.dirBtn}
        >
          <Navigation size={16} color={colors.navy} />
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16 },
  top: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  addrRow: { flexDirection: "row", marginTop: 6 },
  ratingRow: { flexDirection: "row", alignItems: "center" },
  hoursRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  badgeRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  actions: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 10 },
  viewBtn: {
    flex: 1, backgroundColor: colors.navy, borderRadius: 999,
    paddingVertical: 11, alignItems: "center",
  },
  dirBtn: {
    width: 42, height: 42, borderRadius: 999, borderWidth: 2, borderColor: colors.navyFaint,
    alignItems: "center", justifyContent: "center",
  },
});
