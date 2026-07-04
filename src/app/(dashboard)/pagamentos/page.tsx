"use client";

import { Box, Typography } from "@mui/material";
import { PixPanel } from "@/src/components/PixPanel";

export default function PagamentosPage() {
  return (
    <Box className="flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <Box className="mb-2">
        <Typography variant="h4" className="font-bold text-white">
          Pagamentos (PIX)
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
          Envie e receba transferências instantâneas com segurança
        </Typography>
      </Box>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-6 h-full">
          <PixPanel />
        </div>
      </div>
    </Box>
  );
}