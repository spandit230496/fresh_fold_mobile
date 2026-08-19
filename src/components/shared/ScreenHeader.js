import { View, StyleSheet, Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "./Text";
import { colors } from "../../theme/theme";

export default function ScreenHeader({ title, showBack = true }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 10 }]}>
      {showBack && navigation.canGoBack() ? (
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={10}>
          <ChevronLeft size={22} color={colors.navy} />
        </Pressable>
      ) : (
        <View style={styles.backBtn} />
      )}
      <Text weight="extrabold" style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.backBtn} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.navyFaint,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: 17,
    textAlign: "center",
  },
});
