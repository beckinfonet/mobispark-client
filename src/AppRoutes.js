import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { AppLayout } from "./components/AppLayout";
import { BasicWash } from "./Pages/BasicWash";
import { ProWash } from "./Pages/ProWash";
import { ServiceDetails } from "./Pages/ServiceDetails";
import { PaymentContainer } from "./Pages/Payments";

export const AppRoutes = () => {
  const { signOut } = useAuthenticator((context) => [context.user]);

  return (
    <AppLayout signOut={signOut}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/basic-wash" replace={true} />}
        />
        <Route path="/basic-wash" element={<BasicWash />} />
        <Route path="/pro-wash" element={<ProWash />} />
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
