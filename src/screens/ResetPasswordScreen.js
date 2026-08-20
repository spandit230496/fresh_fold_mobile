import { useState } from "react";
import { View, StyleSheet, Pressable, Platform, KeyboardAvoidingView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Check, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react-native";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Logo from "../components/shared/Logo";
import Button from "../components/shared/Button";
import FormField from "../components/shared/FormField";
import { colors, radius } from "../theme/theme";

export default function ResetPasswordScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const hasLength = newPassword.length >= 8;
  const hasNumber = /\d/.test(newPassword);
  const isMatch = newPassword && newPassword === confirmPassword;

  const handleSubmit = () => {
    setSuccess(true);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Screen contentStyle={{ paddingTop: insets.top + 16, paddingHorizontal: 22 }}>
        <View style={styles.topRow}>
          <Pressable onPress={() => navigation.goBack()} style={styles.back}>
            <ArrowLeft size={20} color={colors.navy} />
          </Pressable>
          <Logo />
          <View style={{ width: 42 }} />
        </View>

        {success ? (
          <View style={styles.successWrap}>
            <View style={styles.successIcon}>
              <CheckCircle2 size={56} color={colors.limeDark} />
            </View>
            <Text weight="extrabold" style={{ fontSize: 26, marginTop: 20 }}>
              Password Reset!
            </Text>
            <Text color={colors.navyMuted} style={{ fontSize: 14, marginTop: 8, textAlign: "center", lineHeight: 21 }}>
              Your password has been successfully updated. You can now sign in with your new credentials.
            </Text>

            <Button
              fullWidth
              size="lg"
              onPress={() => navigation.navigate("Login")}
              style={{ marginTop: 32 }}
            >
              Back to Sign In
            </Button>
          </View>
        ) : (
          <>
            <Text weight="extrabold" style={styles.title}>Create New Password</Text>
            <Text color={colors.navyMuted} style={styles.subtitle}>
              Your new password must be different from previous passwords.
            </Text>

            <View style={{ gap: 16, marginTop: 24 }}>
              <View style={{ position: "relative" }}>
                <FormField
                  label="New Password"
                  placeholder="Enter new password"
                  secureTextEntry={!showPassword}
                  value={newPassword}
                  onChangeText={setNewPassword}
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
                label="Confirm Password"
                placeholder="Re-enter new password"
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            {/* Checklist */}
            <View style={styles.checklist}>
              <View style={styles.checkItem}>
                <View style={[styles.checkCircle, hasLength && styles.checkCircleActive]}>
                  {hasLength && <Check size={11} color={colors.navy} strokeWidth={3} />}
                </View>
                <Text color={hasLength ? colors.navy : colors.navyMuted} style={{ fontSize: 12.5, marginLeft: 8 }}>
                  At least 8 characters
                </Text>
              </View>

              <View style={styles.checkItem}>
                <View style={[styles.checkCircle, hasNumber && styles.checkCircleActive]}>
                  {hasNumber && <Check size={11} color={colors.navy} strokeWidth={3} />}
                </View>
                <Text color={hasNumber ? colors.navy : colors.navyMuted} style={{ fontSize: 12.5, marginLeft: 8 }}>
                  Includes at least one number
                </Text>
              </View>

              <View style={styles.checkItem}>
                <View style={[styles.checkCircle, isMatch && styles.checkCircleActive]}>
                  {isMatch && <Check size={11} color={colors.navy} strokeWidth={3} />}
                </View>
                <Text color={isMatch ? colors.navy : colors.navyMuted} style={{ fontSize: 12.5, marginLeft: 8 }}>
                  Passwords match
                </Text>
              </View>
            </View>

            <Button
              fullWidth
              size="lg"
              onPress={handleSubmit}
              disabled={!hasLength || !hasNumber || !isMatch}
              style={{ marginTop: 24 }}
            >
              Reset Password
            </Button>
          </>
        )}
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
  title: {
    fontSize: 27,
    color: colors.navy,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
  },
  eyeBtn: {
    position: "absolute",
    right: 14,
    top: 36,
    padding: 6,
  },
  checklist: {
    marginTop: 18,
    gap: 10,
    backgroundColor: colors.lightGray,
    padding: 14,
    borderRadius: 16,
  },
  checkItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircleActive: {
    backgroundColor: colors.lime,
  },
  successWrap: {
    alignItems: "center",
    paddingTop: 40,
  },
  successIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.lightGreen,
    alignItems: "center",
    justifyContent: "center",
  },
});
