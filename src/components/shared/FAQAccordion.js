import { useState } from "react";
import { View, Pressable, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import { Plus } from "lucide-react-native";
import Text from "./Text";
import { colors, radius } from "../../theme/theme";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <View style={{ gap: 10 }}>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <View key={i} style={styles.item}>
            <Pressable onPress={() => toggle(i)} style={styles.header}>
              <Text weight="bold" style={{ fontSize: 14, flex: 1, marginRight: 12 }}>{item.q}</Text>
              <Plus size={18} color={colors.navy} style={{ transform: [{ rotate: open ? "45deg" : "0deg" }] }} />
            </Pressable>
            {open && (
              <Text color="rgba(16,35,63,0.6)" style={{ fontSize: 13, lineHeight: 19, paddingHorizontal: 16, paddingBottom: 14 }}>
                {item.a}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.navyFaint,
    borderRadius: radius.card,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
