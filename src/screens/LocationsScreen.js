import { View, StyleSheet } from "react-native";
import { Search } from "lucide-react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import FormField from "../components/shared/FormField";
import StoreCard from "../components/shared/StoreCard";
import { stores } from "../data/stores";
import { colors } from "../theme/theme";

export default function LocationsScreen() {
  return (
    <Screen scroll={false}>
      <ScreenHeader title="Locations" />
      <Screen contentStyle={{ padding: 20 }}>
        <FormField placeholder="Search city, area or PIN code" style={{ marginBottom: 20 }} />
        <View style={{ gap: 14 }}>
          {stores.map((s) => (
            <StoreCard key={s.slug} store={s} />
          ))}
        </View>
      </Screen>
    </Screen>
  );
}
