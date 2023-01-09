import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";

export function AppLayout({ signOut, children }) {
  return (
    <div style={{ backgroundColor: "#e7ebf0" }}>
      <AppHeader signOut={signOut} />
      <Container sx={{ backgroundColor: "#fff", py: 10 }}>
        <Box component="main">{children}</Box>
      </Container>
      <AppFooter />
    </div>
  );
}
