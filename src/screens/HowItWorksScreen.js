import { View, StyleSheet } from "react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Artwork from "../components/shared/Artwork";
import CTASection from "../components/shared/CTASection";
import { colors } from "../theme/theme";

const steps = [
  { n: "01", title: "Schedule", icon: "home", description: "Pick a service, choose a pickup slot, and confirm your address.", palette: "lime" },
  { n: "02", title: "Pickup", icon: "package", description: "A FreshFold executive collects your garments from your doorstep.", palette: "navy" },
  { n: "03", title: "Inspection", icon: "sparkles", description: "Every item is checked for fabric type and care instructions.", palette: "yellow" },
  { n: "04", title: "Cleaning", icon: "droplets", description: "Garments are cleaned using the fabric-appropriate method.", palette: "gray" },
  { n: "05", title: "Quality Check", icon: "shirt", description: "A final inspection confirms cleanliness and finish.", palette: "lime" },
  { n: "06", title: "Packing", icon: "package", description: "Items are folded, hung or boxed, ready for transit.", palette: "navy" },
  { n: "07", title: "Delivery", icon: "wind", description: "Your order arrives back at your doorstep, ready to wear.", palette: "yellow" },
];

export default function HowItWorksScreen() {
  return (
    <Screen scroll={false}>
      <ScreenHeader title="How It Works" />
      <Screen contentStyle={{ padding: 20 }}>
        <View style={{ gap: 28 }}>
          {steps.map((s) => (
            <View key={s.n}>
              <Artwork icon={s.icon} palette={s.palette} height={130} />
              <Text weight="extrabold" color={colors.limeDark} style={{ fontSize: 12, marginTop: 12 }}>{s.n}</Text>
              <Text weight="extrabold" style={{ fontSize: 18, marginTop: 2 }}>{s.title}</Text>
              <Text color="rgba(16,35,63,0.6)" style={{ fontSize: 13.5, marginTop: 4, lineHeight: 19 }}>{s.description}</Text>
            </View>
          ))}
        </View>
        <View style={{ marginTop: 30 }}>
          <CTASection title="Ready to Experience It?" description="Your first pickup is 20% off." />
        </View>
      </Screen>
    </Screen>
  );
}
