import { View, StyleSheet } from "react-native";
import { TrendingUp, HandCoins, Users, Award } from "lucide-react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import FormField from "../components/shared/FormField";
import Button from "../components/shared/Button";
import { colors } from "../theme/theme";

const benefits = [
  { icon: TrendingUp, title: "Proven Demand", description: "A recurring, non-seasonal need in every city." },
  { icon: HandCoins, title: "Structured Investment", description: "Transparent setup costs, clear breakeven path." },
  { icon: Users, title: "Operational Support", description: "Training and ongoing operational playbooks." },
  { icon: Award, title: "Trusted Brand", description: "Launch under a brand customers recognise." },
];

export default function FranchiseScreen() {
  return (
    <Screen scroll={false}>
      <ScreenHeader title="Franchise" />
      <Screen contentStyle={{ padding: 20 }}>
        <Text weight="extrabold" style={{ fontSize: 22, lineHeight: 28 }}>
          Build a Business That{"\n"}
          <Text weight="extrabold" color={colors.lime} style={{ fontSize: 22 }}>Keeps People Moving.</Text>
        </Text>

        <View style={styles.grid}>
          {benefits.map((b) => (
            <View key={b.title} style={styles.card}>
              <View style={styles.iconWrap}>
                <b.icon size={16} color={colors.navy} />
              </View>
              <Text weight="extrabold" style={{ fontSize: 12.5, marginTop: 8 }}>{b.title}</Text>
              <Text color="rgba(16,35,63,0.55)" style={{ fontSize: 11, marginTop: 3, lineHeight: 15 }}>{b.description}</Text>
            </View>
          ))}
        </View>

        <Text weight="extrabold" style={{ fontSize: 16, marginTop: 24, marginBottom: 14 }}>Franchise Enquiry</Text>
        <View style={{ gap: 14 }}>
          <FormField label="Name" placeholder="Your name" />
          <FormField label="Phone" placeholder="Mobile number" keyboardType="phone-pad" />
          <FormField label="City" placeholder="City" />
          <FormField label="Investment Range" placeholder="e.g. ₹10L – ₹20L" />
          <FormField label="Message" placeholder="Tell us about your interest" multiline />
        </View>
        <Button fullWidth style={{ marginTop: 18 }}>Submit Enquiry</Button>
      </Screen>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 12, marginTop: 20 },
  card: { width: "48%", borderWidth: 1, borderColor: colors.navyFaint, borderRadius: 18, padding: 14 },
  iconWrap: {
    width: 32, height: 32, borderRadius: 11, backgroundColor: colors.lightGreen,
    alignItems: "center", justifyContent: "center",
  },
});
