import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNavigator from "./TabsNavigator";
import SplashScreen from "../screens/SplashScreen";
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
import OtpScreen from "../screens/OtpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import AddressesScreen from "../screens/AddressesScreen";
import WalletScreen from "../screens/WalletScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import OrdersScreen from "../screens/OrdersScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import HelpSupportScreen from "../screens/HelpSupportScreen";
import TermsPrivacyScreen from "../screens/TermsPrivacyScreen";
import PaymentScreen from "../screens/PaymentScreen";
import BookScreen from "../screens/BookScreen";
import { colors } from "../theme/theme";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.white },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Tabs" component={TabsNavigator} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Stack.Screen name="Addresses" component={AddressesScreen} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Stack.Screen name="TermsPrivacy" component={TermsPrivacyScreen} />
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
      <Stack.Screen name="SchedulePickup" component={BookScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
}
