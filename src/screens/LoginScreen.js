import { useState } from "react";
import { View, StyleSheet, Pressable, Platform, KeyboardAvoidingView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Eye, EyeOff, Smartphone, Mail, ShieldCheck, Check } from "lucide-react-native";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Logo from "../components/shared/Logo";
import Button from "../components/shared/Button";
import FormField from "../components/shared/FormField";
import { colors, radius } from "../theme/theme";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [authMethod, setAuthMethod] = useState("phone"); // "phone" | "email"
  
  // Phone form state
  const [mobile, setMobile] = useState("");
  
  // Email form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePhoneSubmit = () => {
    const formattedPhone = mobile.trim().replace(/\D/g, "");
    navigation.navigate("Otp", {
      phone: formattedPhone || "9876543210",
      type: "login",
    });
  };

  const handleEmailSubmit = () => {
    navigation.navigate("Tabs", { screen: "Home" });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Screen contentStyle={{ paddingTop: insets.top + 16, paddingHorizontal: 22 }}>
        {/* Top Header */}
        <View style={styles.topRow}>
          <Pressable onPress={() => navigation.goBack()} style={styles.back}>
            <ArrowLeft size={20} color={colors.navy} />
          </Pressable>
          <Logo />
          <View style={{ width: 42 }} />
        </View>

        {/* Hero Title */}
        <View style={styles.hero}>
          <Text weight="extrabold" style={styles.title}>Welcome back</Text>
          <Text color={colors.navyMuted} style={styles.subtitle}>
            Sign in to track orders, manage pickups, and access exclusive offers.
          </Text>
        </View>

        {/* Auth Method Switcher Tabs */}
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => setAuthMethod("phone")}
            style={[styles.tabBtn, authMethod === "phone" && styles.tabBtnActive]}
          >
            <Smartphone size={16} color={authMethod === "phone" ? colors.navy : colors.navyMuted} />
            <Text
              weight={authMethod === "phone" ? "bold" : "semibold"}
              color={authMethod === "phone" ? colors.navy : colors.navyMuted}
              style={{ fontSize: 13.5, marginLeft: 6 }}
            >
              Phone (OTP)
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setAuthMethod("email")}
            style={[styles.tabBtn, authMethod === "email" && styles.tabBtnActive]}
          >
            <Mail size={16} color={authMethod === "email" ? colors.navy : colors.navyMuted} />
            <Text
              weight={authMethod === "email" ? "bold" : "semibold"}
              color={authMethod === "email" ? colors.navy : colors.navyMuted}
              style={{ fontSize: 13.5, marginLeft: 6 }}
            >
              Email & Password
            </Text>
          </Pressable>
        </View>

        {/* Inputs */}
        {authMethod === "phone" ? (
          <View style={{ gap: 16 }}>
            <View>
              <FormField
                label="Mobile Number"
                placeholder="10-digit mobile number"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
              />
              <Text color={colors.navyMuted} style={styles.helperText}>
                We will send a 6-digit one-time verification code.
              </Text>
            </View>

            <Button
              fullWidth
              size="lg"
              onPress={handlePhoneSubmit}
              style={{ marginTop: 10 }}
            >
              Get OTP
            </Button>
          </View>
        ) : (
          <View style={{ gap: 16 }}>
            <FormField
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={{ position: "relative" }}>
              <FormField
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword((v) => !v)} style={styles.eyeBtn}>
                {showPassword ? (
                  <EyeOff size={18} color={colors.navyMuted} />
                ) : (
                  <Eye size={18} color={colors.navyMuted} />
                )}
              </Pressable>
            </View>

            <Pressable
              onPress={() => navigation.navigate("ForgotPassword")}
              style={styles.forgot}
            >
              <Text weight="bold" color={colors.navy} style={{ fontSize: 13 }}>
                Forgot password?
              </Text>
            </Pressable>

            <Button
              fullWidth
              size="lg"
              onPress={handleEmailSubmit}
            >
              Sign In
            </Button>
          </View>
        )}

        {/* Social Logins */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text color={colors.navyMuted} style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <Pressable
            style={styles.socialBtn}
            onPress={() => navigation.navigate("Tabs", { screen: "Home" })}
          >
            <Text weight="bold" color={colors.navy} style={{ fontSize: 13.5 }}>Google</Text>
          </Pressable>
          <Pressable
            style={styles.socialBtn}
            onPress={() => navigation.navigate("Tabs", { screen: "Home" })}
          >
            <Text weight="bold" color={colors.navy} style={{ fontSize: 13.5 }}>Apple</Text>
          </Pressable>
        </View>

        {/* Signup Redirect */}
        <View style={styles.signupRow}>
          <Text color={colors.navyMuted} style={{ fontSize: 14 }}>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text weight="bold" color={colors.navy} style={{ fontSize: 14 }}> Sign up</Text>
          </Pressable>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  back: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    marginBottom: 22,
  },
  title: {
    fontSize: 28,
    color: colors.navy,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
    lineHeight: 21,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: colors.lightGray,
    borderRadius: 16,
    padding: 4,
    marginBottom: 22,
  },
  tabBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },
  tabBtnActive: {
    backgroundColor: colors.white,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  helperText: {
    fontSize: 12,
    marginTop: 6,
    marginLeft: 2,
  },
  eyeBtn: {
    position: "absolute",
    right: 14,
    top: 36,
    padding: 6,
  },
  forgot: {
    alignSelf: "flex-end",
    marginTop: 4,
    marginBottom: 8,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.navyFaint,
  },
  dividerText: {
    fontSize: 12,
    marginHorizontal: 14,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: radius.input,
    borderWidth: 1.5,
    borderColor: colors.navyFaint,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 26,
    marginBottom: 20,
  },
});
