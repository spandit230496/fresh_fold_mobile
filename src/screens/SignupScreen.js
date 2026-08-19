import { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Check } from "lucide-react-native";
import Screen from "../components/shared/Screen";
import Text from "../components/shared/Text";
import Logo from "../components/shared/Logo";
import Button from "../components/shared/Button";
import FormField from "../components/shared/FormField";
import { colors } from "../theme/theme";

export default function SignupScreen(){
 const insets=useSafeAreaInsets(), navigation=useNavigation();
 const [form,setForm]=useState({name:"",mobile:"",email:"",password:""});
 const update=(k,v)=>setForm(f=>({...f,[k]:v}));
 return <Screen contentStyle={{paddingTop:insets.top+18,paddingHorizontal:22}}>
  <Pressable onPress={()=>navigation.goBack()} style={styles.back}><ArrowLeft size={20} color={colors.navy}/></Pressable><Logo/>
  <Text weight="extrabold" style={styles.title}>Create your account</Text>
  <Text color={colors.navyMuted} style={styles.sub}>Join FreshFold and make laundry day effortless.</Text>
  <View style={{gap:15}}>
   <FormField label="Full Name" placeholder="Your name" value={form.name} onChangeText={v=>update("name",v)}/>
   <FormField label="Mobile Number" placeholder="10-digit mobile number" keyboardType="phone-pad" value={form.mobile} onChangeText={v=>update("mobile",v)}/>
   <FormField label="Email" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={v=>update("email",v)}/>
   <FormField label="Password" placeholder="Create a password" secureTextEntry value={form.password} onChangeText={v=>update("password",v)}/>
  </View>
  <View style={styles.note}><Check size={17} color={colors.limeDark}/><Text color={colors.navyMuted} style={{flex:1,fontSize:12.5}}>Your account lets you save addresses and track every pickup.</Text></View>
  <Button fullWidth size="lg" onPress={()=>navigation.navigate("Tabs",{screen:"Home"})}>Create Account</Button>
  <View style={styles.loginRow}><Text color={colors.navyMuted}>Already have an account?</Text><Pressable onPress={()=>navigation.navigate("Login")}><Text weight="bold" color={colors.navy}> Sign in</Text></Pressable></View>
 </Screen>
}
const styles=StyleSheet.create({back:{width:42,height:42,borderRadius:21,backgroundColor:colors.lightGray,alignItems:"center",justifyContent:"center",marginBottom:18},title:{fontSize:27,marginTop:24},sub:{fontSize:14,marginTop:7,marginBottom:25,lineHeight:21},note:{flexDirection:"row",gap:8,alignItems:"center",backgroundColor:colors.lightGreen,borderRadius:16,padding:13,marginVertical:18},loginRow:{flexDirection:"row",justifyContent:"center",marginTop:22}}
);
