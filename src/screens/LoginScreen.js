import { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react-native";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Logo from "../components/shared/Logo";
import Button from "../components/shared/Button";
import FormField from "../components/shared/FormField";
import { colors } from "../theme/theme";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Screen contentStyle={{ paddingTop: insets.top + 18, paddingHorizontal: 22 }}>
      <Pressable onPress={() => navigation.goBack()} style={styles.back}><ArrowLeft size={20} color={colors.navy} /></Pressable>
      <Logo />
      <View style={styles.hero}>
        <Text weight="extrabold" style={styles.title}>Welcome back</Text>
        <Text color={colors.navyMuted} style={styles.subtitle}>Sign in to manage pickups, orders and payments.</Text>
      </View>
      <View style={{ gap: 16 }}>
        <FormField label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <View>
          <FormField label="Password" placeholder="Your password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
          <Pressable onPress={() => setShowPassword((v) => !v)} style={styles.eye}><Text color={colors.navyMuted}>{showPassword ? "Hide" : "Show"}</Text></Pressable>
        </View>
      </View>
      <Pressable style={styles.forgot}><Text weight="bold" color={colors.navy}>Forgot password?</Text></Pressable>
      <Button fullWidth size="lg" onPress={() => navigation.navigate("Tabs", { screen: "Home" })}>Sign In</Button>
      <View style={styles.signupRow}>
        <Text color={colors.navyMuted}>Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate("Signup")}><Text weight="bold" color={colors.navy}> Sign up</Text></Pressable>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  back:{ width:42,height:42,borderRadius:21,backgroundColor:colors.lightGray,alignItems:"center",justifyContent:"center",marginBottom:18 },
  hero:{marginBottom:28}, title:{fontSize:30}, subtitle:{fontSize:14,marginTop:7,lineHeight:21},
  eye:{position:"absolute",right:14,bottom:13}, forgot:{alignSelf:"flex-end",marginTop:14,marginBottom:24},
  signupRow:{flexDirection:"row",justifyContent:"center",marginTop:24}
});
