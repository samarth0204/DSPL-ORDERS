import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import Layout from "./components/common/Layout";
import InProgress from "./components/pages/InProgress";
import Completed from "./components/pages/Completed";
import Stats from "./components/pages/Stats";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/" element={}/> */}
        <Route element={<Layout />}>
          <Route path="/in-progress" element={<InProgress />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/stats" element={<Stats />} />
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}
        </Route>
      </Routes>
    </HashRouter>

    // <LoginPage />
  );
}

export default App;
