const COLORS = {
  /* primary: "#1C1C24",
  secondary: "#282832",

  green: "#49f54f",
  red: "#f54949",
  purple: "#5c2af5",
  
  gray: "#30303A",
  gray2: "#4D4E62",
  gray3: "#858994", */

  black: "#1C1C1C",
  blacker: "#131313",

  white: "#C6C6C6",

  gray: "#636363",
  darkGray: "#3b3b3b",

  purple: "#5B3BFA",
  red: "#FA3D3B",
  green: "#3BFA48",

};

const FONT = {
  thin: "Thin",
  extraLight: "ExtraLight",
  light: "Light",
  regular: "Regular",
  medium: "Medium",
  semiBold: "SemiBold",
  bold: "Bold",
  extraBold: "ExtraBold",
  black: "Black",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#FFFFF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5.84,
    elevation: 7,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
