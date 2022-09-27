import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Login, Register, ReportDetail } from "./pages";
import { routes } from "./routes";

import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <Routes>
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.reportDetail} element={<ReportDetail />} />
          </Routes>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
