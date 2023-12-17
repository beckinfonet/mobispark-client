import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";

export function AppLayout({
  authStatus,
  signOut,
  children,
  user,
  cognitoUser,
}) {
  return (
    <div
      style={{
        backgroundColor: "#e7ebf0",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
      }}
    >
      <AppHeader
        authStatus={authStatus}
        signOut={signOut}
        user={user}
        cognitoUser={cognitoUser}
      />
      <Container sx={{ backgroundColor: "#fff", py: 10, flex: "1 0 auto" }}>
        <Box component="main">{children}</Box>
      </Container>
      <AppFooter user={user} />
    </div>
  );
}
