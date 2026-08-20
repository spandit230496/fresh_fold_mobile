import { useState } from "react";
import { View, StyleSheet, Pressable, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  Wallet, Plus, ArrowUpRight, ArrowDownLeft, Gift, Copy, Share2, Sparkles, Check, ShieldCheck
} from "lucide-react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Button from "../components/shared/Button";
import Badge from "../components/shared/Badge";
import { colors, radius } from "../theme/theme";

const initialTransactions = [
  { id: "tx1", title: "Friend Referral Bonus", desc: "Rahul joined FreshFold", amount: "+₹150.00", type: "credit", date: "17 Aug 2026" },
  { id: "tx2", title: "Paid for Order #FF-281903", desc: "Wash & Steam Ironing", amount: "-₹1,132.80", type: "debit", date: "15 Aug 2026" },
  { id: "tx3", title: "Added to Wallet", desc: "Via Google Pay UPI", amount: "+₹1,000.00", type: "credit", date: "10 Aug 2026" },
  { id: "tx4", title: "Order Cashback (5%)", desc: "Gold Member Reward", amount: "+₹52.90", type: "credit", date: "08 Aug 2026" },
];

export default function WalletScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [balance, setBalance] = useState(450.0);
  const [selectedTopup, setSelectedTopup] = useState(1000);
  const [copied, setCopied] = useState(false);
  const [transactions, setTransactions] = useState(initialTransactions);

  const referralCode = "ADITI150";

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddMoney = () => {
    setBalance((prev) => prev + selectedTopup);
    const newTx = {
      id: `tx-${Date.now()}`,
      title: "Added to Wallet",
      desc: "Instant UPI Top-up",
      amount: `+₹${selectedTopup}.00`,
      type: "credit",
      date: "Just now",
    };
    setTransactions([newTx, ...transactions]);
  };

  return (
    <Screen scroll={false}>
      <ScreenHeader title="FreshFold Wallet" />
      <Screen contentStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Wallet Balance Hero Card */}
        <View style={styles.balanceCard}>
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Wallet size={20} color={colors.white} />
              <Text weight="bold" color="rgba(255,255,255,0.8)" style={{ fontSize: 13, marginLeft: 8 }}>
                Available Balance
              </Text>
            </View>
            <Badge tone="light">100% Safe</Badge>
          </View>

          <Text weight="extrabold" color={colors.white} style={styles.balanceAmount}>
            ₹{balance.toFixed(2)}
          </Text>

          <Text color="rgba(255,255,255,0.7)" style={{ fontSize: 12, marginTop: 4 }}>
            Use for 1-click checkout with zero payment failures.
          </Text>
        </View>

        {/* Quick Top-up Section */}
        <View style={styles.topupSection}>
          <Text weight="extrabold" style={{ fontSize: 16, marginBottom: 12 }}>
            Quick Top-Up
          </Text>
          <View style={styles.chipsRow}>
            {[500, 1000, 2000].map((amt) => {
              const active = selectedTopup === amt;
              return (
                <Pressable
                  key={amt}
                  onPress={() => setSelectedTopup(amt)}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text weight="extrabold" color={active ? colors.navy : colors.navyMuted} style={{ fontSize: 15 }}>
                    +₹{amt}
                  </Text>
                  {amt >= 1000 && (
                    <Text weight="bold" color={colors.limeDark} style={{ fontSize: 10, marginTop: 2 }}>
                      {amt === 2000 ? "Get ₹200 Extra" : "Get ₹100 Extra"}
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>

          <Button
            fullWidth
            size="lg"
            icon={Plus}
            onPress={handleAddMoney}
            style={{ marginTop: 14 }}
          >
            Add ₹{selectedTopup} to Wallet
          </Button>
        </View>

        {/* Refer & Earn Banner */}
        <View style={styles.referCard}>
          <View style={styles.referIconWrap}>
            <Gift size={24} color={colors.navy} />
          </View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text weight="extrabold" style={{ fontSize: 15 }}>
              Refer Friends, Earn ₹150
            </Text>
            <Text color={colors.navyMuted} style={{ fontSize: 12, marginTop: 2, lineHeight: 17 }}>
              Give ₹100 discount to your friend, get ₹150 FreshFold Cash when they complete their first order.
            </Text>

            <View style={styles.codeRow}>
              <View style={styles.codeBox}>
                <Text weight="extrabold" color={colors.navy} style={{ fontSize: 13, letterSpacing: 1 }}>
                  {referralCode}
                </Text>
              </View>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                {copied ? <Check size={14} color={colors.limeDark} strokeWidth={3} /> : <Copy size={14} color={colors.navy} />}
                <Text weight="bold" color={colors.navy} style={{ fontSize: 12, marginLeft: 4 }}>
                  {copied ? "Copied" : "Copy"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Transactions List */}
        <View style={{ marginTop: 24 }}>
          <Text weight="extrabold" style={{ fontSize: 16, marginBottom: 14 }}>
            Recent Activity
          </Text>
          <View style={styles.txList}>
            {transactions.map((tx, i) => {
              const isCredit = tx.type === "credit";
              const isLast = i === transactions.length - 1;
              return (
                <View key={tx.id} style={[styles.txRow, !isLast && styles.txBorder]}>
                  <View style={[styles.txIconCircle, isCredit ? styles.creditIcon : styles.debitIcon]}>
                    {isCredit ? (
                      <ArrowDownLeft size={16} color={colors.limeDark} strokeWidth={2.5} />
                    ) : (
                      <ArrowUpRight size={16} color="#D93025" strokeWidth={2.5} />
                    )}
                  </View>

                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text weight="bold" style={{ fontSize: 13.5 }}>{tx.title}</Text>
                    <Text color={colors.navyMuted} style={{ fontSize: 11.5, marginTop: 2 }}>{tx.desc} · {tx.date}</Text>
                  </View>

                  <Text
                    weight="extrabold"
                    color={isCredit ? colors.limeDark : colors.navy}
                    style={{ fontSize: 14 }}
                  >
                    {tx.amount}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </Screen>
    </Screen>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: colors.navy,
    borderRadius: 24,
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceAmount: {
    fontSize: 32,
    marginTop: 12,
  },
  topupSection: {
    marginTop: 20,
  },
  chipsRow: {
    flexDirection: "row",
    gap: 10,
  },
  chip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  chipActive: {
    backgroundColor: colors.lightGreen,
    borderColor: colors.lime,
  },
  referCard: {
    flexDirection: "row",
    backgroundColor: colors.lightGreen,
    borderRadius: 22,
    padding: 16,
    marginTop: 22,
    alignItems: "flex-start",
  },
  referIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  codeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },
  codeBox: {
    backgroundColor: colors.white,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.navyFaint,
  },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  txList: {
    borderWidth: 1,
    borderColor: colors.navyFaint,
    borderRadius: 20,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  txRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  txBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.navyFaint,
  },
  txIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  creditIcon: {
    backgroundColor: colors.lightGreen,
  },
  debitIcon: {
    backgroundColor: "#FCE8E6",
  },
});
