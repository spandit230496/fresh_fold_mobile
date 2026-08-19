import { View, StyleSheet } from "react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import OfferCard from "../components/shared/OfferCard";
import { offers } from "../data/offers";

export default function OffersScreen() {
  return (
    <Screen scroll={false}>
      <ScreenHeader title="Offers" />
      <Screen contentStyle={{ padding: 20 }}>
        <View style={{ gap: 14 }}>
          {offers.map((o) => (
            <OfferCard key={o.code} offer={o} />
          ))}
        </View>
      </Screen>
    </Screen>
  );
}
