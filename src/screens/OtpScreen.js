import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Pressable, TextInput, Platform, KeyboardAvoidingView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft, ShieldCheck, CheckCircle2, MessageSquare, RefreshCw, Edit3 } from "lucide-react-native";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Logo from "../components/shared/Logo";
import Button from "../components/shared/Button";
import { colors, radius } from "../theme/theme";

export default function OtpScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  
  const phone = route.params?.phone || "9876543210";
  const formattedPhone = phone.length === 10 ? `+91 ${phone.slice(0, 5)} ${phone.slice(5)}` : `+91 ${phone}`;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChangeText = (text, index) => {
    const cleanText = text.replace(/[^0-9]/g, "");
    const newOtp = [...otp];

    if (cleanText.length > 1) {
      // Handle paste
      const pasted = cleanText.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pasted[i] || "";
      }
      setOtp(newOtp);
      const lastIndex = Math.min(pasted.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();
      return;
    }

    newOtp[index] = cleanText;
    setOtp(newOtp);

    // Auto-advance
    if (cleanText && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handleAutoFill = () => {
    setOtp(["1", "2", "3", "4", "5", "6"]);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerified(true);
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Tabs" }],
        });
      }, 900);
    }, 600);
  };

  const isComplete = otp.every((d) => d !== "");

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

        {/* Success animation state */}
        {verified ? (
          <View style={styles.verifiedBox}>
            <View style={styles.verifiedIconCircle}>
              <CheckCircle2 size={56} color={colors.limeDark} />
            </View>
            <Text weight="extrabold" style={{ fontSize: 26, marginTop: 20 }}>
              Verified Successfully!
            </Text>
            <Text color={colors.navyMuted} style={{ fontSize: 14, marginTop: 8, textAlign: "center" }}>
              Welcome to FreshFold. Setting up your fresh wardrobe...
            </Text>
          </View>
        ) : (
          <>
            {/* Title & Info */}
            <View style={styles.hero}>
              <Text weight="extrabold" style={styles.title}>Verification Code</Text>
              <Text color={colors.navyMuted} style={styles.subtitle}>
                Please enter the 6-digit code sent to
              </Text>
              <View style={styles.phoneBadgeRow}>
                <Text weight="bold" color={colors.navy} style={{ fontSize: 15 }}>
                  {formattedPhone}
                </Text>
                <Pressable onPress={() => navigation.goBack()} style={styles.editBtn}>
                  <Edit3 size={14} color={colors.limeDark} />
                  <Text weight="bold" color={colors.limeDark} style={{ fontSize: 13, marginLeft: 4 }}>
                    Edit
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* 6 Digit OTP Input Boxes */}
            <View style={styles.otpGrid}>
              {otp.map((digit, index) => {
                const isFocused = otp.findIndex((v) => v === "") === index || (isComplete && index === 5);
                return (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    value={digit}
                    onChangeText={(text) => handleChangeText(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                    style={[
                      styles.otpBox,
                      digit ? styles.otpBoxFilled : null,
                    ]}
                  />
                );
              })}
            </View>

            {/* Demo code helper chip */}
            <Pressable onPress={handleAutoFill} style={styles.demoChip}>
              <Text weight="bold" color={colors.navy} style={{ fontSize: 12 }}>
                ⚡ Auto-fill Demo Code (123456)
              </Text>
            </Pressable>

            {/* Timer & Resend */}
            <View style={styles.resendSection}>
              {canResend ? (
                <View style={styles.resendRow}>
                  <Text color={colors.navyMuted} style={{ fontSize: 13.5 }}>Didn't receive the code? </Text>
                  <Pressable onPress={handleResend} style={{ flexDirection: "row", alignItems: "center" }}>
                    <RefreshCw size={13} color={colors.limeDark} style={{ marginRight: 4 }} />
                    <Text weight="bold" color={colors.limeDark} style={{ fontSize: 13.5 }}>Resend Code</Text>
                  </Pressable>
                </View>
              ) : (
                <Text color={colors.navyMuted} style={{ fontSize: 13.5 }}>
                  Resend code in <Text weight="bold" color={colors.navy}>00:{timer < 10 ? `0${timer}` : timer}</Text>
                </Text>
              )}
            </View>

            {/* Verify CTA */}
            <Button
              fullWidth
              size="lg"
              onPress={handleVerify}
              disabled={!isComplete || isVerifying}
              style={{ marginTop: 24 }}
            >
              {isVerifying ? "Verifying..." : "Verify & Continue"}
            </Button>

            {/* WhatsApp Resend Alternative */}
            <Pressable style={styles.waRow} onPress={handleResend}>
              <MessageSquare size={16} color={colors.navyMuted} />
              <Text color={colors.navyMuted} style={{ fontSize: 13, marginLeft: 8 }}>
                Get OTP via WhatsApp
              </Text>
            </Pressable>
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
  hero: {
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    color: colors.navy,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
  },
  phoneBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: colors.lightGreen,
    borderRadius: 8,
  },
  otpGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.lightGray,
    borderWidth: 2,
    borderColor: "transparent",
    textAlign: "center",
    fontSize: 22,
    fontFamily: "NunitoSans_700Bold",
    color: colors.navy,
  },
  otpBoxFilled: {
    borderColor: colors.lime,
    backgroundColor: colors.lightGreen,
  },
  demoChip: {
    alignSelf: "center",
    backgroundColor: colors.lightGray,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginBottom: 16,
  },
  resendSection: {
    alignItems: "center",
    marginVertical: 10,
  },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  waRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 10,
  },
  verifiedBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  verifiedIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.lightGreen,
    alignItems: "center",
    justifyContent: "center",
  },
});
