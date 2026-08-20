import { useState } from "react";
import { View, StyleSheet, Pressable, Platform, KeyboardAvoidingView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Camera, Check } from "lucide-react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Button from "../components/shared/Button";
import FormField from "../components/shared/FormField";
import { colors, radius } from "../theme/theme";

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [form, setForm] = useState({
    name: "Aditi Sharma",
    phone: "9876543210",
    email: "aditi.sharma@example.com",
    gender: "Female",
    dob: "14/05/1996",
    instructions: "Please call on arrival. Do not iron delicate silks with high heat.",
  });

  const [saved, setSaved] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      navigation.goBack();
    }, 800);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Screen scroll={false}>
        <ScreenHeader title="Edit Profile" />
        <Screen contentStyle={{ padding: 20, paddingBottom: 40 }}>
          {/* Avatar Edit */}
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text weight="extrabold" color={colors.navy} style={{ fontSize: 30 }}>AS</Text>
              <Pressable style={styles.cameraBtn}>
                <Camera size={16} color={colors.white} />
              </Pressable>
            </View>
            <Text weight="bold" color={colors.limeDark} style={{ fontSize: 13, marginTop: 10 }}>
              Change Photo
            </Text>
          </View>

          {/* Form Fields */}
          <View style={{ gap: 16, marginTop: 16 }}>
            <FormField
              label="Full Name"
              value={form.name}
              onChangeText={(v) => update("name", v)}
            />

            <FormField
              label="Phone Number"
              value={form.phone}
              onChangeText={(v) => update("phone", v)}
              keyboardType="phone-pad"
            />

            <FormField
              label="Email Address"
              value={form.email}
              onChangeText={(v) => update("email", v)}
              keyboardType="email-address"
            />

            {/* Gender Selection */}
            <View>
              <Text weight="bold" color="rgba(16,35,63,0.45)" style={styles.fieldLabel}>
                Gender
              </Text>
              <View style={styles.genderRow}>
                {["Female", "Male", "Other"].map((g) => {
                  const active = form.gender === g;
                  return (
                    <Pressable
                      key={g}
                      onPress={() => update("gender", g)}
                      style={[styles.genderBtn, active && styles.genderBtnActive]}
                    >
                      <Text
                        weight={active ? "bold" : "semibold"}
                        color={active ? colors.navy : colors.navyMuted}
                        style={{ fontSize: 13 }}
                      >
                        {g}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <FormField
              label="Date of Birth"
              placeholder="DD/MM/YYYY"
              value={form.dob}
              onChangeText={(v) => update("dob", v)}
            />

            <FormField
              label="Default Garment / Delivery Note"
              placeholder="e.g. Call before delivery, separate whites"
              value={form.instructions}
              onChangeText={(v) => update("instructions", v)}
              multiline
            />
          </View>

          {saved && (
            <View style={styles.savedBanner}>
              <Check size={16} color={colors.limeDark} strokeWidth={3} />
              <Text weight="bold" color={colors.navy} style={{ marginLeft: 8, fontSize: 13 }}>
                Profile changes saved!
              </Text>
            </View>
          )}

          <Button
            fullWidth
            size="lg"
            onPress={handleSave}
            style={{ marginTop: 24 }}
          >
            {saved ? "Saved" : "Save Changes"}
          </Button>
        </Screen>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  avatarSection: {
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cameraBtn: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.white,
  },
  fieldLabel: {
    fontSize: 11,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  genderRow: {
    flexDirection: "row",
    gap: 10,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: radius.input,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  genderBtnActive: {
    backgroundColor: colors.lightGreen,
    borderColor: colors.lime,
  },
  savedBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGreen,
    padding: 12,
    borderRadius: 14,
    marginTop: 16,
  },
});
