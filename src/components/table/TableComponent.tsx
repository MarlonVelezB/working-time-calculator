import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { TableComponentProps } from "../../types/components.types";
import ButtonComponent from "../ButtonComponent";
import { WorkingTimeInfo } from "../../types/working-info.models";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TableComponent = ({ dataSource }: TableComponentProps) => {

  // ESTAS FUNCIONES PUEDEN SER MANDADAS COMO PROPS
  const handleClickDelete = (record: WorkingTimeInfo) => {
    console.log(record);
  };

  const handleClickEdit = (record: WorkingTimeInfo) => {
    console.log(record);
  };
  /////////////

  const columns: TableProps<WorkingTimeInfo>["columns"] = [
    {
      title: "Job Start Time",
      dataIndex: "jobStartTime",
      key: "jobStartTime",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Lunch Start Time",
      dataIndex: "lunchStartTime",
      key: "lunchStartTime",
    },
    {
      title: "Lunch End Time",
      dataIndex: "lunchEndTime",
      key: "lunchEndTime",
    },
    {
      title: "Job End Time",
      dataIndex: "jobEndTime",
      key: "jobEndTime",
    },
    {
      title: "Took time off",
      key: "isLunchBreakRequired",
      dataIndex: "isLunchBreakRequired",
      render: (_, { isLunchBreakRequired, _id }) => {
        const color = isLunchBreakRequired ? "green" : "red";
        const textTag = isLunchBreakRequired ? "YES" : "NO";

        return (
          <Tag color={color} key={_id}>
            {textTag}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <ButtonComponent
            textButon="Edit"
            buttonIcon={faTrash}
            onClick={() => handleClickEdit(record)}
          />

          <ButtonComponent
            textButon="Delete"
            buttonIcon={faTrash}
            onClick={() => handleClickDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return <Table<WorkingTimeInfo> columns={columns} dataSource={dataSource} />;
};

export default TableComponent;
