/**
 * 类型
 */
// 装备类型
export interface EquipmentPropsType {
  name: string;
  part: EquipmentPart;
  intensity: number;
  memo?: string;
}

export interface DataType {
  key: React.Key;
  roleName: string;
  [x: string]: any;
  // ...
}

/**
 * 常量数据
 */
// 装备属性key
export const EQUIPMENT_PROPERTY_KEY = {
  NAME: "name",
  PART: "part",
  INTENSITY: "intensity",
  MEMO1: "memo1",
  MEMO2: "memo2",
  MEMO3: "memo3",
  MEMO4: "memo4",
};

// 装备属性中文名
export const EQUIPMENT_PROPERTY_LABEL = {
  NAME: "名称",
  PART: "流派",
  INTENSITY: "强度",
  MEMO1: "详情信息",
};

// 流派
export enum EquipmentPart {
  P1 = "P1",
  P2 = "P2",
  P3 = "P3",
  P4 = "P4",
  P5 = "P5",
  P6 = "P6",
  P7 = "P7",
}

export enum EquipmentPartLabel {
  P1 = "出血流",
  P2 = "直伤流",
  P3 = "半血流",
  P4 = "神剑流",
  P5 = "空血流",
  P6 = "觉醒流",
  P7 = "通用",
}

export enum EquipmentPartColor {
  P1 = "#f5222d",
  P2 = "#1677ff",
  P3 = "#faad14",
  P4 = "#eb2f96",
  P5 = "#722ed1",
  P6 = "#52c41a",
  P7 = "#262626",
}

// 装备流派信息
export const EQUIPMENT_PART_DATA = Object.keys(EquipmentPart).map((key) => ({
  label: EquipmentPartLabel[key],
  value: key,
  primaryColor: EquipmentPartColor[key],
}));

export enum EquipmentIntensity {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

export enum EquipmentIntensityLabel {
  ONE = "3.2",
  TWO = "3.5",
  THREE = "3.8",
  FOUR = "3.9",
  FIVE = "4.0",
}

export const EquipmentIntensityRate = [20, 40, 70, 80, 100];

// 强度信息
export const EQUIPMENT_INTENSITY_DATA = [
  { label: EquipmentIntensityLabel.ONE, value: EquipmentIntensity.ONE },
  { label: EquipmentIntensityLabel.TWO, value: EquipmentIntensity.TWO },
  { label: EquipmentIntensityLabel.THREE, value: EquipmentIntensity.THREE },
  { label: EquipmentIntensityLabel.FOUR, value: EquipmentIntensity.FOUR },
  { label: EquipmentIntensityLabel.FIVE, value: EquipmentIntensity.FIVE },
];

// 类别枚举
export enum DataTypeKeyList {
  top = "top",
  pants = "pants",
  belt = "belt",
  shoulder = "shoulder",
  shoes = "shoes",
  bracelet = "bracelet",
  ring = "ring",
  necklace = "necklace",
  left = "left",
  right = "right",
  earring = "earring",
  // ....
}

export enum DataTypeLabelList {
  top = "上衣",
  pants = "裤子",
  belt = "腰带",
  shoulder = "头肩",
  shoes = "鞋子",
  bracelet = "手镯",
  ring = "戒指",
  necklace = "项链",
  left = "左槽",
  right = "右槽",
  earring = "耳环",
  // ....
}

// 表头
export const TABLE_COLUMN_MAP = [
  {
    title: "角色",
    dataIndex: "roleName",
    width: 136,
    editable: true,
    fixed: "left",
  },
].concat(
  Object.keys(DataTypeKeyList).map((key) => ({
    title: DataTypeLabelList[key],
    dataIndex: key,
    width: 100,
  }))
);

export const EQUIPMENT_NAME_LABEL = [
  "蓝灵",
  "魔女",
  "恩特",
  "深潜",
  "海贼",
  "红皮",
];
