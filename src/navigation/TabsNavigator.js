import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeScreen from "../screens/HomeScreen";
import ServicesScreen from "../screens/ServicesScreen";
import BookScreen from "../screens/BookScreen";
import TrackScreen from "../screens/TrackScreen";
import MoreScreen from "../screens/MoreScreen";
import BottomTabIcon from "./BottomTabIcon";
import Text from "../components/shared/Text";
import { colors } from "../theme/theme";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "Home",
  Services: "Grid3x3",
  Book: "CalendarCheck",
  Track: "PackageSearch",
  More: "Menu",
};

export default function TabsNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.navy,
        tabBarInactiveTintColor: "rgba(16,35,63,0.35)",
        tabBarStyle: {
          height: 58 + insets.bottom,
          paddingTop: 8,
          paddingBottom: insets.bottom + 6,
          backgroundColor: colors.white,
          borderTopColor: colors.navyFaint,
        },
        tabBarLabel: ({ focused, color }) => (
          <Text weight={focused ? "bold" : "semibold"} color={color} style={{ fontSize: 10.5 }}>
            {route.name === "Book" ? "Schedule" : route.name}
          </Text>
        ),
        tabBarIcon: ({ focused }) => <BottomTabIcon name={TAB_ICON[route.name]} focused={focused} />,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Book" component={BookScreen} />
      <Tab.Screen name="Track" component={TrackScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}
