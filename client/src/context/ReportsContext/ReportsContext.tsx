import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { IReport } from "../../interfaces";
import { getReportsByUser } from "../../services/reportsServices";
import AuthContext from "../AuthContext";
import { reportsReducer } from "./ReportsReducer";
import { ReportsActionsTypes } from "./ReportsTypes";

interface IReportsContext {
  reports: IReport[] | null;
  getReports?: () => void;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ReportsContext = createContext<IReportsContext>(
  {} as IReportsContext
);

export const ReportsProvider: React.FC<Props> = ({ children }) => {
  const [{ reports }, dispatch] = useReducer(reportsReducer, { reports: null });

  const dataLS = JSON.parse(localStorage.getItem("gdi-user")!);
  const { authState } = useContext(AuthContext);

  const getReports = useCallback(async () => {
    console.log({ ctx: authState, ls: dataLS });

    if (authState?.data?.token) {
      let response = await getReportsByUser(
        authState?.data?.user?._id,
        authState?.data?.token
      );
      dispatch({
        type: ReportsActionsTypes["[reports] GET"],
        payload: response?.reports,
      });
    } else {
      let response = await getReportsByUser(dataLS?.user._id);
      dispatch({
        type: ReportsActionsTypes["[reports] GET"],
        payload: response?.reports,
      });
    }
  }, []);

  console.log(dataLS?.token || authState.data.token);

  useEffect(() => {
    if (dataLS?.token || authState.data.token) getReports();
  }, []);

  return (
    <ReportsContext.Provider value={{ reports, getReports }}>
      {children}
    </ReportsContext.Provider>
  );
};

export default ReportsContext;
