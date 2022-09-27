import { AuthProvider } from "./AuthContext";
import { NotificationProvider } from "./NotificationContext";

interface StateProviderProps {
  children: JSX.Element | JSX.Element[];
}

const StateProvider = ({ children }: StateProviderProps) => {
  return (
    <AuthProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </AuthProvider>
  );
};

export default StateProvider;
