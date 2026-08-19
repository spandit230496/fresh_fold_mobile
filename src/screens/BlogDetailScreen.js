import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import ScreenHeader from "../components/shared/ScreenHeader";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Badge from "../components/shared/Badge";
import Artwork from "../components/shared/Artwork";
import { getBlogBySlug } from "../data/blogs";
import { colors } from "../theme/theme";

export default function BlogDetailScreen() {
  const { params } = useRoute();
  const blog = getBlogBySlug(params.slug);
  if (!blog) return null;

  return (
    <Screen scroll={false}>
      <ScreenHeader title="Article" />
      <Screen>
        <Artwork icon="shirt" palette="lime" height={160} radius={0} />
        <View style={{ padding: 20 }}>
          <Badge tone="light">{blog.category}</Badge>
          <Text weight="extrabold" style={{ fontSize: 21, marginTop: 12, lineHeight: 27 }}>{blog.title}</Text>
          <Text color="rgba(16,35,63,0.5)" style={{ fontSize: 12, marginTop: 8 }}>
            {blog.author} · {new Date(blog.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </Text>
          <View style={{ marginTop: 18, gap: 14 }}>
            {blog.content.map((para, i) => (
              <Text key={i} color="rgba(16,35,63,0.7)" style={{ fontSize: 14, lineHeight: 22 }}>{para}</Text>
            ))}
          </View>
        </View>
      </Screen>
    </Screen>
  );
}
