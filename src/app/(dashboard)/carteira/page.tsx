"use client";

import { Box, Typography } from "@mui/material";
import { EquityChart } from "@/src/components/EquityChart";
import { AllocationChart } from "@/src/components/AllocationChart";
import { WalletSummary } from "@/src/components/WalletSummary";

export default function CarteiraPage() {
  return (
    <Box className="flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <Box className="mb-2">
        <Typography variant="h4" className="font-bold text-white">
          Minha Carteira
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
          Análise detalhada da evolução e composição dos seus ativos
        </Typography>
      </Box>

      <WalletSummary />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 h-[450px]">
          <EquityChart />
        </div>

        <div className="col-span-12 lg:col-span-4 h-[450px]">
          <AllocationChart />
        </div>
      </div>
    </Box>
  );
}