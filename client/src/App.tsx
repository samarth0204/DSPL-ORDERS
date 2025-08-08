import { Suspense, lazy } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import Layout from "./components/common/Layout";
import Stats from "./components/pages/Stats";
import Loader from "./components/common/Loader";
import Bills from "./components/pages/Bills";
import AllOrders from "./components/pages/AllOrders";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InProgress = lazy(() => import("./components/pages/InProgress"));
const Completed = lazy(() => import("./components/pages/Completed"));

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/" element={}/> */}
            <Route element={<Layout />}>
              <Route
                path="/in-progress"
                element={
                  <Suspense fallback={<Loader />}>
                    <InProgress />
                  </Suspense>
                }
              />
              <Route
                path="/completed"
                element={
                  <Suspense fallback={<Loader />}>
                    <Completed />
                  </Suspense>
                }
              />
              <Route path="/stats" element={<Stats />} />
              <Route path="/bills" element={<Bills />} />
              <Route path="/all-orders" element={<AllOrders />} />
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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </>

    // <LoginPage />
  );
}

export default App;
