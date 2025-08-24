import { Suspense, lazy, type ReactNode } from "react";
import { HashRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import Layout from "./components/common/Layout";
import Stats from "./components/pages/Stats";
import Loader from "./components/common/Loader";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InProgress = lazy(() => import("./components/pages/InProgress"));
const Completed = lazy(() => import("./components/pages/Completed"));
const Users = lazy(() => import("./components/pages/Users"));
const AllBills = lazy(() => import("./components/pages/AllBills"));
const AllOrders = lazy(() => import("./components/pages/AllOrders"));

const LazyLoad = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};
const ProtectedRoute = () => {
  const loggedIn = !!localStorage.getItem("username");
  console.log(loggedIn);
  if (!loggedIn) return <Navigate to="/login" replace />;
  return <Outlet />;
};

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/" element={}/> */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route
                  path="/in-progress"
                  element={
                    <LazyLoad>
                      <InProgress />
                    </LazyLoad>
                  }
                />
                <Route
                  path="/completed"
                  element={
                    <LazyLoad>
                      <Completed />
                    </LazyLoad>
                  }
                />
                <Route path="/stats" element={<Stats />} />
                <Route
                  path="/bills"
                  element={
                    <LazyLoad>
                      <AllBills />
                    </LazyLoad>
                  }
                />
                <Route
                  path="/all-orders"
                  element={
                    <LazyLoad>
                      <AllOrders />
                    </LazyLoad>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <LazyLoad>
                      <Users />
                    </LazyLoad>
                  }
                />
              </Route>
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
