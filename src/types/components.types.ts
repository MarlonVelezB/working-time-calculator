import { TableProps } from "antd/es/table";

export interface TableComponentProps {
    dataType?: any;
    columns?: TableProps<any>["columns"];
    dataSource: any;
    dataFooterTable: any;
}