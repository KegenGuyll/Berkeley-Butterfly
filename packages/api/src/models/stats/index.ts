import { DataType } from "../teams";

export interface IGameLogQuery {
  dataType: DataType;
  rosterId: number;
  seasonIndex: number;
  teamId: number;
}
