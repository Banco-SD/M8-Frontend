"use client";

import { Box, Typography } from "@mui/material";
import { WalletCard } from "@/src/components/WalletCard";
import { TickerBoard } from "@/src/components/TickerBoard";
import { OrderForm } from "@/src/components/OrderForm";

export default function BolsaPage() {
  return (
    <Box className="flex flex-col gap-6 max-w-[1400px] mx-auto w-full">

      <Box className="mb-2">
        <Typography variant="h4" className="font-bold text-white">
          Bolsa de Valores
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
          Acompanhe o mercado e execute suas ordens em tempo real
        </Typography>
      </Box>

      <div className="grid grid-cols-12 gap-6">
        
        <div className="col-span-12 lg:col-span-4 h-full">
          <WalletCard />
        </div>

        <div className="col-span-12 lg:col-span-4 h-full">
          <TickerBoard />
        </div>

        <div className="col-span-12 lg:col-span-4 h-full">
          <OrderForm />
        </div>
        

      </div>
    </Box>
  );
}