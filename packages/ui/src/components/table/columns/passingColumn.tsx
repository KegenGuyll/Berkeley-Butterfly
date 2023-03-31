import { TableColumn } from "react-data-table-component";
import { IGameLog } from "@/models/stats";
import { OppElement, ResultElement } from "./customElements";

type PassingDataRow = IGameLog & {
  name: string;
  passAtt: number;
  passComp: number;
  passCompPct: number;
  passInts: number;
  passLongest: number;
  passSacks: number;
  passTDs: number;
  passYds: number;
  passYdsPerAtt: number;
  passYdsPerGame: number;
  passerRating: number;
  rosterId: number;
  seasonIndex: number;
  teamId: number;
  teamName: string;
};

const passingColumns: TableColumn<PassingDataRow>[] = [
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
    name: "CMP",
    selector: (row) => row.passComp,
    sortable: true,
    compact: true,
  },
  {
    name: "ATT",
    selector: (row) => row.passAtt,
    sortable: true,
    compact: true,
  },
  {
    name: "CMP%",
    selector: (row) => row.passCompPct,
    sortable: true,
    compact: true,
  },
  {
    name: "YDS",
    selector: (row) => row.passYds,
    sortable: true,
    compact: true,
  },
  {
    name: "AVG",
    selector: (row) => row.passYdsPerAtt,
    sortable: true,
    compact: true,
  },

  {
    name: "TD",
    selector: (row) => row.passTDs,
    sortable: true,
    compact: true,
  },
  {
    name: "INT",
    selector: (row) => row.passInts,
    sortable: true,
    compact: true,
  },
  {
    name: "LNG",
    selector: (row) => row.passLongest,
    sortable: true,
    compact: true,
  },
  {
    name: "RTG",
    selector: (row) => row.passerRating,
    sortable: true,
    compact: true,
  },
];

export default passingColumns;
