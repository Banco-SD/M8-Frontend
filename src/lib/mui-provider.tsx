"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import type { ReactNode } from "react";
import { muiTheme } from "./mui-theme";

export function MuiProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}