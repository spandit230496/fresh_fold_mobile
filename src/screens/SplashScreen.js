import { useState, useRef } from "react";
import { View, StyleSheet, Dimensions, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Sparkles, Truck, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react-native";
import Svg, { Circle, Path } from "react-native-svg";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Button from "../components/shared/Button";
import { colors, radius } from "../theme/theme";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    tag: "DOORSTEP PICKUP",
    title: "Fresh Clothes,\nZero Effort.",
    desc: "Schedule a pickup in 30 seconds. Our care executive arrives at your doorstep on your schedule.",
    icon: Truck,
    badge: "Free Pickup & Delivery",
    color: colors.lime,
    bgTone: colors.lightGreen,
  },
  {
    id: "2",
    tag: "PREMIUM FABRIC CARE",
    title: "Gentle on Clothes,\nTough on Stains.",
    desc: "German detergents, RO purified water, and fabric-specific cycles keep your favorite garments looking new.",
    icon: Sparkles,
    badge: "100% Eco-Friendly Solvents",
    color: colors.navySoft,
    bgTone: "#E8EEF5",
  },
  {
    id: "3",
    tag: "LIVE TRACKING",
    title: "Always in the Loop,\nEvery Single Step.",
    desc: "Watch your laundry journey in real time — from washing and steam pressing to out for delivery.",
    icon: ShieldCheck,
    badge: "Quality Guarantee",
    color: colors.limeDark,
    bgTone: colors.lightGreen,
  },
];

export default function SplashScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
      setActiveIndex(activeIndex + 1);
    } else {
      navigation.replace("Tabs", { screen: "Home" });
    }
  };

  const handleSkip = () => {
    navigation.replace("Tabs", { screen: "Home" });
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }]}>
      {/* Top Header with Logo and Skip */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Svg width={36} height={36} viewBox="0 0 34 34">
            <Circle cx="17" cy="17" r="17" fill={colors.lime} />
            <Path
              d="M17 6c-.4 3.4-4.5 6.7-4.5 11.2A4.5 4.5 0 0 0 17 21.7a4.5 4.5 0 0 0 4.5-4.5C21.5 12.7 17.4 9.4 17 6Z"
              fill={colors.navy}
            />
            <Circle cx="17" cy="16.5" r="1.6" fill={colors.lightGreen} />
          </Svg>
          <Text weight="extrabold" style={styles.brandTitle}>FreshFold</Text>
        </View>

        <Pressable onPress={handleSkip} style={styles.skipBtn}>
          <Text weight="bold" color={colors.navyMuted} style={{ fontSize: 13.5 }}>Skip</Text>
        </Pressable>
      </View>

      {/* Slide Carousel */}
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
        renderItem={({ item }) => {
          const Icon = item.icon;
          return (
            <View style={styles.slide}>
              {/* Illustration Hero Card */}
              <View style={[styles.heroCard, { backgroundColor: item.bgTone }]}>
                <View style={[styles.iconCircle, { backgroundColor: colors.white }]}>
                  <Icon size={48} color={colors.navy} strokeWidth={2} />
                </View>
                <View style={styles.badgeWrap}>
                  <CheckCircle2 size={15} color={colors.limeDark} />
                  <Text weight="bold" color={colors.navy} style={{ fontSize: 12, marginLeft: 6 }}>
                    {item.badge}
                  </Text>
                </View>
              </View>

              {/* Text Info */}
              <View style={styles.textWrap}>
                <View style={styles.tagWrap}>
                  <Text weight="bold" color={colors.limeDark} style={styles.tagText}>{item.tag}</Text>
                </View>
                <Text weight="extrabold" style={styles.title}>{item.title}</Text>
                <Text color={colors.navyMuted} style={styles.desc}>{item.desc}</Text>
              </View>
            </View>
          );
        }}
      />

      {/* Bottom Controls */}
      <View style={styles.footer}>
        {/* Pagination Dots */}
        <View style={styles.dotsRow}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                activeIndex === i ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.actionButtons}>
          {activeIndex === slides.length - 1 ? (
            <>
              <Button
                fullWidth
                size="lg"
                icon={ArrowRight}
                onPress={() => navigation.navigate("Signup")}
              >
                Get Started
              </Button>
              <View style={styles.secondaryRow}>
                <Pressable onPress={() => navigation.navigate("Login")} style={styles.loginLink}>
                  <Text color={colors.navyMuted} style={{ fontSize: 14 }}>Already a member? </Text>
                  <Text weight="bold" color={colors.navy} style={{ fontSize: 14 }}>Sign In</Text>
                </Pressable>
              </View>
            </>
          ) : (
            <View style={styles.nextRow}>
              <Pressable onPress={() => navigation.navigate("Login")} style={styles.outlineSignIn}>
                <Text weight="bold" color={colors.navy} style={{ fontSize: 14 }}>Sign In</Text>
              </Pressable>
              <Button
                style={{ flex: 1, marginLeft: 12 }}
                size="lg"
                icon={ArrowRight}
                onPress={handleNext}
              >
                Next
              </Button>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    marginBottom: 10,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandTitle: {
    fontSize: 21,
    color: colors.navy,
    marginLeft: 10,
    letterSpacing: -0.5,
  },
  skipBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: colors.lightGray,
  },
  slide: {
    width: width,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  heroCard: {
    width: width - 44,
    height: 270,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 26,
    position: "relative",
  },
  iconCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  badgeWrap: {
    position: "absolute",
    bottom: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  textWrap: {
    width: "100%",
    paddingHorizontal: 6,
  },
  tagWrap: {
    alignSelf: "flex-start",
    backgroundColor: colors.lightGreen,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 29,
    lineHeight: 35,
    color: colors.navy,
    marginBottom: 10,
  },
  desc: {
    fontSize: 14.5,
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: 22,
    marginTop: "auto",
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 28,
    backgroundColor: colors.limeDark,
  },
  dotInactive: {
    width: 8,
    backgroundColor: colors.navyFaint,
  },
  actionButtons: {
    gap: 12,
  },
  nextRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  outlineSignIn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: colors.navyFaint,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  loginLink: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
  },
});
