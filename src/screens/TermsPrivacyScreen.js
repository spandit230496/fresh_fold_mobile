import { useState } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ShieldCheck, FileText, HeartHandshake, CheckCircle } from "lucide-react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import { colors, radius } from "../theme/theme";

export default function TermsPrivacyScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [tab, setTab] = useState("terms"); // terms | privacy | care

  return (
    <Screen scroll={false}>
      <ScreenHeader title="Terms & Policies" />
      <Screen contentStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Tabs */}
        <View style={styles.tabWrap}>
          {[
            { id: "terms", label: "Terms" },
            { id: "privacy", label: "Privacy" },
            { id: "care", label: "Garment Policy" },
          ].map((t) => {
            const active = tab === t.id;
            return (
              <Pressable
                key={t.id}
                onPress={() => setTab(t.id)}
                style={[styles.tabBtn, active && styles.tabBtnActive]}
              >
                <Text
                  weight={active ? "extrabold" : "semibold"}
                  color={active ? colors.navy : colors.navyMuted}
                  style={{ fontSize: 12.5 }}
                >
                  {t.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Content sections */}
        {tab === "terms" && (
          <View style={{ marginTop: 18, gap: 14 }}>
            <Text weight="extrabold" style={{ fontSize: 18 }}>FreshFold Terms of Service</Text>
            <Text color={colors.navyMuted} style={styles.para}>
              Last updated: August 2026. By using the FreshFold mobile app and scheduling garment pickups, you agree to the following terms and conditions.
            </Text>

            <Text weight="bold" style={styles.subHeading}>1. Doorstep Pickups and Delivery</Text>
            <Text color={colors.navyMuted} style={styles.para}>
              Pickups are arranged according to customer-selected time slots. If our care executive is unable to access the address, we will re-attempt once free of charge.
            </Text>

            <Text weight="bold" style={styles.subHeading}>2. Garment Inspection & Item Count</Text>
            <Text color={colors.navyMuted} style={styles.para}>
              All clothes are counted and inspected upon arrival at our processing hub. Any pre-existing tears, missing buttons, or stubborn stains are documented and shared via SMS/App notification.
            </Text>

            <Text weight="bold" style={styles.subHeading}>3. Pricing & Billing</Text>
            <Text color={colors.navyMuted} style={styles.para}>
              Prices shown in the app are standard rate estimates. Heavy embellishments, delicate silks, or leather items may carry custom specialty care surcharges.
            </Text>
          </View>
        )}

        {tab === "privacy" && (
          <View style={{ marginTop: 18, gap: 14 }}>
            <Text weight="extrabold" style={{ fontSize: 18 }}>Privacy & Data Protection</Text>
            <Text color={colors.navyMuted} style={styles.para}>
              Your privacy is our priority. FreshFold only collects essential details needed to fulfill your garment care orders safely and efficiently.
            </Text>

            <Text weight="bold" style={styles.subHeading}>1. Information We Collect</Text>
            <Text color={colors.navyMuted} style={styles.para}>
              - Contact information (Name, Mobile Phone, Email)
              - Pickup & Delivery addresses with GPS coordinates
              - Garment care preferences and order history
            </Text>

            <Text weight="bold" style={styles.subHeading}>2. Security & Payment Data</Text>
            <Text color={colors.navyMuted} style={styles.para}>
              All payment transactions are encrypted using 256-bit SSL protocols via RBI-authorized payment gateways (Razorpay / UPI). FreshFold does not store raw credit/debit card numbers.
            </Text>
          </View>
        )}

        {tab === "care" && (
          <View style={{ marginTop: 18, gap: 14 }}>
            <Text weight="extrabold" style={{ fontSize: 18 }}>Garment Care & Loss Guarantee</Text>
            <Text color={colors.navyMuted} style={styles.para}>
              We pride ourselves on gentle, professional fabric handling. Here is how we guarantee your peace of mind.
            </Text>

            <View style={styles.guaranteeCard}>
              <HeartHandshake size={24} color={colors.limeDark} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text weight="extrabold" style={{ fontSize: 14 }}>10x Service Compensation</Text>
                <Text color={colors.navyMuted} style={{ fontSize: 12, marginTop: 2, lineHeight: 18 }}>
                  In the rare event of damage or loss during processing, we provide compensation up to 10x the service charge of that garment.
                </Text>
              </View>
            </View>

            <Text weight="bold" style={styles.subHeading}>Care Guidelines</Text>
            <Text color={colors.navyMuted} style={styles.para}>
              - Please empty all pockets (coins, pens, valuables) prior to pickup.
              - Inform our driver or customer care of non-colorfast garments.
              - Dry clean only labeled designer wear will always receive specialized hydrocarbon solvent cleaning.
            </Text>
          </View>
        )}
      </Screen>
    </Screen>
  );
}

const styles = StyleSheet.create({
  tabWrap: {
    flexDirection: "row",
    backgroundColor: colors.lightGray,
    borderRadius: 16,
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  tabBtnActive: {
    backgroundColor: colors.white,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  para: {
    fontSize: 13.5,
    lineHeight: 20,
  },
  subHeading: {
    fontSize: 15,
    color: colors.navy,
    marginTop: 6,
  },
  guaranteeCard: {
    flexDirection: "row",
    backgroundColor: colors.lightGreen,
    padding: 16,
    borderRadius: 20,
    alignItems: "flex-start",
  },
});
