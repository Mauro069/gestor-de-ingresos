import { NotificationProvider } from "./NotificationContext";

interface StateProviderProps {
  children: JSX.Element | JSX.Element[];
}

const StateProvider = ({ children }: StateProviderProps) => {
  return <NotificationProvider>{children}</NotificationProvider>;
};

export default StateProvider;
