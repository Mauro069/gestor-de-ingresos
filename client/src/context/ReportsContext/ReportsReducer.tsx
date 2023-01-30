import { IReport } from "../../interfaces";
import { ReportsActionsTypes } from "./ReportsTypes";

interface ReportState {
  reports: IReport[] | null;
}

interface Action {
  type: ReportsActionsTypes;
  payload: any;
}

export function reportsReducer(state: ReportState, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case ReportsActionsTypes["[reports] GET"]:
      return {
        reports: payload,
      };

    case ReportsActionsTypes["[reports] DELETE"]:
      return {
        reports: payload,
      };

    default:
      return state;
  }
}
