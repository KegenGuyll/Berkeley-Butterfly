import { TableColumn } from "react-data-table-component";
import { DataType } from "@/models/stats";
import passingColumns from "./passingColumn";
import rushingColumns from "./rushingColumn";
import receivingColumns from "./receivingColumn";
import defenseColumns from "./defenseColumn";

const tableColumns = (dataType: DataType): TableColumn<any>[] => {
  if (dataType === DataType.PASSING) return passingColumns;

  if (dataType === DataType.RUSHING) return rushingColumns;

  if (dataType === DataType.RECEIVING) return receivingColumns;

  if (dataType === DataType.DEFENSE) return defenseColumns;

  return [];
};

export default tableColumns;
