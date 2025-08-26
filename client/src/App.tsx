import { Suspense, lazy, type ReactNode } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import Layout from "./components/common/Layout";
import Stats from "./components/pages/Stats";
import Loader from "./components/common/Loader";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotAuthorized from "./components/pages/NotAuthorized";

const InProgress = lazy(() => import("./components/pages/InProgress"));
const Completed = lazy(() => import("./components/pages/Completed"));
const Users = lazy(() => import("./components/pages/Users"));
const AllBills = lazy(() => import("./components/pages/AllBills"));
const AllOrders = lazy(() => import("./components/pages/AllOrders"));

const LazyLoad = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

const RoleBasedRoute = ({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: ReactNode;
}) => {
  const loggedIn = !!localStorage.getItem("username");
  const roles = localStorage.getItem("roles");

  if (!loggedIn) return <Navigate to="/login" replace />;

  let parsedRoles: string[] = [];
  try {
    parsedRoles = roles ? JSON.parse(roles) : [];
  } catch {
    parsedRoles = [];
  }

  if (parsedRoles.some((role) => allowedRoles.includes(role))) {
    return <>{children}</>;
  }

  return <Navigate to="/not-authorized" replace />;
};

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/not-authorized"
              element={
                <LazyLoad>
                  <NotAuthorized />
                </LazyLoad>
              }
            />
            <Route element={<Layout />}>
              {/* In-progress → ADMIN + SALESMAN */}
              <Route
                path="/in-progress"
                element={
                  <RoleBasedRoute allowedRoles={["ADMIN", "SALESMAN"]}>
                    <LazyLoad>
                      <InProgress />
                    </LazyLoad>
                  </RoleBasedRoute>
                }
              />

              {/* Completed → ADMIN + SALESMAN */}
              <Route
                path="/completed"
                element={
                  <RoleBasedRoute allowedRoles={["ADMIN", "SALESMAN"]}>
                    <LazyLoad>
                      <Completed />
                    </LazyLoad>
                  </RoleBasedRoute>
                }
              />

              {/* Users → only ADMIN */}
              <Route
                path="/users"
                element={
                  <RoleBasedRoute allowedRoles={["ADMIN"]}>
                    <LazyLoad>
                      <Users />
                    </LazyLoad>
                  </RoleBasedRoute>
                }
              />

              {/* Orders → ADMIN + FULFILLMENT */}
              <Route
                path="/all-orders"
                element={
                  <RoleBasedRoute allowedRoles={["ADMIN", "FULFILLMENT"]}>
                    <LazyLoad>
                      <AllOrders />
                    </LazyLoad>
                  </RoleBasedRoute>
                }
              />

              {/* Bills → ADMIN + FULFILLMENT */}
              <Route
                path="/bills"
                element={
                  <RoleBasedRoute allowedRoles={["ADMIN", "FULFILLMENT"]}>
                    <LazyLoad>
                      <AllBills />
                    </LazyLoad>
                  </RoleBasedRoute>
                }
              />

              {/* Stats → ADMIN + FULFILLMENT */}
              <Route
                path="/stats"
                element={
                  <RoleBasedRoute allowedRoles={["ADMIN", "FULFILLMENT"]}>
                    <Stats />
                  </RoleBasedRoute>
                }
              />
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
