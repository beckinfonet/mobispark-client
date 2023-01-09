import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

import { Details } from "./components/Details";
import { AppLayout } from "./components/AppLayout";
import { BasicWash } from "./Pages/BasicWash";
import { ProWash } from "./Pages/ProWash";

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
        <Route path="/basic-wash/:serviceId/details" element={<Details />} />
        <Route path="/pro-wash/:serviceId/details" element={<Details />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </AppLayout>
  );
};
