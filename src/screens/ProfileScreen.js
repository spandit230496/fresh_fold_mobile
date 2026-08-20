import { View, StyleSheet, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  User, Edit3, ShoppingBag, MapPin, Wallet, Bell,
  HelpCircle, Shield, LogOut, ChevronRight, Crown, Sparkles, Clock, CheckCircle2
} from "lucide-react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Badge from "../components/shared/Badge";
import Button from "../components/shared/Button";
import { colors, radius } from "../theme/theme";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const menuSections = [
    {
      title: "Activity & Manage",
      items: [
        { label: "My Orders", icon: ShoppingBag, screen: "Orders", badge: "2 Active" },
        { label: "Saved Addresses", icon: MapPin, screen: "Addresses", badge: "2 Saved" },
        { label: "FreshFold Wallet", icon: Wallet, screen: "Wallet", badge: "₹450.00" },
        { label: "Notifications", icon: Bell, screen: "Notifications", badge: "1 New" },
      ],
    },
    {
      title: "Support & Legal",
      items: [
        { label: "Help & Support", icon: HelpCircle, screen: "HelpSupport" },
        { label: "Terms & Privacy Policy", icon: Shield, screen: "TermsPrivacy" },
      ],
    },
  ];

  return (
    <Screen scroll={false}>
      <ScreenHeader title="My Profile" />
      <Screen contentStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text weight="extrabold" color={colors.navy} style={{ fontSize: 26 }}>AS</Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate("EditProfile")}
              style={styles.editAvatarBtn}
            >
              <Edit3 size={14} color={colors.navy} />
            </Pressable>
          </View>

          <View style={styles.profileInfo}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Text weight="extrabold" style={{ fontSize: 20 }}>Aditi Sharma</Text>
              <Crown size={18} color="#E5A800" fill="#F7D96A" />
            </View>
            <Text color={colors.navyMuted} style={{ fontSize: 13, marginTop: 2 }}>
              +91 98765 43210 · aditi.s@example.com
            </Text>
            <View style={{ marginTop: 8 }}>
              <Badge tone="light">Gold Member</Badge>
            </View>
          </View>
        </View>

        {/* Impact / Stats Grid */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text weight="extrabold" style={styles.statVal}>14</Text>
            <Text color={colors.navyMuted} style={styles.statLbl}>Orders Done</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text weight="extrabold" color={colors.limeDark} style={styles.statVal}>38 hrs</Text>
            <Text color={colors.navyMuted} style={styles.statLbl}>Time Saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text weight="extrabold" style={styles.statVal}>₹450</Text>
            <Text color={colors.navyMuted} style={styles.statLbl}>Wallet Balance</Text>
          </View>
        </View>

        {/* Member Perk Card */}
        <View style={styles.perkCard}>
          <Sparkles size={20} color={colors.limeDark} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text weight="bold" style={{ fontSize: 13.5 }}>Gold Member Benefits Active</Text>
            <Text color={colors.navyMuted} style={{ fontSize: 12, marginTop: 2 }}>
              Enjoy 5% cashback on all dry clean & free doorstep pickups.
            </Text>
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((sec) => (
          <View key={sec.title} style={{ marginTop: 20 }}>
            <Text weight="bold" color={colors.navyMuted} style={styles.sectionTitle}>
              {sec.title}
            </Text>
            <View style={styles.menuBox}>
              {sec.items.map((item, idx) => {
                const Icon = item.icon;
                const isLast = idx === sec.items.length - 1;
                return (
                  <Pressable
                    key={item.label}
                    onPress={() => navigation.navigate(item.screen)}
                    style={[styles.menuRow, !isLast && styles.menuBorder]}
                  >
                    <View style={styles.iconCircle}>
                      <Icon size={18} color={colors.navy} />
                    </View>
                    <Text weight="semibold" style={{ fontSize: 14.5, flex: 1, marginLeft: 12 }}>
                      {item.label}
                    </Text>
                    {item.badge && (
                      <View style={styles.badgeWrap}>
                        <Text weight="bold" color={colors.navy} style={{ fontSize: 11 }}>
                          {item.badge}
                        </Text>
                      </View>
                    )}
                    <ChevronRight size={18} color={colors.navyMuted} style={{ marginLeft: 6 }} />
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}

        {/* Logout */}
        <Pressable onPress={handleLogout} style={styles.logoutBtn}>
          <LogOut size={18} color="#D93025" />
          <Text weight="bold" color="#D93025" style={{ fontSize: 14, marginLeft: 8 }}>
            Sign Out
          </Text>
        </Pressable>

        <Text color="rgba(16,35,63,0.35)" style={styles.versionText}>
          FreshFold App v1.0.0 (Build 108)
        </Text>
      </Screen>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: radius.card,
    padding: 16,
  },
  avatarWrap: {
    position: "relative",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },
  editAvatarBtn: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.navyFaint,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.navyFaint,
    borderRadius: 20,
    paddingVertical: 14,
    marginTop: 16,
    alignItems: "center",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statVal: {
    fontSize: 18,
  },
  statLbl: {
    fontSize: 11,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 26,
    backgroundColor: colors.navyFaint,
  },
  perkCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGreen,
    borderRadius: 18,
    padding: 14,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  menuBox: {
    borderWidth: 1,
    borderColor: colors.navyFaint,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  menuBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.navyFaint,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeWrap: {
    backgroundColor: colors.lightGreen,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
    paddingVertical: 14,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "rgba(217,48,37,0.2)",
    backgroundColor: "rgba(217,48,37,0.04)",
  },
  versionText: {
    fontSize: 11.5,
    textAlign: "center",
    marginTop: 20,
  },
});
