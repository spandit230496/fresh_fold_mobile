import { useState } from "react";
import { View, ScrollView, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { pricingCategories } from "../../data/pricing";
import { colors, radius } from "../../theme/theme";

export default function PricingTable({ defaultCategory = "laundry" }) {
  const [activeKey, setActiveKey] = useState(defaultCategory);
  const [mode, setMode] = useState("regular");
  const active = pricingCategories.find((c) => c.key === activeKey) || pricingCategories[0];

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRow}>
        {pricingCategories.map((c) => {
          const isActive = activeKey === c.key;
          return (
            <Pressable
              key={c.key}
              onPress={() => setActiveKey(c.key)}
              style={[styles.tab, { backgroundColor: isActive ? colors.navy : colors.lightGray }]}
            >
              <Text weight="bold" color={isActive ? colors.white : colors.navy} style={{ fontSize: 13 }}>
                {c.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.modeRow}>
        {["regular", "express"].map((m) => {
          const isActive = mode === m;
          return (
            <Pressable
              key={m}
              onPress={() => setMode(m)}
              style={[styles.modeBtn, isActive && styles.modeBtnActive]}
            >
              <Text weight="bold" color={isActive ? colors.navy : "rgba(16,35,63,0.5)"} style={{ fontSize: 12, textTransform: "capitalize" }}>
                {m}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.list}>
        {active.items.map((row, i) => (
          <View key={i} style={[styles.row, i === active.items.length - 1 && { borderBottomWidth: 0 }]}>
            <View>
              <Text weight="bold" style={{ fontSize: 14 }}>{row.item}</Text>
              <Text color="rgba(16,35,63,0.5)" style={{ fontSize: 12, marginTop: 2 }}>{row.service}</Text>
            </View>
            <Text weight="extrabold" style={{ fontSize: 15 }}>
              ₹{mode === "regular" ? row.regular : row.express}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsRow: { gap: 8, paddingBottom: 14 },
  tab: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 999 },
  modeRow: {
    flexDirection: "row",
    backgroundColor: colors.lightGray,
    borderRadius: 999,
    padding: 4,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  modeBtn: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 999 },
  modeBtnActive: { backgroundColor: colors.white },
  list: {
    borderWidth: 1,
    borderColor: colors.navyFaint,
    borderRadius: radius.cardLg,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.navyFaint,
  },
});
