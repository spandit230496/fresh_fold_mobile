import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Badge from "../components/shared/Badge";
import ServiceCard from "../components/shared/ServiceCard";
import { services } from "../data/services";
import { colors } from "../theme/theme";

export default function ServicesScreen() {
  const insets = useSafeAreaInsets();
  return (
    <Screen>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Badge tone="light">Our Services</Badge>
        <Text weight="extrabold" style={{ fontSize: 26, marginTop: 12, lineHeight: 32 }}>
          Complete Garment Care,{"\n"}
          <Text weight="extrabold" color={colors.lime} style={{ fontSize: 26 }}>All in One Place</Text>
        </Text>
      </View>
      <View style={styles.grid}>
        {services.map((s, i) => (
          <ServiceCard key={s.slug} service={s} index={i} width="48%" />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingBottom: 20, backgroundColor: colors.lightGray },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 24, rowGap: 14 },
});
