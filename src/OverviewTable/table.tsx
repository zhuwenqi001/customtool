// @ts-nocheck
import React, { useContext, useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import {
  Button,
  Form,
  Input,
  Tag,
  Table,
  Modal,
  Flex,
  Popconfirm,
  Tooltip,
} from "antd";
import type { FormInstance } from "antd/es/form";
import AddForm from "./form";
import Search from "./search";
import type { DataType, EquipmentPropsType } from "../constant";
import {
  TABLE_COLUMN_MAP,
  DataTypeLabelList,
  EquipmentPartColor,
  DataTypeKeyList,
} from "../constant";
import {
  getLocalData,
  addAData,
  deleteRoleData,
  resetLocalData,
} from "../localstorage";
import { getColor } from "../util";

const { confirm } = Modal;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof DataType;
  record: DataType;
  handleSave: (record: DataType) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;
  const modalRef = useRef<any>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  const handleAddTool = () => {
    confirm({
      title: "新增装备",
      content: (
        <div>
          <Tag>角色：{record.roleName}</Tag>
          <Tag>装备类型：{(DataTypeLabelList as any)[dataIndex]}</Tag>
          <AddForm ref={modalRef} datatype={dataIndex} />
        </div>
      ),
      width: 630,
      onOk: async () => {
        const values = await modalRef.current.validateFields();
        let data = record[dataIndex];
        if (!(data && Array.isArray(data))) {
          data = [];
        }
        data.push(values);
        handleSave({ ...record, [dataIndex]: data });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDeleteTool = (index: number) => {
    const data = record[dataIndex];
    (data as EquipmentPropsType[]).splice(index, 1);
    handleSave({ ...record, [dataIndex]: data });
    // 关闭弹窗
    Modal.destroyAll();
  };

  const handleEditTool = (toolItem: EquipmentPropsType, index: number) => {
    confirm({
      title: `编辑：${toolItem.name}`,
      content: (
        <div>
          <Tag>角色：{record.roleName}</Tag>
          <Tag>装备类型：{(DataTypeLabelList as any)[dataIndex]}</Tag>
          <Popconfirm
            title="确认删除装备么？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDeleteTool(index)}
          >
            <Button type="primary" danger style={{ float: "right" }}>
              删除装备
            </Button>
          </Popconfirm>

          <AddForm
            ref={modalRef}
            initialValues={toolItem}
            datatype={dataIndex}
          />
        </div>
      ),
      width: 630,
      onOk: async () => {
        const values = await modalRef.current.validateFields();
        const data = record[dataIndex];
        (data as EquipmentPropsType[])[index] = values;
        handleSave({ ...record, [dataIndex]: data });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  let childNode = children;
  if (dataIndex) {
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          className="padding16"
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <Tooltip title="点击角色名编辑" placement="topLeft">
          <div
            className="editable-cell-value-wrap padding16"
            style={{ paddingRight: 24, cursor: "pointer" }}
            onClick={toggleEdit}
          >
            {children}
          </div>
        </Tooltip>
      );
    } else {
      // 按流派纵向
      childNode = (
        <div>
          <div
            onClick={handleAddTool}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          ></div>
          {record[dataIndex]?.length && (
            <div className="padding16">
              <Flex vertical>
                {record[dataIndex]?.map(
                  (item: EquipmentPropsType, index: number) => (
                    <Tag
                      color={getColor(
                        EquipmentPartColor[item.part],
                        item.intensity
                      )}
                      style={{
                        marginBottom: 4,
                        cursor: "pointer",
                        marginRight: 0,
                        width: 64,
                      }}
                      key={`${item.name}_${index}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        return handleEditTool(item, index);
                      }}
                    >
                      {item.name}
                    </Tag>
                  )
                )}
              </Flex>
            </div>
          )}
        </div>
      );
    }
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const App: React.FC = () => {
  const originalData = getLocalData();
  const [dataSource, setDataSource] = useState<DataType[]>(originalData);
  const [checkedData, setCheckData] = useState<DataType[]>([]);

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = TABLE_COLUMN_MAP;

  // 增加角色
  const handleAdd = () => {
    const data = addAData();
    setDataSource([...data]);
    resetLocalData([...data]);
  };

  // 删除角色
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setCheckData(selectedRows);
    },
  };
  const handleDelete = () => {
    const data = deleteRoleData(checkedData);
    setDataSource([...data]);
    resetLocalData([...data]);
    setCheckData([]);
  };

  // 行数据处理
  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    resetLocalData(newData);
  };

  // 筛选数据
  const handleSearch = (value: Record<string, string>) => {
    // 需要筛选的key
    const filterKeys = Object.keys(value);
    // columns key
    const modules = Object.keys(DataTypeKeyList);
    const data = [...getLocalData()];

    const filterData = data.map((dataItem) => {
      // 行
      const filterItem = { ...dataItem };
      // 格
      modules.forEach((key) => {
        if (filterItem?.[key]) {
          filterItem[key] = filterItem[key].filter((item) => {
            return filterKeys.every(
              (filterKey) =>
                !value[filterKey] || item[filterKey] === value[filterKey]
            );
          });
        }
      });

      return filterItem;
    });

    setDataSource(filterData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return {
        ...col,
        onCell: (record: DataType) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
        }),
      };
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Search onSearch={handleSearch} />
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        scroll={{ x: 1300, y: window.innerHeight - 200 }}
        bordered
        dataSource={dataSource}
        pagination={{ position: ["none"] }}
        columns={columns as ColumnTypes}
        footer={() => (
          <Flex gap="middle">
            <Button key="add" onClick={handleAdd} type="primary">
              添加角色
            </Button>

            <Popconfirm
              title="确认删除已选角色么？"
              okText="Yes"
              cancelText="No"
              onConfirm={handleDelete}
            >
              <div>
                <Tooltip title="勾选角色后操作">
                  <Button key="delete" danger disabled={!checkedData.length}>
                    删除角色
                  </Button>
                </Tooltip>
              </div>
            </Popconfirm>
          </Flex>
        )}
      />
    </div>
  );
};

export default App;
