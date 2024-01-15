import Color from "color";
import { EquipmentIntensityRate } from "./constant";

export const getColor = (basic: string, intensity: number) => {
  return Color(basic).alpha(EquipmentIntensityRate[intensity - 1] * 0.01);
  //   .lighten(intensity * 0.1)
};
