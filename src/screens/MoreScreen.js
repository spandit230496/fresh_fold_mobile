import { View, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  Tag, MapPin, Workflow, Info, HelpCircle, Phone,
  Building2, Newspaper, ChevronRight, Receipt, UserRound, CalendarCheck,
} from "lucide-react-native";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Logo from "../components/shared/Logo";
import { colors } from "../theme/theme";

const items = [
  { label: "Schedule Pickup", icon: CalendarCheck, screen: "SchedulePickup" },
  { label: "Sign In", icon: UserRound, screen: "Login" },
  { label: "Pricing", icon: Receipt, screen: "Pricing" },
  { label: "How It Works", icon: Workflow, screen: "HowItWorks" },
  { label: "Locations", icon: MapPin, screen: "Locations" },
  { label: "Offers", icon: Tag, screen: "Offers" },
  { label: "About Us", icon: Info, screen: "About" },
  { label: "Blog", icon: Newspaper, screen: "Blogs" },
  { label: "Franchise", icon: Building2, screen: "Franchise" },
  { label: "FAQ", icon: HelpCircle, screen: "FAQ" },
  { label: "Contact Us", icon: Phone, screen: "Contact" },
];

export default function MoreScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <Screen contentStyle={{ paddingTop: insets.top + 16, paddingHorizontal: 20 }}>
      <Logo />
      <Text weight="extrabold" style={{ fontSize: 22, marginTop: 20, marginBottom: 16 }}>
        More
      </Text>
      <View style={styles.list}>
        {items.map((item, i) => (
          <Pressable
            key={item.label}
            onPress={() => navigation.navigate(item.screen)}
            style={[styles.row, i === items.length - 1 && { borderBottomWidth: 0 }]}
          >
            <View style={styles.iconWrap}>
              <item.icon size={17} color={colors.navy} />
            </View>
            <Text weight="semibold" style={{ fontSize: 14.5, flex: 1, marginLeft: 12 }}>{item.label}</Text>
            <ChevronRight size={18} color="rgba(16,35,63,0.3)" />
          </Pressable>
        ))}
      </View>
      <Text color="rgba(16,35,63,0.4)" style={{ fontSize: 12, textAlign: "center", marginTop: 28 }}>
        FreshFold — Premium Care for Every Fabric
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    borderWidth: 1, borderColor: colors.navyFaint, borderRadius: 24, overflow: "hidden",
  },
  row: {
    flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 15,
    borderBottomWidth: 1, borderBottomColor: colors.navyFaint,
  },
  iconWrap: {
    width: 34, height: 34, borderRadius: 12, backgroundColor: colors.lightGreen,
    alignItems: "center", justifyContent: "center",
  },
});
