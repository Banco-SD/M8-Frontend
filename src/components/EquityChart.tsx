"use client";

import { Paper, Typography, Skeleton, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { portfolioService } from "@/src/services/portfolioService";
import { brl } from "@/src/lib/format";

interface EquityPoint {
  date: string;
  value: number;
}

export function EquityChart() {
  const [data, setData] = useState<EquityPoint[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEquity = async () => {
      try {
        const authDataString = localStorage.getItem("authData");
        if (!authDataString) return;
        
        const userId = JSON.parse(authDataString).usuario?.id;
        if (!userId) return;

        const portfolio = await portfolioService.getPortfolio(userId);
        
  
        const points = (portfolio.evolucao_patrimonial || []).map(p => {
          const parts = p.data.split("-");
          const dateStr = parts.length === 3 ? `${parts[2]}/${parts[1]}` : p.data;
          
          return {
            date: dateStr,
            value: p.valor
          };
        });
        
        setData(points);
      } catch (err) {
        setError(true);
      }
    };

    fetchEquity();
  }, []);

  const last = data && data.length > 0 ? data[data.length - 1].value : 0;
  const first = data && data.length > 0 ? data[0].value : 1;
  const delta = last - first;
  const deltaPct = (delta / first) * 100;
  const up = delta >= 0;

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }} className="h-full">
      <Box className="flex items-end justify-between mb-4">
        <Box>
          <Typography variant="h6">Evolução Patrimonial</Typography>
          <Typography variant="caption" className="!text-white/50">
            Portfolio Service · últimos meses
          </Typography>
        </Box>
        {data && data.length > 0 && (
          <Box className="text-right">
            <Typography variant="h5" className="!font-bold">{brl(last)}</Typography>
            <Typography variant="caption" sx={{ color: up ? "#22c55e" : "#ef4444", fontWeight: 700 }}>
              {up ? "▲" : "▼"} {brl(Math.abs(delta))} ({deltaPct.toFixed(2)}%)
            </Typography>
          </Box>
        )}
      </Box>

      {error ? (
        <Typography color="error">Portfolio Service indisponível</Typography>
      ) : !data ? (
        <Skeleton variant="rectangular" height={320} />
      ) : data.length === 0 ? (
        <Box className="flex h-[340px] items-center justify-center text-white/50">
          <Typography variant="body1">Sem histórico de transações.</Typography>
        </Box>
      ) : (
        <Box sx={{ width: "100%", height: 340 }}>
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="equityFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" fontSize={12} tickMargin={8} />
              <YAxis
                stroke="rgba(255,255,255,0.5)"
                fontSize={12}
                tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#0b0f17",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                }}
                itemStyle={{ color: "#22c55e" }}
                labelStyle={{ color: "rgba(255,255,255,0.7)", marginBottom: '4px' }}
                formatter={(v: any) => [brl(Number(v)), "Patrimônio"]}
              />
              <Area type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2.5} fill="url(#equityFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Paper>
  );
}