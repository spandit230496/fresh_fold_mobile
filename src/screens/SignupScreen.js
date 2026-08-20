import { useState } from "react";
import { View, StyleSheet, Pressable, Platform, KeyboardAvoidingView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Check, Gift, Eye, EyeOff, ShieldCheck } from "lucide-react-native";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Logo from "../components/shared/Logo";
import Button from "../components/shared/Button";
import FormField from "../components/shared/FormField";
import { colors, radius } from "../theme/theme";

export default function SignupScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    referral: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = () => {
    const formattedPhone = form.mobile.trim().replace(/\D/g, "");
    navigation.navigate("Otp", {
      phone: formattedPhone || "9876543210",
      name: form.name || "User",
      type: "signup",
    });
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

        {/* Title */}
        <Text weight="extrabold" style={styles.title}>Create your account</Text>
        <Text color={colors.navyMuted} style={styles.sub}>
          Join FreshFold and get ₹100 off on your first order.
        </Text>

        {/* Inputs */}
        <View style={{ gap: 14 }}>
          <FormField
            label="Full Name"
            placeholder="e.g. Aditi Sharma"
            value={form.name}
            onChangeText={(v) => update("name", v)}
          />

          <FormField
            label="Mobile Number"
            placeholder="10-digit mobile number"
            keyboardType="phone-pad"
            value={form.mobile}
            onChangeText={(v) => update("mobile", v)}
          />

          <FormField
            label="Email Address"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(v) => update("email", v)}
          />

          <View style={{ position: "relative" }}>
            <FormField
              label="Password"
              placeholder="Create secure password"
              secureTextEntry={!showPassword}
              value={form.password}
              onChangeText={(v) => update("password", v)}
            />
            <Pressable onPress={() => setShowPassword((v) => !v)} style={styles.eyeBtn}>
              {showPassword ? (
                <EyeOff size={18} color={colors.navyMuted} />
              ) : (
                <Eye size={18} color={colors.navyMuted} />
              )}
            </Pressable>
          </View>

          <FormField
            label="Referral / Promo Code (Optional)"
            placeholder="e.g. WELCOME100"
            value={form.referral}
            onChangeText={(v) => update("referral", v)}
            autoCapitalize="characters"
          />
        </View>

        {/* Terms Agreement */}
        <Pressable onPress={() => setAgreed(!agreed)} style={styles.termsRow}>
          <View style={[styles.checkbox, agreed && styles.checkboxActive]}>
            {agreed && <Check size={14} color={colors.navy} strokeWidth={3} />}
          </View>
          <Text color={colors.navyMuted} style={{ flex: 1, fontSize: 12.5, lineHeight: 18 }}>
            I agree to the{" "}
            <Text
              weight="bold"
              color={colors.navy}
              onPress={() => navigation.navigate("TermsPrivacy")}
            >
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text
              weight="bold"
              color={colors.navy}
              onPress={() => navigation.navigate("TermsPrivacy")}
            >
              Privacy Policy
            </Text>
            .
          </Text>
        </Pressable>

        {/* Security badge */}
        <View style={styles.note}>
          <ShieldCheck size={18} color={colors.limeDark} />
          <Text color={colors.navyMuted} style={{ flex: 1, fontSize: 12 }}>
            Your data is 100% encrypted and protected.
          </Text>
        </View>

        {/* Submit */}
        <Button
          fullWidth
          size="lg"
          onPress={handleSubmit}
          disabled={!agreed}
          style={{ marginTop: 10 }}
        >
          Verify with OTP
        </Button>

        {/* Login Redirect */}
        <View style={styles.loginRow}>
          <Text color={colors.navyMuted} style={{ fontSize: 14 }}>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text weight="bold" color={colors.navy} style={{ fontSize: 14 }}> Sign in</Text>
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
    marginBottom: 16,
  },
  back: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 27,
    marginTop: 10,
    color: colors.navy,
  },
  sub: {
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 20,
  },
  eyeBtn: {
    position: "absolute",
    right: 14,
    top: 36,
    padding: 6,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.navyFaint,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: colors.lime,
    borderColor: colors.lime,
  },
  note: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: colors.lightGreen,
    borderRadius: 16,
    padding: 12,
    marginVertical: 14,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 24,
  },
});
