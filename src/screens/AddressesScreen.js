import { useState } from "react";
import { View, StyleSheet, Pressable, Modal, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  MapPin, Plus, Check, Trash2, Edit3, Home, Briefcase, Sparkles, X, CheckCircle2
} from "lucide-react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Button from "../components/shared/Button";
import FormField from "../components/shared/FormField";
import { colors, radius } from "../theme/theme";

const initialAddresses = [
  {
    id: "addr-1",
    tag: "Home",
    house: "Flat 402, Sunshine Heights",
    street: "Near Jupiter Hospital, Baner Road",
    city: "Pune",
    pin: "411045",
    isDefault: true,
  },
  {
    id: "addr-2",
    tag: "Office",
    house: "4th Floor, TechPark One",
    street: "Next to Westend Mall, Aundh",
    city: "Pune",
    pin: "411007",
    isDefault: false,
  },
];

export default function AddressesScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState(initialAddresses);
  const [modalVisible, setModalVisible] = useState(false);

  // New address form
  const [tag, setTag] = useState("Home");
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("Pune");
  const [pin, setPin] = useState("");

  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddAddress = () => {
    if (!house.trim()) return;
    const newAddr = {
      id: `addr-${Date.now()}`,
      tag,
      house,
      street,
      city: city || "Pune",
      pin: pin || "411045",
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, newAddr]);
    setModalVisible(false);
    setHouse("");
    setStreet("");
    setPin("");
  };

  return (
    <Screen scroll={false}>
      <ScreenHeader title="Saved Addresses" />
      <Screen contentStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text color={colors.navyMuted} style={{ fontSize: 13.5, marginBottom: 18 }}>
          Manage your pickup and delivery locations for speedy booking.
        </Text>

        {/* Address Cards */}
        <View style={{ gap: 14 }}>
          {addresses.map((addr) => {
            const isHome = addr.tag.toLowerCase() === "home";
            const isOffice = addr.tag.toLowerCase() === "office";
            const Icon = isHome ? Home : isOffice ? Briefcase : MapPin;

            return (
              <View
                key={addr.id}
                style={[styles.addrCard, addr.isDefault && styles.addrCardActive]}
              >
                <View style={styles.topRow}>
                  <View style={styles.tagWrap}>
                    <Icon size={14} color={colors.navy} />
                    <Text weight="extrabold" style={{ fontSize: 13, marginLeft: 6 }}>
                      {addr.tag}
                    </Text>
                  </View>

                  {addr.isDefault ? (
                    <View style={styles.defaultBadge}>
                      <Check size={12} color={colors.limeDark} strokeWidth={3} />
                      <Text weight="bold" color={colors.navy} style={{ fontSize: 11, marginLeft: 4 }}>
                        Default
                      </Text>
                    </View>
                  ) : (
                    <Pressable
                      onPress={() => handleSetDefault(addr.id)}
                      style={styles.setDefaultBtn}
                    >
                      <Text weight="bold" color={colors.limeDark} style={{ fontSize: 12 }}>
                        Set as Default
                      </Text>
                    </Pressable>
                  )}
                </View>

                <Text weight="bold" style={{ fontSize: 15, marginTop: 10 }}>
                  {addr.house}
                </Text>
                <Text color={colors.navyMuted} style={{ fontSize: 13, marginTop: 3, lineHeight: 19 }}>
                  {addr.street}, {addr.city} – {addr.pin}
                </Text>

                <View style={styles.cardActions}>
                  <Pressable
                    onPress={() => handleDelete(addr.id)}
                    style={styles.actionBtn}
                  >
                    <Trash2 size={15} color="#D93025" />
                    <Text weight="bold" color="#D93025" style={{ fontSize: 12, marginLeft: 5 }}>
                      Delete
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>

        {/* Add Address CTA */}
        <Button
          variant="outline"
          fullWidth
          size="lg"
          icon={Plus}
          onPress={() => setModalVisible(true)}
          style={{ marginTop: 24 }}
        >
          Add New Address
        </Button>
      </Screen>

      {/* Add Address Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalBackdrop}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={[styles.modalSheet, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.modalHeader}>
              <Text weight="extrabold" style={{ fontSize: 18 }}>Add New Address</Text>
              <Pressable onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                <X size={18} color={colors.navy} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
              {/* Tag Selector */}
              <Text weight="bold" color="rgba(16,35,63,0.45)" style={styles.fieldLabel}>
                Address Type
              </Text>
              <View style={styles.tagSelector}>
                {["Home", "Office", "Other"].map((t) => (
                  <Pressable
                    key={t}
                    onPress={() => setTag(t)}
                    style={[styles.tagChoice, tag === t && styles.tagChoiceActive]}
                  >
                    <Text
                      weight={tag === t ? "bold" : "semibold"}
                      color={tag === t ? colors.navy : colors.navyMuted}
                      style={{ fontSize: 13 }}
                    >
                      {t}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View style={{ gap: 14, marginTop: 14 }}>
                <FormField
                  label="House / Flat / Building No."
                  placeholder="e.g. Flat 301, Tower B"
                  value={house}
                  onChangeText={setHouse}
                />
                <FormField
                  label="Street / Area / Locality"
                  placeholder="e.g. Near Westend Mall, Aundh"
                  value={street}
                  onChangeText={setStreet}
                />
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <FormField
                    label="City"
                    value={city}
                    onChangeText={setCity}
                    style={{ flex: 1 }}
                  />
                  <FormField
                    label="PIN Code"
                    placeholder="6 digits"
                    value={pin}
                    onChangeText={setPin}
                    keyboardType="number-pad"
                    style={{ flex: 1 }}
                  />
                </View>
              </View>
            </ScrollView>

            <Button
              fullWidth
              size="lg"
              onPress={handleAddAddress}
              disabled={!house.trim()}
              style={{ marginTop: 16 }}
            >
              Save Address
            </Button>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  addrCard: {
    borderWidth: 1.5,
    borderColor: colors.navyFaint,
    borderRadius: radius.card,
    padding: 18,
    backgroundColor: colors.white,
  },
  addrCardActive: {
    borderColor: colors.lime,
    backgroundColor: "#FAFDF4",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGreen,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  defaultBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  setDefaultBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.navyFaint,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
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
  tagSelector: {
    flexDirection: "row",
    gap: 10,
  },
  tagChoice: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: radius.input,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  tagChoiceActive: {
    backgroundColor: colors.lightGreen,
    borderColor: colors.lime,
  },
});
