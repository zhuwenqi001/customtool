// @ts-nocheck
import React from "react";
import { Form, Input, Select } from "antd";
import {
  EQUIPMENT_PROPERTY_KEY,
  EQUIPMENT_PROPERTY_LABEL,
  EQUIPMENT_INTENSITY_DATA,
  EQUIPMENT_PART_DATA,
  EQUIPMENT_NAME_LABEL,
  DataTypeLabelList,
} from "../constant";

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const App: React.FC = React.forwardRef(({ datatype, ...otherProps }, ref) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      {...otherProps}
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ marginTop: 16 }}
      ref={ref}
      colon={false}
    >
      {/* 装备名称 */}
      <Form.Item
        name={EQUIPMENT_PROPERTY_KEY.NAME}
        label={EQUIPMENT_PROPERTY_LABEL.NAME}
        rules={[{ required: true }]}
      >
        <Select allowClear>
          {EQUIPMENT_NAME_LABEL.map((item) => (
            <Option
              key={`${item}${DataTypeLabelList[datatype]}`}
              value={`${item}${DataTypeLabelList[datatype]}`}
            >
              {`${item}${DataTypeLabelList[datatype]}`}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* 流派 */}
      <Form.Item
        name={EQUIPMENT_PROPERTY_KEY.PART}
        label={EQUIPMENT_PROPERTY_LABEL.PART}
        rules={[{ required: true }]}
      >
        <Select allowClear>
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
        rules={[{ required: true }]}
      >
        <Select allowClear>
          {EQUIPMENT_INTENSITY_DATA.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* 详细信息 */}
      <Form.Item
        name={EQUIPMENT_PROPERTY_KEY.MEMO1}
        label={EQUIPMENT_PROPERTY_LABEL.MEMO1}
        style={{ marginBottom: 4 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={EQUIPMENT_PROPERTY_KEY.MEMO2}
        label={<div></div>}
        style={{ marginBottom: 4 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={EQUIPMENT_PROPERTY_KEY.MEMO3}
        label={<div></div>}
        style={{ marginBottom: 4 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={EQUIPMENT_PROPERTY_KEY.MEMO4}
        label={<div></div>}
        style={{ marginBottom: 4 }}
      >
        <Input />
      </Form.Item>
    </Form>
  );
});

export default App;
