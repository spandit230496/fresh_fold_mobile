import { View } from "react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import PricingTable from "../components/shared/PricingTable";

export default function PricingScreen() {
  return (
    <Screen scroll={false}>
      <ScreenHeader title="Pricing" />
      <Screen contentStyle={{ padding: 20 }}>
        <Text color="rgba(16,35,63,0.6)" style={{ fontSize: 13.5, marginBottom: 18 }}>
          No hidden charges. Toggle Regular or Express for exact rates.
        </Text>
        <PricingTable />
      </Screen>
    </Screen>
  );
}
