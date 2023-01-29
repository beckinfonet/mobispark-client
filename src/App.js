import React from "react";
import { Amplify } from "aws-amplify";
import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import { AppRoutes } from "./AppRoutes";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

function App() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  // console.log("App ....", authStatus);
  return (
    <>
      {authStatus === "configuring" ? (
        <>
          <div>Loading ....</div>
          <Authenticator />
        </>
      ) : (
        <AppRoutes />
      )}
    </>
  );
}

export default App;
