import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import Layout from "./components/common/Layout";
import InProgress from "./components/pages/InProgress";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/" element={}/> */}
        <Route element={<Layout />}>
          <Route path="/" element={<InProgress />} />
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
