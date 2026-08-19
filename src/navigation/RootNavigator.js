import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNavigator from "./TabsNavigator";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";
import StoreDetailScreen from "../screens/StoreDetailScreen";
import BlogDetailScreen from "../screens/BlogDetailScreen";
import PricingScreen from "../screens/PricingScreen";
import OffersScreen from "../screens/OffersScreen";
import LocationsScreen from "../screens/LocationsScreen";
import AboutScreen from "../screens/AboutScreen";
import FAQScreen from "../screens/FAQScreen";
import ContactScreen from "../screens/ContactScreen";
import HowItWorksScreen from "../screens/HowItWorksScreen";
import FranchiseScreen from "../screens/FranchiseScreen";
import BlogsScreen from "../screens/BlogsScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import PaymentScreen from "../screens/PaymentScreen";
import BookScreen from "../screens/BookScreen";
import { colors } from "../theme/theme";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.white },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Tabs" component={TabsNavigator} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
      <Stack.Screen name="StoreDetail" component={StoreDetailScreen} />
      <Stack.Screen name="BlogDetail" component={BlogDetailScreen} />
      <Stack.Screen name="Pricing" component={PricingScreen} />
      <Stack.Screen name="Offers" component={OffersScreen} />
      <Stack.Screen name="Locations" component={LocationsScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="HowItWorks" component={HowItWorksScreen} />
      <Stack.Screen name="Franchise" component={FranchiseScreen} />
      <Stack.Screen name="Blogs" component={BlogsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="SchedulePickup" component={BookScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
}
