import { View, StyleSheet, Linking } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Star, Clock, MapPin, Phone, Navigation as NavIcon } from "lucide-react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Badge from "../components/shared/Badge";
import Button from "../components/shared/Button";
import Artwork from "../components/shared/Artwork";
import { getStoreBySlug } from "../data/stores";
import { colors } from "../theme/theme";

export default function StoreDetailScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const store = getStoreBySlug(params.slug);
  if (!store) return null;

  return (
    <Screen scroll={false}>
      <ScreenHeader title={store.name} />
      <Screen contentStyle={{ padding: 20 }}>
        <Artwork icon="sofa" palette="lime" height={140} />
        <View style={styles.ratingRow}>
          <Star size={15} color={colors.softYellow} fill={colors.softYellow} />
          <Text weight="bold" style={{ fontSize: 14, marginLeft: 5 }}>{store.rating}</Text>
          <Text color="rgba(16,35,63,0.4)" style={{ fontSize: 12.5, marginLeft: 4 }}>({store.reviews} reviews)</Text>
        </View>

        <View style={{ marginTop: 18, gap: 12 }}>
          <View style={styles.infoRow}>
            <MapPin size={16} color="rgba(16,35,63,0.5)" />
            <Text color="rgba(16,35,63,0.7)" style={{ fontSize: 13.5, marginLeft: 8, flex: 1, lineHeight: 19 }}>{store.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Clock size={16} color="rgba(16,35,63,0.5)" />
            <Text color="rgba(16,35,63,0.7)" style={{ fontSize: 13.5, marginLeft: 8 }}>{store.hours}</Text>
          </View>
          <View style={styles.infoRow}>
            <Phone size={16} color="rgba(16,35,63,0.5)" />
            <Text color="rgba(16,35,63,0.7)" style={{ fontSize: 13.5, marginLeft: 8 }}>{store.phone}</Text>
          </View>
        </View>

        <View style={styles.badgeRow}>
          {store.services.map((s) => (
            <Badge key={s} tone="light" style={{ marginRight: 6, marginBottom: 6 }}>{s}</Badge>
          ))}
        </View>

        <View style={{ gap: 12, marginTop: 22 }}>
          <Button fullWidth onPress={() => navigation.navigate("Book")}>Schedule Pickup</Button>
          <Button
            fullWidth
            variant="outline"
            icon={NavIcon}
            onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}`)}
          >
            Directions
          </Button>
        </View>
      </Screen>
    </Screen>
  );
}

const styles = StyleSheet.create({
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 16 },
  infoRow: { flexDirection: "row", alignItems: "flex-start" },
  badgeRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 16 },
});
