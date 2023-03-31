import { TableColumn } from "react-data-table-component";
import { IGameLog } from "@/models/stats";
import { OppElement, ResultElement } from "./customElements";

type RushingDataRow = IGameLog & {
  name: string;
  rosterId: number;
  rush20PlusYds: number;
  rushAtt: number;
  rushBrokenTackles: number;
  rushFum: number;
  rushLongest: number;
  rushTDs: number;
  rushYds: number;
  rushYdsAfterContact: number;
  rushYdsPerAtt: number;
  rushYdsPerGame: number;
  seasonIndex: number;
  teamId: number;
  teamName: string;
};

const rushingColumns: TableColumn<RushingDataRow>[] = [
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
    name: "ATT",
    selector: (row) => row.rushAtt,
    sortable: true,
    compact: true,
  },
  {
    name: "YDS",
    selector: (row) => row.rushYds,
    sortable: true,
    compact: true,
  },
  {
    name: "AVG",
    selector: (row) => row.rushYdsPerAtt,
    sortable: true,
    compact: true,
  },
  {
    name: "TD",
    selector: (row) => row.rushTDs,
    sortable: true,
    compact: true,
  },
  {
    name: "LNG",
    selector: (row) => row.rushLongest,
    sortable: true,
    compact: true,
  },
  {
    name: "BIG",
    selector: (row) => row.rush20PlusYds,
    sortable: true,
    compact: true,
  },
  {
    name: "FUM",
    selector: (row) => row.rushFum,
    sortable: true,
    compact: true,
  },
  {
    name: "RAC",
    selector: (row) => row.rushYdsAfterContact,
    sortable: true,
    compact: true,
  },
  {
    name: "BT",
    selector: (row) => row.rushBrokenTackles,
    sortable: true,
    compact: true,
  },
];

export default rushingColumns;
