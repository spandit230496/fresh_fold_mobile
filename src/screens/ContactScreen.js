import { View, StyleSheet } from "react-native";
import { Phone, Mail, MessageCircle, Clock } from "lucide-react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import FormField from "../components/shared/FormField";
import Button from "../components/shared/Button";
import { colors } from "../theme/theme";

const channels = [
  { icon: Phone, label: "Phone", value: "1800 123 4567" },
  { icon: Mail, label: "Email", value: "support@freshfold.in" },
  { icon: MessageCircle, label: "WhatsApp", value: "+91 99999 99999" },
  { icon: Clock, label: "Support Hours", value: "7:00 AM – 10:00 PM, Mon–Sun" },
];

export default function ContactScreen() {
  return (
    <Screen scroll={false}>
      <ScreenHeader title="Contact" />
      <Screen contentStyle={{ padding: 20 }}>
        <View style={{ gap: 12, marginBottom: 26 }}>
          {channels.map((c) => (
            <View key={c.label} style={styles.channelRow}>
              <View style={styles.iconWrap}>
                <c.icon size={17} color={colors.navy} />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text weight="bold" color="rgba(16,35,63,0.45)" style={{ fontSize: 10.5, textTransform: "uppercase" }}>{c.label}</Text>
                <Text weight="bold" style={{ fontSize: 14, marginTop: 2 }}>{c.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text weight="extrabold" style={{ fontSize: 16, marginBottom: 14 }}>Send a Message</Text>
        <View style={{ gap: 14 }}>
          <FormField label="Name" placeholder="Your name" />
          <FormField label="Phone" placeholder="Mobile number" keyboardType="phone-pad" />
          <FormField label="Email" placeholder="you@example.com" keyboardType="email-address" />
          <FormField label="Message" placeholder="How can we help?" multiline />
        </View>
        <Button fullWidth style={{ marginTop: 18 }}>Send Message</Button>
      </Screen>
    </Screen>
  );
}

const styles = StyleSheet.create({
  channelRow: { flexDirection: "row", alignItems: "center" },
  iconWrap: {
    width: 38, height: 38, borderRadius: 14, backgroundColor: colors.lightGreen,
    alignItems: "center", justifyContent: "center",
  },
});
