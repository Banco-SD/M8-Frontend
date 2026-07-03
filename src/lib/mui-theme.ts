import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#22c55e" },
    secondary: { main: "#3b82f6" },
    background: { default: "#0b0f17", paper: "#111827" },
    success: { main: "#22c55e" },
    error: { main: "#ef4444" },
    warning: { main: "#f59e0b" },
    divider: "rgba(255,255,255,0.08)",
  },
  typography: {
    fontFamily:
      '"Inter", "Segoe UI", Roboto, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
    h4: { fontWeight: 700, letterSpacing: -0.5 },
    h5: { fontWeight: 700, letterSpacing: -0.3 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none", border: "1px solid rgba(255,255,255,0.06)" },
      },
    },
    MuiButton: { styleOverrides: { root: { borderRadius: 12 } } },
  },
});