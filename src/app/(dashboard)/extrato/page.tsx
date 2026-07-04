"use client";

import { Box, Typography, Paper, Skeleton, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { notificationService, type Notification } from "@/src/services/notificationService";

export default function ExtratoPage() {
  const [items, setItems] = useState<Notification[] | null>(null);

  useEffect(() => { 
    notificationService.list().then(setItems); 
  }, []);

  return (
    <Box className="flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
      <Box className="mb-2">
        <Typography variant="h4" className="font-bold text-white">
          Comprovantes & Notificações
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
          Histórico de movimentações, ordens e avisos do sistema
        </Typography>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          borderRadius: 3, 
          bgcolor: "rgba(255,255,255,0.02)", 
          border: "1px solid rgba(255,255,255,0.05)" 
        }}
      >
        <Typography variant="caption" className="!text-white/50 uppercase tracking-wider">
          Notification Service
        </Typography>

        <Box className="mt-4 divide-y divide-white/5">
          {!items
            ? [...Array(4)].map((_, i) => (
                <Skeleton key={i} height={64} sx={{ my: 1, borderRadius: 2 }} />
              ))
            : items.length === 0 ? (
                <Typography className="text-white/50 py-4 text-center">
                  Nenhuma notificação encontrada.
                </Typography>
            ) : items.map((n) => (
                <Box key={n.id} className="flex items-center justify-between py-4">
                  <Box className="flex items-start gap-4">
                    {/* Indicador de não lida brilhante */}
                    <span 
                      className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${
                        n.read 
                          ? "bg-white/20" 
                          : "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                      }`} 
                    />
                    <Box>
                      <Typography variant="body1" className="!font-semibold text-white/90">
                        {n.title}
                      </Typography>
                      <Typography variant="body2" className="!text-white/50 mt-0.5">
                        {n.body}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip 
                    label={n.kind} 
                    size="small" 
                    sx={{ bgcolor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", fontWeight: 600 }} 
                  />
                </Box>
              ))}
        </Box>
      </Paper>
    </Box>
  );
}