/** Brand token overrides for third-party shader / motion components */

export const WAX_SHADER_DESKTOP = {
  width: 1280,
  height: 720,
  colors: ["#2b0710", "#a20f37", "#ffd6de", "#d9b35f"] as string[],
  colorBack: "#2b071008",
  density: 4.2,
  angle1: 0.68,
  angle2: 0.28,
  length: 1.1,
  edges: true,
  blur: 0.22,
  fadeIn: 0.85,
  fadeOut: 0.3,
  gradient: 0.56,
  speed: 2.5,
  scale: 0.96,
  rotation: 180,
};

export const WAX_SHADER_MOBILE = {
  colors: ["#2b0710", "#a20f37", "#ffd6de"] as string[],
  speed: 2,
  scale: 0.96,
};

export const WAX_BEAM = {
  gradientStartColor: "#d9b35f",
  gradientStopColor: "#a20f37",
  pathColor: "#ead7df",
  pathOpacity: 0.35,
} as const;

export const PROTOCOL_POINTS = [
  "Fresh wax opened after you are in the room",
  "Private ladies-only treatment rooms",
  "We confirm before anything is locked in",
] as const;
