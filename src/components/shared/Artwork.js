import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Icons from "lucide-react-native";
import Text from "./Text";
import { colors, radius } from "../../theme/theme";

const PALETTES = {
  lime: [colors.lightGreen, colors.lime],
  navy: [colors.navySoft, colors.navy],
  yellow: ["#FCEFC7", colors.softYellow],
  gray: [colors.lightGray, "#E4E7E0"],
};

const ICON_MAP = {
  shirt: "Shirt",
  sparkles: "Sparkles",
  footprints: "Footprints",
  briefcase: "Briefcase",
  sofa: "Sofa",
  flame: "Flame",
  droplets: "Droplets",
  wind: "Wind",
  package: "PackageCheck",
  home: "Home",
  smile: "Smile",
};

export default function Artwork({ icon = "shirt", palette = "lime", height = 160, radius: r = radius.cardLg, badge, style }) {
  const [from, to] = PALETTES[palette] || PALETTES.lime;
  const IconComp = Icons[ICON_MAP[icon] || "Shirt"];

  return (
    <LinearGradient
      colors={[from, to]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={[{ height, borderRadius: r, overflow: "hidden" }, styles.center, style]}
    >
      <View style={styles.iconWrap}>
        <IconComp size={32} color={colors.navy} strokeWidth={1.6} />
      </View>
      {badge && (
        <View style={styles.badge}>
          <Text weight="bold" style={{ fontSize: 11 }}>{badge}</Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center" },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
