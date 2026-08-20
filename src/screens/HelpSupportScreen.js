import { useState } from "react";
import { View, StyleSheet, Pressable, Linking, ScrollView, Modal, Platform, KeyboardAvoidingView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  HelpCircle, MessageSquare, Phone, Mail, ChevronRight, Send, CheckCircle2,
  FileQuestion, AlertCircle, X, Clock
} from "lucide-react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Button from "../components/shared/Button";
import FormField from "../components/shared/FormField";
import { colors, radius } from "../theme/theme";

const issueTopics = [
  "Pickup Delayed or Missed",
  "Damage or Color Bleed Concern",
  "Incorrect Garment Count",
  "Payment / Refund Query",
  "Change Delivery Address / Time",
  "Other Query",
];

export default function HelpSupportScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const defaultOrderId = route.params?.orderId || "";

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(issueTopics[0]);
  const [orderNumber, setOrderNumber] = useState(defaultOrderId);
  const [description, setDescription] = useState("");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const handleWhatsApp = () => {
    Linking.openURL("https://wa.me/919876543210?text=Hi%20FreshFold%20Support,%20I%20need%20help%20with%20my%20laundry%20order.").catch(() => {});
  };

  const handleCall = () => {
    Linking.openURL("tel:18002093653").catch(() => {});
  };

  const handleEmail = () => {
    Linking.openURL("mailto:care@freshfold.in?subject=FreshFold%20Support%20Request").catch(() => {});
  };

  const handleRaiseTicket = () => {
    if (!description.trim()) return;
    const generatedId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);
    setTicketSubmitted(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTicketSubmitted(false);
    setDescription("");
  };

  return (
    <Screen scroll={false}>
      <ScreenHeader title="Help & Support" />
      <Screen contentStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text weight="extrabold" style={{ fontSize: 22 }}>How can we help you?</Text>
        <Text color={colors.navyMuted} style={{ fontSize: 13.5, marginTop: 4, marginBottom: 20 }}>
          Our garment-care specialists are here 7 days a week, 8:00 AM – 9:00 PM.
        </Text>

        {/* Quick Contact Options */}
        <View style={{ gap: 12 }}>
          {/* WhatsApp */}
          <Pressable onPress={handleWhatsApp} style={styles.channelCard}>
            <View style={[styles.channelIcon, { backgroundColor: "#E7F8EE" }]}>
              <MessageSquare size={22} color="#1E7E34" />
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text weight="extrabold" style={{ fontSize: 15 }}>Chat on WhatsApp</Text>
              <Text color={colors.navyMuted} style={{ fontSize: 12, marginTop: 2 }}>
                Instant response · Avg reply under 2 mins
              </Text>
            </View>
            <ChevronRight size={18} color={colors.navyMuted} />
          </Pressable>

          {/* Toll Free Phone */}
          <Pressable onPress={handleCall} style={styles.channelCard}>
            <View style={[styles.channelIcon, { backgroundColor: colors.lightGreen }]}>
              <Phone size={22} color={colors.navy} />
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text weight="extrabold" style={{ fontSize: 15 }}>Call Toll-Free</Text>
              <Text color={colors.navyMuted} style={{ fontSize: 12, marginTop: 2 }}>
                1800-209-FOLD (3653) · 8 AM to 9 PM
              </Text>
            </View>
            <ChevronRight size={18} color={colors.navyMuted} />
          </Pressable>

          {/* Email */}
          <Pressable onPress={handleEmail} style={styles.channelCard}>
            <View style={[styles.channelIcon, { backgroundColor: "#E8EEF5" }]}>
              <Mail size={22} color={colors.navy} />
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text weight="extrabold" style={{ fontSize: 15 }}>Email Support</Text>
              <Text color={colors.navyMuted} style={{ fontSize: 12, marginTop: 2 }}>
                care@freshfold.in · Response within 4 hours
              </Text>
            </View>
            <ChevronRight size={18} color={colors.navyMuted} />
          </Pressable>
        </View>

        {/* Raise a Support Ticket Banner */}
        <View style={styles.ticketBanner}>
          <AlertCircle size={24} color={colors.limeDark} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text weight="extrabold" style={{ fontSize: 15 }}>Have a specific issue?</Text>
            <Text color={colors.navyMuted} style={{ fontSize: 12, marginTop: 2 }}>
              Log a formal support ticket with photos or garment notes.
            </Text>
          </View>
          <Button
            size="sm"
            onPress={() => setModalVisible(true)}
            style={{ alignSelf: "center", marginLeft: 8 }}
          >
            Raise Ticket
          </Button>
        </View>

        {/* FAQ Quick Link */}
        <View style={{ marginTop: 24 }}>
          <Text weight="extrabold" style={{ fontSize: 16, marginBottom: 12 }}>
            Frequently Asked Questions
          </Text>
          <Pressable
            onPress={() => navigation.navigate("FAQ")}
            style={styles.faqRow}
          >
            <FileQuestion size={18} color={colors.navy} />
            <Text weight="semibold" style={{ fontSize: 14, flex: 1, marginLeft: 12 }}>
              Browse all FAQs and Garment Care Tips
            </Text>
            <ChevronRight size={18} color={colors.navyMuted} />
          </Pressable>
        </View>
      </Screen>

      {/* Ticket Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={handleCloseModal}
      >
        <KeyboardAvoidingView
          style={styles.modalBackdrop}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={[styles.modalSheet, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.modalHeader}>
              <Text weight="extrabold" style={{ fontSize: 18 }}>
                {ticketSubmitted ? "Ticket Created" : "Raise Support Ticket"}
              </Text>
              <Pressable onPress={handleCloseModal} style={styles.closeBtn}>
                <X size={18} color={colors.navy} />
              </Pressable>
            </View>

            {ticketSubmitted ? (
              <View style={styles.ticketSuccess}>
                <View style={styles.successIconCircle}>
                  <CheckCircle2 size={48} color={colors.limeDark} />
                </View>
                <Text weight="extrabold" style={{ fontSize: 20, marginTop: 16 }}>
                  Ticket Logged!
                </Text>
                <Text color={colors.navyMuted} style={{ fontSize: 13, textAlign: "center", marginTop: 6, lineHeight: 19 }}>
                  Our senior garment care manager is reviewing your issue and will call you within 60 minutes.
                </Text>
                <View style={styles.ticketIdBox}>
                  <Text color={colors.navyMuted} style={{ fontSize: 11, textTransform: "uppercase" }}>
                    Ticket Reference
                  </Text>
                  <Text weight="extrabold" style={{ fontSize: 18, marginTop: 2 }}>{ticketId}</Text>
                </View>
                <Button fullWidth size="lg" onPress={handleCloseModal} style={{ marginTop: 20 }}>
                  Done
                </Button>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 420 }}>
                <FormField
                  label="Order ID (Optional)"
                  placeholder="e.g. FF-482910"
                  value={orderNumber}
                  onChangeText={setOrderNumber}
                  style={{ marginBottom: 14 }}
                />

                <Text weight="bold" color="rgba(16,35,63,0.45)" style={styles.fieldLabel}>
                  Select Issue Type
                </Text>
                <View style={{ gap: 8, marginBottom: 14 }}>
                  {issueTopics.map((top) => {
                    const active = selectedIssue === top;
                    return (
                      <Pressable
                        key={top}
                        onPress={() => setSelectedIssue(top)}
                        style={[styles.topicChoice, active && styles.topicChoiceActive]}
                      >
                        <Text
                          weight={active ? "bold" : "medium"}
                          color={active ? colors.navy : colors.navyMuted}
                          style={{ fontSize: 13 }}
                        >
                          {top}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                <FormField
                  label="Describe the issue"
                  placeholder="Please tell us details so we can resolve this quickly..."
                  value={description}
                  onChangeText={setDescription}
                  multiline
                />

                <Button
                  fullWidth
                  size="lg"
                  icon={Send}
                  onPress={handleRaiseTicket}
                  disabled={!description.trim()}
                  style={{ marginTop: 18 }}
                >
                  Submit Ticket
                </Button>
              </ScrollView>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  channelCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: radius.card,
    borderWidth: 1.5,
    borderColor: colors.navyFaint,
    backgroundColor: colors.white,
  },
  channelIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  ticketBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGreen,
    padding: 16,
    borderRadius: 20,
    marginTop: 20,
  },
  faqRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.lightGray,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(16,35,63,0.5)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 22,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldLabel: {
    fontSize: 11,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  topicChoice: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  topicChoiceActive: {
    backgroundColor: colors.lightGreen,
    borderColor: colors.lime,
  },
  ticketSuccess: {
    alignItems: "center",
    paddingVertical: 20,
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.lightGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  ticketIdBox: {
    backgroundColor: colors.lightGray,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 16,
    alignItems: "center",
  },
});
