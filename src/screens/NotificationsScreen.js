import { useState } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  Bell, Package, Tag, Clock, CheckCheck, Trash2, Sparkles, ChevronRight, Check
} from "lucide-react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Badge from "../components/shared/Badge";
import { notifications as initialNotifications } from "../data/notifications";
import { colors, radius } from "../theme/theme";

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all"); // all | order | promo

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationPress = (item) => {
    // mark item as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );

    if (item.orderId) {
      navigation.navigate("OrderDetail", { orderId: item.orderId });
    } else if (item.type === "promo") {
      navigation.navigate("Offers");
    }
  };

  const filteredItems = notifications.filter((n) => {
    if (filter === "all") return true;
    return n.type === filter;
  });

  return (
    <Screen scroll={false}>
      <ScreenHeader title="Notifications" />
      <Screen contentStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Filter bar & Mark all read */}
        <View style={styles.topActions}>
          <View style={styles.filterRow}>
            {["all", "order", "promo"].map((f) => {
              const active = filter === f;
              return (
                <Pressable
                  key={f}
                  onPress={() => setFilter(f)}
                  style={[styles.filterChip, active && styles.filterChipActive]}
                >
                  <Text
                    weight={active ? "bold" : "semibold"}
                    color={active ? colors.navy : colors.navyMuted}
                    style={{ fontSize: 12.5, textTransform: "capitalize" }}
                  >
                    {f === "all" ? "All Updates" : f === "order" ? "Orders" : "Offers"}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable onPress={markAllAsRead} style={styles.markReadBtn}>
            <CheckCheck size={14} color={colors.limeDark} />
            <Text weight="bold" color={colors.limeDark} style={{ fontSize: 11.5, marginLeft: 4 }}>
              Mark Read
            </Text>
          </Pressable>
        </View>

        {/* List */}
        <View style={{ gap: 12, marginTop: 14 }}>
          {filteredItems.length === 0 ? (
            <View style={styles.emptyWrap}>
              <Bell size={36} color={colors.navyMuted} />
              <Text weight="bold" style={{ fontSize: 16, marginTop: 12 }}>No notifications here</Text>
              <Text color={colors.navyMuted} style={{ fontSize: 13, marginTop: 4 }}>
                We'll notify you when there's an update on your laundry or fresh discounts.
              </Text>
            </View>
          ) : (
            filteredItems.map((n) => {
              const isOrder = n.type === "order";
              const isPromo = n.type === "promo";
              const Icon = isOrder ? Package : isPromo ? Tag : Bell;

              return (
                <Pressable
                  key={n.id}
                  onPress={() => handleNotificationPress(n)}
                  style={[styles.notiCard, !n.read && styles.notiCardUnread]}
                >
                  <View style={[styles.notiIconWrap, isOrder ? styles.orderIcon : isPromo ? styles.promoIcon : styles.defaultIcon]}>
                    <Icon size={18} color={colors.navy} />
                  </View>

                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Text weight="bold" style={{ fontSize: 14, flex: 1, color: colors.navy }}>
                        {n.title}
                      </Text>
                      {!n.read && <View style={styles.unreadDot} />}
                    </View>

                    <Text color={colors.navyMuted} style={{ fontSize: 12.5, marginTop: 4, lineHeight: 18 }}>
                      {n.body}
                    </Text>

                    <View style={styles.metaRow}>
                      <Clock size={11} color="rgba(16,35,63,0.4)" />
                      <Text color="rgba(16,35,63,0.4)" style={{ fontSize: 11, marginLeft: 4 }}>
                        {n.time}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })
          )}
        </View>
      </Screen>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: colors.lightGray,
  },
  filterChipActive: {
    backgroundColor: colors.lightGreen,
    borderWidth: 1,
    borderColor: colors.lime,
  },
  markReadBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  notiCard: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.navyFaint,
    backgroundColor: colors.white,
    alignItems: "flex-start",
  },
  notiCardUnread: {
    backgroundColor: "#FCFDF8",
    borderColor: colors.lime,
  },
  notiIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  orderIcon: {
    backgroundColor: colors.lightGreen,
  },
  promoIcon: {
    backgroundColor: "#FEF4D1",
  },
  defaultIcon: {
    backgroundColor: colors.lightGray,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.limeDark,
    marginLeft: 8,
    marginTop: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  emptyWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
    textAlign: "center",
  },
});
