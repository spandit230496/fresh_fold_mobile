import { Home, Grid3x3, CalendarCheck, PackageSearch, Menu } from "lucide-react-native";
import { colors } from "../theme/theme";

const ICONS = { Home, Grid3x3, CalendarCheck, PackageSearch, Menu };

export default function BottomTabIcon({ name, focused }) {
  const Icon = ICONS[name];
  return <Icon size={22} color={focused ? colors.navy : "rgba(16,35,63,0.35)"} strokeWidth={focused ? 2.4 : 2} />;
}
