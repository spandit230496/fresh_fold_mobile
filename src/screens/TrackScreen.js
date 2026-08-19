import { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Search, CheckCircle2, Circle, MapPin, Package } from "lucide-react-native";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Badge from "../components/shared/Badge";
import FormField from "../components/shared/FormField";
import { colors, radius } from "../theme/theme";

const timelineSteps = [
  "Booking Confirmed", "Pickup Completed", "Processing",
  "Quality Check", "Ready", "Out for Delivery", "Delivered",
];

export default function TrackScreen() {
  const insets = useSafeAreaInsets();
  const [orderId, setOrderId] = useState("");
  const [tracked, setTracked] = useState(null);

  const handleTrack = () => {
    setTracked({
      id: orderId || "FF-482910",
      currentStepIndex: 2,
      expectedDelivery: "22 Aug 2026, by 8:00 PM",
      store: "FreshFold – Baner",
      items: [
        { name: "Shirt × 4", service: "Wash & Iron" },
        { name: "Trouser × 2", service: "Wash & Iron" },
        { name: "Blazer × 1", service: "Dry Clean" },
      ],
    });
  };

  return (
    <Screen contentStyle={{ paddingTop: insets.top + 20, paddingHorizontal: 20 }}>
      <Badge tone="light">Track Order</Badge>
      <Text weight="extrabold" style={{ fontSize: 24, marginTop: 10 }}>Where's My Order?</Text>
      <Text color="rgba(16,35,63,0.6)" style={{ fontSize: 13.5, marginTop: 4, marginBottom: 20 }}>
        Enter your order ID to see live status.
      </Text>

      <View style={styles.searchRow}>
        <Search size={16} color="rgba(16,35,63,0.4)" />
        <FormField
          value={orderId}
          onChangeText={setOrderId}
          placeholder="e.g. FF-482910"
          style={{ flex: 1, marginLeft: 8 }}
        />
      </View>
      <Pressable onPress={handleTrack} style={styles.trackBtn}>
        <Text weight="bold" style={{ fontSize: 14 }}>Track Order</Text>
      </Pressable>

      {tracked && (
        <View style={styles.card}>
          <View style={styles.topRow}>
            <View>
              <Text weight="bold" color="rgba(16,35,63,0.45)" style={styles.label}>Order ID</Text>
              <Text weight="extrabold" style={{ fontSize: 17, marginTop: 3 }}>{tracked.id}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text weight="bold" color="rgba(16,35,63,0.45)" style={styles.label}>Expected</Text>
              <Text weight="bold" style={{ fontSize: 12.5, marginTop: 3, textAlign: "right", maxWidth: 140 }}>
                {tracked.expectedDelivery}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            {timelineSteps.map((label, i) => {
              const done = i < tracked.currentStepIndex;
              const active = i === tracked.currentStepIndex;
              return (
                <View key={label} style={{ flexDirection: "row", alignItems: "flex-start" }}>
                  <View style={{ alignItems: "center" }}>
                    {done || active ? (
                      <CheckCircle2 size={18} color={done ? colors.limeDark : colors.navy} />
                    ) : (
                      <Circle size={18} color={colors.navyFaint} />
                    )}
                    {i < timelineSteps.length - 1 && (
                      <View style={{ width: 2, height: 26, backgroundColor: done ? colors.lime : colors.navyFaint }} />
                    )}
                  </View>
                  <Text
                    weight={active ? "extrabold" : "medium"}
                    color={active ? colors.navy : "rgba(16,35,63,0.4)"}
                    style={{ fontSize: 13, marginLeft: 10, marginTop: -1, paddingBottom: 22 }}
                  >
                    {label}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.divider} />

          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <MapPin size={13} color="rgba(16,35,63,0.5)" />
            <Text weight="bold" color="rgba(16,35,63,0.45)" style={[styles.label, { marginLeft: 5 }]}>Store</Text>
          </View>
          <Text weight="bold" style={{ fontSize: 14, marginBottom: 16 }}>{tracked.store}</Text>

          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <Package size={13} color="rgba(16,35,63,0.5)" />
            <Text weight="bold" color="rgba(16,35,63,0.45)" style={[styles.label, { marginLeft: 5 }]}>Items</Text>
          </View>
          {tracked.items.map((it) => (
            <Text key={it.name} color="rgba(16,35,63,0.7)" style={{ fontSize: 13, marginBottom: 2 }}>
              {it.name} · {it.service}
            </Text>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchRow: { flexDirection: "row", alignItems: "center" },
  trackBtn: {
    backgroundColor: colors.lime, borderRadius: 999, paddingVertical: 13,
    alignItems: "center", marginTop: 14,
  },
  card: { borderWidth: 1, borderColor: colors.navyFaint, borderRadius: radius.cardLg, padding: 20, marginTop: 28 },
  topRow: { flexDirection: "row", justifyContent: "space-between" },
  label: { fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.4 },
  divider: { height: 1, backgroundColor: colors.navyFaint, marginVertical: 16 },
});
