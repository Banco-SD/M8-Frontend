"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentsIcon from "@mui/icons-material/Payments";
import PieChartIcon from "@mui/icons-material/PieChart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const items = [
  { to: "/bolsa", label: "Bolsa de Valores", icon: <ShowChartIcon /> },
  { to: "/carteira", label: "Carteira", icon: <PieChartIcon /> },
  { to: "/wallet", label: "Saldo & Extrato", icon: <AccountBalanceWalletIcon /> },
  { to: "/pagamentos", label: "Pagamentos (PIX)", icon: <PaymentsIcon /> },
  { to: "/extrato", label: "Comprovantes", icon: <ReceiptLongIcon /> },
];

export function Sidebar() {
  const pathname = usePathname(); // Hook nativo do Next.js

  return (
    <Box className="h-screen w-64 shrink-0 border-r border-white/5 bg-[#0d1220] p-4 flex flex-col">
      <Box className="flex items-center gap-2 px-2 py-3">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500" />
        <Typography variant="h6" className="!font-bold tracking-tight">
          In<span className="text-emerald-400">Vest</span>
        </Typography>
      </Box>
      <Divider className="!border-white/5 !my-3" />
      <List className="flex-1">
        {items.map((it) => {
          // Lógica de rota ativa adaptada para o Next.js
          const active = pathname === it.to || (it.to !== "/" && pathname?.startsWith(it.to));
          
          return (
            <ListItemButton
              key={it.to}
              component={Link} // Link do Next.js
              href={it.to}     // No Next.js, Link usa href em vez de to
              selected={active}
              className="!rounded-xl !mb-1"
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "rgba(34,197,94,0.12)",
                  color: "#22c55e",
                },
                "&.Mui-selected .MuiListItemIcon-root": { color: "#22c55e" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "rgba(255,255,255,0.7)" }}>
                {it.icon}
              </ListItemIcon>
              <ListItemText
                primary={it.label}
                slotProps={{ primary: { sx: { fontSize: 14, fontWeight: 500 } } }}
              />
            </ListItemButton>
          );
        })}
      </List>
      <Box className="rounded-xl bg-white/[0.03] p-3 text-xs text-white/60">
        Arquitetura de microsserviços — Client-Side Composition.
      </Box>
    </Box>
  );
}