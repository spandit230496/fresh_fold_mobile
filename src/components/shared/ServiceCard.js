import { Pressable, StyleSheet, View } from "react-native";
import { ArrowRight } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import Text from "./Text";
import Card from "./Card";
import Artwork from "./Artwork";
import { colors } from "../../theme/theme";

const PALETTES = ["lime", "navy", "yellow", "gray"];

export default function ServiceCard({ service, index = 0, width }) {
  const navigation = useNavigation();
  const palette = PALETTES[index % PALETTES.length];

  return (
    <Pressable
      onPress={() => navigation.navigate("ServiceDetail", { slug: service.slug })}
      style={({ pressed }) => [{ width, opacity: pressed ? 0.9 : 1 }]}
    >
      <Card>
        <Artwork icon={service.icon.toLowerCase()} palette={palette} height={120} radius={0} style={styles.topRadius} />
        <View style={styles.body}>
          <Text weight="extrabold" style={{ fontSize: 15 }}>{service.title}</Text>
          <Text color="rgba(16,35,63,0.55)" style={{ fontSize: 12.5, marginTop: 4, lineHeight: 17 }} numberOfLines={2}>
            {service.short}
          </Text>
          <View style={styles.row}>
            <Text weight="bold" style={{ fontSize: 12.5 }}>
              From {service.price}{" "}
              <Text color="rgba(16,35,63,0.4)" style={{ fontSize: 11 }}>{service.priceUnit}</Text>
            </Text>
            <ArrowRight size={14} color={colors.limeDark} />
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  topRadius: { borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  body: { padding: 14 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 },
});
