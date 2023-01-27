import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { AppLayout } from "./components/AppLayout";
import { BasicWash } from "./Pages/BasicWash";
import { MainSelection } from "./Pages/MainSelection";
import { ServiceDetails } from "./Pages/ServiceDetails";
import { PaymentContainer } from "./Pages/Payments";

export const AppRoutes = () => {
  const { signOut } = useAuthenticator((context) => [context.user]);

  return (
    <AppLayout signOut={signOut}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/main-selection" replace={true} />}
        />
        <Route path="/main-selection" element={<MainSelection />} />
        <Route path="/basic-wash" element={<BasicWash />} />
        <Route
          path="/:category/:serviceId/details"
          element={<ServiceDetails />}
        />
        <Route
          path="/:category/:serviceId/payment"
          element={<PaymentContainer />}
        />
      </Routes>
    </AppLayout>
  );
};
