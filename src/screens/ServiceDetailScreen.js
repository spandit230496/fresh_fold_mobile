import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowRight, Check } from "lucide-react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Badge from "../components/shared/Badge";
import Artwork from "../components/shared/Artwork";
import Button from "../components/shared/Button";
import PricingTable from "../components/shared/PricingTable";
import { getServiceBySlug } from "../data/services";
import { colors } from "../theme/theme";

const PRICING_MAP = {
  laundry: "laundry",
  "dry-cleaning": "dry-cleaning",
  "shoe-care": "shoes",
  "leather-care": "leather",
  "home-fabric-care": "home-care",
  "steam-ironing": "laundry",
};

export default function ServiceDetailScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const service = getServiceBySlug(params.slug);

  if (!service) return null;

  return (
    <Screen scroll={false}>
      <ScreenHeader title={service.title} />
      <Screen>
        <View style={styles.wrap}>
          <Artwork icon={service.icon.toLowerCase()} palette="lime" height={180} />
          <Text weight="extrabold" style={{ fontSize: 24, marginTop: 18 }}>{service.title}</Text>
          <Text color="rgba(16,35,63,0.6)" style={{ fontSize: 14, lineHeight: 21, marginTop: 8 }}>
            {service.description}
          </Text>

          <View style={{ marginTop: 18, gap: 10 }}>
            {service.features.map((f) => (
              <View key={f} style={styles.pointItem}>
                <View style={styles.pointCheck}>
                  <Check size={11} color={colors.navy} strokeWidth={3} />
                </View>
                <Text weight="medium" color="rgba(16,35,63,0.75)" style={{ fontSize: 13.5, marginLeft: 8 }}>{f}</Text>
              </View>
            ))}
          </View>

          <Text weight="extrabold" style={{ fontSize: 18, marginTop: 28, marginBottom: 14 }}>Pricing</Text>
          <PricingTable defaultCategory={PRICING_MAP[service.slug] || "laundry"} />

          <Button
            size="lg"
            icon={ArrowRight}
            style={{ marginTop: 24 }}
            fullWidth
            onPress={() => navigation.navigate("Book")}
          >
            Schedule Pickup
          </Button>
        </View>
      </Screen>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 20, paddingTop: 20 },
  pointItem: { flexDirection: "row", alignItems: "center" },
  pointCheck: {
    width: 18, height: 18, borderRadius: 999, backgroundColor: colors.lime,
    alignItems: "center", justifyContent: "center",
  },
});
