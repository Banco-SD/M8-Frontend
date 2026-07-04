"use client";

import { Paper, Typography, Box, Skeleton, Stack, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { walletService, type WalletBalance } from "@/src/services/walletService";
import { brl } from "@/src/lib/format";

export function WalletSummary() {
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const authDataString = localStorage.getItem("authData");
        if (!authDataString) return;
        
        const userId = JSON.parse(authDataString).usuario?.id;
        if (!userId) return;

        const data = await walletService.getBalance(userId);
        setBalance(data);
      } catch (err) {
        setError(true);
      }
    };

    fetchWallet();
  }, []);

  if (error) {
    return (
      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: "rgba(255,255,255,0.02)" }}>
        <Typography color="error">Erro ao carregar saldos da carteira.</Typography>
      </Paper>
    );
  }

  if (!balance) {
    return <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 3 }} />;
  }

  const total = balance.available + balance.invested + balance.blocked;

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: 3, 
        bgcolor: "rgba(255,255,255,0.02)", 
        border: "1px solid rgba(255,255,255,0.05)" 
      }}
    >
      <Stack 
        direction={{ xs: "column", md: "row" }} 
        spacing={4} 
        divider={<Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255,255,255,0.1)" }} />}
        sx={{ justifyContent: "space-between" }}
      >
        <Box className="flex-1">
          <Typography variant="caption" className="!text-white/50 uppercase tracking-wider">
            Patrimônio Total Bruto
          </Typography>
          <Typography variant="h4" className="!font-bold text-white mt-1">
            {brl(total)}
          </Typography>
        </Box>

        <Box className="flex-1">
          <Typography variant="caption" className="!text-white/50 uppercase tracking-wider">
            Saldo Disponível (Caixa)
          </Typography>
          <Typography variant="h5" className="!font-semibold text-emerald-400 mt-1">
            {brl(balance.available)}
          </Typography>
        </Box>

        <Box className="flex-1">
          <Typography variant="caption" className="!text-white/50 uppercase tracking-wider">
            Total Investido
          </Typography>
          <Typography variant="h5" className="!font-semibold text-white mt-1">
            {brl(balance.invested)}
          </Typography>
        </Box>

        <Box className="flex-1">
          <Typography variant="caption" className="!text-white/50 uppercase tracking-wider">
            Saldo Bloqueado (Ordens)
          </Typography>
          <Typography variant="h5" className="!font-semibold text-amber-500 mt-1">
            {brl(balance.blocked)}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}