import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { AppLayout } from "./components/AppLayout";
import { BasicWash } from "./Pages/BasicWash";
import { MainSelection } from "./Pages/MainSelection";
import { ServiceDetails } from "./Pages/ServiceDetails";
import { PaymentContainer } from "./Pages/Payments";
import { Login } from "./Pages/Login";
import { Dashboard } from "./Pages/Dashboard";
import { Profile } from "./Pages/Profile";
import { VendorDashboard } from "./Pages/VendorDashboard";
import { VendorSignup } from "./Pages/VendorSignup";

function PublicRoute({ children }) {
  const { signOut, authStatus } = useAuthenticator((context) => [
    context.authStatus,
  ]);
  return (
    <AppLayout authStatus={authStatus} signOut={signOut}>
      {children}
    </AppLayout>
  );
}

function PrivateRoute({ children }) {
  const { authStatus, signOut } = useAuthenticator((context) => [
    context.authStatus,
  ]);
  let location = useLocation();
  // console.log("PrivateRoute .......", authStatus);
  if (authStatus === "unauthenticated") {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return (
      <AppLayout authStatus={authStatus} signOut={signOut}>
        {children}
      </AppLayout>
    );
  }
}

export const AppRoutes = ({ user }) => {
  const [userInfo, setUserInfo] = useState([]);
  const { username } = user || {};

  useEffect(() => {
    const fetchUserInfo = async () => {
      const result = await axios.get(
        `https://formula312-server-2xrue.ondigitalocean.app/vendorstatus/${username}`
      );
      setUserInfo(result);
    };

    fetchUserInfo();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/main-selection" replace={true} />}
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="main-selection"
        element={
          <PublicRoute>
            <MainSelection />
          </PublicRoute>
        }
      />
      <Route
        path="/bookings"
        element={
          <PublicRoute>
            <Dashboard />
          </PublicRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PublicRoute>
            <Profile />
          </PublicRoute>
        }
      />
      <Route
        path="basic-wash"
        element={
          <PublicRoute>
            <BasicWash />
          </PublicRoute>
        }
      />
      <Route
        path=":category/:serviceId/details"
        element={
          <PublicRoute>
            <ServiceDetails />
          </PublicRoute>
        }
      />
      <Route
        path=":category/:serviceId/payment"
        element={
          <PrivateRoute>
            <PaymentContainer />
          </PrivateRoute>
        }
      />
      <Route
        path="vendor-dashboard/:vendorId"
        element={
          <PrivateRoute>
            <VendorDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="vendor-signup"
        element={
          <PrivateRoute>
            <VendorSignup user={user} />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
