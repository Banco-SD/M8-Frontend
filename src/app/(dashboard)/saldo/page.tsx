"use client";

import { Box, Typography, Paper, Skeleton, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { walletService, type Transaction } from "@/src/services/walletService";
import { WalletCard } from "@/src/components/WalletCard";
import { brl } from "@/src/lib/format";

export default function SaldoPage() {
  const [txs, setTxs] = useState<Transaction[] | null>(null);

  useEffect(() => { 
    const fetchStatement = async () => {
      const authDataString = localStorage.getItem("authData");
      if (!authDataString) return;
      
      const userId = JSON.parse(authDataString).usuario?.id;
      if (!userId) return;

      const data = await walletService.getStatement(userId);
      setTxs(data);
    };

    fetchStatement();
  }, []);

  return (
    <Box className="flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <Box className="mb-2">
        <Typography variant="h4" className="font-bold text-white">
          Saldo & Extrato
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
          Acompanhe seu saldo disponível e histórico de movimentações
        </Typography>
      </Box>

      <div className="grid grid-cols-12 gap-6">
   
        <div className="col-span-12 lg:col-span-5 h-full">
          <WalletCard />
        </div>
        
        <div className="col-span-12 lg:col-span-7 h-full">
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3, 
              bgcolor: "rgba(255,255,255,0.02)", 
              border: "1px solid rgba(255,255,255,0.05)",
              height: "100%"
            }}
          >
            <Typography variant="h6" className="text-white">Extrato recente</Typography>
            <Typography variant="caption" className="!text-white/50 uppercase tracking-wider">
              Wallet Service
            </Typography>
            
            <Box className="mt-6 divide-y divide-white/5">
              {!txs
                ? [...Array(4)].map((_, i) => <Skeleton key={i} height={64} sx={{ my: 1, borderRadius: 2 }} />)
                : txs.length === 0 ? (
                    <Typography className="text-white/50 py-4 text-center">
                      Nenhuma transação encontrada.
                    </Typography>
                ) : txs.map((t) => (
                    <Box key={t.id} className="flex items-center justify-between py-4">
                      <Box>
                        <Typography variant="body1" className="!font-semibold text-white/90">
                          {t.description}
                        </Typography>
                        <Typography variant="body2" className="!text-white/50 mt-0.5">
                          {t.date}
                        </Typography>
                      </Box>
                      <Box className="flex items-center gap-3">
                        <Chip 
                          label={t.type} 
                          size="small" 
                          sx={{ bgcolor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", fontWeight: 600 }} 
                        />
                        <Typography
                          variant="body1"
                          sx={{ color: t.amount >= 0 ? "#10b981" : "#ef4444", fontWeight: 700 }}
                          className="tabular-nums text-right w-28"
                        >
                          {t.amount >= 0 ? "+" : ""}{brl(t.amount)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
            </Box>
          </Paper>
        </div>
      </div>
    </Box>
  );
}