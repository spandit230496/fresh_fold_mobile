import { View, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  Tag, MapPin, Workflow, Info, HelpCircle, Phone,
  Building2, Newspaper, ChevronRight, Receipt, UserRound, CalendarCheck,
  ShoppingBag, Wallet, Bell, Shield, LogIn, Crown, Sparkles, User
} from "lucide-react-native";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Logo from "../components/shared/Logo";
import Badge from "../components/shared/Badge";
import { colors, radius } from "../theme/theme";

export default function MoreScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const sections = [
    {
      title: "My Account",
      items: [
        { label: "My Profile", icon: User, screen: "Profile", badge: "Gold" },
        { label: "My Orders", icon: ShoppingBag, screen: "Orders", badge: "2 Active" },
        { label: "Saved Addresses", icon: MapPin, screen: "Addresses" },
        { label: "FreshFold Wallet", icon: Wallet, screen: "Wallet", badge: "₹450" },
        { label: "Notifications", icon: Bell, screen: "Notifications", badge: "1 New" },
      ],
    },
    {
      title: "Explore Services",
      items: [
        { label: "Schedule Pickup", icon: CalendarCheck, screen: "SchedulePickup" },
        { label: "Pricing Calculator", icon: Receipt, screen: "Pricing" },
        { label: "How It Works", icon: Workflow, screen: "HowItWorks" },
        { label: "Store Locations", icon: MapPin, screen: "Locations" },
        { label: "Offers & Coupons", icon: Tag, screen: "Offers", badge: "25% OFF" },
      ],
    },
    {
      title: "Support & Company",
      items: [
        { label: "Help & Customer Care", icon: HelpCircle, screen: "HelpSupport" },
        { label: "About FreshFold", icon: Info, screen: "About" },
        { label: "Fabric Care Blog", icon: Newspaper, screen: "Blogs" },
        { label: "Partner with Us (Franchise)", icon: Building2, screen: "Franchise" },
        { label: "FAQ", icon: HelpCircle, screen: "FAQ" },
        { label: "Terms & Privacy Policy", icon: Shield, screen: "TermsPrivacy" },
      ],
    },
  ];

  return (
    <Screen contentStyle={{ paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 40 }}>
      <Logo />

      {/* Mini Profile Banner */}
      <Pressable
        onPress={() => navigation.navigate("Profile")}
        style={styles.profileBanner}
      >
        <View style={styles.bannerAvatar}>
          <Text weight="extrabold" color={colors.navy} style={{ fontSize: 18 }}>AS</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Text weight="extrabold" style={{ fontSize: 16 }}>Aditi Sharma</Text>
            <Crown size={15} color="#E5A800" fill="#F7D96A" />
          </View>
          <Text color={colors.navyMuted} style={{ fontSize: 12, marginTop: 2 }}>
            Gold Member · Manage Account
          </Text>
        </View>
        <ChevronRight size={18} color={colors.navyMuted} />
      </Pressable>

      {/* Grouped Lists */}
      {sections.map((sec) => (
        <View key={sec.title} style={{ marginTop: 22 }}>
          <Text weight="bold" color={colors.navyMuted} style={styles.sectionHeader}>
            {sec.title}
          </Text>
          <View style={styles.list}>
            {sec.items.map((item, i) => {
              const isLast = i === sec.items.length - 1;
              const Icon = item.icon;
              return (
                <Pressable
                  key={item.label}
                  onPress={() => navigation.navigate(item.screen)}
                  style={[styles.row, !isLast && styles.rowBorder]}
                >
                  <View style={styles.iconWrap}>
                    <Icon size={17} color={colors.navy} />
                  </View>
                  <Text weight="semibold" style={{ fontSize: 14.5, flex: 1, marginLeft: 12 }}>
                    {item.label}
                  </Text>
                  {item.badge && (
                    <View style={styles.itemBadge}>
                      <Text weight="bold" color={colors.navy} style={{ fontSize: 10.5 }}>
                        {item.badge}
                      </Text>
                    </View>
                  )}
                  <ChevronRight size={18} color="rgba(16,35,63,0.3)" style={{ marginLeft: 6 }} />
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}

      {/* Sign in / Auth link */}
      <Pressable
        onPress={() => navigation.navigate("Login")}
        style={styles.authRow}
      >
        <LogIn size={17} color={colors.navy} />
        <Text weight="bold" color={colors.navy} style={{ fontSize: 14, marginLeft: 8 }}>
          Switch / Sign in to another account
        </Text>
      </Pressable>

      <Text color="rgba(16,35,63,0.4)" style={{ fontSize: 12, textAlign: "center", marginTop: 24 }}>
        FreshFold — Premium Care for Every Fabric
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    padding: 14,
    marginTop: 16,
  },
  bannerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 8,
    marginLeft: 4,
  },
  list: {
    borderWidth: 1,
    borderColor: colors.navyFaint,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.navyFaint,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: colors.lightGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  itemBadge: {
    backgroundColor: colors.lightGreen,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  authRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: colors.lightGray,
  },
});
