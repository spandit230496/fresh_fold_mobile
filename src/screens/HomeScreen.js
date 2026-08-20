import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Check, ArrowRight, Truck, ShieldCheck, Bell, User, Sparkles } from "lucide-react-native";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Badge from "../components/shared/Badge";
import Button from "../components/shared/Button";
import Artwork from "../components/shared/Artwork";
import Logo from "../components/shared/Logo";
import SectionHeading from "../components/shared/SectionHeading";
import ServiceCard from "../components/shared/ServiceCard";
import OfferCard from "../components/shared/OfferCard";
import TestimonialCard from "../components/shared/TestimonialCard";
import CTASection from "../components/shared/CTASection";
import { services } from "../data/services";
import { offers } from "../data/offers";
import { testimonials } from "../data/testimonials";
import { colors, radius } from "../theme/theme";

const points = ["Doorstep Pickup", "Expert Fabric Care", "Quality Checked"];
const stats = [
  { value: "500+", label: "Cities Served" },
  { value: "1M+", label: "Happy Customers" },
  { value: "10M+", label: "Garments Cared For" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <Screen style={{ backgroundColor: colors.lightGray }}>
      {/* Top Header Bar */}
      <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
        <Logo />
        <View style={styles.headerActions}>
          <Pressable
            onPress={() => navigation.navigate("Notifications")}
            style={styles.headerIconBtn}
          >
            <Bell size={20} color={colors.navy} />
            <View style={styles.unreadDot} />
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Profile")}
            style={styles.avatarBtn}
          >
            <Text weight="extrabold" color={colors.navy} style={{ fontSize: 13 }}>AS</Text>
          </Pressable>
        </View>
      </View>

      {/* Active Order Quick Tracker Card */}
      <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
        <Pressable
          onPress={() => navigation.navigate("OrderDetail", { orderId: "FF-482910" })}
          style={styles.activeOrderBanner}
        >
          <View style={styles.activeOrderIconWrap}>
            <Truck size={16} color={colors.navy} />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text weight="bold" style={{ fontSize: 12.5 }}>Order #FF-482910 is Processing</Text>
            <Text color={colors.navyMuted} style={{ fontSize: 11 }}>Expected Delivery: 22 Aug, 8:00 PM</Text>
          </View>
          <Text weight="extrabold" color={colors.limeDark} style={{ fontSize: 12 }}>Track →</Text>
        </Pressable>
      </View>

      {/* Hero */}
      <View style={styles.hero}>
        <Badge tone="light">Professional Garment Care</Badge>
        <Text weight="extrabold" style={styles.h1}>
          Fresh Clothes.{"\n"}
          <Text weight="extrabold" color={colors.lime} style={styles.h1}>More Time</Text> for You.
        </Text>
        <Text color="rgba(16,35,63,0.65)" style={styles.heroDesc}>
          Premium laundry and garment care with convenient doorstep pickup and delivery.
        </Text>

        <View style={{ marginTop: 20 }}>
          <Artwork icon="smile" palette="lime" height={220} badge="20% OFF · First Order" />
        </View>

        <View style={styles.heroBtns}>
          <Button size="lg" icon={ArrowRight} onPress={() => navigation.navigate("Book")} fullWidth>
            Schedule Pickup
          </Button>
          <Button size="lg" variant="outline" onPress={() => navigation.navigate("Services")} fullWidth>
            Explore Services
          </Button>
        </View>

        <View style={styles.pointsRow}>
          {points.map((p) => (
            <View key={p} style={styles.pointItem}>
              <View style={styles.pointCheck}>
                <Check size={11} color={colors.navy} strokeWidth={3} />
              </View>
              <Text weight="semibold" color="rgba(16,35,63,0.75)" style={{ fontSize: 12.5, marginLeft: 6 }}>
                {p}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={[styles.section, { backgroundColor: colors.white }]}>
        <View style={styles.statsGrid}>
          {stats.map((s) => (
            <View key={s.label} style={styles.statItem}>
              <Text weight="extrabold" style={{ fontSize: 26 }}>{s.value}</Text>
              <Text weight="semibold" color="rgba(16,35,63,0.55)" style={{ fontSize: 11.5, marginTop: 4, textAlign: "center" }}>
                {s.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Services */}
      <View style={styles.section}>
        <SectionHeading eyebrow="What We Do" title="Everything Your Wardrobe" highlight="Needs" style={{ marginBottom: 18 }} />
        <View style={styles.serviceGrid}>
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} width="48%" />
          ))}
        </View>
      </View>

      {/* Featured */}
      <View style={[styles.section, { backgroundColor: colors.white }]}>
        <Artwork icon="sparkles" palette="navy" height={180} />
        <Badge tone="light" style={{ marginTop: 20 }}>The FreshFold Difference</Badge>
        <Text weight="extrabold" style={{ fontSize: 22, marginTop: 10, lineHeight: 28 }}>
          Professional Care.{"\n"}Beautiful Results.
        </Text>
        <View style={{ marginTop: 14, gap: 10 }}>
          {["Fabric-specific cleaning", "Advanced stain treatment", "Professional finishing"].map((f) => (
            <View key={f} style={styles.pointItem}>
              <View style={styles.pointCheck}>
                <Check size={11} color={colors.navy} strokeWidth={3} />
              </View>
              <Text weight="medium" color="rgba(16,35,63,0.75)" style={{ fontSize: 13.5, marginLeft: 8 }}>{f}</Text>
            </View>
          ))}
        </View>
        <Button style={{ marginTop: 18 }} onPress={() => navigation.navigate("HowItWorks")}>
          Discover Our Process
        </Button>
      </View>

      {/* Offers */}
      <View style={styles.section}>
        <SectionHeading eyebrow="Offers" title="Savings That Feel" highlight="Good" style={{ marginBottom: 18 }} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
          {offers.slice(0, 4).map((o) => (
            <OfferCard key={o.code} offer={o} style={{ width: 240 }} />
          ))}
        </ScrollView>
        <Pressable onPress={() => navigation.navigate("Offers")} style={styles.linkBtn}>
          <Text weight="bold" color={colors.limeDark} style={{ fontSize: 13.5 }}>See All Offers →</Text>
        </Pressable>
      </View>

      {/* Testimonials */}
      <View style={[styles.section, { backgroundColor: colors.white }]}>
        <SectionHeading eyebrow="Testimonials" title="Loved by" highlight="Customers" style={{ marginBottom: 18 }} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </ScrollView>
      </View>

      {/* CTA */}
      <View style={styles.section}>
        <CTASection />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  unreadDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.limeDark,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  avatarBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },
  activeOrderBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.navyFaint,
    marginTop: 4,
  },
  activeOrderIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.lightGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  hero: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 },
  h1: { fontSize: 34, lineHeight: 40, marginTop: 16 },
  heroDesc: { fontSize: 15, lineHeight: 22, marginTop: 14 },
  heroBtns: { marginTop: 22, gap: 12 },
  pointsRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 18, gap: 14 },
  pointItem: { flexDirection: "row", alignItems: "center" },
  pointCheck: {
    width: 18, height: 18, borderRadius: 999, backgroundColor: colors.lime,
    alignItems: "center", justifyContent: "center",
  },
  section: { paddingHorizontal: 20, paddingVertical: 28 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap" },
  statItem: { width: "50%", alignItems: "center", marginBottom: 20 },
  serviceGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 14 },
  linkBtn: { marginTop: 14 },
});
