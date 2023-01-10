import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";

export function AppLayout({ signOut, children }) {
  return (
    <div
      style={{
        backgroundColor: "#e7ebf0",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
      }}
    >
      <AppHeader signOut={signOut} />
      <Container sx={{ backgroundColor: "#fff", py: 10, flex: "1 0 auto" }}>
        <Box component="main">{children}</Box>
      </Container>
      <AppFooter />
    </div>
  );
}
