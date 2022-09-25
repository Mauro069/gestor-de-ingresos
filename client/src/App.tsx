import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Login, ReportDetail } from "./pages";
import { routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.reportDetail} element={<ReportDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
