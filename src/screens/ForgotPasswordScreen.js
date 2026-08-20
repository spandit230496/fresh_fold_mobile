import { useState } from "react";
import { View, StyleSheet, Pressable, Platform, KeyboardAvoidingView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Mail, Smartphone, KeyRound } from "lucide-react-native";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Logo from "../components/shared/Logo";
import Button from "../components/shared/Button";
import FormField from "../components/shared/FormField";
import { colors, radius } from "../theme/theme";

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [identifier, setIdentifier] = useState("");

  const handleSubmit = () => {
    navigation.navigate("ResetPassword", {
      identifier: identifier || "user@example.com",
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Screen contentStyle={{ paddingTop: insets.top + 16, paddingHorizontal: 22 }}>
        {/* Header */}
        <View style={styles.topRow}>
          <Pressable onPress={() => navigation.goBack()} style={styles.back}>
            <ArrowLeft size={20} color={colors.navy} />
          </Pressable>
          <Logo />
          <View style={{ width: 42 }} />
        </View>

        {/* Hero Icon */}
        <View style={styles.iconCircle}>
          <KeyRound size={32} color={colors.navy} />
        </View>

        <Text weight="extrabold" style={styles.title}>Forgot Password?</Text>
        <Text color={colors.navyMuted} style={styles.subtitle}>
          Don't worry! Enter your registered email or phone number and we'll send you recovery instructions.
        </Text>

        <View style={{ gap: 16, marginTop: 24 }}>
          <FormField
            label="Email or Mobile Number"
            placeholder="e.g. you@example.com or 9876543210"
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
          />

          <Button
            fullWidth
            size="lg"
            onPress={handleSubmit}
            style={{ marginTop: 12 }}
          >
            Send Reset Instructions
          </Button>
        </View>

        <View style={styles.bottomRow}>
          <Text color={colors.navyMuted} style={{ fontSize: 14 }}>Remember your password?</Text>
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
    marginBottom: 24,
  },
  back: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.lightGreen,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    color: colors.navy,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 21,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 36,
  },
});
