import { AuthProvider } from "./AuthContext";
import { NotificationProvider } from "./NotificationContext";
import { ReportsProvider } from "./ReportsContext/ReportsContext";

interface StateProviderProps {
  children: JSX.Element | JSX.Element[];
}

const StateProvider = ({ children }: StateProviderProps) => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <ReportsProvider>{children}</ReportsProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default StateProvider;
