export const C = {
  bg:          "#0A0A0F",
  card:        "#111118",
  cardHover:   "#16161F",
  surface:     "#1A1A24",
  border:      "rgba(255,255,255,0.08)",
  borderSolid: "#2A2A3A",
  blue:        "#2E6FF2",
  blueLight:   "#4A8AFF",
  blueDark:    "#1A4FBF",
  blueBg:      "rgba(46,111,242,0.08)",
  blueBgStrong:"rgba(46,111,242,0.15)",
  text:        "#F0F0F5",
  muted:       "#8888A0",
  dim:         "#5A5A70",
  green:       "#00C48C",
  greenBg:     "rgba(0,196,140,0.1)",
  yellow:      "#FFB547",
  yellowBg:    "rgba(255,181,71,0.1)",
  red:         "#FF4757",
  redBg:       "rgba(255,71,87,0.1)",
  purple:      "#A855F7",
  purpleBg:    "rgba(168,85,247,0.1)",
};

export const HEALTH_COLOR = (v) =>
  v >= 70 ? C.green : v >= 40 ? C.yellow : C.red;

export const HEALTH_BG = (v) =>
  v >= 70 ? C.greenBg : v >= 40 ? C.yellowBg : C.redBg;

export const ROAS_COLOR = (v) =>
  v >= 3 ? C.green : v >= 1.5 ? C.yellow : C.red;
