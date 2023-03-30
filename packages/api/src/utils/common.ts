/* eslint-disable indent */
import { DataType } from "../models/teams";
import {
  defenseSortList,
  kickingSortList,
  passingSortList,
  puntingSortList,
  receivingSortList,
  rushingSortList,
} from "../validation/sortByLists";

const firstCharCap = (str: string) => {
  const newStr = str.charAt(0).toUpperCase() + str.slice(1);

  return newStr;
};

const sortByDataType = (dataType: DataType) => {
  switch (dataType) {
    case "defense":
      return defenseSortList;
    case "kicking":
      return kickingSortList;
    case "passing":
      return passingSortList;
    case "punting":
      return puntingSortList;
    case "receiving":
      return receivingSortList;
    case "rushing":
      return rushingSortList;
    default:
      return [];
  }
};

export { firstCharCap, sortByDataType };
