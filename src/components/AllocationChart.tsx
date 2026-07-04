"use client";

import { Paper, Typography, Skeleton, Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { portfolioService } from "@/src/services/portfolioService";

interface AllocationSlice {
  name: string;
  value: number;
  color: string;
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export function AllocationChart() {
  const [data, setData] = useState<AllocationSlice[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllocation = async () => {
      try {
        const authDataString = localStorage.getItem("authData");
        if (!authDataString) return;
        
        const userId = JSON.parse(authDataString).usuario?.id;
        if (!userId) return;

        const portfolio = await portfolioService.getPortfolio(userId);
        
        // Mapeia o dicionário de ativos do Python para o formato do Recharts
        const slices = Object.entries(portfolio.ativos || {}).map(([nome, ativo], index) => ({
          name: nome,
          value: Number(ativo.percentual_carteira.toFixed(2)),
          color: COLORS[index % COLORS.length]
        }));
        
        setData(slices);
      } catch (err) {
        setError(true);
      }
    };

    fetchAllocation();
  }, []);

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }} className="h-full flex flex-col">
      <Typography variant="h6">Composição da Carteira</Typography>
      <Typography variant="caption" className="!text-white/50">Portfolio Service</Typography>

    {error ? (
        <Typography color="error" className="!mt-4">Portfolio Service indisponível</Typography>
      ) : !data ? (
        <Skeleton variant="rectangular" height={240} className="!mt-4" />
      ) : data.length === 0 ? (
        <Box className="flex h-[240px] items-center justify-center text-white/50">
          <Typography variant="body1">Nenhum ativo na carteira.</Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ width: "100%", height: 220 }} className="mt-2">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                  stroke="#0b0f17"
                >
                  {data.map((s) => (
                    <Cell key={s.name} fill={s.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#0b0f17",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                  }}
                 formatter={(v: any, n: any) => [`${v}%`, String(n)]}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Stack spacing={1} className="!mt-2">
            {data.map((s) => (
              <Box key={s.name} className="flex items-center justify-between text-sm">
                <Box className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-white/80">{s.name}</span>
                </Box>
                <span className="font-semibold tabular-nums">{s.value}%</span>
              </Box>
            ))}
          </Stack>
        </>
      )}
    </Paper>
  );
}