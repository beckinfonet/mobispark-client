import React from "react";
import { Amplify } from "aws-amplify";
import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import { AppRoutes } from "./AppRoutes";
import awsExports from "./aws-exports";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

Amplify.configure(awsExports);

const CircularColor = () => {
  return (
    <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
      <CircularProgress color="success" />
    </Stack>
  );
};

function App() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  return (
    <>
      {authStatus === "configuring" ? (
        <>
          <CircularColor />
          <Authenticator />
        </>
      ) : (
        <AppRoutes />
      )}
    </>
  );
}

export default App;
