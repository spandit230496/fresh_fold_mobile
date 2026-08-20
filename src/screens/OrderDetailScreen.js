import { useState } from "react";
import { View, StyleSheet, Pressable, ScrollView, Linking, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Package, MapPin, Phone, CheckCircle2, Circle, Clock, FileText,
  ShieldCheck, HelpCircle, ChevronRight, Share2, Sparkles, Truck, Store
} from "lucide-react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Button from "../components/shared/Button";
import Badge from "../components/shared/Badge";
import { orders } from "../data/orders";
import { colors, radius } from "../theme/theme";

const progressSteps = [
  "Booking Confirmed",
  "Picked Up from Doorstep",
  "Fabric Inspection & Wash",
  "Steam Iron & Quality Check",
  "Out for Delivery",
  "Delivered to Doorstep",
];

export default function OrderDetailScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();

  const orderId = route.params?.orderId || "FF-482910";
  const order = orders.find((o) => o.id === orderId) || orders[0];

  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`).catch(() => {});
  };

  const handleInvoice = () => {
    Alert.alert("Tax Invoice", `Invoice for order #${order.id} downloaded.`);
  };

  return (
    <Screen scroll={false}>
      <ScreenHeader title={`Order #${order.id}`} />
      <Screen contentStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Status Card Banner */}
        <View style={styles.statusHero}>
          <View style={styles.statusHeroHeader}>
            <View>
              <Text color="rgba(255,255,255,0.75)" style={{ fontSize: 12 }}>Current Order Status</Text>
              <Text weight="extrabold" color={colors.white} style={{ fontSize: 22, marginTop: 2 }}>
                {order.status}
              </Text>
            </View>
            <View style={styles.heroBadge}>
              <Text weight="extrabold" color={colors.navy} style={{ fontSize: 11 }}>
                {order.pricing.paymentStatus}
              </Text>
            </View>
          </View>
          <Text color="rgba(255,255,255,0.8)" style={{ fontSize: 13, marginTop: 12 }}>
            📅 Expected Delivery: {order.expectedDelivery}
          </Text>
        </View>

        {/* Live Progress Stepper */}
        <View style={styles.sectionCard}>
          <Text weight="extrabold" style={{ fontSize: 16, marginBottom: 16 }}>
            Order Progress
          </Text>
          <View>
            {progressSteps.map((step, idx) => {
              const isDone = idx < order.statusStep;
              const isActive = idx === order.statusStep;
              const isLast = idx === progressSteps.length - 1;

              return (
                <View key={step} style={styles.stepRow}>
                  <View style={styles.stepIndicatorCol}>
                    {isDone || isActive ? (
                      <CheckCircle2
                        size={20}
                        color={isDone ? colors.limeDark : colors.navy}
                      />
                    ) : (
                      <Circle size={20} color={colors.navyFaint} />
                    )}
                    {!isLast && (
                      <View
                        style={[
                          styles.stepLine,
                          { backgroundColor: isDone ? colors.lime : colors.navyFaint },
                        ]}
                      />
                    )}
                  </View>

                  <View style={{ flex: 1, marginLeft: 12, paddingBottom: isLast ? 0 : 20 }}>
                    <Text
                      weight={isActive ? "extrabold" : isDone ? "bold" : "medium"}
                      color={isActive ? colors.navy : isDone ? colors.navy : colors.navyMuted}
                      style={{ fontSize: 13.5 }}
                    >
                      {step}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Delivery Partner & Hub Info */}
        <View style={styles.sectionCard}>
          <Text weight="extrabold" style={{ fontSize: 16, marginBottom: 14 }}>
            Care Executive & Hub
          </Text>
          <View style={styles.partnerRow}>
            <View style={styles.partnerAvatar}>
              <Truck size={20} color={colors.navy} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text weight="bold" style={{ fontSize: 14 }}>{order.deliveryPartner.name}</Text>
              <Text color={colors.navyMuted} style={{ fontSize: 12, marginTop: 2 }}>
                {order.deliveryPartner.vehicle} · ★ {order.deliveryPartner.rating}
              </Text>
            </View>
            <Pressable
              onPress={() => handleCall(order.deliveryPartner.phone)}
              style={styles.callBtn}
            >
              <Phone size={15} color={colors.navy} />
              <Text weight="bold" color={colors.navy} style={{ fontSize: 12, marginLeft: 4 }}>Call</Text>
            </Pressable>
          </View>

          <View style={styles.hubRow}>
            <Store size={16} color={colors.navyMuted} />
            <Text color={colors.navyMuted} style={{ fontSize: 12.5, marginLeft: 8, flex: 1 }}>
              Assigned Store: <Text weight="bold" color={colors.navy}>{order.store}</Text>
            </Text>
          </View>
        </View>

        {/* Pickup & Delivery Location */}
        <View style={styles.sectionCard}>
          <Text weight="extrabold" style={{ fontSize: 16, marginBottom: 12 }}>
            Address & Slot
          </Text>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <MapPin size={16} color={colors.navy} style={{ marginTop: 2 }} />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text weight="bold" style={{ fontSize: 13.5 }}>{order.address.tag} Address</Text>
              <Text color={colors.navyMuted} style={{ fontSize: 13, marginTop: 2, lineHeight: 18 }}>
                {order.address.text}
              </Text>
            </View>
          </View>
          <View style={styles.slotRow}>
            <Clock size={14} color={colors.navy} />
            <Text weight="semibold" color={colors.navy} style={{ fontSize: 12.5, marginLeft: 6 }}>
              Pickup Slot: {order.pickupDate} ({order.pickupTime})
            </Text>
          </View>
        </View>

        {/* Garments Breakdown */}
        <View style={styles.sectionCard}>
          <Text weight="extrabold" style={{ fontSize: 16, marginBottom: 14 }}>
            Garment Items ({order.items.length})
          </Text>
          <View style={{ gap: 12 }}>
            {order.items.map((it, idx) => (
              <View key={idx} style={styles.itemRow}>
                <View style={{ flex: 1 }}>
                  <Text weight="bold" style={{ fontSize: 14 }}>{it.name}</Text>
                  <Text color={colors.navyMuted} style={{ fontSize: 12, marginTop: 2 }}>
                    {it.service} · Qty: {it.qty} × ₹{it.rate}
                  </Text>
                </View>
                <Text weight="extrabold" style={{ fontSize: 14 }}>
                  ₹{it.total.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bill Summary */}
        <View style={styles.sectionCard}>
          <Text weight="extrabold" style={{ fontSize: 16, marginBottom: 14 }}>
            Payment Summary
          </Text>
          <View style={{ gap: 10 }}>
            <View style={styles.billRow}>
              <Text color={colors.navyMuted} style={{ fontSize: 13 }}>Items Subtotal</Text>
              <Text weight="bold" style={{ fontSize: 13 }}>₹{order.pricing.itemTotal.toFixed(2)}</Text>
            </View>

            <View style={styles.billRow}>
              <Text color={colors.navyMuted} style={{ fontSize: 13 }}>Doorstep Pickup & Delivery</Text>
              <Text weight="bold" color={colors.limeDark} style={{ fontSize: 13 }}>FREE</Text>
            </View>

            {order.pricing.expressFee > 0 && (
              <View style={styles.billRow}>
                <Text color={colors.navyMuted} style={{ fontSize: 13 }}>Express Turnaround</Text>
                <Text weight="bold" style={{ fontSize: 13 }}>₹{order.pricing.expressFee.toFixed(2)}</Text>
              </View>
            )}

            {order.pricing.discount > 0 && (
              <View style={styles.billRow}>
                <Text color={colors.limeDark} style={{ fontSize: 13 }}>Coupon Discount</Text>
                <Text weight="bold" color={colors.limeDark} style={{ fontSize: 13 }}>-₹{order.pricing.discount.toFixed(2)}</Text>
              </View>
            )}

            <View style={styles.billRow}>
              <Text color={colors.navyMuted} style={{ fontSize: 13 }}>Taxes (18% GST)</Text>
              <Text weight="bold" style={{ fontSize: 13 }}>₹{order.pricing.gst.toFixed(2)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.billRow}>
              <Text weight="extrabold" style={{ fontSize: 16 }}>Total Paid</Text>
              <Text weight="extrabold" style={{ fontSize: 18 }}>₹{order.pricing.total.toFixed(2)}</Text>
            </View>

            <Text color={colors.navyMuted} style={{ fontSize: 11.5 }}>
              Paid via {order.pricing.paidVia}
            </Text>
          </View>
        </View>

        {/* Invoice & Support Action Buttons */}
        <View style={{ gap: 12, marginTop: 10 }}>
          <Button
            variant="outline"
            fullWidth
            size="lg"
            icon={FileText}
            onPress={handleInvoice}
          >
            Download Tax Invoice
          </Button>

          <Button
            variant="ghost"
            fullWidth
            icon={HelpCircle}
            onPress={() => navigation.navigate("HelpSupport", { orderId: order.id })}
          >
            Need Help with this Order?
          </Button>
        </View>
      </Screen>
    </Screen>
  );
}

const styles = StyleSheet.create({
  statusHero: {
    backgroundColor: colors.navy,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  statusHeroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  heroBadge: {
    backgroundColor: colors.lime,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  sectionCard: {
    borderWidth: 1.5,
    borderColor: colors.navyFaint,
    borderRadius: radius.card,
    backgroundColor: colors.white,
    padding: 18,
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  stepIndicatorCol: {
    alignItems: "center",
    width: 20,
  },
  stepLine: {
    width: 2,
    height: 24,
    marginVertical: 2,
  },
  partnerRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    padding: 12,
    borderRadius: 16,
  },
  partnerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  callBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lime,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  hubRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingHorizontal: 4,
  },
  slotRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGreen,
    padding: 10,
    borderRadius: 12,
    marginTop: 12,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: colors.navyFaint,
    marginVertical: 8,
  },
});
