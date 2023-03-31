import { TableColumn } from "react-data-table-component";
import { IGameLog } from "@/models/stats";
import { OppElement, ResultElement } from "./customElements";

type DefenseDataRow = IGameLog & {
  defCatchAllowed: number;
  defDeflections: number;
  defForcedFum: number;
  defFumRec: number;
  defIntReturnYds: number;
  defInts: number;
  defPts: number;
  defSacks: number;
  defSafeties: number;
  defTDs: number;
  defTotalTackles: number;
  name: string;
  rosterId: number;
  seasonIndex: number;
  teamId: number;
  teamName: string;
};

const defenseColumns: TableColumn<DefenseDataRow>[] = [
  {
    name: "WEEK",
    selector: (row) => row.weekIndex + 1,
    compact: true,
    sortable: true,
    width: "50px",
  },
  {
    name: "OPP",
    selector: (row) => row.homeTeamId,
    cell: (row) => <OppElement row={row} />,
    maxWidth: "600px",
    minWidth: "110px",
  },
  {
    name: "RESULT",
    selector: (row) => row.name,
    cell: (row) => <ResultElement row={row} />,
    maxWidth: "600px",
  },
  {
    name: "TAK",
    selector: (row) => row.defTotalTackles,
    sortable: true,
    compact: true,
  },
  {
    name: "INT",
    selector: (row) => row.defInts,
    sortable: true,
    compact: true,
  },
  {
    name: "SACK",
    selector: (row) => row.defSacks,
    sortable: true,
    compact: true,
  },
  {
    name: "TD",
    selector: (row) => row.defTDs,
    sortable: true,
    compact: true,
  },
  {
    name: "SAFETY",
    selector: (row) => row.defSafeties,
    sortable: true,
    compact: true,
  },
  {
    name: "FF",
    selector: (row) => row.defForcedFum,
    sortable: true,
    compact: true,
  },
  {
    name: "FR",
    selector: (row) => row.defFumRec,
    sortable: true,
    compact: true,
  },
  {
    name: "PD",
    selector: (row) => row.defDeflections,
    sortable: true,
    compact: true,
  },
  {
    name: "CA",
    selector: (row) => row.defCatchAllowed,
    sortable: true,
    compact: true,
  },
];

export default defenseColumns;
