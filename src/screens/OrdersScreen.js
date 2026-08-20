import { useState } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  Package, Calendar, MapPin, ChevronRight, RefreshCw, Eye, Truck, CheckCircle2, Clock
} from "lucide-react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Button from "../components/shared/Button";
import Badge from "../components/shared/Badge";
import { orders } from "../data/orders";
import { colors, radius } from "../theme/theme";

export default function OrdersScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [tab, setTab] = useState("active"); // active | past

  const activeOrders = orders.filter((o) => o.status !== "Delivered");
  const pastOrders = orders.filter((o) => o.status === "Delivered");

  const displayedOrders = tab === "active" ? activeOrders : pastOrders;

  const getStatusTone = (status) => {
    switch (status) {
      case "Delivered":
        return { bg: colors.lightGreen, fg: colors.limeDark };
      case "Out for Delivery":
        return { bg: "#FEF4D1", fg: "#9A6700" };
      case "Processing":
        return { bg: "#E6F0FA", fg: "#1A56DB" };
      default:
        return { bg: colors.lightGray, fg: colors.navy };
    }
  };

  return (
    <Screen scroll={false}>
      <ScreenHeader title="My Orders" />
      <Screen contentStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Active vs Past Tabs */}
        <View style={styles.tabWrap}>
          <Pressable
            onPress={() => setTab("active")}
            style={[styles.tabBtn, tab === "active" && styles.tabBtnActive]}
          >
            <Text
              weight={tab === "active" ? "extrabold" : "semibold"}
              color={tab === "active" ? colors.navy : colors.navyMuted}
              style={{ fontSize: 13.5 }}
            >
              Active ({activeOrders.length})
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setTab("past")}
            style={[styles.tabBtn, tab === "past" && styles.tabBtnActive]}
          >
            <Text
              weight={tab === "past" ? "extrabold" : "semibold"}
              color={tab === "past" ? colors.navy : colors.navyMuted}
              style={{ fontSize: 13.5 }}
            >
              Past Orders ({pastOrders.length})
            </Text>
          </Pressable>
        </View>

        {/* Orders List */}
        <View style={{ gap: 16, marginTop: 16 }}>
          {displayedOrders.length === 0 ? (
            <View style={styles.emptyWrap}>
              <Package size={44} color={colors.navyMuted} />
              <Text weight="extrabold" style={{ fontSize: 17, marginTop: 14 }}>
                No {tab === "active" ? "active" : "past"} orders
              </Text>
              <Text color={colors.navyMuted} style={{ fontSize: 13, marginTop: 6, textAlign: "center" }}>
                Ready to refresh your clothes? Schedule your next pickup in seconds.
              </Text>
              <Button
                style={{ marginTop: 18 }}
                onPress={() => navigation.navigate("Book")}
              >
                Schedule Pickup
              </Button>
            </View>
          ) : (
            displayedOrders.map((order) => {
              const tone = getStatusTone(order.status);
              const itemCount = order.items.reduce((sum, it) => sum + it.qty, 0);

              return (
                <View key={order.id} style={styles.orderCard}>
                  {/* Header Row */}
                  <View style={styles.orderHeader}>
                    <View>
                      <Text weight="extrabold" style={{ fontSize: 16 }}>{order.id}</Text>
                      <Text color={colors.navyMuted} style={{ fontSize: 12, marginTop: 2 }}>
                        Placed on {order.createdAt}
                      </Text>
                    </View>

                    <View style={[styles.statusPill, { backgroundColor: tone.bg }]}>
                      <Text weight="bold" color={tone.fg} style={{ fontSize: 11.5 }}>
                        {order.status}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  {/* Items summary */}
                  <View style={styles.detailsRow}>
                    <Package size={15} color={colors.navyMuted} />
                    <Text weight="semibold" style={{ fontSize: 13, marginLeft: 8, flex: 1 }}>
                      {itemCount} Items · {order.items.map((i) => i.name).join(", ")}
                    </Text>
                  </View>

                  {/* Delivery / Store */}
                  <View style={[styles.detailsRow, { marginTop: 6 }]}>
                    <MapPin size={15} color={colors.navyMuted} />
                    <Text color={colors.navyMuted} style={{ fontSize: 12.5, marginLeft: 8, flex: 1 }} numberOfLines={1}>
                      {order.address.tag} ({order.address.text})
                    </Text>
                  </View>

                  {/* Expected / Delivery info */}
                  <View style={styles.deliveryBadge}>
                    <Clock size={13} color={colors.navy} />
                    <Text weight="bold" color={colors.navy} style={{ fontSize: 12, marginLeft: 6 }}>
                      {order.status === "Delivered"
                        ? `Delivered: ${order.deliveredAt}`
                        : `Expected: ${order.expectedDelivery}`}
                    </Text>
                  </View>

                  {/* Total & Action Buttons */}
                  <View style={styles.footerRow}>
                    <View>
                      <Text color={colors.navyMuted} style={{ fontSize: 11, textTransform: "uppercase" }}>
                        Total Amount
                      </Text>
                      <Text weight="extrabold" style={{ fontSize: 17, marginTop: 2 }}>
                        ₹{order.pricing.total.toFixed(2)}
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row", gap: 8 }}>
                      <Pressable
                        onPress={() => navigation.navigate("OrderDetail", { orderId: order.id })}
                        style={styles.detailBtn}
                      >
                        <Eye size={14} color={colors.navy} />
                        <Text weight="bold" color={colors.navy} style={{ fontSize: 12.5, marginLeft: 4 }}>
                          Details
                        </Text>
                      </Pressable>

                      {order.status !== "Delivered" ? (
                        <Pressable
                          onPress={() => navigation.navigate("OrderDetail", { orderId: order.id })}
                          style={styles.trackBtn}
                        >
                          <Truck size={14} color={colors.navy} />
                          <Text weight="extrabold" color={colors.navy} style={{ fontSize: 12.5, marginLeft: 4 }}>
                            Track
                          </Text>
                        </Pressable>
                      ) : (
                        <Pressable
                          onPress={() => navigation.navigate("Book")}
                          style={styles.reorderBtn}
                        >
                          <RefreshCw size={14} color={colors.navy} />
                          <Text weight="extrabold" color={colors.navy} style={{ fontSize: 12.5, marginLeft: 4 }}>
                            Reorder
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </View>
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
  orderCard: {
    borderWidth: 1.5,
    borderColor: colors.navyFaint,
    borderRadius: radius.card,
    backgroundColor: colors.white,
    padding: 16,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  statusPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  divider: {
    height: 1,
    backgroundColor: colors.navyFaint,
    marginVertical: 12,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  deliveryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGreen,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 12,
    alignSelf: "flex-start",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.navyFaint,
  },
  detailBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: colors.lightGray,
  },
  trackBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.lime,
  },
  reorderBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.lime,
  },
  emptyWrap: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
});
