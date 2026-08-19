import { View } from "react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import FAQAccordion from "../components/shared/FAQAccordion";
import { faqCategories } from "../data/faqs";

export default function FAQScreen() {
  return (
    <Screen scroll={false}>
      <ScreenHeader title="FAQ" />
      <Screen contentStyle={{ padding: 20 }}>
        {faqCategories.map((cat) => (
          <View key={cat.category} style={{ marginBottom: 26 }}>
            <Text weight="extrabold" style={{ fontSize: 16, marginBottom: 12 }}>{cat.category}</Text>
            <FAQAccordion items={cat.items} />
          </View>
        ))}
      </Screen>
    </Screen>
  );
}
