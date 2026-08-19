export const colors = {
  lime: "#A8CF32",
  limeDark: "#8FB524",
  navy: "#10233F",
  navySoft: "#1C3457",
  navyMuted: "rgba(16,35,63,0.6)",
  navyFaint: "rgba(16,35,63,0.08)",
  lightGreen: "#EEF7D8",
  lightGray: "#F4F5F3",
  white: "#FFFFFF",
  softYellow: "#F7D96A",
};

export const radius = {
  card: 24,
  cardLg: 28,
  btn: 999,
  input: 16,
  img: 24,
};

export const spacing = (n) => n * 4;

export const typography = {
  fontFamily: {
    regular: "NunitoSans_400Regular",
    medium: "NunitoSans_500Medium",
    semibold: "NunitoSans_600SemiBold",
    bold: "NunitoSans_700Bold",
    extrabold: "NunitoSans_800ExtraBold",
  },
};

export const shadow = {
  sm: {
    shadowColor: "#10233F",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  md: {
    shadowColor: "#10233F",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  lg: {
    shadowColor: "#10233F",
    shadowOpacity: 0.14,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
};
