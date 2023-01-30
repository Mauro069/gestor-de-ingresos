import { BrowserRouter, Routes, Route } from "react-router-dom";


import { routes } from "./routes";

import StateProvider from "./context";
import { AuthPage } from "./pages/AuthPage";
import { Home, ReportDetail } from "./pages";



function App() {
  return (
    <BrowserRouter>
      <StateProvider>
        <Routes>
          <Route path={routes.auth} element={<AuthPage />} />
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.reportDetail} element={<ReportDetail />} />
        </Routes>
      </StateProvider>
    </BrowserRouter>
  );
}

export default App;
