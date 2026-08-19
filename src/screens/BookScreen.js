import { useState } from "react";
import { View, StyleSheet, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { CheckCircle2, Zap } from "lucide-react-native";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Badge from "../components/shared/Badge";
import Button from "../components/shared/Button";
import FormField from "../components/shared/FormField";
import BookingStepper from "../components/booking/BookingStepper";
import { services } from "../data/services";
import { colors, radius } from "../theme/theme";

const initialForm = {
  name: "", mobile: "", email: "",
  house: "", street: "", area: "", city: "", pin: "",
  selectedServices: [],
  pickupDate: "", pickupTime: "",
  speed: "regular",
};

export default function BookScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [done, setDone] = useState(false);
  const [bookingId] = useState(() => `FF-${Math.floor(100000 + Math.random() * 900000)}`);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const toggleService = (slug) => setForm((f) => ({
    ...f,
    selectedServices: f.selectedServices.includes(slug)
      ? f.selectedServices.filter((s) => s !== slug)
      : [...f.selectedServices, slug],
  }));
  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => (step === 1 ? null : setStep((s) => s - 1));
  const reset = () => { setForm(initialForm); setStep(1); setDone(false); };

  if (done) {
    return (
      <Screen contentStyle={{ paddingTop: insets.top + 30, paddingHorizontal: 20 }}>
        <View style={styles.doneWrap}>
          <View style={styles.doneIcon}>
            <CheckCircle2 size={40} color={colors.limeDark} />
          </View>
          <Text weight="extrabold" style={{ fontSize: 26, marginTop: 20 }}>Pickup Scheduled!</Text>
          <Text color="rgba(16,35,63,0.6)" style={{ fontSize: 14, marginTop: 8, textAlign: "center" }}>
            We'll see you on {form.pickupDate || "your selected date"} at {form.pickupTime || "the selected time"}.
          </Text>
          <View style={styles.idBox}>
            <Text weight="bold" color="rgba(16,35,63,0.45)" style={{ fontSize: 11, textTransform: "uppercase" }}>
              Booking ID
            </Text>
            <Text weight="extrabold" style={{ fontSize: 20, marginTop: 4 }}>{bookingId}</Text>
          </View>
          <View style={{ gap: 12, marginTop: 24, alignSelf: "stretch" }}>
            <Button fullWidth onPress={() => navigation.navigate("Tabs", { screen: "Track" })}>Track This Order</Button>
            <Button fullWidth variant="outline" onPress={reset}>Book Another Pickup</Button>
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Screen contentStyle={{ paddingTop: insets.top + 20, paddingHorizontal: 20 }}>
        <Badge tone="light">Schedule Pickup</Badge>
        <Text weight="extrabold" style={{ fontSize: 24, marginTop: 10 }}>Book Your Pickup</Text>
        <Text color="rgba(16,35,63,0.6)" style={{ fontSize: 13.5, marginTop: 4, marginBottom: 24 }}>
          A few quick steps and we'll be at your door.
        </Text>

        <BookingStepper current={step} />

        {step === 1 && (
          <View style={{ gap: 16 }}>
            <FormField label="Full Name" placeholder="Your name" value={form.name} onChangeText={(v) => update("name", v)} />
            <FormField label="Mobile Number" placeholder="10-digit mobile number" keyboardType="phone-pad" value={form.mobile} onChangeText={(v) => update("mobile", v)} />
            <FormField label="Email" placeholder="you@example.com" keyboardType="email-address" value={form.email} onChangeText={(v) => update("email", v)} />
          </View>
        )}

        {step === 2 && (
          <View style={{ gap: 16 }}>
            <FormField label="House / Flat No." placeholder="House number" value={form.house} onChangeText={(v) => update("house", v)} />
            <FormField label="Street" placeholder="Street name" value={form.street} onChangeText={(v) => update("street", v)} />
            <FormField label="Area" placeholder="Area / Locality" value={form.area} onChangeText={(v) => update("area", v)} />
            <FormField label="City" placeholder="City" value={form.city} onChangeText={(v) => update("city", v)} />
            <FormField label="PIN Code" placeholder="6-digit PIN" keyboardType="number-pad" value={form.pin} onChangeText={(v) => update("pin", v)} />
          </View>
        )}

        {step === 3 && (
          <View style={styles.serviceGrid}>
            {services.map((s) => {
              const selected = form.selectedServices.includes(s.slug);
              return (
                <Pressable
                  key={s.slug}
                  onPress={() => toggleService(s.slug)}
                  style={[styles.serviceOpt, selected && styles.serviceOptActive]}
                >
                  <View style={styles.serviceOptTop}>
                    <Text weight="extrabold" style={{ fontSize: 13.5, flex: 1 }}>{s.title}</Text>
                    {selected && <CheckCircle2 size={16} color={colors.navy} />}
                  </View>
                  <Text color="rgba(16,35,63,0.55)" style={{ fontSize: 11, marginTop: 4 }}>
                    From {s.price} {s.priceUnit}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

        {step === 4 && (
          <View style={{ gap: 16 }}>
            <FormField label="Pickup Date" placeholder="DD/MM/YYYY" value={form.pickupDate} onChangeText={(v) => update("pickupDate", v)} />
            <FormField label="Pickup Time" placeholder="e.g. 5:00 PM" value={form.pickupTime} onChangeText={(v) => update("pickupTime", v)} />
            <View style={{ flexDirection: "row", gap: 12 }}>
              {["regular", "express"].map((speed) => (
                <Pressable
                  key={speed}
                  onPress={() => update("speed", speed)}
                  style={[styles.speedOpt, form.speed === speed && styles.serviceOptActive]}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {speed === "express" && <Zap size={14} color={colors.navy} style={{ marginRight: 4 }} />}
                    <Text weight="extrabold" style={{ fontSize: 14, textTransform: "capitalize" }}>{speed}</Text>
                  </View>
                  <Text color="rgba(16,35,63,0.55)" style={{ fontSize: 11, marginTop: 4 }}>
                    {speed === "express" ? "Priority turnaround" : "Standard turnaround"}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {step === 5 && (
          <View style={styles.reviewCard}>
            {[
              ["Name", form.name || "—"],
              ["Mobile", form.mobile || "—"],
              ["Address", [form.house, form.street, form.area, form.city, form.pin].filter(Boolean).join(", ") || "—"],
              ["Services", form.selectedServices.join(", ") || "—"],
              ["Pickup", [form.pickupDate, form.pickupTime].filter(Boolean).join(" · ") || "—"],
              ["Speed", form.speed],
            ].map(([label, value], i, arr) => (
              <View key={label} style={[styles.reviewRow, i === arr.length - 1 && { borderBottomWidth: 0 }]}>
                <Text color="rgba(16,35,63,0.5)" style={{ fontSize: 13 }}>{label}</Text>
                <Text weight="bold" style={{ fontSize: 13, flex: 1, textAlign: "right", marginLeft: 12, textTransform: "capitalize" }}>
                  {value}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.navRow}>
          {step > 1 && (
            <Button variant="outline" onPress={back}>Back</Button>
          )}
          {step < 5 ? (
            <Button onPress={next}>Continue</Button>
          ) : (
            <Button onPress={() => navigation.navigate("Payment", { bookingId, pickupDate: form.pickupDate, pickupTime: form.pickupTime })}>Continue to Payment</Button>
          )}
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  serviceGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  serviceOpt: {
    width: "47%", borderWidth: 2, borderColor: colors.navyFaint, borderRadius: 18, padding: 14,
  },
  serviceOptActive: { borderColor: colors.lime, backgroundColor: colors.lightGreen },
  serviceOptTop: { flexDirection: "row", alignItems: "center" },
  speedOpt: { flex: 1, borderWidth: 2, borderColor: colors.navyFaint, borderRadius: 18, padding: 16 },
  reviewCard: { borderWidth: 1, borderColor: colors.navyFaint, borderRadius: radius.cardLg, overflow: "hidden" },
  reviewRow: {
    flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between",
    padding: 16, borderBottomWidth: 1, borderBottomColor: colors.navyFaint,
  },
  navRow: { flexDirection: "row", gap: 12, marginTop: 28 },
  doneWrap: { alignItems: "center" },
  doneIcon: {
    width: 80, height: 80, borderRadius: 999, backgroundColor: colors.lightGreen,
    alignItems: "center", justifyContent: "center",
  },
  idBox: { backgroundColor: colors.lightGray, borderRadius: 18, paddingHorizontal: 24, paddingVertical: 16, marginTop: 20, alignItems: "center" },
});
