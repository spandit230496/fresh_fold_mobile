import { View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowRight } from "lucide-react-native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Badge from "../components/shared/Badge";
import Artwork from "../components/shared/Artwork";
import Card from "../components/shared/Card";
import { blogs } from "../data/blogs";
import { colors } from "../theme/theme";

const PALETTES = ["lime", "navy", "yellow", "gray"];

export default function BlogsScreen() {
  const navigation = useNavigation();
  const featured = blogs.find((b) => b.featured);
  const rest = blogs.filter((b) => !b.featured);

  return (
    <Screen scroll={false}>
      <ScreenHeader title="Blog" />
      <Screen contentStyle={{ padding: 20 }}>
        {featured && (
          <Pressable onPress={() => navigation.navigate("BlogDetail", { slug: featured.slug })}>
            <Card style={{ overflow: "hidden", marginBottom: 24 }}>
              <Artwork icon="shirt" palette="lime" height={140} radius={0} style={styles.topRadius} />
              <View style={{ padding: 16 }}>
                <Badge tone="light">{featured.category}</Badge>
                <Text weight="extrabold" style={{ fontSize: 16, marginTop: 10, lineHeight: 22 }}>{featured.title}</Text>
                <Text color="rgba(16,35,63,0.55)" style={{ fontSize: 12.5, marginTop: 6, lineHeight: 18 }}>{featured.excerpt}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                  <Text weight="bold" color={colors.limeDark} style={{ fontSize: 12.5 }}>Read Article</Text>
                  <ArrowRight size={13} color={colors.limeDark} style={{ marginLeft: 4 }} />
                </View>
              </View>
            </Card>
          </Pressable>
        )}

        <View style={{ gap: 14 }}>
          {rest.map((b, i) => (
            <Pressable key={b.slug} onPress={() => navigation.navigate("BlogDetail", { slug: b.slug })}>
              <Card style={{ flexDirection: "row", overflow: "hidden" }}>
                <Artwork icon="droplets" palette={PALETTES[i % PALETTES.length]} height={90} radius={0} style={{ width: 90, borderTopLeftRadius: 24, borderBottomLeftRadius: 24 }} />
                <View style={{ flex: 1, padding: 12 }}>
                  <Badge tone="light">{b.category}</Badge>
                  <Text weight="extrabold" style={{ fontSize: 13, marginTop: 6, lineHeight: 17 }} numberOfLines={2}>{b.title}</Text>
                </View>
              </Card>
            </Pressable>
          ))}
        </View>
      </Screen>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topRadius: { borderTopLeftRadius: 24, borderTopRightRadius: 24 },
});
