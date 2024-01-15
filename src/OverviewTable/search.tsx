import React from "react";
import { Form, Select, Button, Flex, Tooltip } from "antd";
import JsFileDownload from "js-file-download";
import dayjs from "dayjs";
import { DownloadOutlined } from "@ant-design/icons";
import Upload from "./upload";
import {
  EQUIPMENT_PROPERTY_KEY,
  EQUIPMENT_PROPERTY_LABEL,
  EQUIPMENT_INTENSITY_DATA,
  EQUIPMENT_PART_DATA,
} from "../constant";
import { getLocalData } from "../localstorage";

const { Option } = Select;

const layout = {
  layout: "inline",
};

interface SearchType {
  onSearch(value: Record<string, string>): void;
}
const App = React.forwardRef((props: SearchType, ref) => {
  const [form] = Form.useForm();

  const handleFilter = async () => {
    const values = await form.validateFields();
    props.onSearch(values);
  };

  const handleDownload = () => {
    JsFileDownload(
      JSON.stringify(getLocalData()),
      `DNF_${dayjs().format("YYYYMMDD_HHmmss")}`
    );
  };

  return (
    <Flex justify="space-between">
      <Form
        {...layout}
        form={form}
        ref={ref}
        colon={false}
        style={{ marginBottom: "12px" }}
        onValuesChange={handleFilter}
      >
        {/* 流派 */}
        <Form.Item
          name={EQUIPMENT_PROPERTY_KEY.PART}
          label={EQUIPMENT_PROPERTY_LABEL.PART}
        >
          <Select allowClear style={{ width: "160px" }}>
            {EQUIPMENT_PART_DATA.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* 强度 */}
        <Form.Item
          name={EQUIPMENT_PROPERTY_KEY.INTENSITY}
          label={EQUIPMENT_PROPERTY_LABEL.INTENSITY}
        >
          <Select allowClear style={{ width: "160px" }}>
            {EQUIPMENT_INTENSITY_DATA.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item style={{ float: "right" }}></Form.Item>
      </Form>
      <div>
        <Tooltip title="下载当前数据">
          <Button
            icon={<DownloadOutlined />}
            onClick={handleDownload}
            style={{ marginRight: 12 }}
          >
            下载
          </Button>
        </Tooltip>

        <Upload />
      </div>
    </Flex>
  );
});

export default App;
