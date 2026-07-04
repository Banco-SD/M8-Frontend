"use client";

import { Paper, Typography, Box, Chip, Stack, CircularProgress } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useEffect, useState } from "react";
import { tickerService, type TickerQuote } from "@/src/services/tickerService"; 
import { brl, pct } from "@/src/lib/format";

const NOME_EMPRESAS: Record<string, string> = {
  PETR4: "Petrobras",
  VALE3: "Vale",
  ITUB4: "Itaú Unibanco",
  BBDC4: "Bradesco",
};

export function TickerBoard() {
  const [quotes, setQuotes] = useState<Record<string, TickerQuote>>({});
  const [flash, setFlash] = useState<Record<string, "up" | "down" | null>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await tickerService.getQuotes();
        
        data.forEach((q) => {
          setQuotes((prev) => ({ ...prev, [q.symbol]: q }));
          setFlash((prev) => ({ ...prev, [q.symbol]: q.direction === "flat" ? prev[q.symbol] : q.direction }));
          
          setTimeout(() => {
            setFlash((prev) => ({ ...prev, [q.symbol]: null }));
          }, 1500);
        });
      } catch (error) {
        console.error("Erro ao buscar cotações");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes(); 
    const interval = setInterval(fetchQuotes, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }} className="h-full">
      <Box className="flex items-center justify-between mb-4">
        <Box>
          <Typography variant="h6">Cotações em tempo real</Typography>
        </Box>
        <Chip
          size="small"
          icon={<FiberManualRecordIcon sx={{ fontSize: "0.7rem !important", color: "#22c55e !important" }} />}
          label="LIVE"
          sx={{ bgcolor: "rgba(34,197,94,0.15)", color: "#22c55e", fontWeight: 700 }}
        />
      </Box>

      {loading ? (
        <Box className="flex justify-center items-center py-8">
          <CircularProgress color="success" size={28} />
        </Box>
      ) : (
        <Stack spacing={1.5}>
          {Object.keys(quotes).map((sym) => {
            const q = quotes[sym];
            const up = q?.direction === "up";
            const flashColor =
              flash[sym] === "up"
                ? "rgba(34,197,94,0.18)"
                : flash[sym] === "down"
                ? "rgba(239,68,68,0.18)"
                : "rgba(255,255,255,0.03)";
            return (
              <Box
                key={sym}
                className="flex items-center justify-between rounded-xl px-4 py-3 transition-colors duration-500"
                sx={{ bgcolor: flashColor, border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <Box>
                  <Typography variant="subtitle1" className="!font-bold">{sym}</Typography>
                  <Typography variant="caption" className="!text-white/50">
                    {NOME_EMPRESAS[sym] || sym} {/* Dinâmico e seguro */}
                  </Typography>
                </Box>
                <Box className="text-right">
                  <Typography variant="subtitle1" className="!font-bold tabular-nums">
                    {q ? brl(q.price) : "—"}
                  </Typography>
                  <Box className="flex items-center justify-end gap-1">
                    {q && (up ? (
                      <ArrowDropUpIcon sx={{ color: "#22c55e" }} />
                    ) : (
                      <ArrowDropDownIcon sx={{ color: "#ef4444" }} />
                    ))}
                    <Typography
                      variant="caption"
                      sx={{ color: up ? "#22c55e" : "#ef4444", fontWeight: 700 }}
                    >
                      {q ? pct(q.changePct) : "0.00%"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Stack>
      )}
    </Paper>
  );
}