import { Table as AntdTable } from "antd";
import React from "react";

// Tipo de coluna genérica
export interface ColumnType<T> {
  title: string;
  dataIndex: string | number;
  key: string;
  render?: (value: T[keyof T], record: T) => React.ReactNode;
}

// Props genéricas para o componente Table
interface ITableProps<T> {
  columns: ColumnType<T>[];
  data: T[];
}

// Componente Table genérico
function Table<T extends object>({ columns, data }: ITableProps<T>) {
  // Adaptar as colunas para o formato do AntdTable
  const antdColumns = columns.map((col) => ({
    title: col.title,
    dataIndex: col.dataIndex,
    key: col.key,
    render: col.render
      ? (value: T[keyof T], record: T) => col.render!(value, record)
      : undefined,
  }));

  return (
    <AntdTable<T>
      columns={antdColumns}
      dataSource={data}
      rowKey={columns[0]?.dataIndex as string}
    />
  );
}

export default Table;
