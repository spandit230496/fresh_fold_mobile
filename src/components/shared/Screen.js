import { ScrollView, View, StyleSheet } from "react-native";
import { colors } from "../../theme/theme";

export default function Screen({ children, scroll = true, style, contentStyle }) {
  if (!scroll) {
    return <View style={[styles.flex, style]}>{children}</View>;
  }
  return (
    <ScrollView
      style={[styles.flex, style]}
      contentContainerStyle={[styles.content, contentStyle]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.white },
  content: { paddingBottom: 40 },
});
