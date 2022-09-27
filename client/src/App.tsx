import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Login, Register, ReportDetail } from "./pages";
import { routes } from "./routes";

import StateProvider from "./context";

function App() {
  return (
    <StateProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.register} element={<Register />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.reportDetail} element={<ReportDetail />} />
        </Routes>
      </BrowserRouter>
    </StateProvider>
  );
}

export default App;
