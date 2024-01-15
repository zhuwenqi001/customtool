import type { DataType } from "./constant";

const LOCAL_KEY = "local_tool_key";
const DEFAULT_ROLE_NAME = "点我修改角色名";
const defaultData = [{ key: "0", roleName: DEFAULT_ROLE_NAME }];

// 读取本地localstorage
export const getLocalData = () => {
  const data = localStorage.getItem(LOCAL_KEY);
  let parsedData = defaultData;
  try {
    if (data) {
      parsedData = JSON.parse(data);
    }
  } catch (error) {
    console.log(error);
  }
  return parsedData;
};

// 替换数据
export const resetLocalData = (data: DataType[]) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
};

// 添加一个角色数据
export const addAData = () => {
  const original = getLocalData();
  original.push({ key: `${original.length}`, roleName: DEFAULT_ROLE_NAME });
  return original;
};

// 删除多个角色数据
export const deleteRoleData = (checkedData: DataType[]) => {
  const original = getLocalData();
  const data = original.filter(
    (item) => checkedData.map((v) => v.key).indexOf(item.key) === -1
  );
  return data;
};
