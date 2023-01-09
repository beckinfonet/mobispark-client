import React from "react";
import { Amplify } from "aws-amplify";
import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import { AppAuthenticator } from "./components/AppAuthenticator";
import { AppRoutes } from "./AppRoutes";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

function App() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  return (
    <>
      {authStatus === "configuring" ? (
        <>
          <div>Loading ....</div>
          <Authenticator />
        </>
      ) : authStatus === "authenticated" ? (
        <AppRoutes />
      ) : (
        <AppAuthenticator />
      )}
    </>
  );
}

export default App;
