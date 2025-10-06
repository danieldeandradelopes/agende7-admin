import { lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/utils/use-auth";

const Dashboard = lazy(() => import("@/pages/Dashboard/index"));
const Barbershops = lazy(() => import("@/pages/Barbershops/index"));
const BarberShopDetail = lazy(() => import("@/pages/BarberShopDetail/index"));
const Plans = lazy(() => import("@/pages/Plans/index"));
const Login = lazy(() => import("@/pages/Login/index"));
const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const Users = lazy(() => import("@/pages/Users/index"));

function PrivateRoutes() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
}

function PublicRoutes() {
  const { isAuthenticated, getUser } = useAuth();

  const user = getUser();

  if (user?.access_level === "superadmin") {
    return !isAuthenticated() ? <Outlet /> : <Navigate to="/dashboard" />;
  }

  return !isAuthenticated() ? <Outlet /> : <Navigate to="/dashboard" />;
}

function MainRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Login />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route element={<RootLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/barbershop" element={<Barbershops />} />
          <Route path="/barbershop/:id" element={<BarberShopDetail />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default MainRoutes;
