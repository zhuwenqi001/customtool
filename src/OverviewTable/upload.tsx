// @ts-nocheck
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Upload, Modal, message, Tooltip } from "antd";
import { resetLocalData } from "../localstorage";

const { confirm } = Modal;

const props: UploadProps = {
  name: "file",
  beforeUpload: () => false,
  showUploadList: false,
};

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const onChange = (info) => {
    const fileList = info.fileList; // 获取已选中的文件列表
    const reader = new FileReader(); // 创建FileReader对象

    reader.onloadend = () => {
      console.log(typeof reader.result); // 输出文件内容
      // 在这里可以根据需求处理文件内容
      confirm({
        title: "确定使用上传数据覆盖本地数据？",
        onOk: () => {
          try {
            resetLocalData(JSON.parse(reader.result));
            window.location.reload();
          } catch (error) {
            messageApi.error("解析文件失败！");
          }
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };

    reader.readAsText(fileList[0].originFileObj); // 将文件转换为文本格式并读取
  };
  return (
    <Tooltip title="上传本地数据覆盖当前数据">
      <Upload {...props} onChange={onChange}>
        <Button icon={<UploadOutlined />}>上传</Button>
      </Upload>
    </Tooltip>
  );
};

export default App;
