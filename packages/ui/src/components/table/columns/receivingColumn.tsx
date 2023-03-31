import { TableColumn } from "react-data-table-component";
import { IGameLog } from "@/models/stats";
import { OppElement, ResultElement } from "./customElements";

type ReceivingDataRow = IGameLog & {
  name: string;
  recCatchPct: number;
  recCatches: number;
  recDrops: number;
  recLongest: number;
  recPts: number;
  recTDs: number;
  recToPct: number;
  recYacPerCatch: number;
  recYds: number;
  recYdsAfterCatch: number;
  recYdsPerCatch: number;
  recYdsPerGame: number;
  rosterId: number;
  seasonIndex: number;
  teamId: number;
  teamName: string;
};

const receivingColumns: TableColumn<ReceivingDataRow>[] = [
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
    name: "REC",
    selector: (row) => row.recCatches,
    sortable: true,
    compact: true,
  },
  {
    name: "YDS",
    selector: (row) => row.recYds,
    sortable: true,
    compact: true,
  },
  {
    name: "AVG",
    selector: (row) => row.recYdsPerCatch,
    sortable: true,
    compact: true,
  },
  {
    name: "TD",
    selector: (row) => row.recTDs,
    sortable: true,
    compact: true,
  },
  {
    name: "LNG",
    selector: (row) => row.recLongest,
    sortable: true,
    compact: true,
  },
  {
    name: "DROP",
    selector: (row) => row.recDrops,
    sortable: true,
    compact: true,
  },
  {
    name: "YAC",
    selector: (row) => row.recYacPerCatch,
    sortable: true,
    compact: true,
  },
];

export default receivingColumns;
