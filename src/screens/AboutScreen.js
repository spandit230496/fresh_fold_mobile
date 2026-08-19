import { View, StyleSheet } from "react-native";
import { Heart, Target, Leaf, Users } from "lucide-react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Badge from "../components/shared/Badge";
import Artwork from "../components/shared/Artwork";
import CTASection from "../components/shared/CTASection";
import { colors } from "../theme/theme";

const values = [
  { icon: Heart, title: "Care First", description: "Every garment is treated like it's our own." },
  { icon: Target, title: "Precision", description: "Fabric-specific processes, no shortcuts." },
  { icon: Leaf, title: "Responsible", description: "Water-conscious methods and safer detergents." },
  { icon: Users, title: "People-Powered", description: "Trained specialists behind every order." },
];

export default function AboutScreen() {
  return (
    <Screen scroll={false}>
      <ScreenHeader title="About Us" />
      <Screen contentStyle={{ padding: 20 }}>
        <Badge tone="light">About FreshFold</Badge>
        <Text weight="extrabold" style={{ fontSize: 24, marginTop: 12, lineHeight: 30 }}>
          Care That Goes{"\n"}
          <Text weight="extrabold" color={colors.lime} style={{ fontSize: 24 }}>Beyond Cleaning.</Text>
        </Text>

        <Artwork icon="home" palette="lime" height={160} style={{ marginTop: 22 }} />

        <Text weight="extrabold" style={{ fontSize: 17, marginTop: 22 }}>Our Story</Text>
        <Text color="rgba(16,35,63,0.65)" style={{ fontSize: 13.5, lineHeight: 20, marginTop: 8 }}>
          FreshFold started with a simple observation: laundry day shouldn't cost anyone their
          weekend. We set out to build a garment-care service that combines the reliability of a
          neighbourhood dry cleaner with the convenience modern life actually needs.
        </Text>

        <Text weight="extrabold" style={{ fontSize: 17, marginTop: 22, marginBottom: 14 }}>Our Values</Text>
        <View style={styles.grid}>
          {values.map((v) => (
            <View key={v.title} style={styles.valueCard}>
              <View style={styles.iconWrap}>
                <v.icon size={17} color={colors.navy} />
              </View>
              <Text weight="extrabold" style={{ fontSize: 13, marginTop: 10 }}>{v.title}</Text>
              <Text color="rgba(16,35,63,0.55)" style={{ fontSize: 11.5, marginTop: 3, lineHeight: 16 }}>{v.description}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 26 }}>
          <CTASection />
        </View>
      </Screen>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 14 },
  valueCard: {
    width: "48%", borderWidth: 1, borderColor: colors.navyFaint, borderRadius: 20, padding: 14,
  },
  iconWrap: {
    width: 34, height: 34, borderRadius: 12, backgroundColor: colors.lightGreen,
    alignItems: "center", justifyContent: "center",
  },
});
